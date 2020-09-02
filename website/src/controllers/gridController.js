const path = require('path');
const db = require('../db/models');
const Op = db.Sequelize.Op;
const toThousand = n =>n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");



let gridController = {
    'adventureShow': (req, res) => {
        db.products.findAll()
            .then((products) => {
                res.render(path.resolve(__dirname, '../views/grids/aventura.ejs'), {products, toThousand});
            });
    },
    'wellbeingShow': (req, res) => {
        db.products.findAll()
            .then((products) => {
                res.render(path.resolve(__dirname, '../views/grids/bienestar.ejs'), {
                    products, toThousand
                });
            });
    },
    'coursesShow': (req, res) => {
        db.products.findAll()
            .then((products) => {
                res.render(path.resolve(__dirname, '../views/grids/cursos.ejs'), {
                    products, toThousand
                });
            });
    },
    'entertainmentShow': (req, res) => {
        db.products.findAll()
            .then((products) => {
                res.render(path.resolve(__dirname, '../views/grids/entretenimiento.ejs'), {
                    products, toThousand
                });
            });
    },
    'escapeShow': (req, res) => {
        db.products.findAll()
            .then((products) => {
                res.render(path.resolve(__dirname, '../views/grids/escapadas.ejs'), {
                    products, toThousand
                });
            });
    },
    'gastronomyShow': (req, res) => {
        db.products.findAll()
            .then((products) => {
                res.render(path.resolve(__dirname, '../views/grids/gastronomia.ejs'), {
                    products, toThousand
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