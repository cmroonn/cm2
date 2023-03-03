'use strict';

document.addEventListener("DOMContentLoaded", () => {

    const popupTimeout = setTimeout(openPopup, 30000, 'popupTimer');


    let isOpenPopup = false;
    // const main = document.getElementById('main');
    // main.addEventListener('click', function(e) {
    //     const target = e.target;
    //     console.log(target);
    //
    //     if(isOpenPopup) {
    //         closePopup();
    //     }
    // })

    const overlays = document.querySelectorAll(".overlay");

    overlays.forEach(overlay => {
        overlay.addEventListener("click", function (e) {
            const target = e.target;
            console.log(target);

            if(target.closest(".overlay") && target !== overlay) return;
            closePopup(overlay.id);
        })
    })

    function openPopup (id) {
        clearTimeout(popupTimeout);
        if(isOpenPopup) {
            closePopup();
            return;
        }
        console.log('ok')
        const popup = document.getElementById(id);
        popup.classList.add("active");
        main.classList.add('blur');
        isOpenPopup = true;
        document.body.style.overflow = 'hidden';
    }

    function closePopup() {
        main.classList.remove('blur');
        document.querySelectorAll(".overlay").forEach(popup => popup.classList.remove('active'));
        isOpenPopup = false;
        document.body.removeAttribute('style');
    }

    function validate (form) {
        let fields;
        try {
            fields = form.querySelectorAll(".required-field");
        } catch(e) {
            console.log('err');
            return true;
        }
        let arr = []


        fields.forEach(field => {
            if (!field.value || field.value === "") {
                field.classList.add("invalid");
                arr.push(false);
                return;
            }


            field.classList.remove("invalid");
            arr.push(true);
        })

        if (arr.find(el => el === false)) return false;
    }


    document.body.addEventListener('keydown', e => {
        if (e.which === 27) {
            closePopup('popupTimer');
            closePopup('popupBasic');
        }
    })

    const buttons = document.querySelectorAll(".open-basic-popup");

    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            openPopup('popupBasic');
        })
    })



    const cookiePlate = document.getElementById("cookie-plate");
    const cookieBtn = document.getElementById("cookieBtn");
    cookieBtn.addEventListener("click", function () {
        cookiePlate.remove();
    })



    const basicForm = document.getElementById('basicForm');

    basicForm.addEventListener("submit", function (e) {
        e.preventDefault();
        validate(basicForm);

        if (!validate(basicForm)) return;
        console.log('ok')
    })


    const timerForm = document.getElementById("timerForm");


    timerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        validate(basicForm);

        if (!validate(timerForm)) return;
        console.log('ok')
    })


    const closePopupButtons = document.querySelectorAll(".popup__close");

    closePopupButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            const parent = btn.closest(".overlay");
            closePopup(parent.id);
        })
    })




});
