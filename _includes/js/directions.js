$('.directions-nav-item').click(function(){
  var id = $(this).attr('id');
  $('.directions-nav-item').removeClass('is-selected');
  $(this).addClass('is-selected');
  $('.directions-nav-content').removeClass('is-visible').hide();
  $('.directions-nav-content#' + id).addClass('is-visible').show();
});
