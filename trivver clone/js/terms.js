
$(document).ready(function() {
  function termsPopupFunc() {
    const termsPopup = document.getElementById('terms-popup');
    const termsPopupBtn = document.getElementById('terms-popup-close');
    if (!termsPopup || !termsPopupBtn) return;
    if (localStorage.getItem('termsPopup') != 'shown') termsPopup.classList.remove('hide');
    termsPopupBtn.addEventListener('click', function() {
      termsPopup.classList.add('hide');
      localStorage.setItem('termsPopup', 'shown');
    });
  }
  termsPopupFunc();
});
