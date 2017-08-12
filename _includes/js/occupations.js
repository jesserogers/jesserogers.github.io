$('#occupations > span:gt(0)').hide();

setInterval(function() {
  $('#occupations > span:first')
    .fadeOut(1000)
    .next()
    .delay(1000)
    .fadeIn(1000)
    .end()
    .appendTo('#occupations');
},  3500);
