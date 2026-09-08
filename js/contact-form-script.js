  (function($) {
    $("#contact_form").validate({
      rules: {
        Name: { required: true, minlength: 2 },
        Email: { required: true, email: true },
        Subject: { required: true, minlength: 3 },
        Message: { required: true, minlength: 10 }
      },
      messages: {
        Name: "Please enter your name",
        Email: "Please enter a valid email address",
        Subject: "Please enter a subject",
        Message: "Please enter your message (at least 10 characters)"
      },
      submitHandler: function(form) {
        var form_btn = $(form).find('button[type="submit"]');
        var form_result_div = '#form-status';

        var replytoEmail = $(form).find('input[name="Email"]').val();
        $(form).find('input[name="_replyto"]').val(replytoEmail);

        $(form_result_div).removeClass('alert alert-success alert-danger').html('').hide();
        var form_btn_old_msg = form_btn.html();
        form_btn.prop('disabled', true).html(form_btn.data("loading-text"));

        $.ajax({
          url: $(form).attr('action'),
          method: 'POST',
          data: $(form).serialize(),
          dataType: 'json',
          success: function(data) {
            form_btn.prop('disabled', false).html(form_btn_old_msg);
            if (data.success) {
              $(form_result_div).addClass('alert alert-success').html('Thank you! Your message has been sent successfully. We will get back to you soon.').fadeIn('slow');
              $(form).find('.form-control').val('');
              $(form).find('input[name="_replyto"]').val('');
            } else {
              $(form_result_div).addClass('alert alert-danger').html('Oops! Something went wrong. Please try again later.').fadeIn('slow');
            }
            setTimeout(function(){ $(form_result_div).fadeOut('slow') }, 8000);
          },
          error: function(xhr, status, error) {
            form_btn.prop('disabled', false).html(form_btn_old_msg);
            $(form_result_div).addClass('alert alert-danger').html('Oops! Something went wrong. Please try again later.').fadeIn('slow');
            setTimeout(function(){ $(form_result_div).fadeOut('slow') }, 8000);
          }
        });

        return false;
      }
    });
  })(jQuery);