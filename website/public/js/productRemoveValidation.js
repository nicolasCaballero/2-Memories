let getParams = (url) => {
  let params = {};
  let parser = document.createElement('a');
  parser.href = url;
  let query = parser.search.substring(1);
  let vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
}

window.addEventListener('load', () => {
  let params = getParams(window.location.href);
  if (params['from']) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: false,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'info',
      title: 'Producto eliminado del carrito!'
    })
  }
});

// let getParams = (url) => {
//     let params = {};
// 	let parser = document.createElement('a');
//     parser.href = url;
//     let query = parser.search.substring(1);
//     let vars = query.split('&');
//     for (var i = 0; i < vars.length; i++) {
// 		var pair = vars[i].split('=');
// 		params[pair[0]] = decodeURIComponent(pair[1]);
//     }
//     return params;
// }

// window.addEventListener('load', () => {
//     let params = getParams(window.location.href);
//     if(params['from']){
//         Swal.fire({
//             position: 'top-end',
//             icon: 'info',
//             title: 'Producto eliminado del carrito!',
//             showConfirmButton: false,
//             timer: 1500,
//         })
//     }
// });