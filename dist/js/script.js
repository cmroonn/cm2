'use strict';

document.addEventListener("DOMContentLoaded", function () {
  var popupTimeout = setTimeout(openPopup, 30000, 'popupTimer');
  var isOpenPopup = false;
  var main = document.getElementById('main');
  main.addEventListener('click', function (e) {
    var target = e.target;
    if (target.classList.contains('open-basic-popup')) return;
    console.log(target);
    if (isOpenPopup) {
      closePopup();
    }
  });
  function openPopup(id) {
    clearTimeout(popupTimeout);
    if (isOpenPopup) {
      closePopup();
      return;
    }
    console.log('ok');
    var popup = document.getElementById(id);
    popup.classList.add("active");
    main.classList.add('blur');
    isOpenPopup = true;
    document.body.style.overflow = 'hidden';
  }
  function closePopup() {
    main.classList.remove('blur');
    document.querySelectorAll(".popup").forEach(function (popup) {
      return popup.classList.remove('active');
    });
    isOpenPopup = false;
    document.body.removeAttribute('style');
  }
  var buttons = document.querySelectorAll(".open-basic-popup");
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      openPopup('popupBasic');
    });
  });
  var cookiePlate = document.getElementById("cookie-plate");
  var cookieBtn = document.getElementById("cookieBtn");
  cookieBtn.addEventListener("click", function () {
    cookiePlate.remove();
  });
});