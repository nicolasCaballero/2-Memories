window.addEventListener('load', () => {
    let buyButton = document.querySelector('.buyButton');
    buyButton.addEventListener('click', () => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto agregado al carrito!',
            showConfirmButton: false,
            timer: 1500
          })
    })
});