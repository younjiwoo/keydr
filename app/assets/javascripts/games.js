// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

$( document ).ready( function() {
  const BAR = $('.bar')
  let scoreBoard = $('.score-board')
  let score = $('.score')
  $('.gameOverContainer').hide()
  $('.gameCompleted').hide()

  // Helper Methods.
  function ceilToTopOfElem(el) {
    return el.offset().top
  }
  function ceilToBtmOfElem(el) {
    return ceilToTopOfElem(el) + el.height()
  }
  function isOverlapping(el) {
    return ceilToBtmOfElem(el) > ceilToTopOfElem(BAR)
  }
  function generateNotes(sec, column) {
    setTimeout( function() {
        const NEW_NOTE = $('<div class="note active" />')
        $( column ).append(NEW_NOTE)
        NEW_NOTE.animate({
          top: $('.game-board').height() - 50
        }, 4500, 'linear', function() {
          $( this ).removeClass('active')
          $( this ).animate({
            top: $('.game-board').height()
          }, 500, 'linear')
        })
    }, sec * 1000)
  }
  function isGameOver() {
    return parseInt( score.html() ) < 10
  }
  function handleKeypress(column, keycode) { $( window ).keypress( function (e) {
      if ( e.which === keycode ) {
        let noteAboveBar = $(`${column} .active`).first()
        if ( noteAboveBar.length && !isGameOver() ) {
          if ( isOverlapping(noteAboveBar) ) {
            score.html( parseInt(score.html()) + 10 )
            score.addClass('pulse plus')
          } else {
            score.html( parseInt(score.html()) - 10 )
            score.addClass('pulse minus')
          }
        } else if ( isGameOver() ) {
          stopGame()
        }
      }
    })
  }
  function startGame() {
    score.html(100)
    $('audio').trigger('play')
    let pattern = JSON.parse( $('.data-pattern').attr('data-pattern') )
    pattern.d.forEach( function(sec) { generateNotes(sec, '.column-d') })
    handleKeypress('.column-d', 100)
    pattern.f.forEach( function(sec) { generateNotes(sec, '.column-f')})
    handleKeypress('.column-f', 102)
    pattern.j.forEach( function(sec) { generateNotes(sec, '.column-j')})
    handleKeypress('.column-j', 106)
    pattern.k.forEach( function(sec) { generateNotes(sec, '.column-k')})
    handleKeypress('.column-k', 107)
  }
  function stopAudio() {
    $('audio').get(0).pause()
    $('audio').get(0).currentTime = 0
  }
  function stopGame() {
    $('.gameOverContainer').show(1000)
    stopAudio()
  }
  function gameCompleted() {
    let finalScore = score.html()
    $('.gameCompleted').show(2000)
    $('.play-again-btn').before(`Your Score: ${finalScore}`)
    // postScore( finalScore )
  }
  function postScore( finalScore ) {
    let finalScoreInt = parseInt( finalScore )
    $.ajax({
      method: 'POST',
      url: '/gameplays',
      data: { score: finalScoreInt },
      success: function(res) {
        // debugger
      }
    })
  }

  score[0].addEventListener('webkitAnimationEnd', function() {
    score.removeClass('pulse plus minus')
  });
  $('audio').get(0).addEventListener("ended", gameCompleted);

  $('.play-again-btn').click( function() {
    window.location.replace('/games')
  })
  $('.start-btn').click( function() {
    $('.readyContainer').hide(1000)
    setTimeout( startGame, 1000 )
  })
  // $('.exit-btn').click( showChooseSong ) // Probably change this later.

})
