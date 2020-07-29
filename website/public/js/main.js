window.addEventListener('load', () => {
    let togglePassword = document.querySelector('.togglePassword');
    let password = document.querySelector('.password');

    togglePassword.addEventListener('click', (e) => {
        let type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye-slash');
    });
});