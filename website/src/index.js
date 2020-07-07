const express = require('express');
const app = express();
const path = require ('path');
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/adminRoutes');
const gridRoutes = require('./routes/gridRoutes');
const methodOverride = require('method-override');


app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));


app.use(mainRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(adminRoutes);
app.use(gridRoutes);

app.listen('3000', () => console.log('Servidor corriendo en el puerto http://localhost:3000'));

