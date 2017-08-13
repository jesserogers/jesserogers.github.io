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
