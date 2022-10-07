(function ($) {
  'use strict';

  /* ---------------------------------------------
  STICKY HEADER
  --------------------------------------------- */
  const body = document.body;
  const scrollUp = 'scroll-up';
  const scrollDown = 'scroll-down';
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 100) {
      body.classList.remove(scrollUp);
      return;
    }

    if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
      // down
      body.classList.remove(scrollUp);
      body.classList.add(scrollDown);
    } else if (
      currentScroll < lastScroll &&
      body.classList.contains(scrollDown)
    ) {
      // up
      body.classList.remove(scrollDown);
      body.classList.add(scrollUp);
    }
    lastScroll = currentScroll;
  });

  /* ---------------------------------------------
  PROGRESS
  --------------------------------------------- */
  const updateProgress = () => {
    const bodyEl = document.body;
    const barEl = document.getElementById('bar');
    let scrollPos =
      (window.scrollY / (bodyEl.scrollHeight - window.innerHeight)) * 100;
    barEl.style.width = `${scrollPos}%`;
    requestAnimationFrame(updateProgress);
  };

  updateProgress();

  /* ---------------------------------------------
  BURGER MENU
  --------------------------------------------- */
  $('body').on('click', '.nav-btn', function () {
    $(this).toggleClass('active');
    $('.nav-menu').toggleClass('active');
    $('body').toggleClass('no-scroll');
    return false;
  });

  $(document).on('mouseup', function (e) {
    let currentSelect = $('.nav-menu');
    let closeBtn = $('.nav-btn');
    if (currentSelect.hasClass('active')) {
      if (
        !currentSelect.is(e.target) &&
        !closeBtn.is(e.target) &&
        closeBtn.has(e.target).length === 0 &&
        currentSelect.has(e.target).length === 0
      ) {
        currentSelect.removeClass('active');
        $('.nav-btn').removeClass('active');
        $('body').removeClass('no-scroll');
      }
    }
  });

  /* ---------------------------------------------
  MENU
  --------------------------------------------- */
  $(window)
    .on('resize.myTemplate', function () {
      $('body')[$(this).width() <= 1199 ? 'addClass' : 'removeClass'](
        'isMobile'
      );
    })
    .trigger('resize.myTemplate');

  $('body').on('click', '.dropdown .menu-item', function (event) {
    if (!$('body.isMobile')[0]) {
      return;
    }

    var $thisLi = $(event.currentTarget).parents('li'),
      $thisLiActive = $thisLi.hasClass('dropdown-active');

    $('.dropdown-active')
      .removeClass('dropdown-active')
      .children('.dropdown__menu')
      .slideUp(150);

    if (!$thisLiActive) {
      $thisLi.addClass('dropdown-active');
      $thisLi.children('.dropdown__menu').slideDown(250);
    }

    return false;
  });

  $('body')
    .on('mouseenter', '.dropdown', function (event) {
      if ($('body.isMobile')[0]) {
        return;
      }

      var menuItem = $(event.currentTarget);

      if (menuItem[0].timeOutMenu) {
        clearTimeout(menuItem[0].timeOutMenu);
      }

      menuItem.addClass('active');
    })
    .on('mouseleave', '.dropdown', function (event) {
      if ($('body.isMobile')[0]) {
        return;
      }

      var menuItem = $(event.currentTarget);

      menuItem[0].timeOutMenu = setTimeout(function () {
        menuItem.removeClass('active');
      }, 150);
    });

  /* ---------------------------------------------
    MODAL CART
    --------------------------------------------- */
  // Open
  $('.header-cart__btn').on('click', function () {
    $('.cart-modal').addClass('active');
  });

  // Close
  $('.modal--close').on('click', function () {
    $(this).parents('.modal').removeClass('active');
  });

  $(document).on('mouseup', function (e) {
    let currentSelect = $('.cart-modal');
    if (currentSelect.hasClass('active')) {
      if (
        !currentSelect.is(e.target) &&
        currentSelect.has(e.target).length === 0
      ) {
        currentSelect.removeClass('active');
      }
    }
  });

  /* ---------------------------------------------
    MODAL SEARCH
    --------------------------------------------- */
  $('.header__search-btn').on('click', function () {
    $(this).addClass('active');
    $('.search-modal').addClass('active');
  });

  $(document).on('mouseup', function (e) {
    let currentSelect = $('.search-modal');
    if (currentSelect.hasClass('active')) {
      if (
        !currentSelect.is(e.target) &&
        currentSelect.has(e.target).length === 0
      ) {
        currentSelect.removeClass('active');
        $('.header__search-btn, .search-modal').removeClass('active');
      }
    }
  });

  /* ---------------------------------------------
  MAIN SLIDER
  --------------------------------------------- */
  if ($('.main-slider')[0]) {
    $('.main-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
      speed: 800,
      touchThreshold: 200,
      cssEase: 'ease',
      fade: true,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: false,
      pauseOnDotsHover: true,
      nextArrow:
        '<span class="slick-arrow__next"><img src="assets/img/arrow-right.svg" alt="img"></span>',
      prevArrow:
        '<span class="slick-arrow__prev"><img src="assets/img/arrow-left.svg" alt="img"></span>',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            arrows: false,
          },
        },
      ],
    });
  }

  /* ---------------------------------------------
  PRODUCT ITEM SLIDER
  --------------------------------------------- */
  if ($('.product__item-slider')[0]) {
    $('.product__item-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      speed: 500,
      touchThreshold: 100,
      cssEase: 'ease',
      fade: true,
      nextArrow:
        '<span class="slick-arrow__next"><img src="assets/img/arrow-right-product.svg" alt="img"></span>',
      prevArrow:
        '<span class="slick-arrow__prev"><img src="assets/img/arrow-left-product.svg" alt="img"></span>',
    });
  }

  /* ---------------------------------------------
  ADD TO WISHLIST
  --------------------------------------------- */
  if ($('.wishlist')[0]) {
    $('.wishlist').on('click', function () {
      $(this).toggleClass('active');
    });
  }

  /* ---------------------------------------------
  CUSTOM SELECT
  --------------------------------------------- */
  if ($('.custom-select')[0]) {
    $('.custom-select .current').on('click', function () {
      let item = $(this);
      if (!item.parents('.custom-select').hasClass('active')) {
        $(this).parents('.custom-select').addClass('active');
      } else {
        $(this).parents('.custom-select').removeClass('active');
      }
    });

    $('.custom-select__item').on('click', function () {
      let attrSelect = $(this).text();
      $(this).parents('.custom-select').removeClass('active');
      $(this).parents('.custom-select').find('.current span').text(attrSelect);
    });

    $(document).on('mouseup', function (e) {
      let currentSelect = $('.custom-select');
      if (currentSelect.hasClass('active')) {
        if (
          !currentSelect.is(e.target) &&
          currentSelect.has(e.target).length === 0
        ) {
          currentSelect.removeClass('active');
        }
      }
    });
  }

  /* ---------------------------------------------
  MODAL RING SIZE
  --------------------------------------------- */
  $('.ring-size__btn').on('click', function () {
    $('.ring-size').addClass('active');
  });

  $(document).on('mouseup', function (e) {
    let currentSelect = $('.ring-size');
    if (currentSelect.hasClass('active')) {
      if (
        !currentSelect.is(e.target) &&
        currentSelect.has(e.target).length === 0
      ) {
        currentSelect.removeClass('active');
      }
    }
  });

  $('.us-value').on('click', function () {
    const itemValue = $(this).html();
    $('.ring-size .us-value').removeClass('active');
    $(this).addClass('active');
    $('.single-product__ring-size .title .value').html(itemValue);
  });

  /* ---------------------------------------------
  TABS
  --------------------------------------------- */
  if ($('.tab-block')[0]) {
    $('.tab-block').on('click', '.tab-nav .item', function () {
      let activeTab = $(this).attr('rel');
      $('.tab-nav .item').removeClass('active');
      $(this).addClass('active');
      $(this).parents('.tab-block').find('.tab').removeClass('active');
      console.log('.' + activeTab);
      $(this)
        .parents('.tab-block')
        .find('.' + activeTab)
        .addClass('active');
    });
  }

  /* ---------------------------------------------
  SINGLE PRODUCT SELECTED PARAMS
  --------------------------------------------- */
  $('.select-list input').on('click', function () {
    const itemVal = $(this).val();
    $(this)
      .parents('.single-product__select')
      .find('.title span')
      .html(itemVal);
  });

  /* ---------------------------------------------
  FANCYBOX
  --------------------------------------------- */
  if ($('[data-fancybox="gallery"]')[0]) {
    $('[data-fancybox="gallery"]').fancybox({
      animationEffect: 'zoom',
      transitionEffect: 'tube',
      buttons: ['zoom', 'close'],
    });
  }

  /* ---------------------------------------------
  SINGLE PRODUCT SLIDER
  --------------------------------------------- */
  // https://igorlino.github.io/elevatezoom-plus/index.html
  if ($('.zoom-img')[0]) {
    $('.zoom-img').elevateZoom({
      responsive: true,
      zoomType: 'inner',
      cursor: 'zoom-in',
      zoomWindowFadeIn: 350,
      zoomWindowFadeOut: 350,
    });

    $('.single-product__slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.single-product__slider-nav',
    });
    $('.single-product__slider-nav').slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      asNavFor: '.single-product__slider-for',
      dots: false,
      arrows: false,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 1441,
          settings: {
            slidesToShow: 5,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4,
          },
        },
      ],
    });
  }

  /* ---------------------------------------------
  CHECKOUT TOGGLE
  --------------------------------------------- */
  $('.checkout__toggle-question').on('click', function () {
    $(this)
      .toggleClass('active')
      .parents('.checkout__toggle')
      .find('.checkout__toggle-answer')
      .toggle('fast');
  });
})(jQuery);
