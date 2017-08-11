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

  // Subnav

  $('.has-subnav').hover(function(){
    $(this).children('.subnav').fadeToggle(300);
  });

  // Lightbox gallery
  // Lightbox Gallery ----------

$('.gallery-img').click(function() { //when user clicks on image
  $(this).addClass('is-visible').children('.js-lightbox').fadeIn("slow", function() {

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
  $(this).closest('.gallery-img').children('.js-lightbox').fadeOut("slow", function() {
    // fade lightbox out
  });
  $(this).parent('.js-lightbox').parent('.gallery-img').removeClass('is-visible').prev().children('.js-lightbox').fadeIn("slow", function () { // fade in next lightbox
    $(this).closest('.gallery-img').addClass('is-visible'); // add modifying class to previous lightbox's parent element

    // Lazy Load!
    var attr = $(this).find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe').attr('data-src');
    if (typeof attr !== typeof undefined && attr !== false) { // Element has this attribute
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
  $(this).closest('.gallery-img').children('.js-lightbox').fadeOut("slow", function() {
    // fade this one out
  });
  $(this).parent('.js-lightbox').parent('.gallery-img').removeClass('is-visible').next().children('.js-lightbox').fadeIn("slow", function () {
    $(this).closest('.gallery-img').addClass('is-visible');

    // Lazy Load!
    var attr = $(this).find('.js-lightbox-img-wrap img, .js-lightbox-img-wrap iframe').attr('data-src');
    if (typeof attr !== typeof undefined && attr !== false) { // Element has this attribute
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
    $(this).css("display", "none");
  });
  $(this).parent('.js-lightbox').parent('.gallery-img').removeClass('is-visible');
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
