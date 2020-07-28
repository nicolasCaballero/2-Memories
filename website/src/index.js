const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mainRoutes = require('./routes/main/mainRoutes');
const userRoutes = require('./routes/user/userRoutes');
const productRoutes = require('./routes/product/productRoutes');
const adminRoutes = require('./routes/admin/adminRoutes');
const adminUserRoutes = require('./routes/admin/adminUserRoutes');
const gridRoutes = require('./routes/grid/gridRoutes');
const methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: false
}));
app.use(methodOverride('_method'));



app.use(mainRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(adminRoutes);
app.use(gridRoutes);
app.use(adminUserRoutes);
app.use(function (req, res, next) {
    res.status(404);
    if (req.accepts('html')) {
            res.render('404', {url: req.url});
        return;
    }
});

app.listen('3000', () => console.log('Server runing on port: http://localhost:3000'));