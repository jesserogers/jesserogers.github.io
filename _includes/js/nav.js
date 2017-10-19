(function(){
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

  // Dropdown on subnav
  if (matchMedia) { // media query event handler
    var mq = window.matchMedia("(min-width: 960px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
  }

  function WidthChange(mq) { // media query change
    if (mq.matches) { // if width < 768px
      $('.has-subnav').mouseenter(function(){
        $(this).children('.subnav').fadeIn(300);
      });
      $('.has-subnav').mouseleave(function(){
        $(this).children('.subnav').fadeOut(300);
      });
    } else {
      $('.has-subnav').click(function(){
        $(this).children('.subnav').slideToggle();
      });
    }
  }

  $('.js-nav-trigger').click(function(){
    $(this).toggleClass('is-clicked');
    $('.nav-items').toggleClass('is-visible');
  });
  
})();
