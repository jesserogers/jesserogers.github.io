// Lightbox Gallery ----------
(function(){ // safety pants

  var $galleryImg = $('.gallery-img');

  // Lazy load
  var loadImage = function() {

    var attr = $(this).find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe').attr('data-src');
    // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
    if (typeof attr !== typeof undefined && attr !== false) {
      $(this)
        .find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe') // find images or videos in lightbox
        .attr('src', function(){ // target src attribute
          return this.getAttribute('data-src'); // get value of 'data-src' and put it into a 'src' attr
        }).fadeIn(300); // fade in image/video
      $(this)
      .find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe')
      .removeAttr('data-src');
    }
  }

  function prevImg() {
    if ( $('.gallery-img.is-current').is(':first-child') ) {
      $('.gallery-img.is-current')
        .removeClass('is-current')
        .find('.js-lightbox')
          .hide()
      $('.gallery-img:last-child')
        .addClass('is-current')
        .find('.js-lightbox')
          .show();
    } else {
      $('.gallery-img.is-current')
        .removeClass('is-current')
        .children('.js-lightbox')
          .hide()
        .parent()
        .prev()
          .addClass('is-current')
          .children('.js-lightbox')
            .show(0, loadImage);
    }
    return false;
  }

  function nextImg() {
    if ( $('.gallery-img.is-current').is(':last-child') ) {
      $('.gallery-img.is-current')
        .removeClass('is-current')
        .children('.js-lightbox')
          .hide()
      $('.gallery-img:first-child')
        .addClass('is-current')
        .find('.js-lightbox')
          .show();
    } else {
      $('.gallery-img.is-current')
        .removeClass('is-current')
        .children('.js-lightbox')
          .hide()
        .parent()
        .next()
          .addClass('is-current')
          .find('.js-lightbox')
            .show(0, loadImage);
    }
    return false;
  }

  $galleryImg.click(function() { // user clicks on image
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

  // Previous Image ----------
  $('.js-lightbox-prev').click(prevImg);

  // Next Image ----------
  $('.js-lightbox-next').click(nextImg);


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

})();
