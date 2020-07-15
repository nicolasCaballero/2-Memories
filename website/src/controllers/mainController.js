const path = require('path');
const fs = require ('fs');

let mainController = {
    'index': (req, res) => {
        const categories  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/categories.json')));
        res.render(path.resolve(__dirname, '../views/index/index.ejs'), {categories});
    },
    'about': (req, res) => {
        res.render(path.resolve(__dirname, '../views/index/nosotros.ejs'));
    },
    'help': (req, res) => {
        res.render(path.resolve(__dirname, '../views/index/ayuda.ejs'));
    },
    'tyc': (req, res) => {
        res.render(path.resolve(__dirname, '../views/index/tyc.ejs'));
    },
    'paymenths': (req, res) => {
        res.render(path.resolve(__dirname, '../views/index/paymenths.ejs'));
    },
    'contact': (req, res) => {
        res.render(path.resolve(__dirname, '../views/index/contact.ejs'));
    },
    'shipments': (req, res) => {
        res.render(path.resolve(__dirname, '../views/index/shipments.ejs'));
    }
};
module.exports = mainController;