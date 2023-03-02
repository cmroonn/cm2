'use strict';

document.addEventListener("DOMContentLoaded", function () {
  var popupTimeout = setTimeout(openPopup, 30000, 'popupTimer');
  var isOpenPopup = false;
  // const main = document.getElementById('main');
  // main.addEventListener('click', function(e) {
  //     const target = e.target;
  //     console.log(target);
  //
  //     if(isOpenPopup) {
  //         closePopup();
  //     }
  // })

  var overlays = document.querySelectorAll(".overlay");
  overlays.forEach(function (overlay) {
    overlay.addEventListener("click", function (e) {
      var target = e.target;
      console.log(target);
      if (target.closest(".overlay") && target !== overlay) return;
      closePopup(overlay.id);
    });
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
    document.querySelectorAll(".overlay").forEach(function (popup) {
      return popup.classList.remove('active');
    });
    isOpenPopup = false;
    document.body.removeAttribute('style');
  }
  function validate(form) {
    var fields;
    try {
      fields = form.querySelectorAll(".required-field");
    } catch (e) {
      console.log('err');
      return true;
    }
    var arr = [];
    fields.forEach(function (field) {
      if (!field.value || field.value === "") {
        field.classList.add("invalid");
        arr.push(false);
        return;
      }
      field.classList.remove("invalid");
      arr.push(true);
    });
    if (arr.find(function (el) {
      return el === false;
    })) return false;
  }
  document.body.addEventListener('keydown', function (e) {
    if (e.which === 27) {
      closePopup('popupTimer');
      closePopup('popupBasic');
    }
  });
  var buttons = document.querySelectorAll(".open-basic-popup");
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      openPopup('popupBasic');
    });
  });
  var cookiePlate = document.getElementById("cookie-plate");
  var cookieBtn = document.getElementById("cookieBtn");
  cookieBtn.addEventListener("click", function () {
    cookiePlate.remove();
  });
  var basicForm = document.getElementById('basicForm');
  basicForm.addEventListener("submit", function (e) {
    e.preventDefault();
    validate(basicForm);
    if (!validate(basicForm)) return;
    console.log('ok');
  });
  var timerForm = document.getElementById("timerForm");
  timerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    validate(basicForm);
    if (!validate(timerForm)) return;
    console.log('ok');
  });
  var closePopupButtons = document.querySelectorAll(".popup__close");
  closePopupButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var parent = btn.closest(".overlay");
      closePopup(parent.id);
    });
  });
});