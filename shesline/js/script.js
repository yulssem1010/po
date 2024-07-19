$(function () {
  /* 메인 비주얼 */
  let swiper1 = new Swiper(".main_banner", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".main_banner .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".main_banner .next",
      prevEl: ".main_banner .prev",
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    }
  });

  /* 랭귀지 체인지 */
  $('header ul.l_box li').first().click(function () { /* first 메서드, eq(0)과 같음 */
    $(this).siblings().slideToggle().css('display', 'flex');
    $(this).find('i').toggleClass('fa-caret-down').toggleClass('fa-caret-up')
  });

  /* 햄버거 메뉴 */
  $('header .ham_all ul.on').click(function () {
    $(this).removeClass('on').siblings('ul').addClass('on');
    $('.all_menu').fadeToggle();
  });

  // video (두가지 방법)
  $('main .video button').click(function () {
    $('.vid_modal').fadeIn();
  });
  $('.vid_modal i').click(function () {
    $('.vid_modal').fadeOut();
  });
  // $('main .video button').click(function () {
  //   $('.vid_modal').css({ 'display': 'block' })
  // });
  // $('.vid_modal i').click(function () {
  //   $('.vid_modal').css({ 'display': 'none' })
  // });

  // footer fam
  $('footer .family p').eq(0).click(function () { /* eq 0번으로 첫번째 p를 잡지 않으면 p.none을 클릭했을 때 밑으로 사라짐 (p.none은 클릭했을 때 다른 페이지로 넘어가야 함) */
    $('footer .family p.none').slideToggle();
    $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
  });

  // aside.top 화면 맨 처음으로 돌아가기
  $('aside.top ').click(function () {
    /* 어떤 브라우저에서는 body가 먹고 어떤 브라우저에선 html이 먹기 때문에 그냥 둘 다 불러줌 */
    $('body,html').animate({
      scrollTop: 0
    });
  });

  /* 스크롤 이벤트 시작 */
  let evTop = $('.event').offset().top - 500; /* 이벤트가 스크롤 될 위치를 evTop에 저장 */
  // console.log(evTop);
  let prTop = $('.products').offset().top - 500;
  let lineTop = $('.line_up').offset().top - 400;

  $(window).scroll(function () {
    let st = $(this).scrollTop(); /* 스크롤 탑 위치를 st에 저장 */
    // console.log(st) 잘 작동하는지 확인용;

    // 이벤트 컨텐츠 액션 시작
    if (st >= evTop) {
      $('main .event article').eq(0).addClass('on').siblings().addClass('on').css({ 'transition-delay': '0.3s' })
    } else {
      $('main .event article').removeClass('on');
    };
    // 이벤트 컨텐츠 액션 끝

    // 라인업 액션 시작
    for (let i = 0; i < $('main .line_up .container ul.move li ').length; i++) {
      if (st >= lineTop + (i * 50)) { /* lineTop에 50px씩 차이를 두고 나타나게 함 */
        $('main .line_up .container ul.move li').eq(i).addClass('on').css({
          'transition-delay': (0.5 * i) + 's',
        });
        $('main .line_up .container ul.move li').eq(i).find('.txt_box').css({
          'transition-delay': (0.5 * i) + 's',
        });
      } else {
        $('main .line_up .container ul.move li').removeClass('on');
      }
    };
    // 라인업 액션 끝

    // products 액션 시작
    if (st >= prTop) {
      for (let i = 0; i < $('.products').find('li').length; i++) {
        $('.products').find('li').eq(i).addClass('on').css({ 'animation-delay': (0.2 * i) + 's' })
      }
    } else {
      $('.products').find('li').removeClass('on');
    };
    // products 액션 끝
  });
  /* 스크롤 이벤트 끝 */
});