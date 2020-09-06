window.addEventListener('load', () => {

    let form = document.querySelector('.form');

    form.addEventListener('submit', (e) => {

        let errors = [];
        let numbers = /[0-9]/

        let name = document.querySelector('.name');
        let description = document.querySelector('.description');
        let includes = document.querySelector('.includes');
        let website = document.querySelector('.website');
        let image = document.querySelector('.image');
        let imgErrors = document.querySelector('.img-errors');
        let filePath = image.value;
        let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

        if (name.value.length < 5) {
            errors.push('El campo nombre debe contener más de 5 caracteres');
            name.classList.add('is-invalid');
        } else {
            name.classList.add('is-valid');
            name.classList.remove('is-invalid');
        };
        if (description.value.length < 20) {
            errors.push('El campo descripción debe contener más de 20 caracteres');
            description.classList.add('is-invalid');
        } else {
            description.classList.add('is-valid');
            description.classList.remove('is-invalid');
        };
        if (includes.value.length <= 0) {
            errors.push('El campo incluye no puede estar vacío');
            includes.classList.add('is-invalid');
        } else {
            includes.classList.add('is-valid');
            includes.classList.remove('is-invalid');
        };
        if (website.value.length <= 0) {
            errors.push('Debes indicar un website');
            website.classList.add('is-invalid');
        } else {
            website.classList.add('is-valid');
            website.classList.remove('is-invalid');
        };
        if (!allowedExtensions.exec(filePath)) {
            errors.push('Solo se permiten imagenes .jpg | .jpeg | .png | .gif' );
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