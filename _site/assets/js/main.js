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

var $galleryImg = $('.gallery-img'),
    $firstImg   = $('.gallery-img:first-child'),
    $lastImg    = $('.gallery-img:last-child'),
    $prevArrow  = $('.js-lightbox-prev'),
    $nextArrow  = $('.js-lightbox-next'),
    $firstArrow = $firstImg.children('.js-lightbox').children('.js-lightbox-prev'),
    $lastArrow  = $lastImg.children('.js-lightbox').children('.js-lightbox-next');

var loadImage = function() { // Lazy Load!

  var attr = $(this).find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe').attr('data-src');
  // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
  if (typeof attr !== typeof undefined && attr !== false) { // Element has 'data-src'
    $(this)
      .find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe') // find images or videos in lightbox
      .attr('src', function(){
        return this.getAttribute('data-src'); // get value of 'data-src' and put it into a 'src' attr
      }).fadeIn(300); // fade in image/video
    $(this)
    .find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe')
    .removeAttr('data-src');
  }
}

// Previous lightbox ----------

var prevImage = function() {

  var $previous = $(this).parent('.js-lightbox').parent('.gallery-img').prev();

  $(this).closest('.gallery-img') // Find parent
    .removeClass('is-current') // remove mod class
    .children('.js-lightbox') // Parent's lightbox
    .hide(); // Hide it
  $previous.addClass('is-current') // add mod class
    .children('.js-lightbox') // select lightbox
    .show(0, loadImage); // show lightbox and lazy load if necessary
    return false;
}

// Next lightbox ----------

var nextImage = function() {

  var $next = $(this).parent('.js-lightbox').parent('.gallery-img').next();

  $(this).closest('.gallery-img') // Find parent
    .removeClass('is-current') // remove mod class
    .children('.js-lightbox') // Select lightbox
    .hide(); // Hide current lightbox
  $next.addClass('is-current')
  .children('.js-lightbox') // lightbox of next gallery image
    .show(0, loadImage);
  return false;
}

$galleryImg.click(function() { // user clicks on image
  $galleryImg.addClass('is-visible'); // add mod class to all images
  $(this).addClass('is-current') // add mod class to clicked image
    .children('.js-lightbox')
    .fadeIn("slow", loadImage); // fade in lightbox and lazy load image
    $(document).keydown(function(e){
      if (e.which == 37) {
         $('.gallery-img.is-current').find('.js-lightbox-prev').click();
         return false;
      } else if (e.which == 39) {
        $('.gallery-img.is-current').find('.js-lightbox-next').click();
      }
  });
});

// Previous Image ----------
$prevArrow.click(prevImage);

// Next Image ----------
$nextArrow.click(nextImage);

// First Image ----------
$firstArrow.click(function(){ // user clicks previous on first image in gallery
  $(this).closest('.gallery-img')
    .removeClass('is-current') // remove mod class from first image
    .children('.js-lightbox')
    .hide();
  $lastImg.addClass('is-current') // add mod class to last image in gallery
    .children('.js-lightbox')
    .show(0, loadImage); // show and lazy load
});

// Last Image ----------
$lastArrow.click(function(){ // user clicks next on last image in gallery
  $(this).closest('.gallery-img')
    .removeClass('is-current') // remove mod class from last image
    .children('.js-lightbox')
    .hide();
  $firstImg.addClass('is-current') // add mod class to first image in gallery
    .children('.js-lightbox')
    .show(0, loadImage); // show and lazy load
});

// Image meta button  ----------

$('.js-lightbox-info-trigger').click(function() { // user clicks on info trigger

  var $trigger = $('.js-lightbox-info-trigger input'),
  $triggerWrap = $('.js-lightbox-info-trigger');

  $trigger.toggleClass('hide-it-baby'); // toggle mod class

  if ($trigger.hasClass('hide-it-baby')) { // when active
    $trigger.val('Hide Info'); // swap input text to 'Hide Info'
  } else {
    $trigger.val('Show Info'); // else say 'Show Info'
  }

  $triggerWrap.next() // next element in markup is info section
    .slideToggle(); // slide in

  $triggerWrap.parent('.js-lightbox')
    .toggleClass('is-showing-info'); // add mod class to parent lightbox

});

// Close Lightbox Button  ----------

$('.js-lightbox-close').click(function(e) { // when user clicks X button
  e.stopPropagation();
  $(this)
    .parent('.js-lightbox')
    .fadeOut('slow', function() { // fade out light box
      $(this)
        .css('display', 'none');
    });
  $galleryImg.removeClass('is-visible is-current'); // remove mod class for all gallery images
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
