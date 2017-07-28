// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require jquery
// = require phaser
//= require_tree .

const EASY_SONG = {
  title: 'Location',
  artist: 'Khalid',
  pattern: {
    d: [9, 11, 13, 17, 18, 19, 27, 37, 38],
    f: [8, 10, 12, 19, 26, 27, 34, 37],
    j: [0, 1, 2, 5, 7, 13, 23, 28, 32, 35, 36],
    k: [0, 2, 2.5, 3, 3.5, 4, 22, 25, 28, 29, 30, 31, 32, 39, 40, 42, 43]
  }
}

$( document ).ready( function() {
  const BAR = $('.bar')
  let scoreBoard = $('.score-board')
  let score = $('.score')
  $('.columnsContainer').hide()
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
      // }
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
  function showChooseSong() {
    location.reload()
    $('.gameOverContainer').hide()
    $('.columnsContainer').hide()
    $('.gameCompleted').hide()
    $('.chooseSongContainer').show()
  }
  function startGame() {
    score.html(100)
    $('audio').trigger('play')
    EASY_SONG.pattern.d.forEach( function(sec) { generateNotes(sec, '.column-d') })
    handleKeypress('.column-d', 100)
    EASY_SONG.pattern.f.forEach( function(sec) { generateNotes(sec, '.column-f')})
    handleKeypress('.column-f', 102)
    EASY_SONG.pattern.j.forEach( function(sec) { generateNotes(sec, '.column-j')})
    handleKeypress('.column-j', 106)
    EASY_SONG.pattern.k.forEach( function(sec) { generateNotes(sec, '.column-k')})
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

  $('.chooseSongContainer').click( function() {
    $('.chooseSongContainer').hide(1000)
    $('.columnsContainer').show(2000)
    startGame()
  })

  $('.play-again-btn').click( showChooseSong )
  $('.exit-btn').click( showChooseSong ) // Probably change this later.

})
