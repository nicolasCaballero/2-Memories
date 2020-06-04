const path = require('path');

let productController = {
    'detail': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/product/productDetail.html'));
    },
    'add': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/cart/cart.html'));
    }
};

module.exports = productController;