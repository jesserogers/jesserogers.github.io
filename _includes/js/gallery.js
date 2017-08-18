// Lightbox Gallery ----------

var $galleryImg = $('.gallery-img'),
    $firstImg   = $('.gallery-img:first-child'),
    $lastImg    = $('.gallery-img:last-child'),
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
});

// Previous Image ----------
$('.js-lightbox-prev').on('click', prevImage);

// Next Image ----------
$('.js-lightbox-next').on('click', nextImage);

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
