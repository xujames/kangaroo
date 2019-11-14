(function() {
    var links = document.links;
      for (var i = 0, linksLength = links.length ; i < linksLength ; i++) {
        if (links[i].hostname !== window.location.hostname) {
          links[i].target = '_blank';
        }
      }
  }());

$(document).ready(function() {
  // ==========================================
  //  Start: For custom tabs on yellow portion

//   $('.advanced-product-list .middle-part').addClass('fixed_mobile');
  $('.download-app .right-side .image-wrap').eq(0).addClass('active');
  $('.download-app .left-side ul li').eq(0).addClass('active');
  $('.download-app .left-side ul li').on('click',function(){
    $(this).addClass('active').siblings().removeClass('active');
    var next_active = $(this).attr('data-id');
    $('.download-app .right-side .image-wrap[data-image="'+next_active+'"]').addClass('active').siblings().removeClass('active');
  });


  //  End: For custom tabs on yellow portion
  // ==========================================
  //   start: for sticky mobile
//   $(window).scroll(function() {
//     if ($(window).height() >= ( $('.download-app-cover').offset().top - $(window).scrollTop()  )) {
//       //       console.log('download-app-cover reached!');
//       $('.advanced-product-list .middle-part').removeClass('fixed_mobile');
//     }
//     else{
//       //       console.log()
//       if($('.advanced-product-list .middle-part.fixed_mobile').length == 0){
//         $('.advanced-product-list .middle-part').addClass('fixed_mobile');
//       }
//     }
//   });

  $(window).scroll(function() {
  	var breakpoint = $('.download-app-cover').offset().top - $(window).scrollTop();
    // console.log(breakpoint);
    if(breakpoint > 1509){
    	// $('.middle-part img').attr('src','https://cdn.shopify.com/s/files/1/0055/2170/2963/files/1_EntryDetected_Phone.png?37913');
      $('.middle-part img').attr('src','https://cdn.shopify.com/s/files/1/0055/2170/2963/files/1_Motion_Entry_Alert.png?41549');
    }
    else if(breakpoint < 1508 && breakpoint > 1009){
      // $('.middle-part img').attr('src','https://cdn.shopify.com/s/files/1/0055/2170/2963/files/2_MotionDetected_Phone.png?37913');
      $('.middle-part img').attr('src','https://cdn.shopify.com/s/files/1/0055/2170/2963/files/2_Motion_Alert.png?41549');
    }
    else if(breakpoint < 1008){
      // $('.middle-part img').attr('src','https://cdn.shopify.com/s/files/1/0055/2170/2963/files/3_LeakDetected_Phone.png?37913');
      $('.middle-part img').attr('src','https://cdn.shopify.com/s/files/1/0055/2170/2963/files/3_Water_Climate_Alert.png?41549');
    }
  });

  var summaries = $('.advanced-product-list .middle-part');
  summaries.each(function(i) {
    var summary = $(summaries[i]);
    var next = summaries[i + 1];

    summary.scrollToFixed({
      marginTop: $('.home-logo-section').outerHeight(true) + 10,
      limit: function() {
        var limit = 0;
        if (next) {
          limit = $(next).offset().top - $(this).outerHeight(true) - 10;
        } else {
          limit = $('.shopify-section.download-app').offset().top - $(this).outerHeight(true) + 80;
        }
        return limit;
      },
      zIndex: 999
    });

  });


  //   end: for sticky mobile
  // ==========================================
  // Start: slider for yelloqw portion


  $('.for-slider').slick({
  slidesToShow: 1,
  arrows: false,
  asNavFor: '.slider-nav',
  fade: true,
  autoplay: false,
  verticalSwiping: true,
  centerMode: false,
});

$('.slider-nav').slick({
  slidesToShow: 6,
  asNavFor: '.slider-main',
  vertical: true,
  focusOnSelect: true,
  autoplay: false,
  centerMode: true
});

  // end: slider for yelloqw portion
  // ==========================================
  //   Start: Catch Landing page custom tab code

  $('.slider').slick({
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 2000,
    arrows: false
  });

  $('ul.tabs li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#"+tab_id).addClass('current');

    $('.slider').slick('unslick');

    $('.slider').slick({
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: false,
      autoplaySpeed: 2000,
      arrows: false
    });

  });
  //   end: Catch Landing page custom tab code

});
// async function autoTab(){
//   await setTimeout(function(){
//   	$(".download-app-cover .app-details-cover .left-side ul li").eq(0).trigger('click');
//   }, 3000);
//    await setTimeout(function(){
//   	$(".download-app-cover .app-details-cover .left-side ul li").eq(1).trigger('click');
//   }, 6000);
//    await setTimeout(function(){
//   	$(".download-app-cover .app-details-cover .left-side ul li").eq(2).trigger('click');
//   }, 9000);
//    await setTimeout(function(){
//   	$(".download-app-cover .app-details-cover .left-side ul li").eq(3).trigger('click');
//   }, 12000);
//    await setTimeout(function(){
//   	$(".download-app-cover .app-details-cover .left-side ul li").eq(4).trigger('click');
//   }, 15000);
//    await setTimeout(function(){
//   	$(".download-app-cover .app-details-cover .left-side ul li").eq(5).trigger('click');
//   }, 18000);
// }
