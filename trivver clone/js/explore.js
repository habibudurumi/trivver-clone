const exploreSlidesEl = document.querySelector('.explore-slides');
const spaceBeforeAfter = (window.innerWidth - 1360) / 2;
const swiper = new Swiper('.swiper', {
  loop: false,
  spaceBetween: window.innerWidth >= 992 ? 20 : 20,
  slidesPerView: 'auto',
  slidesOffsetAfter: window.innerWidth >= 1400 ? spaceBeforeAfter : 40,
  slidesOffsetBefore: window.innerWidth >= 1400 ? 0 : window.innerWidth >= 992 ? 0 : 20,
  scrollbar: {
    el: document.querySelector('.explore-slides__scroll'),
    draggable: true,
  },
});
document.getElementById('explore-slides-next').addEventListener('click', () => {
  swiper.slideNext();
});
document.getElementById('explore-slides-prev').addEventListener('click', () => {
  swiper.slidePrev();
});
swiper.on('progress', function () {
  exploreSlidesEl.classList[swiper.isBeginning ? 'add' : 'remove']('is-beginning');
  exploreSlidesEl.classList[swiper.isEnd ? 'add' : 'remove']('is-end');
});
