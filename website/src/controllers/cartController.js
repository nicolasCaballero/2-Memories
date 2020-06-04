const path = require('path');

let cartController = {
    'detail': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/cart/cart.html'));
    },
    'add': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/cart/checkout.html'));
    }
};

module.exports = cartController;