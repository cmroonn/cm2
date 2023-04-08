'use strict';

document.addEventListener("DOMContentLoaded", function () {
  var popupTimeout = setTimeout(openPopup, 30000, 'popupTimer');
  var isOpenPopup = false;
  var main = document.getElementById('main');
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
    console.log(fields);
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
    }) === false) return false;
    console.log('ookkk');
    return true;
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
  try {
    var cookiePlate = document.getElementById("cookie-plate");
    var cookieBtn = document.getElementById("cookieBtn");
    cookieBtn.addEventListener("click", function () {
      cookiePlate.remove();
    });
  } catch (e) {
    console.log(e);
  }

  // const basicForm = document.getElementById('basicForm');
  var forms = document.querySelectorAll('.form-submit');
  console.log(forms);
  forms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      if (!validate(form)) {
        e.preventDefault();
        return;
      }
      console.log('ok');
    });
  });
  try {
    var _buttons = document.querySelectorAll(".open-timer-popup");
    _buttons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        openPopup('popupTimer');
      });
    });
  } catch (e) {
    console.log(e);
  }

  //
  // const timerForm = document.getElementById("timerForm");
  //
  //
  // timerForm.addEventListener("submit", function (e) {
  //     console.log('as')
  //     if (!validate(timerForm)) {
  //         e.preventDefault();
  //         return;
  //     }
  //     console.log('ok')
  // })

  var closePopupButtons = document.querySelectorAll(".popup__close");
  closePopupButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var parent = btn.closest(".overlay");
      closePopup(parent.id);
    });
  });
  try {
    var blocks = document.querySelectorAll('.lessons__lesson__topics__list');
    var toggles = document.querySelectorAll('.lessons__lesson__topics__toggle');
    toggles.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var parent = toggle.closest('.lessons__lesson__body__topics');
        var block = parent.querySelector(".lessons__lesson__topics__list");
        if (toggle.innerText === 'Свернуть список') {
          toggle.innerText = 'Показать все темы урока';
        } else {
          toggle.innerText = 'Свернуть список';
        }
        block.classList.toggle("active");
      });
    });
  } catch (e) {
    console.log(e);
  }
});