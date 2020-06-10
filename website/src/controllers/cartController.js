const path = require('path');

let cartController = {
    'detail': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/cart/cart'));
    },
    'add': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/cart/checkout'));
    }
};

module.exports = cartController;