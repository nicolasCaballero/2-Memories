//require de express
const express = require('express');
//se guarda la ejecución de express en la const app
const app = express();
//require de las rutas a utilizar
const path = require ('path');
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/adminRoutes');

//ubicar nuestros archivos estaticos
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');

//Usar rutas requeridas
app.use(mainRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(adminRoutes);
//Servidor levantado en el puertolocal 3000
app.listen('3000', () => console.log('Servidor corriendo en el puerto http://localhost:3000'));

