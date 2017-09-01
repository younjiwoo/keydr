// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready(function() {
  const BAR = $('.bar');
  const GAMEBOARD = $('.game-board');
  let scoreBoard = $('.score-board');
  let score = $('.score');
  $('.gameOverContainer').hide();
  $('.gameCompleted').hide();

  score[0].addEventListener('webkitAnimationEnd', function() {
    score.removeClass('flash plus minus');
  });
  $('audio').get(0).addEventListener('ended', gameCompleted);
  $('.start-btn')
    .mouseenter(function() {
      $(this).val('Start');
    })
    .mouseout(function() {
      $(this).val('Ready?');
    })
    .click(function() {
      $('.readyContainer').hide(1000);
      setTimeout(startGame, 1000);
    });
  $('.play-again-btn').click(function() {
    location.reload();
  });
  $('.exit-btn').click(function() {
    window.location.replace('/');
  });

  // Helper Methods.
  function ceilToTopOfElem(el) {
    return (
      el.offset().top -
      (GAMEBOARD.offset().top + parseInt(GAMEBOARD.css('border-top-width')))
    );
  }
  function ceilToBtmOfElem(el) {
    return ceilToTopOfElem(el) + el.height();
  }
  function isOverlapping(el) {
    return (
      ceilToBtmOfElem(el) > ceilToTopOfElem(BAR) &&
      ceilToTopOfElem(el) < ceilToBtmOfElem(BAR)
    );
  }
  function generateNotes(sec, column, gameboardHeight) {
    setTimeout(function() {
      const NEW_NOTE = $('<div class="note active" />');
      $(column).append(NEW_NOTE);
      NEW_NOTE.animate(
        {
          top: 500 + 'px'
        },
        ceilToBtmOfElem(BAR) * 10,
        'linear',
        function() {
          $(this).removeClass('active');
          $(this).animate(
            {
              top: 500 + 'px'
            },
            (gameboardHeight - ceilToBtmOfElem(BAR)) * 10,
            'linear'
          );
        }
      );
    }, sec * 1000);
  }
  function isGameOver() {
    return parseInt(score.html()) < 10;
  }
  function handleKeypress(column, keycode) {
    $(window).keypress(function(e) {
      if (e.which === keycode) {
        let noteAboveBar = $(`${column} .active`).first();
        if (noteAboveBar.length && !isGameOver()) {
          if (isOverlapping(noteAboveBar)) {
            score.html(parseInt(score.html()) + 10);
            score.addClass('flash plus');
            noteAboveBar.addClass('pulse');
          } else {
            score.html(parseInt(score.html()) - 10);
            score.addClass('flash minus');
          }
        } else if (isGameOver()) {
          stopGame();
        }
      }
    });
  }
  function startGame() {
    score.html(100);
    $('.login-signup').hide();
    $('audio').trigger('play');
    let gameboardHeight = GAMEBOARD.height();
    let pattern = JSON.parse($('.data-pattern').attr('data-pattern'));
    let letters = { d: 100, f: 102, j: 106, k: 107 };
    for (let letter in letters) {
      pattern[letter].forEach(function(sec) {
        generateNotes(sec, `.column-${letter}`, gameboardHeight);
      });
      handleKeypress(`.column-${letter}`, letters[letter]);
    }
  }
  function stopAudio() {
    $('audio').get(0).pause();
    $('audio').get(0).currentTime = 0;
  }
  function stopGame() {
    $('.gameOverContainer').show(1000);
    stopAudio();
  }
  function gameCompleted() {
    let finalScore = score.html();
    score.hide();
    $('.login-signup, .gameCompleted').show(1000);
    $('.play-again-btn').before(`<p>Your Score: ${finalScore}</p>`);
    postScore(finalScore);
  }
  function postScore(finalScore) {
    let game_id = $('.game_id').text();
    $.ajax({
      method: 'POST',
      url: '/gameplays',
      beforeSend: function(xhr) {
        xhr.setRequestHeader(
          'X-CSRF-Token',
          $('meta[name="csrf-token"]').attr('content')
        );
      },
      data: { score: finalScore, game_id: game_id },
      success: top3Scores
    });
  }
  function top3Scores(response) {
    response.forEach(function(gameplayObj) {
      $('.top3Scores').append(`<tr>
                                <td><i class="fa fa-user" aria-hidden="true"></i></td>
                                <td>${gameplayObj.score}</td>
                                <td>${gameplayObj
                                  .user.first_name} ${gameplayObj.user.last_name}</td>
                              </tr>`);
    });
  }
});
