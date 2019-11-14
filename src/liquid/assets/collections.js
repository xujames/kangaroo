$(function() {
  let isTouchDevice = false;
  document.addEventListener('touchstart', function(e) {
    isTouchDevice = true;

    $('.collection-product-card-container').addClass('collection-product-card-container-mobile');

    $('.close-button-container').css('display', 'block');
  });

  $('.collection-card-opener').hover(function() {
    if (!isTouchDevice) {
      $(this).parents('.Grid__Cell').find('.collection-product-card-container').addClass('collection-card-open');
    }

  }, function() {
    if (!isTouchDevice) {
      $(this).parents('.Grid__Cell').find('.collection-product-card-container').removeClass('collection-card-open');
    }
  });

  $('.collection-card-opener').click(function() {

    if (!$(this).parents('.Grid__Cell').find('.collection-product-card-container').hasClass('collection-card-open-mobile')) {

      if (isTouchDevice) {
        $(this).parents('.Grid__Cell').find('.collection-product-card-container').addClass('collection-card-open-mobile');
        $(this).parents('.Grid__Cell').find('.collection-product-card-overlay').addClass('overlay-active');
      }

    } else {

      if (isTouchDevice) {
        $(this).parents('.Grid__Cell').find('.collection-product-card-container').removeClass('collection-card-open-mobile');
        $(this).parents('.Grid__Cell').find('.collection-product-card-overlay').removeClass('overlay-active');
      }
    }

  });

  $('.close-button-svg-container').click(function(e) {
    // $(this).parent().parent().removeClass('collection-card-open-mobile');
    // $(this).parent().parent().siblings('.collection-product-card-overlay').removeClass('overlay-active');
  });

  $('.ProductItem__ImageWrapper').click(function(e) {

    let element = $(this).find('.collection-product-card-container')[0];
    console.log(element);

    // if (e.target == element || element.contains(e.target)) {
    //   if (element.style.opacity > 0) {
    //     e.preventDefault();
    //   }
    // }

    if ($(this).find('.collection-product-card-container').hasClass('collection-card-open-mobile')) {
      e.preventDefault();
    }

    let closeButton = $(this).find('.close-button-svg-container')[0];
    let closeButtonSVG = $(this).find('.close-button-svg-container').find('svg')[0];

    if (e.target == closeButton || e.target == closeButtonSVG) {
      $(this).find('.collection-product-card-container').removeClass('collection-card-open-mobile');
      $(this).find('.collection-product-card-container').siblings('.collection-product-card-overlay').removeClass('overlay-active');
    }






  })
});
