// Lightbox Gallery ----------

var $galleryImg = $('.gallery-img');

$galleryImg.click(function() { //when user clicks on image
  $galleryImg
    .addClass('is-visible');
  $(this).children('.js-lightbox')
    .fadeIn("slow", function() {

      // Lazy Load!
      var attr = $(this).find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe').attr('data-src');
      // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
      if (typeof attr !== typeof undefined && attr !== false) { // Element has this attribute
        $(this)
          .find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe')
          .attr('src', function(){
            return this.getAttribute('data-src');
            $(this).removeAttr('data-src');
          }).fadeIn(300);
        $(this)
        .find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe')
        .removeAttr('data-src');
      }

    $('.js-lightbox-prev').on('click', prevImage); // Previous Image
    $('.js-lightbox-next').on('click', nextImage); // Next Image
  });
});

// Previous lightbox ----------

var prevImage = function() {
  var $previous = $(this).parent('.js-lightbox').parent('.gallery-img').prev();

  $(this).closest('.gallery-img') // Find parent
    .children('.js-lightbox') // Parent's lightbox
    .hide(); // Hide it
  $previous.children('.js-lightbox') // select lightbox
    .show(0, function() { // show it

      var attr = $(this).find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe').attr('data-src');

      if (typeof attr !== typeof undefined && attr !== false) {
        $(this)
          .find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe')
          .attr('src', function(){
            return this.getAttribute('data-src');
            $(this).removeAttr('data-src');
          }).fadeIn(300);
        $(this)
        .find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe')
        .removeAttr('data-src');
      }

    });
    return false;
}

// Next lightbox ----------

var nextImage = function() {

  var $next = $(this).parent('.js-lightbox').parent('.gallery-img').next();

  $(this).closest('.gallery-img') // Find parent
    .children('.js-lightbox') // Select lightbox
    .hide(); // Hide current lightbox
  $next.children('.js-lightbox') // lightbox of next gallery image
    .show(0, function() { // Show next lightbox

      var attr = $(this)
                  .find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe')
                  .attr('data-src');

      if (typeof attr !== typeof undefined && attr !== false) {
        $(this)
          .find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe')
          .attr('src', function(){
            return this.getAttribute('data-src');
            $(this).removeAttr('data-src');
          })
          .fadeIn(300);
        $(this)
          .find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe')
          .removeAttr('data-src');
      }

  });
  return false;
}

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
  $galleryImg.removeClass('is-visible'); // remove mod class for all gallery images
  return false;
});
