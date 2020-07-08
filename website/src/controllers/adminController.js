const path = require('path');
const fs = require('fs');

const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/products.json')));

let adminController = {
    'index': (req, res) => {
        res.render(path.resolve(__dirname, '../views/admin/index.ejs'));
    },
    'memoriesCreate': (req, res) => {
        res.render(path.resolve(__dirname, '../views/admin/memoriesCreate.ejs'));
    },
    'experienceCreate': (req, res) => {
        res.render(path.resolve(__dirname, '../views/admin/experienceCreate.ejs'));
    },
    'memoriesList': (req, res) => {
        res.render(path.resolve(__dirname, '../views/admin/memoriesList.ejs'), {products});
    },
    'login': (req, res) => {
        res.render(path.resolve(__dirname, '../views/admin/login.ejs'));
    },
    'show': (req,res) => {
        let products  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/products.json')));
        let productId = req.params.sku;
        const product = products.find(p => p.sku == productId);
        res.render(path.resolve(__dirname, '../views/admin/memoriesDetail.ejs'), {product});
    }
};

module.exports = adminController;