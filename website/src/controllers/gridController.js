const path = require('path');

let gridController = {
    'adventureShow': (req, res) => {
        res.render(path.resolve(__dirname, '../views/grids/gastronomia.ejs'));
    },
    'wellbeingShow': (req, res) => {
        res.render(path.resolve(__dirname, '../views/grids/gastronomia.ejs'));
    },
    'coursesShow': (req, res) => {
        res.render(path.resolve(__dirname, '../views/grids/gastronomia.ejs'));
    },
    'entertainmentShow': (req, res) => {
        res.render(path.resolve(__dirname, '../views/grids/gastronomia.ejs'));
    },
    'escapeShow': (req, res) => {
        res.render(path.resolve(__dirname, '../views/grids/gastronomia.ejs'));
    },
    'gastronomyShow': (req, res) => {
        res.render(path.resolve(__dirname, '../views/grids/gastronomia.ejs'));
    },
};

module.exports = gridController;