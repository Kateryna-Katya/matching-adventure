import Swiper from 'swiper';
import 'swiper/css';

const swiperConfigs = [
  {
    selector: '.benefits-swiper',
    slideClass: 'benefits-swiper-slide',
    wrapperClass: 'benefits-swiper-wrapper',
    paginationItemSelector: '.pagination-item',
  },
  {
    selector: '.extra-swiper',
    slideClass: 'extra-swiper-slide',
    wrapperClass: 'extra-swiper-wrapper',
    paginationItemSelector: '.extra-pagination-item',
  }
];

const swiperInstances = {};

function initSwipers() {
  const screenWidth = window.innerWidth;

  swiperConfigs.forEach(config => {
    const container = document.querySelector(config.selector);

    if (!container) return;

    const id = config.selector;

    if (screenWidth < 1439 && !swiperInstances[id]) {
      const swiper = new Swiper(config.selector, {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        slideClass: config.slideClass,
        wrapperClass: config.wrapperClass,
        direction: 'horizontal',

        on: {
          init: function () {
            updatePagination(config.paginationItemSelector, this.realIndex);
          },
          slideChange: function () {
            updatePagination(config.paginationItemSelector, this.realIndex);
          },
        },
      });

      swiperInstances[id] = swiper;

      const paginationItems = document.querySelectorAll(config.paginationItemSelector);
      paginationItems.forEach((item, index) => {
        item.addEventListener('click', () => {
          swiper.slideToLoop(index);
        });
      });
    }

    if (screenWidth >= 1439 && swiperInstances[id]) {
      swiperInstances[id].destroy(true, true);
      delete swiperInstances[id];
      clearPagination(config.paginationItemSelector);
    }
  });
}

function updatePagination(paginationSelector, activeIndex) {
  const items = document.querySelectorAll(paginationSelector);
  items.forEach((item, index) => {
    item.classList.toggle('active', index === activeIndex);
  });
}

function clearPagination(paginationSelector) {
  const items = document.querySelectorAll(paginationSelector);
  items.forEach(item => item.classList.remove('active'));
}

document.addEventListener('DOMContentLoaded', initSwipers);
window.addEventListener('resize', initSwipers);