// Lightbox Gallery

(function(){ // safety pants

  var $galleryImg = $('.gallery-img');

  // Lazy load

  var loadImage = function() {

    var lightboxContent = '.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe',
        attr = $(this).find(lightboxContent).attr('data-src');

    // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
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
        .removeClass('is-current prev next') // remove mod class
        .find('.js-lightbox')
          .hide() // hide current lightbox

      $('.gallery-img:last-child') // select last image in gallery
        .addClass('is-current prev') // add mod class
        .find('.js-lightbox')
          .show(0, loadImage); // show lightbox and lazy load if necessary

    } else {

      $currentImg // select current
        .removeClass('is-current prev next') // remove mod class
        .find('.js-lightbox')
          .hide() // hide current lightbox
        .parent()
        .prev() // find previous image
          .addClass('is-current prev') // add mod class
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
        .removeClass('is-current prev next') // remove mod class
        .children('.js-lightbox')
          .hide() // hide current lightbox

      $('.gallery-img:first-child') // select first image in gallery
        .addClass('is-current next') // add mod class
        .find('.js-lightbox')
          .show(0, loadImage); // show lightbox and lazy load if necessary

    } else {

      $currentImg // select current
        .removeClass('is-current prev next') // remove mod class
        .children('.js-lightbox')
          .hide() // hide current lightbox
        .parent()
        .next() // select next image
          .addClass('is-current next') // add mod class
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
      .removeClass('is-visible is-current prev next'); // remove mod classes from all images
    $('html,body') // remove style attr to enable scrolling again
      .removeAttr('style')
      .off('touchmove');
    return false;

  }

  $galleryImg.click(function() { // user clicks on image

    $('html, body') // disable scrolling when lightbox is visible
      .css({'overflow':'hidden'})
      .on('touchmove', function(e){
        e.preventDefault();
      });

    $galleryImg.addClass('is-visible'); // add mod class to all images

    $(this).addClass('is-current') // add mod class to clicked image
      .children('.js-lightbox')
      .fadeIn('slow', loadImage)
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

    var $trigger = $('.js-lightbox-info-trigger input');

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

  if ( isTouch() == true ) { // if device is touchscreen

    $('.js-lightbox').swipe({ // user swipes on slide

      swipeStatus: function(event, phase, direction, distance) { // detect swipe status

        if (direction=="left") { // if user swipes left </3

          if (phase=="move") { // while swipe in motion

            $(this).find('.js-lightbox-img-wrap').css({

              'opacity': 1 - ((distance/2)/100), // fade with swipe
              'left': '-' + distance/2 + '%' // move with swipe

            });

          }

          if (phase=="end") { // user completes swipe

            nextImg(); // next image
            $(this).find('.js-lightbox-img-wrap').removeAttr('style'); // clear styles added during move

          }

          if (phase=="cancel") { // user fails or cancels swipe

            $(this).find('.js-lightbox-img-wrap').removeAttr('style'); // clear styles added during move

          }

        }

        if (direction=="right") { // user swipes right </3

          if(phase=="move") { // swipe in motion

            $(this).find('.js-lightbox-img-wrap').css({

              'opacity': 1 - ((distance/2)/100), // fade with swipe
              'left': distance/2 + '%' // move with swipe

            });

          }

          if (phase=="end") { // user completes swipe

            prevImg(); // previous image
            $(this).find('.js-lightbox-img-wrap').removeAttr('style'); // clear styles added during swipe

          }

          if (phase=="cancel") { // user fails or cancels swipe

            $(this).find('.js-lightbox-img-wrap').removeAttr('style'); // clear styles added during swipe

          }

        }

        if (direction=='down') { // user swipes down

          if (phase=='move') { // while swipe is in motion
            $(this)
              .css({
                'opacity': 1 - ((distance/2)/100), // fade as user swipes
                'top': distance/2 + '%' // slide downward with swipe
              });
          }

          if (phase=='end') { // if user completes swipe requirements
            closeLightbox(); // close lightbox
          }

          if (phase=='cancel') { // if loser I mean user fails swipe
            $(this).removeAttr('style') // reset style attribute
            .css({
              'display':'flex' // set css display back to default
            });
          }

        }
      },
      triggerOnTouchEnd: false,
      triggerOnTouchLeave: false,
      fingers: 1,
      threshold: 200,
      cancelThreshold: 42
    });

    $('.js-lightbox-info').swipe({ // user swipes on info

      swipeUp:function() { // user swipes up
        toggleInfo(); // slide info up
      },
      threshold:68 // min swipe length of 68px
    });

  }

})();
