const path = require('path');
const db = require('../db/models');
const Op = db.Sequelize.Op;


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
            });
    },
    'escapeShow': (req, res) => {
        db.products.findAll()
            .then((products) => {
                res.render(path.resolve(__dirname, '../views/grids/escapadas.ejs'), {
                    products
                });
            });
    },
    'gastronomyShow': (req, res) => {
        db.products.findAll()
            .then((products) => {
                res.render(path.resolve(__dirname, '../views/grids/gastronomia.ejs'), {
                    products
                });
            });
    },
    'search': (req, res) => {
        db.products.findAll({
                where: {
                    description: {
                        [Op.like]: `%${req.query.search}%`
                    }
                }
            })
            .then(result => {
                res.render(path.resolve(__dirname, '../views/grids/search.ejs'), {result});
            })
            .catch(error => res.send(error))
    },
};

module.exports = gridController;