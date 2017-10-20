jQuery(document).ready(function($) {
  // party time
  (function(){

  $('.lazy').attr('src', function(){
    return this.getAttribute('data-src');
  }).fadeIn('fast');
  $('.lazy').removeAttr('data-src');

})();

  (function(){
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
  
})();

  (function(){
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
})();

  (function(){

  $('.directions-nav-item').click(function(){
    var id = $(this).attr('id');
    $('.directions-nav-item').removeClass('is-selected');
    $(this).addClass('is-selected');
    $('.directions-nav-content').removeClass('is-visible').hide();
    $('.directions-nav-content#' + id).addClass('is-visible').show();
  });
  
})();

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

(function(){ // safety pants

  var $galleryImg = $('.gallery-img');

  // Lazy load

  var loadImage = function() {

    var lightboxContent = '.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe';
    var attr = $(this).find(lightboxContent).attr('data-src'); // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.

    if (typeof attr !== typeof undefined && attr !== false) {

      $(this)
        .find(lightboxContent) // find images or videos in lightbox
        .attr('src', function(){ // target src attribute
          return this.getAttribute('data-src'); // get value of 'data-src' and put it into a 'src' attr
        }).fadeIn(300); // fade in image/video

      console.log('Loaded ' + attr + ' into the DOM'); // log new loaded assets to the console

      $(this)
        .find(lightboxContent)
        .removeAttr('data-src'); // remove empty data-src attribute

    }
  }

  // Previous Image

  function prevImg() {

    var $currentImg = $('.gallery-img.is-current');

    if ( $currentImg.is(':first-child') ) { // if current image is first in gallery
      $currentImg // select current
        .removeClass('is-current') // remove mod class
        .find('.js-lightbox')
          .hide() // hide current lightbox
      $('.gallery-img:last-child') // select last image in gallery
        .addClass('is-current') // add mod class
        .find('.js-lightbox')
          .show(0, loadImage); // show lightbox and lazy load if necessary
    } else {
      $currentImg // select current
        .removeClass('is-current') // remove mod class
        .find('.js-lightbox')
          .hide() // hide current lightbox
        .parent()
        .prev() // find previous image
          .addClass('is-current') // add mod class
          .find('.js-lightbox')
            .show(0, loadImage); // show lightbox and lazy load if necessary
    }
    return false;
  }

  // Next Image

  function nextImg() {

    var $currentImg = $('.gallery-img.is-current');

    if ( $currentImg.is(':last-child') ) { // if current image is last in gallery
      $currentImg // select current
        .removeClass('is-current') // remove mod class
        .children('.js-lightbox')
          .hide() // hide current lightbox
      $('.gallery-img:first-child') // select first image in gallery
        .addClass('is-current') // add mod class
        .find('.js-lightbox')
          .show(0, loadImage); // show lightbox and lazy load if necessary
    } else {
      $currentImg // select current
        .removeClass('is-current') // remove mod class
        .children('.js-lightbox')
          .hide() // hide current lightbox
        .parent()
        .next() // select next image
          .addClass('is-current') // add mod class
          .find('.js-lightbox')
            .show(0, loadImage); // show lightbox and lazy load if necessary
    }
    return false;
  }

  // Toggle info

  function toggleInfo() {
    $('.js-lightbox-info') // select info section
      .slideToggle() // slide in or out
      .parent('.js-lightbox') // select parent element of all info sections (lightbox)
        .toggleClass('is-showing-info'); // add mod class to parent lightbox
  }

  // Close Lightbox

  function closeLightbox() {
    $('.js-lightbox').fadeOut('slow', function() { // fade out lightbox
      $(this)
        .removeAttr('style') // clear style attribute
        .css({ // set CSS back to original value so it's not blank
          'display': 'none'
        });
    });
    $('.gallery-img')
      .removeClass('is-visible is-current'); // remove mod classes from all images
    $('html,body') // remove style attr to enable scrolling again
      .removeAttr('style')
      .unbind('touchmove');
    return false;
  }

  $galleryImg.click(function() { // user clicks on image

    $('html, body') // disable scrolling when lightbox is visible
      .css({'overflow':'hidden'})
      .bind('touchmove', function(e){
        e.preventDefault();
      });

    $galleryImg.addClass('is-visible'); // add mod class to all images

    $(this).addClass('is-current') // add mod class to clicked image
      .children('.js-lightbox')
      .fadeIn("slow", loadImage)
      .css('display', 'flex'); // fade in lightbox and lazy load image

    $(document).keydown(function(e) { // user hits keys after clicking an image
      switch(e.which) {
          case 37: prevImg(); // LEFT: trigger previous image
          break;

          case 39: nextImg(); // RIGHT: trigger next image
          break;

          case 27: closeLightbox(); // ESC: close lightbox
          break;

          default: return; // exit this handler for other keys
      }
      e.preventDefault(); // make sure screen doesn't scroll or anything dumb
    });

  });

  // Previous Image

  $('.js-lightbox-prev').click(prevImg);

  // Next Image

  $('.js-lightbox-next').click(nextImg);


  // Image meta button

  $('.js-lightbox-info-trigger').click(function() { // user clicks on info trigger

    var $trigger = $('.js-lightbox-info-trigger input'),
    $triggerWrap = $('.js-lightbox-info-trigger');

    $trigger.toggleClass('hide-it-baby'); // toggle mod class

    if ($trigger.hasClass('hide-it-baby')) { // when active
      $trigger.val('Hide Info'); // swap input text to 'Hide Info'
    } else {
      $trigger.val('Show Info'); // else say 'Show Info'
    }

    toggleInfo(); // slide in lightbox info

  });

  // Close Lightbox Button

  $('.js-lightbox-close').click(closeLightbox);

  // Swipe Gestures

  $('.js-lightbox').swipe({ // user swipes on slide

    swipeLeft: function() { // user swipes left </3
      prevImg();
    },

    swipeRight: function() {
      nextImg();
    },

    swipeStatus:function(event, phase, direction, distance) {

      if (direction=="down") { // user swipes down

        if (phase=="move") { // while swipe is in motion
          $(this)
            .css({
              'opacity': 'calc(1 - 0.' + distance/2 + ')', // fade as user swipes
              'top': distance/2 + '%' // slide downward with swipe
            });
        }

        if (phase=="end") { // if user completes swipe requirements
          closeLightbox(); // close lightbox
        }

        if (phase=="cancel") { // if loser I mean user fails swipe
          $(this).removeAttr('style').css('display','flex');
        }

      }
    },
    triggerOnTouchEnd: false,
    triggerOnTouchLeave: false,
  	threshold: 200,
    cancelThreshold:26
  });

  $('.js-lightbox-info').swipe({ // user swipes on info
    swipeUp:function() { // user swipes up
      toggleInfo(); // slide info up
    },
    threshold:68 // min swipe length of 68px
  });

})();

});
