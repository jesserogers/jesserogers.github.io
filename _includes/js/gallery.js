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
      $(this).css('display', 'none'); // set CSS back to original value so it's not blank
    });
    $('.gallery-img')
      .removeClass('is-visible is-current'); // remove mod classes from all images
    $('html,body').removeAttr('style'); // remove style attr to enable scrolling again
    return false;
  }

  $galleryImg.click(function() { // user clicks on image

    $('html, body').css({'overflow':'hidden', 'position':'relative'}); // disable scrolling when lightbox is visible

    $galleryImg.addClass('is-visible'); // add mod class to all images
    $(this).addClass('is-current') // add mod class to clicked image
      .children('.js-lightbox')
      .fadeIn("slow", loadImage); // fade in lightbox and lazy load image

    $(document).keydown(function(e) { // user hits keys after clicking an image
      switch(e.which) {
          case 37: prevImg(); // LEFT: trigger previous image
          break;

          case 39: nextImg(); // RIGHT: trigger next image
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
  	swipeRight:function() { // user swipes right <3
  		prevImg(); // run previous image function
  	},
  	swipeLeft:function() { // user swipes left </3
  		nextImg(); // run next image function
  	},
    swipeDown:function() { // user swipes down
      closeLightbox(); // close lightbox
    },
  	threshold:68 // min swipe length of 68px
  });

  $('.js-lightbox-info').swipe({ // user swipes on info
    swipeUp:function() { // user swipes up
      toggleInfo(); // slide info up
    },
    threshold:68 // min swipe length of 68px
  });

})();
