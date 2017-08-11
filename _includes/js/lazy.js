$('.lazy').attr('src', function(){
  return this.getAttribute('data-src');
}).fadeIn('fast');
$('.lazy').removeAttr('data-src');
