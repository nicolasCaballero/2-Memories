const path = require('path');

let productController = {
    'detail': (req, res) => {
        res.render(path.resolve(__dirname, '../views/product/productDetail.ejs'));
    },
    'add': (req, res) => {
        res.render(path.resolve(__dirname, '../views/cart/cart.ejs'));
    },
    'experiencies': (req, res) => {
        res.render(path.resolve(__dirname, '../views/product/experiences.ejs'));
    }
};

module.exports = productController;