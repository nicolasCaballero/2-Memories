const path = require('path');
const fs = require ('fs');

const products  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/products.json')));

let productController = {
    'show': (req,res) => {
        let products  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/products.json')));
        let productId = req.params.sku;
        const product = products.find(p => p.sku == productId);
        res.render(path.resolve(__dirname, '../views/product/productDetail.ejs'), {product});
    },
    'addtoCart': (req, res) => {
        let products  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/products.json')));
        let productId = req.params.sku;
        const product = products.find(p => p.sku == productId);
        res.render(path.resolve(__dirname, '../views/product/cart.ejs'), {product});
    },
    'experiencies': (req, res) => {
        res.render(path.resolve(__dirname, '../views/product/experiences'));
    }
};

module.exports = productController;