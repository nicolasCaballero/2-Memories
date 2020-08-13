const path = require('path');
const fs = require('fs');
const db = require('../db/models');

let productController = {
    'show': (req, res) => {
        db.products.findByPk(req.params.sku)
            .then((product) => {
                res.render(path.resolve(__dirname, '../views/product/productDetail.ejs'), {
                    product
                });
            });
    },
    'addtoCart': (req, res) => {
        db.products.findByPk(req.params.sku)
            .then((product) => {
                res.render(path.resolve(__dirname, '../views/product/cart.ejs'), {
                    product
                });
            });
    },
    'experiencies': (req, res) => {
        res.render(path.resolve(__dirname, '../views/product/experiences'));
    }
};

module.exports = productController;