$(function() {


  let reviewsFlickityOptions = $('.ReviewList').data('flickity-options');

  let howItWorksFlickityOptions = $('.how-it-works-carousel').data('flickity-options');

  let kangDiffFlickityOptions = $('.kangaroo-difference-carousel').data('flickity-options');

  let homepageProductCarouselOptions = $('.homepage-product-mobile-carousel').data('flickity-options');

  if ($(window).width() < 768) {

    reviewsFlickityOptions["groupCells"] = false;

    let $howItWorksCarousel = new Flickity('.how-it-works-carousel', howItWorksFlickityOptions);

    let $kangDiffCarousel = new Flickity('.kangaroo-difference-carousel', kangDiffFlickityOptions);

    let $homepageProductCarousel = new Flickity('.homepage-product-mobile-carousel', homepageProductCarouselOptions);

  }

  $('.Review__Carousel').flickity(reviewsFlickityOptions);

  $(window).on('resize', function() {
    if ($(window).width() < 768) {
      let $carousel = new Flickity('.Review__Carousel');
      $carousel.option({ groupCells: false });
      $carousel.reloadCells();

      let $howItWorksCarousel = new Flickity('.how-it-works-carousel', howItWorksFlickityOptions);

      let $kangDiffCarousel = new Flickity('.kangaroo-difference-carousel', kangDiffFlickityOptions);

      let $homepageProductCarousel = new Flickity('.homepage-product-mobile-carousel', homepageProductCarouselOptions);

    } else {
      let $carousel = new Flickity('.Review__Carousel');
      $carousel.option({ groupCells: 2 });
      $carousel.reloadCells();

      let $howItWorksCarousel = $('.how-it-works-carousel').flickity();
      let $kangDiffCarousel = $('.kangaroo-difference-carousel').flickity();
      let $homepageProductCarousel = $('.homepage-product-mobile-carousel').flickity();

      $howItWorksCarousel.flickity('destroy');
      $kangDiffCarousel.flickity('destroy');
      $homepageProductCarousel.flickity('destroy');
    }
  });


  $('.arrow').click(function() {

    let current_tab = $(this).parents('.container').find('.tab-link.current').attr('data-tab');

    let current_tab_number = parseInt(current_tab.split('-')[1], 10);

    let next_tab_number = 0;

    if ($(this).hasClass('left-arrow')) {
      next_tab_number = current_tab_number - 1;
      if (current_tab_number == 1) {
        next_tab_number = 4;
      }
    } else if ($(this).hasClass('right-arrow')) {
      next_tab_number = current_tab_number + 1;
      if (current_tab_number == 4) {
        next_tab_number = 1;
      }
    }





    // $('ul.tabs li').removeClass('current');
    $(this).parents('.container').find('.tab-link').removeClass('current');

    // $('.tab-content').removeClass('current');
    $(this).parents('.container').find('.tab-content').removeClass('current');

    $(this).parents('.container').find('.tab-link').each(function() {
      if ($(this).attr('data-tab') == "tab-" + next_tab_number) {
        $(this).addClass('current');
      }
    });
    // $("#"+tab_id).addClass('current');
    $(this).parents('.container').find("#tab-"+next_tab_number).addClass('current');
  });


  $('.learn_more_button').click(function(e) {
    $(this).parent().siblings('.features_content_container').slideDown();
    $(this).hide();
  });
});
