'use strict';

document.addEventListener("DOMContentLoaded", () => {

    const popupTimeout = setTimeout(openPopup, 30000, 'popupTimer');



    let isOpenPopup = false;
    const main = document.getElementById('main');
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

        console.log(fields);


        fields.forEach(field => {
            if (!field.value || field.value === "") {
                field.classList.add("invalid");
                arr.push(false);
                return;
            }


            field.classList.remove("invalid");
            arr.push(true);
        })

        if (arr.find(el => el === false) === false) return false;

        console.log('ookkk');

        return true;
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



    try {
        const cookiePlate = document.getElementById("cookie-plate");
        const cookieBtn = document.getElementById("cookieBtn");
        cookieBtn.addEventListener("click", function () {
            cookiePlate.remove();
        })
    } catch(e) {
        console.log(e);
    }



    // const basicForm = document.getElementById('basicForm');
    const forms = document.querySelectorAll('.form-submit');
    console.log(forms);

    forms.forEach(form => {
        form.addEventListener("submit", function (e) {

            if (!validate(form)) {
                e.preventDefault();
                return;
            }
            console.log('ok')
        })
    })



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


    const closePopupButtons = document.querySelectorAll(".popup__close");

    closePopupButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            const parent = btn.closest(".overlay");
            closePopup(parent.id);
        })
    })

    try {
        const blocks = document.querySelectorAll('.lessons__lesson__topics__list');
        const toggles = document.querySelectorAll('.lessons__lesson__topics__toggle');

        toggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const parent = toggle.closest('.lessons__lesson__body__topics');
                const block = parent.querySelector(".lessons__lesson__topics__list");

                if (toggle.innerText === 'Свернуть список') {
                    toggle.innerText ='Показать все темы урока';
                } else {
                    toggle.innerText = 'Свернуть список';
                }
                block.classList.toggle("active");
            })
        })
    } catch (e) {
        console.log(e);
    }




});
