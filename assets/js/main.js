---
---
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

  // Subnav

  $('.has-subnav').hover(function(){
    $(this).children('.subnav').fadeToggle(300);
  });

  // Lightbox gallery
  {% include js/gallery.js %}

  {% include js/contact.js %}
});
