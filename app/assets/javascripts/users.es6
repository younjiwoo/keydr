// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

$( document ).ready(function () {
  $('.signup-btn').addClass('disabled-btn')

  function isPresent(inputVal) {
    return inputVal.length > 0
  }

  $('.f-name').focusout( function() {
    if (isPresent( $(this).val() )) {
      $( this ).removeClass('invalid')
      $('.f-name-err').removeClass('show')
    } else {
      $( this ).addClass('invalid')
      $('.f-name-err').addClass('show')
    }
    toggleSignUpButton()
  })

  $('.l-name').focusout( function() {
    if (isPresent( $(this).val() )) {
      $( this ).removeClass('invalid')
      $('.l-name-err').removeClass('show')
    } else {
      $( this ).addClass('invalid')
      $('.l-name-err').addClass('show')
    }
    toggleSignUpButton()
  })

  // Reference: https://stackoverflow.com/questions/2855865/validating-email-addresses-using-jquery-and-regex
  function isEmailValid(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress)
  }

  $('.email').focusout( function() {
    let inputVal = $(this).val()
  	if ( isPresent( inputVal ) ) {
      if ( isEmailValid( inputVal ) ) {
        $( this ).removeClass('invalid')
        $('.email-err').removeClass('show')
      } else {
        $( this ).addClass('invalid')
        $('.email-err').addClass('show')
      }
    } else {
      $( this ).addClass('invalid')
      $('.email-err').addClass('show')
    }
    toggleSignUpButton()
  })

  function isLongEnough( inputVal ) {
    return inputVal.length > 7
  }

  $('.password').keyup( function() {
    let inputVal = $( this ).val()
    if ( isPresent( inputVal ) ) {
    	if ( isLongEnough( inputVal ) ) {
        $( this ).removeClass('invalid')
        $('.min-length-err').removeClass('show')
      } else {
        $( this ).addClass('invalid')
        $('.min-length-err').addClass('show')
      }
    } else {
      $( this ).addClass('invalid')
      $('.min-length-err').addClass('show')
    }
    toggleSignUpButton()
  })

  function passwordMatch( inputVal ) {
    return inputVal === $('.password').val()
  }
  $('.c-password').keyup( function() {
    let inputVal = $( this ).val()
    if ( passwordMatch( inputVal ) ) {
      $( this ).removeClass('invalid')
      $('.not-match-err').removeClass('show')
    } else {
      $( this ).addClass('invalid')
      $('.not-match-err').addClass('show')
    }
    toggleSignUpButton()
  })

  function toggleSignUpButton() {
    if (isPresent( $('.f-name').val() ) &&
        isPresent( $('.l-name').val() ) &&
        isPresent( $('.email').val() ) &&
        isEmailValid( $('.email').val() ) &&
        isPresent( $('.password').val() ) &&
        isLongEnough( $('.password').val() ) &&
        passwordMatch( $('.c-password').val() )) {
      $('.signup-btn').prop('disabled', false)
      $('.signup-btn').removeClass('disabled-btn')
    } else {
      $('.signup-btn').prop('disabled', true)
      $('.signup-btn').addClass('disabled-btn')
    }
  }

});
