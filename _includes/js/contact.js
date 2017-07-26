var $contactForm = $('.contact-form');
$contactForm.validate({
  submitHandler: function(form) {
    $.ajax({
      url: '//formspree.io/jesse@jesserogers.co',
      method: 'POST',
      data: $('.contact-form').serialize(),
      dataType: "json",
      success: function(data) {
        $('.submit-error').fadeOut(300);
        $('.submit-success').fadeIn(300);
      }
    });
  }
});

$('.submit-close').click(function() {
  $('.submit-success').fadeOut(300);
});
