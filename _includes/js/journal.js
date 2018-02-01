(function() { // journal pants

  $('.post-nav-link').each(function(){ // find each nav link

    if ( $(this).text().length < 5 ) { // if inner string is too short

      $(this).css({ // hide it
        'visibility': 'hidden'
      });

    }

  });

  $('.expandable-section-trigger').click(function(e) {

    e.preventDefault();
    var expandable = $(this).parent();
    expandable.toggleClass('is-expanded');

    $(this).text(function(i, text){
      return text === "Expand" ? "Collapse" : "Expand";
    });

  });

})();
