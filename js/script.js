$(function () {

  // 처음 시작할 때 로딩 인트로
  setTimeout(function () {
    $('.intro').fadeOut();
  }, 3500);



  /* header의 deco 부분의 li들을 클릭했을 때 */
  $('header .h_bottom ul.deco >li').click(function () {
    $(this).addClass('on').siblings().removeClass('on');
    let decoTap = $(this).index();
    if (decoTap == 0) {
      $('section.about .notice .img').css('animation-play-state', 'paused');
    } else if (decoTap == 1) {
      $('section.about .notice .img').css('animation-play-state', 'running');
    } else if (decoTap == 2) {
      $('section.about .notice .txt p:first-child').css({
        color: '#FFBECE',
        transition: '0.3s',
      });
    } else if (decoTap == 3) {

    } else if (decoTap == 4) {

    } else if (decoTap == 5) {
      $('body,html').animate({
        scrollTop: 0
      });
    } else if (decoTap == 6) {
      $('.modal').fadeToggle();
      $('.modal button').click(function () {
        $('.modal').fadeOut();
      })
    }
  });
  let ht = $(window).height();
  let ww = $(window).width();
  let sectionTop = [];
  let sc;
  let sectionI = $('.wrap section').length; /* section의 갯수를 저장 */
  // 메인 메뉴 클릭시 해당 섹션으로 자동 스크롤
  $('header .h_top nav ul li').click(function () {
    let i = $(this).index();
    /*  ht = $(window).height(); */
    $('html,body').stop().animate({
      scrollTop: sectionTop[i],
    }, 1300);
  });
  wheelPc(ww);
  function wheelPc(ww) {
    for (let i = 0; i < sectionI; i++) {
      sectionTop[i] = $('.wrap section').eq(i).offset().top;
    }
    if (ww >= 969) {
      /* 마우스 휠 이벤트 시작 */
      $('.wrap > section').on('wheel', function (e) {
        e.preventDefault();
        let nav;
        if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
          nav = $(this).prev(); /* 이전에 section을 저장 */
        } else {
          nav = $(this).next(); /* 다음에 section을 저장 */
        }
        if (nav.length) {
          let moveTop = nav.offset().top;
          $('html,body').stop().animate({
            scrollTop: moveTop,
          }, 1300);
        }
      });
      /* 마우스 휠 이벤트 끝 */
    } else {
      $('.wrap > section').off('wheel');
    }

  }



  //console.log('ready', ht);
  /* 브라우저가 리사이즈 될 때마다 브라우저 높이값 재 저장 */
  $(window).on('resize', function () {
    ww = $(window).width();
    ht = $(this).height();
    //console.log(ht);
    wheelPc(ww);
  });

  let swiper = new Swiper(".make", {
    loop: true,
    mousewheel: false,
    keyboard: true,
    grabCursor: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // thanks의 타이핑 효과
  let typingTxt = $('.typing-txt').text().trim('i').split(''); /* 해당 선택자의 텍스트를 받아와 한 글자씩 잘라줌 */
  let typingIdx = 0; /* 0부터 시작해야 하므로 0 */
  let typingInter; /* setinterval로 반복되게 할 예정 */
  console.log(typingTxt)
  function typing() {
    if (typingIdx < typingTxt.length) {
      $('.typing').append(typingTxt[typingIdx])
      typingIdx++;
    } else {
      clearInterval(typingInter); /* 타이핑 반복을 방지함 */
      typingIdx = 0;
    }
  }



  $(window).scroll(function () {
    sc = $(window).scrollTop();
    ht = $(this).height();
    for (let i = 0; i < sectionI; i++) {
      if (sc >= sectionTop[i] && sc < sectionTop[i + 1]) { /* 스크롤 탑값이 0보다 크거나 같고, 1보다 작을 경우 */
        $('.wrap> section').eq(i).addClass('on').siblings().removeClass('on');
        // 스크롤 했을 때 탭 메뉴가 바뀜
        $('header .h_top nav ul li').removeClass('on').eq(i).addClass('on');
        console.log(ht)
        console.log($(document).height()-ht);
        console.log(sc);
        if($(document).height()-ht<=sc+50){
          $('header .h_top nav ul li').removeClass('on').eq(4).addClass('on');
        }
        //console.log($(document).height() - ht)

      }


      /* 스크롤 시에 자동으로 타이핑 되도록 반복 */
      if (i == sectionI - 1) {
        typingInter = setInterval(typing, 100); /* 0.1초 동안 반복 */
      } else {
        clearInterval(typingInter);
        $('.typing').empty();
      }
    }
  });


});