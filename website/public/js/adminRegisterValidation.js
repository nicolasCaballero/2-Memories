window.addEventListener('load', () => {

    let form = document.querySelector('.form');

    form.addEventListener('submit', (e) => {

        let errors = [];

        let name = document.querySelector('.name');
        let username = document.querySelector('.username');
        let email = document.querySelector('.email');
        let eye = document.querySelector('.eye');
        let image = document.querySelector('.img');
        let imgErrors = document.querySelector('.img-errors');
        let filePath = image.value;
        let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

        if (name.value == '') {
            errors.push('El campo nombre no puede estar vacío');
            name.classList.add('is-invalid');
        } else {
            name.classList.add('is-valid');
            name.classList.remove('is-invalid');
        };
        if (username.value == '') {
            errors.push('El campo apellido no puede estar vacío');
            username.classList.add('is-invalid');
        } else {
            username.classList.add('is-valid');
            username.classList.remove('is-invalid');
        };

        let reEmail = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!reEmail.test(email.value)) {
            errors.push('El email es inválido');
            email.classList.add('is-invalid');
        } else {
            email.classList.add('is-valid');
            email.classList.remove('is-invalid');
        };

        let rePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        if (!rePassword.test(password.value)) {
            errors.push('La contraseña debe contener mínimo 6 dígitos, una mayuscula, una minúscula y un número');
            password.classList.add('is-invalid');
            eye.classList.remove('eye');
            eye.classList.add('eye3');
        } else {
            password.classList.add('is-valid');
            password.classList.remove('is-invalid');
            eye.classList.remove('eye');
            eye.classList.add('eye3');
        };
        if (!allowedExtensions.exec(filePath)) {
            errors.push('Solo se permiten imagenes .jpg | .jpeg | .png | .gif');
            imgErrors.classList.add('is-invalid');
        } else {
            imgErrors.classList.add('is-valid');
            imgErrors.classList.remove('is-invalid');
        };

        if (errors.length > 0) {
            e.preventDefault();
            let ulErrors = document.querySelector('.div-errors');
            ulErrors.classList.add('alert-warning');
            ulErrors.classList.add('text-center');
            ulErrors.classList.add('mt-3');
            ulErrors.classList.add('mb-3');

            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += '<li>' + errors[i] + '</li>'
            };
        };

    });
});

let password = document.querySelector('.password');
let letter = document.getElementById('letter');
let capital = document.getElementById('capital');
let number = document.getElementById('number');
let length = document.getElementById('length');

password.addEventListener('focus', () => {
    document.getElementById('message').style.display = 'block';
});

password.addEventListener('blur', () => {
    document.getElementById('message').style.display = 'none';
});

password.addEventListener('keyup', () => {

    let lowerCaseLetters = /[a-z]/;
    let upperCaseLetters = /[A-Z]/;
    let numbers = /[0-9]/;

    if (password.value.match(lowerCaseLetters)) {
        letter.classList.remove('is-invalid');
        letter.classList.add('is-valid');
    } else {
        letter.classList.remove('is-valid');
        letter.classList.add('is-invalid');
    };

    if (password.value.match(upperCaseLetters)) {
        capital.classList.remove('is-invalid');
        capital.classList.add('is-valid');
    } else {
        capital.classList.remove('is-valid');
        capital.classList.add('is-invalid');
    };

    if (password.value.match(numbers)) {
        number.classList.remove('is-invalid');
        number.classList.add('is-valid');
    } else {
        number.classList.remove('is-valid');
        number.classList.add('is-invalid');
    };

    if (password.value.length >= 6) {
        length.classList.remove('is-invalid');
        length.classList.add('is-valid');
    } else {
        length.classList.remove('is-valid');
        length.classList.add('is-invalid');
    };
});