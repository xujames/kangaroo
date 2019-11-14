$(function() {
  let isTouchDevice = false;
  document.addEventListener('touchstart', function(e) {
    isTouchDevice = true;

    $('.close-button-container').css('display', 'block');
  });

  $('.membership-info-toggle-button').click(function(e) {
    if ($(this).find('.learn-more-button').hasClass('active-button')) {

      $(this).siblings('.Banner_content').slideDown();
      $(this).find('.learn-more-button').removeClass('active-button');
      $(this).find('.learn-more-button').hide();
      $(this).find('.hide-learn-more-button').addClass('active-button');
      $(this).find('.hide-learn-more-button').show();

      $(this).siblings('.heading-section').find('.SectionHeader__SubHeading').show();

    } else if ($(this).find('.hide-learn-more-button').hasClass('active-button')) {
      $(this).siblings('.Banner_content').slideUp();
      $(this).find('.hide-learn-more-button').removeClass('active-button');
      $(this).find('.hide-learn-more-button').hide();
      $(this).find('.learn-more-button').addClass('active-button');
      $(this).find('.learn-more-button').show();

      $(this).siblings('.heading-section').find('.SectionHeader__SubHeading').hide();
    }


  });

  $('.pricing-card-opener').hover(function(e) {

    if (!isTouchDevice) {
      let feature_name = $(this).parent()[0].classList[1];

      let hoverPosition = $(e.target).offset();
      let containerPosition = $('.pricing-page-section-small-cards .container').offset();

      let positionX = hoverPosition.left - containerPosition.left;
      let positionY = hoverPosition.top - containerPosition.top;

      let target_card = $('.pricing-card-container.' + feature_name);
      target_card.css({ top: positionY + 20, left: positionX - 300 });
      target_card.show();
    }

  }, function() {

    if (!isTouchDevice) {
      let feature_name = $(this).parent()[0].classList[1];

      let target_card = $('.pricing-card-container.' + feature_name);
      target_card.hide();
    }

  });


  $('.pricing-card-opener').click(function() {
    if (isTouchDevice) {
      let feature_name = $(this).parent()[0].classList[1];

      let target_card = $('.pricing-card-container.' + feature_name);

      let containerWidth = $(this).parent('.pricing-page-section-small-cards .container').width();
      target_card.css({ position: "fixed", top: "30%", left: "15px", width: "auto", right: "15px" });
      target_card.show();
      $('.pricing-card-overlay').show();
    }
  });

  $('.close-button-svg-container').click(function(e) {
    $(this).parent().parent().hide();
    $(this).parent().parent().siblings('.pricing-card-overlay').hide();
  });

});
