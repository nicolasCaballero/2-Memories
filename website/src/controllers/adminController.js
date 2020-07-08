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
    'memoriesSave': (req,res) => {
       let products  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/products.json')));
       let allProducts  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/products.json')));
       let lastProductId = allProducts.pop();

       let newProduct = {
           sku : lastProductId.sku + 1,
           name : req.body.name,
           description : req.body.description,
           image: req.file ? req.file.filename : "",
           visibility: req.body.visibility,
           categories: req.body.categories,
           price: parseInt(req.body.price),
           special_price: parseInt(req.body.special_price),
           associated: req.body.associated,
           qty: parseInt(req.body.qty)
       }
       
       products.push(newProduct);
       productsJSON = JSON.stringify(products,null,2);
       fs.writeFileSync(path.resolve(__dirname, '../models/products.json'),productsJSON);
       res.redirect('/');
    },
    'experienceCreate': (req, res) => {
        res.render(path.resolve(__dirname, '../views/admin/experienceCreate.ejs'));
    },
    'memoriesList': (req, res) => {
        let products  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/products.json')));
        res.render(path.resolve(__dirname, '../views/admin/memoriesList.ejs'), {products});
    },
    'login': (req, res) => {
        res.render(path.resolve(__dirname, '../views/admin/login.ejs'));
    },
    'show': (req,res) => {
        let products  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/products.json')));
        let productId = req.params.sku;
        let product = products.find(p => p.sku == productId);
        res.render(path.resolve(__dirname, '../views/admin/memoriesDetail.ejs'), {product});
    },
    'delete': (req, res) => {
        let products  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/products.json')));
        let productId = req.params.sku;
        let product = products.filter(p => p.sku != productId);
        productsJSON = JSON.stringify(product,null,2);
        fs.writeFileSync(path.resolve(__dirname, '../models/products.json'),productsJSON);
        res.redirect('/admin/listado-memories');
    }
};

module.exports = adminController;