const path = require('path');
const db = require('../db/models');


let gridController = {
    'adventureShow': (req, res) => {
        db.products.findAll()
        .then((products) => {
            res.render(path.resolve(__dirname, '../views/grids/aventura.ejs'), {
                products
            });
        });
    },
    'wellbeingShow': (req, res) => {
        db.products.findAll()
        .then((products) => {
            res.render(path.resolve(__dirname, '../views/grids/bienestar.ejs'), {
                products
            });
        });
    },
    'coursesShow': (req, res) => {
        db.products.findAll()
        .then((products) => {
            res.render(path.resolve(__dirname, '../views/grids/cursos.ejs'), {
                products
            });
        });
    },
    'entertainmentShow': (req, res) => {
        db.products.findAll()
        .then((products) => {
            res.render(path.resolve(__dirname, '../views/grids/entretenimiento.ejs'), {
                products
            });
        });    },
    'escapeShow': (req, res) => {
        db.products.findAll()
        .then((products) => {
            res.render(path.resolve(__dirname, '../views/grids/escapadas.ejs'), {
                products
            });
        });    },
    'gastronomyShow': (req, res) => {
        db.products.findAll()
        .then((products) => {
            res.render(path.resolve(__dirname, '../views/grids/gastronomia.ejs'), {
                products
            });
        });    },
};

module.exports = gridController;