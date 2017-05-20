jQuery(document).ready(function($) { //safety pants!

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

  // Lightbox gallery

  $('.project-img').click(function() { //when user clicks on image
    $(this).addClass("is-visible").children('.js-lightbox').fadeIn("slow", function() {
      // fade in lightbox
    });
  });
  // Previous lightbox
  $('.js-lightbox-prev').click(function() { // when user clicks 'previous' button
    $(this).closest('.project-img').children('.js-lightbox').fadeOut("slow", function() {
      // fade lightbox out
    });
    $(this).parent('.js-lightbox').parent('.project-img').removeClass("is-visible").prev().children('.js-lightbox').fadeIn("slow", function () { // fade in next lightbox
      $(this).closest('.project-img').addClass("is-visible"); // add modifying class to previous lightbox's parent element
    });
    return false; // pls don't fuck up my shit browser!
  });

  // Next lightbox
  $('.js-lightbox-next').click(function() {
    $(this).closest('.project-img').children('.js-lightbox').fadeOut("slow", function() {
      // fade this one out
    });
    $(this).parent('.js-lightbox').parent('.project-img').removeClass("is-visible").next().children('.js-lightbox').fadeIn("slow", function () {
      $(this).closest('.project-img').addClass("is-visible");
    });
    return false;
  });
  // Image meta button
  $('.js-lightbox-info-trigger').click(function() {
    var trigger = $(this).children('input');
    trigger.toggleClass('hide-it-baby');
    if (trigger.hasClass('hide-it-baby')) {
      trigger.val('Hide Info');
    } else {
      trigger.val('Show Info');
    }
    $(this).next().slideToggle();
    $(this).parent('.js-lightbox').toggleClass('is-showing-info');
  });
  // Close Lightbox Button
  $('.js-lightbox-close').click(function(e) { // when user clicks X button
    e.stopPropagation();
    $(this).parent('.js-lightbox').fadeOut("slow", function() {
      $(this).css("display", "none");
    });
    $(this).parent('.js-lightbox').parent('.project-img').removeClass("is-visible");
    return false;
  });
});
