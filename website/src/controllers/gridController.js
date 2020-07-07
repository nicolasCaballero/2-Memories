const path = require('path');
const fs = require('fs');

const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/products.json')));

let gridController = {
    'adventureShow': (req, res) => {
        res.render(path.resolve(__dirname, '../views/grids/aventura.ejs'),{products});
    },
    'wellbeingShow': (req, res) => {
        res.render(path.resolve(__dirname, '../views/grids/bienestar.ejs'),{products});
    },
    'coursesShow': (req, res) => {
        res.render(path.resolve(__dirname, '../views/grids/cursos.ejs'),{products});
    },
    'entertainmentShow': (req, res) => {
        res.render(path.resolve(__dirname, '../views/grids/entretenimiento.ejs'),{products});
    },
    'escapeShow': (req, res) => {
        res.render(path.resolve(__dirname, '../views/grids/escapadas.ejs'),{products});
    },
    'gastronomyShow': (req, res) => {
        res.render(path.resolve(__dirname, '../views/grids/gastronomia.ejs'),{products});
    },
};

module.exports = gridController;