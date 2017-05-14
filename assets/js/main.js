jQuery(function($) { //safety pants!

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
    $(this).toggleClass("is-visible").children('.js-lightbox').fadeIn("slow", function() { // fade in lightbox
      $('.js-lightbox').click(function(e) { // when user clicks open lightbox
        e.stopPropagation(); // stop lightbox from coming back up
        $(this).parent('.project-img').removeClass("is-visible"); // remove state-based mod class
        $(this).fadeOut("slow", function() { // fade out lightbox
          $(this).css("display", "none"); // make sure the lightbox stays hidden
        });
      });
      $('.js-lightbox-close').click(function(e) { // when user clicks X button
        e.stopPropagation();
        $(this).parent('.js-lightbox').parent('.project-img').removeClass("is-visible");
        $(this).parent('.js-lightbox').fadeOut("slow", function() {
          $(this).css("display", "none");
        });
      })
    });
  });

});
