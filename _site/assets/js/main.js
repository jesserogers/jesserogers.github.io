jQuery(document).ready(function($) { //safety pants!

  // Lazy Loader
  $('.lazy').attr('src', function(){
  return this.getAttribute('data-src');
}).fadeIn('fast');
$('.lazy').removeAttr('data-src');


  // Shadow on sticky nav
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var nav = $('.main-nav').height();
    if (scroll >= nav) {
      $('.main-nav').addClass('is-scrolled');
    } else {
      $('.main-nav').removeClass('is-scrolled');
    }
  });

  // Dropdown on subnav
  if (matchMedia) { // media query event handler
    var mq = window.matchMedia("(min-width: 960px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
  }

  function WidthChange(mq) { // media query change
    if (mq.matches) { // if width < 768px
      $('.has-subnav').mouseenter(function(){
        $(this).children('.subnav').fadeIn(300);
      });
      $('.has-subnav').mouseleave(function(){
        $(this).children('.subnav').fadeOut(300);
      });
    } else {
      $('.has-subnav').click(function(){
        $(this).children('.subnav').slideToggle();
      });
    }
  }

  $('.js-nav-trigger').click(function(){
  $(this).toggleClass('is-clicked');
  $('.nav-items').toggleClass('is-visible');
});

  $('#occupations > span:gt(0)').hide();

setInterval(function() {
  $('#occupations > span:first')
    .fadeOut(1000)
    .next()
    .delay(1000)
    .fadeIn(1000)
    .end()
    .appendTo('#occupations');
},  3500);

  $('.directions-nav-item').click(function(){
  var id = $(this).attr('id');
  $('.directions-nav-item').removeClass('is-selected');
  $(this).addClass('is-selected');
  $('.directions-nav-content').removeClass('is-visible').hide();
  $('.directions-nav-content#' + id).addClass('is-visible').show();
});

  (function($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

  $.fn.visible = function(partial) {

      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;

    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };

})(jQuery);

  $(window).scroll(function(event) {

  $('.gallery-img').each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass('is-in-viewport');
    }
  });

});

  // Lightbox Gallery ----------

$('.gallery-img').click(function() { //when user clicks on image
  $('.gallery-img').addClass('is-visible');
  $(this).children('.js-lightbox').fadeIn("slow", function() {

    // Lazy Load!
    var attr = $(this).find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe').attr('data-src');
    // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
    if (typeof attr !== typeof undefined && attr !== false) { // Element has this attribute
      $(this).find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe').attr('src', function(){
        return this.getAttribute('data-src');
        $(this).removeAttr('data-src');
      }).fadeIn(300);
      $(this).find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe').removeAttr('data-src');
    }

    $('.js-lightbox-prev').on('click', prevImage); // Previous Image
    $('.js-lightbox-next').on('click', nextImage); // Next Image
  });
});

// Previous lightbox ----------

var prevImage = function() {
  var $previous = $(this).parent('.js-lightbox').parent('.gallery-img').prev();
  $(this).closest('.gallery-img').children('.js-lightbox').hide();
  $previous.children('.js-lightbox').show(0, function() { // fade in next lightbox

    var attr = $(this).find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe').attr('data-src');
    if (typeof attr !== typeof undefined && attr !== false) {
      $(this).find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe').attr('src', function(){
        return this.getAttribute('data-src');
        $(this).removeAttr('data-src');
      }).fadeIn(300);
      $(this).find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe').removeAttr('data-src');
    }

  });
  return false;
}

// Next lightbox ----------

var nextImage = function() {
  var $next = $(this).parent('.js-lightbox').parent('.gallery-img').next();
  $(this).closest('.gallery-img').children('.js-lightbox').hide();
  $next.children('.js-lightbox').show(0, function() {

    var attr = $(this).find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe').attr('data-src');
    if (typeof attr !== typeof undefined && attr !== false) {
      $(this).find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe').attr('src', function(){
        return this.getAttribute('data-src');
        $(this).removeAttr('data-src');
      }).fadeIn(300);
      $(this).find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe').removeAttr('data-src');
    }

  });
  return false;
}

// Image meta button  ----------

$('.js-lightbox-info-trigger').click(function() {
  var trigger = $('.js-lightbox-info-trigger input');
  trigger.toggleClass('hide-it-baby');
  if (trigger.hasClass('hide-it-baby')) {
    trigger.val('Hide Info');
  } else {
    trigger.val('Show Info');
  }
  $('.js-lightbox-info-trigger').next().slideToggle();
  $('.js-lightbox-info-trigger').parent('.js-lightbox').toggleClass('is-showing-info');
});

// Close Lightbox Button  ----------

$('.js-lightbox-close').click(function(e) { // when user clicks X button
  e.stopPropagation();
  $(this).parent('.js-lightbox').fadeOut("slow", function() {
    $(this).css('display', 'none');
  });
  $('.gallery-img').removeClass('is-visible');
  return false;
});

  var $contactForm = $('.contact-form');
$contactForm.validate({
  submitHandler: function(form) {
    $.ajax({
      url: '//formspree.io/jesse@jesserogers.co',
      method: 'POST',
      data: $('.contact-form').serialize(),
      dataType: "json",
      success: function(data) {
        $('.submit-error').fadeOut(300);
        $('.submit-success').fadeIn(300);
      }
    });
  }
});

$('.submit-close').click(function() {
  $('.submit-success').fadeOut(300);
});


});
