(function() { // journal pants

  $('.post-nav-link').each(function(){

    if ( $(this).text().length < 5 ) {

      $(this).css({
        'visibility': 'hidden'
      });
      
    }

  });

})();
