const path = require('path');
const db = require('../db/models');


let mainController = {
    'open': (req, res) => {
        res.render(path.resolve(__dirname, '../views/index/abrirMemorie.ejs'))
    },
    'index': (req, res) => {
        db.categories.findAll()
            .then((categories) => {
                res.render(path.resolve(__dirname, '../views/index/index.ejs'), {
                    categories
                });
            });
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