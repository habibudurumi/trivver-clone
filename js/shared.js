const menuBtnEl = document.getElementById('menu-btn');
const menuEl = document.getElementById('main-menu');
const headerEl = document.getElementById('main-header');
const animEl = document.getElementById('loading-anim');
const tempAnimEl = document.getElementById('loading-anim-temp');
function addLoadingAnimDivs() {
  const loadingBgDiv = document.querySelector('#loading-anim .bg-div');
  const loadingBgFrag = document.createDocumentFragment();
  for (var i = 0; i < 55; i++) {
      loadingBgFrag.appendChild(document.createElement('div'));
  }
  loadingBgDiv.appendChild(loadingBgFrag);
  window.setTimeout(() => {
    tempAnimEl.classList.add('hide');
    animEl.dataset.bgPixels = 'false';
  }, 200);
}
addLoadingAnimDivs();
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
}
menuEvents();
const menuBgDiv = document.querySelector('#main-menu > .bg-div');
const menuBgFrag = document.createDocumentFragment();
for (var i = 0; i < 55; i++) {
  menuBgFrag.appendChild(document.createElement('div'));
}
menuBgDiv.appendChild(menuBgFrag);
function mobileMenuDropdown() {
  document.querySelectorAll('.main-menu-content__link.v--dropdown-link').forEach(el => {
    el.addEventListener('click', () => {
      el.parentElement.classList.toggle('open');
    });
  });
}
mobileMenuDropdown();
function headerLinkClick() {
  document.querySelectorAll('.navbar__menu-links a:not(.navbar__menu-link.cta)').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      animEl.dataset.bgPixels = 'true';
      window.setTimeout(() => {
        window.location.href = link.href;
      }, 500)
    });
  })
  const cta = document.getElementById('header-send-form');
  if (cta) cta.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
  });
}
headerLinkClick();




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
function heroEndScene() {
  const heroEndSceneEl = document.getElementById('hero__end-scene');
  if (window.IntersectionObserver) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.5) {
          heroEndSceneEl.classList.add('show');
          observer.unobserve(heroEndSceneEl);
        } else {
          heroEndSceneEl.classList.remove('show');
        }
      });
    }, {
      threshold: [0.45, 0.5, 0.55],
    });
    observer.observe(heroEndSceneEl);
  }
}
heroEndScene();
function addLightboxToSlides() {
  const texts = document.querySelectorAll('.explore-slides__slide__text');
  texts.forEach(text => {
    text.innerHTML = text.innerHTML.replace('[[[','<span class="explore-slides__lightbox-link">').replace(']]]','</span>');
    const link = text.querySelector('.explore-slides__lightbox-link');
    if (link) {
      const lb = text.parentElement.querySelector('.explore-slides__slide__lightbox');
      link.addEventListener('click', () => { lb.click(); });
    }
  });
}
addLightboxToSlides();

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
