// Lightbox Gallery ----------

$('.gallery-img').click(function() { //when user clicks on image
  $(this).addClass('is-visible').children('.js-lightbox').fadeIn("slow", function() {

    // Lazy load!
    $(this).find('.js-lightbox-img-wrap img').attr('src', function(){ // find image inside lightbox and create a src attribute
      return this.getAttribute('data-src'); // Set src attribute to the same as data-src
    }).fadeIn(300); // fade in image so user doesn't see alt text or whatever

    $('.js-lightbox-prev').on('click', prevImage); // Previous Image
    $('.js-lightbox-next').on('click', nextImage); // Next Image
  });
});

// Previous lightbox ----------

var prevImage = function() {
  $(this).closest('.gallery-img').children('.js-lightbox').fadeOut("slow", function() {
    // fade lightbox out
  });
  $(this).parent('.js-lightbox').parent('.gallery-img').removeClass('is-visible').prev().children('.js-lightbox').fadeIn("slow", function () { // fade in next lightbox
    $(this).closest('.gallery-img').addClass('is-visible'); // add modifying class to previous lightbox's parent element

    // Lazy load!
    $(this).find('.js-lightbox-img-wrap img').attr('src', function(){
      return this.getAttribute('data-src');
    }).fadeIn(300);

  });
  return false;
}

// Next lightbox ----------

var nextImage = function() {
  $(this).closest('.gallery-img').children('.js-lightbox').fadeOut("slow", function() {
    // fade this one out
  });
  $(this).parent('.js-lightbox').parent('.gallery-img').removeClass('is-visible').next().children('.js-lightbox').fadeIn("slow", function () {
    $(this).closest('.gallery-img').addClass('is-visible');

    // Lazy Load!
    $(this).find('.js-lightbox-img-wrap img').attr('src', function(){
      return this.getAttribute('data-src');
    }).fadeIn(300);

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
    $(this).css("display", "none");
  });
  $(this).parent('.js-lightbox').parent('.gallery-img').removeClass('is-visible');
  return false;
});
