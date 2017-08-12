$(window).scroll(function(event) {

  $('.gallery-img').each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass('is-in-viewport');
    }
  });

});
