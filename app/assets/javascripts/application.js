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
const PATTERN_F = [2, 4, 5, 6, 10, 13, 14, 15, 18, 20]

$( document ).ready( function() {

// First Column.
  PATTERN_D.forEach( function (sec) {
    setTimeout(function() {
      const NEW_NOTE = $("<div class='note' />");
      $('.column-d').append(NEW_NOTE)
      NEW_NOTE.animate({
        top: $('.game-board').height()
      }, 5000, 'linear');
    }, sec * 1000)
  })

})
