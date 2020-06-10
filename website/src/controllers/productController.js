const path = require('path');

let productController = {
    'detail': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/product/productDetail'));
    },
    'add': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/cart/cart'));
    }
};

module.exports = productController;