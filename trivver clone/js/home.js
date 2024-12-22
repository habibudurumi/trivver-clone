window.webglBaseUrl = '/webgl/';
window.threeJsScriptUrl = `${window.webglBaseUrl}scripts/trivver.20bd2d42.js`;

window.audioUrls = {
  music: '/audios/music.mp3',
  hover: '/audios/hover.mp3',
  linkHover: '/audios/link-hover.mp3',
}

/* ### */

window.currentId = 0;
window.mt = document.getElementById('main-track');
window.viewportEl = document.getElementById('viewport');
window.vDiscoverEl = document.querySelector('.video-discover');
window.videosHolderEl = document.querySelector('.videos-holder-2');
window.scenesEl = document.querySelector('.hero__scenes');

const menuBtnEl = document.getElementById('menu-btn');
const menuEl = document.getElementById('main-menu');
const headerEl = document.getElementById('main-header');
let audioElement = document.getElementById('bg-audio');
let hoverAudioElement = document.getElementById('hover-audio');
let hoverLinkAudioElement = document.getElementById('hover-link-audio');

function stopAudio() {
  if (audioElement) {
    audioElement.pause();
    const audioToggleEl = document.getElementById('audio-toggle');
    if (audioToggleEl) audioToggleEl.classList.add('muted');
  }
}

function addDemoEvents() {
  const mainEl = document.querySelector('.hero__title__lightbox-1');
  if (!mainEl) return;
  document.querySelectorAll('.hero__demo, .hero__demo-mobile').forEach(el => {
    el.addEventListener('click', () => {
      mainEl.click()
    });
    stopAudio();
  });
}
addDemoEvents();

function demoVideoStopSound() {
  const demoEl = document.querySelector('.hero__title__lightbox-1');
  if (demoEl) demoEl.addEventListener('click', () => {
    stopAudio();
  });
}
demoVideoStopSound();

function closeMenu() {
  menuEl.classList.remove('content');
  menuEl.classList.add('reverse');
  window.setTimeout(() => {
    menuEl.classList.remove('show');
    headerEl.classList.remove('menu-open');
    menuEl.classList.remove('reverse');
  }, 1000);
  document.querySelectorAll('.main-menu-content__dropdown-holder').forEach(el => {
    el.classList.remove('open');
  });
}

function menuEvents() {
  if (!menuEl || !menuBtnEl || !headerEl) return;
  menuBtnEl.addEventListener('click', () => {
    const isCurrentActive = menuEl.classList.contains('show');
    if (isCurrentActive) {
      closeMenu();
    } else {
      menuEl.classList.add('show');
      window.setTimeout(() => {
        menuEl.classList.add('content');
        headerEl.classList.add('menu-open');
      }, 500);
    }
  });
  const discoverEl = document.querySelector('.videos-holder-2');
  document.querySelectorAll('.main-menu-content__link:not([data-id="demo"]):not(.v--dropdown-link), .mobile-bottom-menu__item').forEach(link => {
    link.addEventListener('click', () => {
      if (menuEl.classList.contains('show')) closeMenu();
      if (link.classList.contains('active') || window.currentId == link.dataset.id + 1) return;
      const selected = timelineCoefScenes[link.dataset.id];
      if (!selected) return;
      const min = selected.min > 0.63 ? ((selected.min - 0.63) * 2) + 0.63 : selected.min;
      let y = window.innerWidth >= 768 ?
        min * (window.innerHeight * 11) + 200 :
        (selected.min * (window.innerHeight * 11) + 100) / 2;
      if (link.dataset.id === '5') {
        if (window.innerWidth < 768) {
          discoverEl.scrollIntoView();
        } else {
          mt.scroll({
            top: window.innerHeight * 11.35,
            behavior: 'smooth'
          });
        }
      } else if (link.dataset.id === '0' && window.innerWidth < 768) {
        mt.scroll({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        mt.scroll({
          top: y,
          behavior: 'smooth'
        });
      }
    });
  });

  function topCTAEvent() {
    const els = document.querySelectorAll('#header__right__cta, .main-menu-content__link[data-id="demo"]');
    const footerScrollTo = document.getElementById('footer-scroll-to');
    els.forEach(el => {
      el.addEventListener('click', () => {
        footerScrollTo.scrollIntoView();
        if (menuEl.classList.contains('show')) closeMenu();
      });
    });
  }
  topCTAEvent();

  function desktopMenuItemsHover() {
    const videoWrapperEl = document.querySelector('.main-menu-video');
    if (!videoWrapperEl) return;
    const videosEls = videoWrapperEl.querySelectorAll('video');
    document.querySelectorAll('.main-menu-content__link').forEach(link => {
      link.addEventListener('mouseover', () => {
        if (link.dataset.video) videoWrapperEl.dataset.video = link.dataset.id;
        menuEl.dataset.id = link.dataset.id;
        videosEls.forEach(v => v.play());
      });
      link.addEventListener('mouseout', () => {
        videoWrapperEl.dataset.video = '';
        menuEl.dataset.id = '';
      });
    });
    videosEls.forEach(v => v.play());
  };
  desktopMenuItemsHover();
}
menuEvents();

function textSplits() {
  document.querySelectorAll(
    '.hero__text__1, .hero__title__text, .video-discover h1, .loading-text, .hero__end-scene__success__text, .hero__end-scene__success__paragraph, .hero__scene .hero__texts__small__title, .hero__scene .hero__texts__small__text, .hero__end-scene__title, .hero__end-scene__text'
  ).forEach(el => {
    el.dataset.textReveal = 'true';
  });
  document.querySelectorAll('[data-text-reveal]').forEach(textEl => {
    textEl.innerHTML = textEl.textContent.replace(/\S/g, '<span class="letter">$&</span>');
  });
}
textSplits();

function formSubmitTransition() {
  const btn = document.querySelector('.hero__end-scene__submit');
  const successEl = document.querySelector('.hero__end-scene__success');
  const formEl = document.getElementById('email-form');
  if (btn && successEl && formEl) {
    btn.addEventListener('click', () => {
      const formInterval = window.setInterval(() => {
        if (formEl.style.display === 'none') {
          window.clearInterval(formInterval);
          const bEl = document.querySelector('.hero__end-scene__c.v--blue');
          bEl.classList.add('hide');
          successEl.classList.add('show');
        }
      }, 100);
    });
  }
}
formSubmitTransition();

function logoClickEvent() {
  const logo = document.getElementById('logo-id');
  if (logo) logo.addEventListener('click', () => {
    mt.scroll(0, 0);
  });
}
logoClickEvent();

function heroSelectorTextEvent() {
  const heroSelectorEl = document.getElementById('hero-selector');
  heroSelectorEl.addEventListener('mouseover', () => {
    if (!heroSelectorEl.classList.contains('hide-text')) heroSelectorEl.classList.add('hide-text');
  });
}
heroSelectorTextEvent();

function measureVideoPlay() {
  const measureVideoEl = document.querySelector('.hero__measure-video__video video');
  if (measureVideoEl) measureVideoEl.play();
};
measureVideoPlay();

function asPieStart() {
  if (window.isMobile) return;
  jQuery(function ($) {
    $('.pieProgress').asPieProgress({
      namespace: 'pieProgress',
      barcolor: '#DBFF01',
      barsize: '1',
      trackcolor: 'none',
      fillcolor: 'none',
      speed: 15,
      easing: 'linear',
    });
  });
  $().asPieProgress('start');
}

function cardTiltStart() {
  $('.hero__bgs__video').tilt({
    maxTilt: 20,
    perspective: 1000,
    speed: 2000,
    glare: true,
    maxGlare: 0.15,
  })
}

const loadingVideo = document.querySelector('.loading-video video');
if (loadingVideo) loadingVideo.play();
if (window.innerWidth > 767) {
  document.getElementById('audio-el').innerHTML = `<audio id="bg-audio" loop><source src="${window.audioUrls.music}"></source></audio>`;
  audioElement = document.getElementById('bg-audio');
  audioElement.volume = 0.25;

  document.getElementById('hover-audio-el').innerHTML = `<audio id="hover-audio"><source src="${window.audioUrls.hover}"></source></audio>`;
  hoverAudioElement = document.getElementById('hover-audio');

  document.getElementById('hover-link-audio-el').innerHTML = `<audio id="hover-link-audio"><source src="${window.audioUrls.linkHover}"></source></audio>`;
  hoverLinkAudioElement = document.getElementById('hover-link-audio');
}

function mouseHoverAudio() {
  if (audioElement.paused) return;
  hoverAudioElement.currentTime = 0;
  hoverAudioElement.play();
}

function mouseHoverAudioEvents() {
  const els = document.querySelectorAll('.hero__selector__prod');
  els.forEach(el => {
    el.addEventListener('click', () => {
      if (!el.classList.contains('active')) mouseHoverAudio();
    });
  });
}

function mouseHoverLinkAudio() {
  if (audioElement.paused) return;
  hoverLinkAudioElement.currentTime = 0;
  hoverLinkAudioElement.play();
}

function mouseHoverLinkAudioEvents() {
  const els = document.querySelectorAll('.hero__selector__prod, .header__right > *, #logo-id, #audio-toggle, .hero__title__lightbox-1, .mobile-bottom-menu__item, .hero__demo-mobile, .pie-wrapper, .hero__bgs__video, #form-submit, .hero__end-scene__pp');
  els.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (!el.classList.contains('active')) mouseHoverLinkAudio();
    });
  });
}
if (window.innerWidth > 767) {
  mouseHoverAudioEvents();
  mouseHoverLinkAudioEvents();
}

/* ############ */

const loadingEl = document.getElementById('loading-el');
const percEl = document.getElementById('loading-btn-perc');
const heroPercEl = document.getElementById('hero-perc');
const mobileBottomMenuEl = document.getElementById('mobile-bottom-menu');
const loadingImgs = [
  document.querySelector('.loading-bg-img.v1'),
  document.querySelector('.loading-bg-img.v2'),
  document.querySelector('.loading-bg-img.v3'),
  document.querySelector('.loading-bg-img.v4'),
];
const loadingImgsShow = [false, false, false, false]
var req = new XMLHttpRequest();
var targetPerc = 99;
var loadPerc = 0;
var intervalWebglPerc = null;
const linesEl = {
  l1: loadingEl.querySelector('.loading-btn__line-1'),
  l2: loadingEl.querySelector('.loading-btn__line-2'),
  l3: loadingEl.querySelector('.loading-btn__line-3'),
  l4: loadingEl.querySelector('.loading-btn__line-4'),
}

function updateLines(force = false) {
  const perc1 = loadPerc >= 25 ? 100 : loadPerc / 25 * 100;
  linesEl.l1.style.width = perc1 + '%';
  const time25 = force >= 25 ? 0 : 200;
  const time50 = force >= 40 ? 0 : 200;
  const time75 = force >= 75 ? 0 : 200;
  window.setTimeout(() => {
    if (loadPerc > 25) {
      const perc2 = loadPerc >= 50 ? 100 : (loadPerc - 25) / 25 * 100;
      linesEl.l2.style.height = perc2 + '%';
      window.setTimeout(() => {
        if (loadPerc > 50) {
          const perc3 = loadPerc >= 75 ? 100 : (loadPerc - 50) / 25 * 100;
          linesEl.l3.style.width = perc3 + '%';
          window.setTimeout(() => {
            if (loadPerc > 75) {
              const perc4 = loadPerc >= 100 ? 100 : (loadPerc - 75) / 25 * 100;
              linesEl.l4.style.height = perc4 + '%';
            }
          }, time75);
        }
      }, time50);
    }
  }, time25);
}

function changeLoaderText(nValue) {
  if (nValue > 75) return '4';
  if (nValue > 50) return '3';
  if (nValue > 25) return '2';
  return '1';
}

function updateLoaderPercent(shouldIgnoreRule = false) {
  if (window.threeJsLoaded && !shouldIgnoreRule) return;
  if (shouldIgnoreRule) {
    loadingEl.classList.add('fast');
    window.setTimeout(() => {
      window.loading100percent = true;
    }, 800);
  }
  window.loaderStoped = false;
  const tvalue = shouldIgnoreRule ? targetPerc : targetPerc > loadPerc + 1 ? loadPerc + 1 : targetPerc;
  const nValue = tvalue > 100 ? 100 : tvalue;
  const timeOut = innerWidth < 768 ? 10 : 35;
  loadPerc = nValue;
  window.setTimeout(() => {
    percEl.dataset.textId = `${changeLoaderText(nValue)}`;
    updateLines(shouldIgnoreRule);
  }, timeOut);
  if (!loadingImgsShow[0] && nValue > 20) {
    loadingImgsShow[0] = true;
    loadingImgs[0].classList.add('show');
  }
  if (!loadingImgsShow[1] && nValue > 40) {
    loadingImgsShow[1] = true;
    loadingImgs[1].classList.add('show');
  }
  if (!loadingImgsShow[2] && nValue > 60) {
    loadingImgsShow[2] = true;
    loadingImgs[2].classList.add('show');
  }
  if (!loadingImgsShow[3] && nValue > 80) {
    loadingImgsShow[3] = true;
    loadingImgs[3].classList.add('show');
  }
  if (tvalue !== targetPerc) {
    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        updateLoaderPercent()
      });
    }, timeOut);
  } else {
    window.loaderStoped = true;
  }
}

function getThreeJsScript() {
  req.addEventListener("load", function (event) {
    var e = event.target;
    var s = document.createElement("script");
    s.innerHTML = e.responseText;
    document.documentElement.appendChild(s);
  }, false);
  window.webglAppLoadedAlreadyRun = false;
  loadingEl.querySelector('.loading-recs').style.opacity = '1';
  intervalWebglPerc = setInterval(() => {
    if (!window.webglAppLoadedAlreadyRun && typeof window.webglAppLoaded === 'function' && typeof TrivverWebglApp === 'function') {
      window.webglAppLoadedAlreadyRun = true;
      window.webglAppLoaded();
    }
  }, 400);
  req.open("GET", window.threeJsScriptUrl);
  req.send();
}
if (!window.isMobile) {
  getThreeJsScript();
} else {
  document.firstElementChild.classList.add('scroll');
  updateLoaderPercent();
  targetPerc = 100;
  intervalWebglPerc = setInterval(() => {
    if (loadPerc >= 100) {
      clearInterval(intervalWebglPerc);
      window.setTimeout(() => {
        clearInterval(intervalWebglPerc);
        targetPerc = 100;
        updateLoaderPercent();
        if (window.innerWidth >= 992) document.getElementById('loading-btn').querySelector('.loading-btn__text').innerHTML = 'ENTER SITE';
        window.setTimeout(() => {
          document.getElementById('loading-btn').classList.remove('disabled');
          window.setTimeout(() => {
            loadingEl.querySelector('.loading-recs').classList.add('show');
            document.getElementById('loading-btn').classList.add('text2');
            document.body.classList.remove('progress-cursor');
            window.setTimeout(() => {
              loadingEl.querySelector('.loading-bg-imgs').classList.add('show');
            }, 600);
          }, 800);
        }, 600);
      }, 200);
    }
  }, 15);
}
const btnBgDiv = loadingEl.querySelector('.btn-bg-div');
const btnBgFrag = document.createDocumentFragment();
for (var i = 0; i < 400; i++) {
  btnBgFrag.appendChild(document.createElement('div'));
}
btnBgDiv.appendChild(btnBgFrag);
const menuBgDiv = document.querySelector('#main-menu > .bg-div');
const menuBgFrag = document.createDocumentFragment();
for (var i = 0; i < 55; i++) {
  menuBgFrag.appendChild(document.createElement('div'));
}
menuBgDiv.appendChild(menuBgFrag);
const menuBgDiv2 = document.querySelector('#main-menu #menu-video-anim .bg-div');
const menuBgFrag2 = document.createDocumentFragment();
for (var i = 0; i < 36; i++) {
  menuBgFrag2.appendChild(document.createElement('div'));
}
menuBgDiv2.appendChild(menuBgFrag2);
const loadingBgDiv = document.querySelector('#loading-anim .bg-div');
const loadingBgFrag = document.createDocumentFragment();
for (var i = 0; i < 55; i++) {
  loadingBgFrag.appendChild(document.createElement('div'));
}
loadingBgDiv.appendChild(loadingBgFrag);
const measureVideoBgDiv = document.querySelector('#measure-video-anim .bg-div');
const measureVideoBgFrag = document.createDocumentFragment();
for (var i = 0; i < 36; i++) {
  measureVideoBgFrag.appendChild(document.createElement('div'));
}
measureVideoBgDiv.appendChild(measureVideoBgFrag);
const heroVideoBgDiv = document.querySelector('#hero-video-anim .bg-div');
const heroVideoBgFrag = document.createDocumentFragment();
for (var i = 0; i < 36; i++) {
  heroVideoBgFrag.appendChild(document.createElement('div'));
}
heroVideoBgDiv.appendChild(heroVideoBgFrag);
const ctaVideoBgDiv = document.querySelector('#cta-video-anim .bg-div');
const ctaVideoBgFrag = document.createDocumentFragment();
for (var i = 0; i < 32; i++) {
  ctaVideoBgFrag.appendChild(document.createElement('div'));
}
ctaVideoBgDiv.appendChild(ctaVideoBgFrag);
heroPercEl.addEventListener('click', () => {
  mt.scroll({
    top: 0,
    behavior: 'smooth'
  });
});

/* ############ */

document.addEventListener("DOMContentLoaded", function (e) {
  ! function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = function (s, i) {
      return void 0 === i && (i = "undefined" != typeof window ? require("jquery") : require("jquery")(s)), t(i), i
    } : t(jQuery)
  }(function (t) {
    return t.fn.tilt = function (s) {
      let i = function () {
          this.ticking || (requestAnimationFrame(g.bind(this)), this.ticking = !0)
        },
        e = function () {
          t(this).on("mousemove", r), t(this).on("mouseenter", n), this.settings.reset && t(this).on("mouseleave", l), this.settings.glare && t(window).on("resize", d.bind(this))
        },
        a = function () {
          void 0 !== this.timeout && clearTimeout(this.timeout), t(this).css({
            transition: `${this.settings.speed}ms ${this.settings.easing}`
          }), this.settings.glare && this.glareElement.css({
            transition: `opacity ${this.settings.speed}ms ${this.settings.easing}`
          }), this.timeout = setTimeout(() => {
            t(this).css({
              transition: ""
            }), this.settings.glare && this.glareElement.css({
              transition: ""
            })
          }, this.settings.speed)
        },
        n = function (s) {
          this.ticking = !1, t(this).css({
            "will-change": "transform"
          }), a.call(this), t(this).trigger("tilt.mouseEnter")
        },
        h = function (s) {
          return void 0 === s && (s = {
            pageX: t(this).offset().left + t(this).outerWidth() / 2,
            pageY: t(this).offset().top + t(this).outerHeight() / 2
          }), {
            x: s.pageX,
            y: s.pageY
          }
        },
        r = function (t) {
          this.mousePositions = h(t), i.call(this)
        },
        l = function () {
          a.call(this), this.reset = !0, i.call(this), t(this).trigger("tilt.mouseLeave")
        },
        o = function () {
          let s = t(this).outerWidth(),
            i = t(this).outerHeight(),
            e = t(this).offset().left,
            a = t(this).offset().top;
          try {
            let n = (this.mousePositions.x - e) / s,
              h = (this.mousePositions.y - a) / i,
              r = (this.settings.maxTilt / 2 - n * this.settings.maxTilt).toFixed(2),
              l = (h * this.settings.maxTilt - this.settings.maxTilt / 2).toFixed(2),
              o = Math.atan2(this.mousePositions.x - (e + s / 2), -(this.mousePositions.y - (a + i / 2))) * (180 / Math.PI);
            return {
              tiltX: r,
              tiltY: l,
              percentageX: 100 * n,
              percentageY: 100 * h,
              angle: o
            }
          } catch (g) {}
        },
        g = function () {
          if (this.transforms = o.call(this), this.reset) {
            this.reset = !1, t(this).css("transform", `perspective(${this.settings.perspective}px) rotateX(0deg) rotateY(0deg)`), this.settings.glare && (this.glareElement.css("transform", "rotate(180deg) translate(-50%, -50%)"), this.glareElement.css("opacity", "0"));
            return
          }
          t(this).css("transform", `perspective(${this.settings.perspective}px) rotateX(${"x"===this.settings.disableAxis?0:this.transforms.tiltY}deg) rotateY(${"y"===this.settings.disableAxis?0:this.transforms.tiltX}deg) scale3d(${this.settings.scale},${this.settings.scale},${this.settings.scale})`), this.settings.glare && (this.glareElement.css("transform", `rotate(${this.transforms.angle}deg) translate(-50%, -50%)`), this.glareElement.css("opacity", `${this.transforms.percentageY*this.settings.maxGlare/100}`)), t(this).trigger("change", [this.transforms]), this.ticking = !1
        },
        c = function () {
          let s = this.settings.glarePrerender;
          s || t(this).append('<div class="js-tilt-glare"><div class="js-tilt-glare-inner"></div></div>'), this.glareElementWrapper = t(this).find(".js-tilt-glare"), this.glareElement = t(this).find(".js-tilt-glare-inner"), !s && (this.glareElementWrapper.css({
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%"
          }).css({
            overflow: "hidden",
            "pointer-events": "none"
          }), this.glareElement.css({
            position: "absolute",
            top: "50%",
            left: "50%",
            "background-image": "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
            width: `${2*t(this).outerWidth()}`,
            height: `${2*t(this).outerWidth()}`,
            transform: "rotate(180deg) translate(-50%, -50%)",
            "transform-origin": "0% 0%",
            opacity: "0"
          }))
        },
        d = function () {
          this.glareElement.css({
            width: `${2*t(this).outerWidth()}`,
            height: `${2*t(this).outerWidth()}`
          })
        };
      return t.fn.tilt.destroy = function () {
        t(this).each(function () {
          t(this).find(".js-tilt-glare").remove(), t(this).css({
            "will-change": "",
            transform: ""
          }), t(this).off("mousemove mouseenter mouseleave")
        })
      }, t.fn.tilt.getValues = function () {
        let s = [];
        return t(this).each(function () {
          this.mousePositions = h.call(this), s.push(o.call(this))
        }), s
      }, t.fn.tilt.reset = function () {
        t(this).each(function () {
          this.mousePositions = h.call(this), this.settings = t(this).data("settings"), l.call(this), setTimeout(() => {
            this.reset = !1
          }, this.settings.transition)
        })
      }, this.each(function () {
        this.settings = t.extend({
          maxTilt: t(this).is("[data-tilt-max]") ? t(this).data("tilt-max") : 20,
          perspective: t(this).is("[data-tilt-perspective]") ? t(this).data("tilt-perspective") : 300,
          easing: t(this).is("[data-tilt-easing]") ? t(this).data("tilt-easing") : "cubic-bezier(.03,.98,.52,.99)",
          scale: t(this).is("[data-tilt-scale]") ? t(this).data("tilt-scale") : "1",
          speed: t(this).is("[data-tilt-speed]") ? t(this).data("tilt-speed") : "400",
          transition: !t(this).is("[data-tilt-transition]") || t(this).data("tilt-transition"),
          disableAxis: t(this).is("[data-tilt-disable-axis]") ? t(this).data("tilt-disable-axis") : null,
          axis: t(this).is("[data-tilt-axis]") ? t(this).data("tilt-axis") : null,
          reset: !t(this).is("[data-tilt-reset]") || t(this).data("tilt-reset"),
          glare: !!t(this).is("[data-tilt-glare]") && t(this).data("tilt-glare"),
          maxGlare: t(this).is("[data-tilt-maxglare]") ? t(this).data("tilt-maxglare") : 1
        }, s), null !== this.settings.axis && (console.warn("Tilt.js: the axis setting has been renamed to disableAxis. See https://github.com/gijsroge/tilt.js/pull/26 for more information"), this.settings.disableAxis = this.settings.axis), this.init = () => {
          t(this).data("settings", this.settings), this.settings.glare && c.call(this), e.call(this)
        }, this.init()
      })
    }, t("[data-tilt]").tilt(), !0
  });
  cardTiltStart();
});


if (!window.isMobile) {
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      const mainTrack = document.getElementById('main-track');
      if (mainTrack) mainTrack.scroll(0, 0);
    });
  }
  const scrollDiscoverBtn = document.getElementById('scroll-discover');
  if (scrollDiscoverBtn) {
    scrollDiscoverBtn.addEventListener('click', () => {
      const discoverBtn = document.querySelector("a.mobile-bottom-menu__item[data-text='discover']")
      if (discoverBtn) discoverBtn.click();
    });
  }
}

function mobileMenuDropdown() {
  document.querySelectorAll('.main-menu-content__link.v--dropdown-link').forEach(el => {
    el.addEventListener('click', () => {
      el.parentElement.classList.toggle('open');
    });
  });
}
mobileMenuDropdown();

function headerLinkClick() {
  const animEl = document.getElementById('loading-anim');
  document.querySelectorAll('.header__right a:not(#header__right__cta)').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      animEl.dataset.bgPixels = 'true';
      window.setTimeout(() => {
        window.location.href = link.href;
      }, 500)
    });
  })
}
headerLinkClick();


/* MOBILE LOADING ANIMATION */
if (window.isMobile) {
  window.app = {
    timelineCoef: 0,
  }
  window.timelineCoefScenes = [{
      min: 0.0,
      max: 0.01,
      id: 1
    },
    {
      min: 0.01,
      max: 0.14,
      id: 2
    },
    {
      min: 0.15,
      max: 0.25,
      id: 3
    },
    {
      min: 0.33,
      max: 0.50,
      id: 4
    },
    {
      min: 0.65,
      max: 0.76,
      id: 5
    },
    {
      min: 0.94,
      max: 1,
      id: 6
    },
  ];
  if (window.innerWidth < 768) {
    timelineCoefScenes[0] = {
      min: 0.0,
      max: 0.029,
      id: 1
    };
    timelineCoefScenes[1] = {
      min: 0.03,
      max: 0.299,
      id: 2
    };
    timelineCoefScenes[2] = {
      min: 0.3,
      max: 0.499,
      id: 3
    };
    timelineCoefScenes[3] = {
      min: 0.5,
      max: 0.699,
      id: 4
    };
    timelineCoefScenes[4] = {
      min: 0.7,
      max: 0.9,
      id: 5
    };
  }
  mt.addEventListener('scroll', e => {
    app.timelineCoef = mt.scrollTop / (window.innerHeight * 5);
    const topScroll = mt.scrollTop * 2;
    const pos = topScroll / window.innerHeight / 11;
    showCurrentSceneM(pos);
    if (app.timelineCoef >= 0.03 && app.timelineCoef <= 0.99) {
      mobileBottomMenuEl.classList.add('show');
    } else {
      mobileBottomMenuEl.classList.remove('show');
    }
  });

  function showCurrentSceneM(pos) {
    const coef = pos;
    const current = timelineCoefScenes.find(s => {
      if (coef >= s.min && coef < s.max) return true;
      return false;
    });
    const cId = current && current.id ? current.id : 0;
    if (!current || currentId === cId) {
      if (currentId !== cId) {
        currentId = 0;
        scenesEl.querySelectorAll('.hero__scene:not(.hide)').forEach(el => el.classList.add('hide'));
        mobileBottomMenuEl.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
      }
      return;
    }
    scenesEl.querySelectorAll('.hero__scene:not(.hide)').forEach(el => el.classList.add('hide'));
    const cEl = scenesEl.querySelector(`.hero__scene[data-id="${current.id}"]`);
    if (cEl) {
      cEl.classList.remove('hide');
      if (current.id > 1 && current.id <= 5) {
        window.mt.style.overflow = 'hidden';
        window.mt.style.pointerEvents = 'none';
        window.setTimeout(() => {
          window.mt.style.overflow = '';
          window.mt.style.pointerEvents = '';
        }, 1000);
      }
      const it = current.id - 1;
      mobileBottomMenuEl.querySelectorAll(`*.active:not([data-id="${it}"])`).forEach(e => e.classList.remove('active'));
      const mobileMenuEl = mobileBottomMenuEl.querySelector(`[data-id="${it}"]`);
      if (mobileMenuEl) mobileMenuEl.classList.add('active');
    }
    currentId = current.id;
    if (!window.isMobile) $('.pie_progress').asPieProgress("go", (currentId - 1) / 4 * 100);
  }

  function addEventchangeCurrentProduct() {
    const btns = document.querySelectorAll('.hero__selector__prod')
    btns.forEach(el => {
      el.addEventListener('click', () => {
        if (el.classList.contains('active')) return;
        btns.forEach(b => {
          b.classList.remove('active');
          b.classList.remove('visible');
        });
        el.classList.add('active');
        const nextVisible = el.parentElement.querySelector(
          '.hero__selector__prod.active ~ .hero__selector__prod');
        if (nextVisible) {
          nextVisible.classList.add('visible');
        } else {
          el.parentElement.querySelector('.hero__selector__prod').classList.add('visible');
        }
        document.body.dataset.selectedProduct = el.dataset.pid;
      });
    });
  }

  function createObservable() {
    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio >= 0.25) {
            vDiscoverEl.classList.add('show');
            document.body.classList.add('discover-visible');
          } else {
            vDiscoverEl.classList.remove('show');
            document.body.classList.remove('discover-visible');
          }
        });
      }, {
        threshold: [0.2, 0.25, 0.3],
      });
      observer.observe(videosHolderEl);
    }
  }

  function heroEndScene() {
    const heroEndSceneEl = document.getElementById('hero__end-scene');
    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio >= 0.1) {
            heroEndSceneEl.classList.add('show');
          } else {
            heroEndSceneEl.classList.remove('show');
          }
        });
      }, {
        threshold: [0.05, 0.1, 0.15],
      });
      observer.observe(heroEndSceneEl);
    }
  }

  function loading() {
    const el = document.getElementById('loading-el');
    const btn = document.getElementById('loading-btn');
    const videosEls = document.querySelectorAll('video');
    const loadingAnim = document.getElementById('loading-anim');
    window.setTimeout(() => {
      loadingAnim.classList.add('top');
    }, 1400);
    btn.addEventListener('click', () => {
      if (btn.classList.contains('disabled')) return;
      loadingAnim.dataset.bgPixels = 'true';
      showCurrentSceneM(-1);
      window.setTimeout(() => {
        showCurrentSceneM(0)
      }, 1500);
      window.setTimeout(() => {
        el.classList.add('hide');
        document.body.classList.remove('body-loading');
        window.setTimeout(() => {
          loadingAnim.dataset.bgPixels = 'false';
        }, 50);
      }, 800);
      videosEls.forEach(e => {
        e.play()
      });
    });
  }

  function addEventchangeCurrentProduct() {
    const btns = document.querySelectorAll('.hero__selector__prod')
    btns.forEach(el => {
      el.addEventListener('click', () => {
        if (el.classList.contains('active')) return;
        btns.forEach(b => {
          b.classList.remove('active');
          b.classList.remove('visible');
        });
        el.classList.add('active');
        const nextVisible = el.parentElement.querySelector('.hero__selector__prod.active ~ .hero__selector__prod');
        if (nextVisible) {
          nextVisible.classList.add('visible');
        } else {
          el.parentElement.querySelector('.hero__selector__prod').classList.add('visible');
        }
        document.body.dataset.selectedProduct = el.dataset.pid;
      });
    });
  }
  createObservable();
  heroEndScene();
  loading();
  showCurrentSceneM(0);
  addEventchangeCurrentProduct();
}

/* ############ */

if (!window.isMobile) {
  window.timelineCoefScenes = [{
      min: 0.0,
      max: 0.01,
      id: 1
    },
    {
      min: 0.01,
      max: 0.169,
      id: 2
    },
    {
      min: 0.17,
      max: 0.349,
      id: 3
    },
    {
      min: 0.419,
      max: 0.65,
      id: 4
    },
    {
      min: 0.691,
      max: 0.80,
      id: 5
    },
    {
      min: 0.801,
      max: 0.88,
      id: 6
    },
  ];
  if (window.innerWidth < 768) {
    timelineCoefScenes[0] = {
      min: 0.0,
      max: 0.029,
      id: 1
    };
    timelineCoefScenes[1] = {
      min: 0.03,
      max: 0.299,
      id: 2
    };
    timelineCoefScenes[2] = {
      min: 0.3,
      max: 0.499,
      id: 3
    };
    timelineCoefScenes[3] = {
      min: 0.5,
      max: 0.699,
      id: 4
    };
    timelineCoefScenes[4] = {
      min: 0.7,
      max: 0.9,
      id: 5
    };
  }
  history.scrollRestoration = 'manual';

  window.webglAppLoaded = () => { // onload
    if (TrivverWebglApp) app = new TrivverWebglApp(document.querySelector('canvas'));
    window.scroll({
      y: 0
    });
    viewportEl.scroll({
      y: 0
    });
    const startSceneInterval = window.setInterval(() => {
      if (app) {
        targetPerc = 100;
        window.threeJsLoaded = true;
        clearInterval(startSceneInterval);
        loadingEl.querySelector('.loading-recs').classList.add('show');
        window.setTimeout(() => {
          clearInterval(intervalWebglPerc);
          if (window.innerWidth >= 992) document.getElementById('loading-btn').querySelector('.loading-btn__text').innerHTML = 'ENTER SITE';
          window.setTimeout(() => {
            document.getElementById('loading-btn').classList.remove('disabled');
            window.setTimeout(() => {
              document.getElementById('loading-btn').classList.add('text2');
              document.body.classList.remove('progress-cursor');
            }, 800);
          }, 500);
        }, 800);
        const startSceneInterval2 = window.setInterval(() => {
          if (!app.firstTimeline) {
            showCurrentScene(0);
            addEventchangeCurrentProduct();
            app.selectProduct('MIXER');
            document.firstElementChild.classList.add('scroll');
            clearInterval(startSceneInterval2);
          }
        }, 100);
      }
    }, 100);
    mt.addEventListener('scroll', e => {
      const topScroll = window.innerWidth < 768 ? mt.scrollTop * 2 : mt.scrollTop;
      viewportEl.scroll({
        y: topScroll
      });
      if (app) {
        const pos = topScroll / window.innerHeight / 11;
        const nPos = pos > 0.63 ? ((pos - 0.63) / 2) + 0.63 : pos;
        app.setScrollPosition(nPos);
        showCurrentScene(nPos);
        const fc = app.timelineCoef >= 0.01 && app.timelineCoef <= 0.88 ? 'add' : 'remove';
        mobileBottomMenuEl.classList[fc]('show');
        if (window.innerWidth > 767) {
          if (app.timelineCoef >= 0.01 && app.timelineCoef <= 0.666) {
            $('.pie_progress').asPieProgress('stop');
            const pieProgress = Math.floor((app.timelineCoef / 0.45) * 10000) / 100;
            $('.pie_progress').asPieProgress("go", pieProgress);
            heroPercEl.classList.add('show');
          } else {
            heroPercEl.classList.remove('show');
          }
        }
      }
    });
  };

  function showCurrentScene(pos) {
    const coef = pos;
    const current = timelineCoefScenes.find(s => {
      if (coef >= s.min && coef < s.max) return true;
      return false;
    });
    const cId = current && current.id ? current.id : 0;
    if (current) {
      const perc = Math.floor(((coef - current.min) - (current.max - current.min)) / (current.max - current.min) * 100) + 100;
      document.body.style = `--menu-progress: ${perc}%`;
    }
    if (!current || currentId === cId) {
      if (currentId !== cId) {
        currentId = 0;
        scenesEl.querySelectorAll('.hero__scene:not(.hide)').forEach(el => el.classList.add('hide'));
        mobileBottomMenuEl.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
      }
      return;
    }
    scenesEl.querySelectorAll('.hero__scene:not(.hide)').forEach(el => el.classList.add('hide'));
    const cEl = scenesEl.querySelector(`.hero__scene[data-id="${current.id}"]`);
    if (cEl) {
      cEl.classList.remove('hide');
      const it = current.id - 1;
      mobileBottomMenuEl.querySelectorAll(`*.active:not([data-id="${it}"])`).forEach(e => e.classList.remove('active'));;
      const mobileMenuEl = mobileBottomMenuEl.querySelector(`[data-id="${it}"]`);
      if (mobileMenuEl) mobileMenuEl.classList.add('active');
    }
    currentId = current.id;
  }

  function addEventchangeCurrentProduct() {
    const btns = document.querySelectorAll('.hero__selector__prod')
    btns.forEach(el => {
      el.addEventListener('click', () => {
        if (el.classList.contains('active')) return;
        btns.forEach(b => {
          b.classList.remove('active');
          b.classList.remove('visible');
        });
        el.classList.add('active');
        const nextVisible = el.parentElement.querySelector('.hero__selector__prod.active ~ .hero__selector__prod');
        if (nextVisible) {
          nextVisible.classList.add('visible');
        } else {
          el.parentElement.querySelector('.hero__selector__prod').classList.add('visible');
        }
        app.selectProduct(el.dataset.pid);
        document.body.dataset.selectedProduct = el.dataset.pid;
      });
    });
  }

  function createObservable() {
    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const f = entry.intersectionRatio >= 0.25 ? 'add' : 'remove';
          vDiscoverEl.classList[f]('show');
        });
      }, {
        threshold: [0.2, 0.25, 0.3]
      });
      observer.observe(videosHolderEl);
    }
  }
  createObservable();

  function loading() {
    const el = document.getElementById('loading-el');
    const btn = document.getElementById('loading-btn');
    const audioEl = document.getElementById('bg-audio');
    const loadingBgImgs = document.querySelector('.loading-bg-imgs');
    const loadingAnim = document.getElementById('loading-anim');
    if (window.searchUrl.get('sec')) {
      const secInterval = window.setInterval(() => {
        btn.click();
        if (loadingAnim.dataset.bgPixels === 'true') {
          window.clearInterval(secInterval);
          window.setTimeout(() => {
            if (window.searchUrl.get('sec') === 'discover') {
              const el = document.querySelector("#mobile-bottom-menu .mobile-bottom-menu__item[data-text='discover']");
              if (el) el.click();
              const m = document.querySelector("#main-track")
              window.setTimeout(() => {
                m.dispatchEvent(new CustomEvent('scroll'));
              }, 500)
              window.setTimeout(() => {
                m.dispatchEvent(new CustomEvent('scroll'));
              }, 1200)
            }
          }, 1000);
        }
      }, 500)
    }
    window.setTimeout(() => {
      loadingAnim.classList.add('top');
    }, 1400);
    const audioToggleEl = document.getElementById('audio-toggle');
    btn.addEventListener('click', () => {
      if (btn.classList.contains('disabled')) return;
      loadingAnim.dataset.bgPixels = 'true';
      showCurrentScene(-1);
      window.setTimeout(() => {
        showCurrentScene(0)
      }, 1500);
      window.setTimeout(() => {
        el.classList.add('hide');
        document.body.classList.remove('body-loading');
        window.setTimeout(() => {
          loadingAnim.dataset.bgPixels = 'false';
        }, 50);
        window.setTimeout(() => {
          document.body.classList.add('end-item-selector');
        }, 3500);
      }, 800);
      window.setTimeout(() => {
        const canRunSound = window.localStorage.getItem('sound');
        if (window.innerWidth > 767 && audioEl) {
          if (canRunSound !== 'off') {
            audioEl.play()
          } else {
            audioToggleEl.classList.add('muted')
          }
        }
      }, 900);
    });
    if (audioEl) {
      if (audioToggleEl) {
        audioToggleEl.addEventListener('click', () => {
          if (audioEl.paused) {
            audioEl.play();
            audioToggleEl.classList.remove('muted');
            window.localStorage.setItem('sound', 'on');
          } else {
            audioEl.pause();
            audioToggleEl.classList.add('muted');
            window.localStorage.setItem('sound', 'off');
          }
        });
      }
    }
    btn.addEventListener('mouseover', () => {
      if (!btn.classList.contains('disabled')) loadingBgImgs.classList.add('green');
    });
    btn.addEventListener('mouseout', () => {
      loadingBgImgs.classList.remove('green');
    });
  }
  loading();

  function heroEndScene() {
    const heroEndSceneEl = document.getElementById('hero__end-scene');
    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio >= 0.5) {
            heroEndSceneEl.classList.add('show');
          } else {
            heroEndSceneEl.classList.remove('show');
          }
        });
      }, {
        threshold: [0.45, 0.5, 0.55]
      });
      observer.observe(heroEndSceneEl);
    }
  }
  heroEndScene();
}

function endSceneForm() {
  const inputs = document.querySelectorAll('.hero__end-scene__input-block__input');
  inputs.forEach(input => {
    input.addEventListener('change', () => {
      if (input.value.length) {
        input.classList.add('notempty');
      } else {
        input.classList.remove('notempty');
      }
    });
  });
}
endSceneForm();

$('form[action^="https://submit-form.com"]').each(function (i, el) {
  var form = $(el);
  form.submit(function (e) {
    e.preventDefault();
    form = $(e.target);
    var action = form.attr("action");
    var data = form.serialize();
    $.ajax({
      url: action,
      method: "POST",
      data: data,
      dataType: "json",
      success: function () {
        var parent = $(form.parent());
        parent.children("form").css("display", "none");
        parent.children(".w-form-done").css("display", "block");
      },
      error: function () {
        var parent = $(form.parent());
        parent.find(".w-form-fail").css("display", "block");
      },
    });
  });
  document.getElementById('form-hostname').value = window.location.hostname;
});
