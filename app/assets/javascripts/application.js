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

const PATTERN_D = [1, 3, 4, 8, 9, 11, 13, 17, 18, 19]
// const PATTERN_F = [2, 4, 5, 6, 10, 13, 14, 15, 18, 20]


$( document ).ready( function() {
  const BAR = $('.bar')

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

  function rightKeyPress(column, keyCode) {
    $( window ).keypress( function (e) {
      let firstActiveCls = $(`${column} .active`).first()
      if (firstActiveCls.length > 0) {
        if (e.which === keyCode && isOverlapping(firstActiveCls) ) {
          // pulse()
        }
      }
    })
  }

  // Start Calling Methods.
  PATTERN_D.forEach( function(sec) {
    generateNotes(sec, '.column-d')
  })
  rightKeyPress('.column-d', 100)


})
