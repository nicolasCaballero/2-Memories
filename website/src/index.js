//require de express
const express = require('express');
//se guarda la ejecución de express en la const app
const app = express();
//require de las rutas a utilizar
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

//ubicar nuestros archivos estaticos
app.use(express.static('public'));

//Usar rutas requeridas
app.use(mainRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(cartRoutes);
//Servidor levantado en el puertolocal 3000
app.listen('3000', () => console.log('Servidor corriendo en el puerto http://localhost:3000'));

