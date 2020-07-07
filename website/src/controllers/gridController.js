const path = require('path');

let gridController = {
    'adventureShow': (req, res) => {
        res.render(path.resolve(__dirname, '../views/grids/aventura.ejs'));
    },
    'wellbeingShow': (req, res) => {
        res.render(path.resolve(__dirname, '../views/grids/bienestar.ejs'));
    },
    'coursesShow': (req, res) => {
        res.render(path.resolve(__dirname, '../views/grids/cursos.ejs'));
    },
    'entertainmentShow': (req, res) => {
        res.render(path.resolve(__dirname, '../views/grids/entretenimiento.ejs'));
    },
    'escapeShow': (req, res) => {
        res.render(path.resolve(__dirname, '../views/grids/escapadas.ejs'));
    },
    'gastronomyShow': (req, res) => {
        res.render(path.resolve(__dirname, '../views/grids/gastronomia.ejs'));
    },
};

module.exports = gridController;