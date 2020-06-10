const path = require('path');

let cartController = {
    'detail': (req, res) => {
        res.render(path.resolve(__dirname, '../views/cart/cart.ejs'));
    },
    'add': (req, res) => {
        res.render(path.resolve(__dirname, '../views/cart/checkout.ejs'));
    }
};

module.exports = cartController;