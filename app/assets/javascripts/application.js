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
//= require_tree .

const PATTERN_D = [0, 1.5, 4, 8, 9, 11, 13, 17, 18, 19]
const PATTERN_F = [0.5, 1.5, 2, 4, 6, 8, 10, 12, 19]
const PATTERN_J = [0, 1, 2, 5]
const PATTERN_K = [0, 2, 2.5, 3, 3.5, 4]


$( document ).ready( function() {
  const BAR = $('.bar')
  let scoreBoard = $('.score-board')
  let score = $('.score')
  $('.columnsContainer').hide()

  // Helper Method.
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
  function handleKeypress(column, keycode) {
    $( window ).keypress( function (e) {
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
          return score.html('GAME OVER').addClass('minus')
        }
      }
    })
  }
  function startGame() {
    PATTERN_D.forEach( function(sec) {
      generateNotes(sec, '.column-d')
    })
    handleKeypress('.column-d', 100)

    PATTERN_F.forEach( function(sec) {
      generateNotes(sec, '.column-f')
    })
    handleKeypress('.column-f', 102)

    PATTERN_J.forEach( function(sec) {
      generateNotes(sec, '.column-j')
    })
    handleKeypress('.column-j', 106)

    PATTERN_K.forEach( function(sec) {
      generateNotes(sec, '.column-k')
    })
    handleKeypress('.column-k', 107)
  }

  score[0].addEventListener('webkitAnimationEnd', function() {
    score.removeClass('pulse plus minus')
  });

  $('.chooseSongContainer').click( function() {
    $('.chooseSongContainer').hide(1000)
    $('.columnsContainer').show(2000)
    let easyLevel = new Audio('assets/Khalid_Location.ogg')
    easyLevel.play()
    startGame()
  })

  // Start Calling Methods.



})
