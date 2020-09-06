const path = require('path');
const db = require('../db/models');
const Op = db.Sequelize.Op;
const toThousand = n =>n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");



let gridController = {
    'adventureShow': (req, res) => {
        switch (req.params.order) {
            case 'az':
                db.products.findAll({
                    order: [
                        ['name', 'ASC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/aventura.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'za':
                db.products.findAll({
                    order: [
                        ['name', 'DESC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/aventura.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'lowest':
                db.products.findAll({
                    order: [
                        ['price', 'ASC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/aventura.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'highest':
            db.products.findAll({
                order: [
                    ['price', 'DESC']
                ]
            })
            .then((products) => {
                res.render(path.resolve(__dirname, '../views/grids/aventura.ejs'), {
                    products, toThousand
                });
            });
            break;
            default:
                db.products.findAll()
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/aventura.ejs'), {
                        products, toThousand
                    });
                });
                break;
        }
    },
    'wellbeingShow': (req, res) => {
        switch (req.params.order) {
            case 'az':
                db.products.findAll({
                    order: [
                        ['name', 'ASC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/bienestar.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'za':
                db.products.findAll({
                    order: [
                        ['name', 'DESC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/bienestar.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'lowest':
                db.products.findAll({
                    order: [
                        ['price', 'ASC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/bienestar.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'highest':
            db.products.findAll({
                order: [
                    ['price', 'DESC']
                ]
            })
            .then((products) => {
                res.render(path.resolve(__dirname, '../views/grids/bienestar.ejs'), {
                    products, toThousand
                });
            });
            break;
            default:
                db.products.findAll()
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/bienestar.ejs'), {
                        products, toThousand
                    });
                });
                break;
        }
    },
    'coursesShow': (req, res) => {
        switch (req.params.order) {
            case 'az':
                db.products.findAll({
                    order: [
                        ['name', 'ASC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/cursos.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'za':
                db.products.findAll({
                    order: [
                        ['name', 'DESC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/cursos.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'lowest':
                db.products.findAll({
                    order: [
                        ['price', 'ASC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/cursos.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'highest':
            db.products.findAll({
                order: [
                    ['price', 'DESC']
                ]
            })
            .then((products) => {
                res.render(path.resolve(__dirname, '../views/grids/cursos.ejs'), {
                    products, toThousand
                });
            });
            break;
            default:
                db.products.findAll()
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/cursos.ejs'), {
                        products, toThousand
                    });
                });
                break;
        }
    },
    'entertainmentShow': (req, res) => {
        switch (req.params.order) {
            case 'az':
                db.products.findAll({
                    order: [
                        ['name', 'ASC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/entretenimiento.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'za':
                db.products.findAll({
                    order: [
                        ['name', 'DESC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/entretenimiento.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'lowest':
                db.products.findAll({
                    order: [
                        ['price', 'ASC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/entretenimiento.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'highest':
            db.products.findAll({
                order: [
                    ['price', 'DESC']
                ]
            })
            .then((products) => {
                res.render(path.resolve(__dirname, '../views/grids/entretenimiento.ejs'), {
                    products, toThousand
                });
            });
            break;
            default:
                db.products.findAll()
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/entretenimiento.ejs'), {
                        products, toThousand
                    });
                });
                break;
        }
    },
    'escapeShow': (req, res) => {
        switch (req.params.order) {
            case 'az':
                db.products.findAll({
                    order: [
                        ['name', 'ASC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/escapadas.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'za':
                db.products.findAll({
                    order: [
                        ['name', 'DESC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/escapadas.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'lowest':
                db.products.findAll({
                    order: [
                        ['price', 'ASC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/escapadas.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'highest':
            db.products.findAll({
                order: [
                    ['price', 'DESC']
                ]
            })
            .then((products) => {
                res.render(path.resolve(__dirname, '../views/grids/escapadas.ejs'), {
                    products, toThousand
                });
            });
            break;
            default:
                db.products.findAll()
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/escapadas.ejs'), {
                        products, toThousand
                    });
                });
                break;
        }
    },
    'gastronomyShow': (req, res) => {
        switch (req.params.order) {
            case 'az':
                db.products.findAll({
                    order: [
                        ['name', 'ASC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/gastronomia.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'za':
                db.products.findAll({
                    order: [
                        ['name', 'DESC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/gastronomia.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'lowest':
                db.products.findAll({
                    order: [
                        ['price', 'ASC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/gastronomia.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'highest':
            db.products.findAll({
                order: [
                    ['price', 'DESC']
                ]
            })
            .then((products) => {
                res.render(path.resolve(__dirname, '../views/grids/gastronomia.ejs'), {
                    products, toThousand
                });
            });
            break;
            default:
                db.products.findAll()
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/gastronomia.ejs'), {
                        products, toThousand
                    });
                });
                break;
        }
    },
    'varieties': (req, res) => {
        switch (req.params.order) {
            case 'az':
                db.products.findAll({
                    order: [
                        ['name', 'ASC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/variedades.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'za':
                db.products.findAll({
                    order: [
                        ['name', 'DESC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/variedades.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'lowest':
                db.products.findAll({
                    order: [
                        ['price', 'ASC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/variedades.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'highest':
            db.products.findAll({
                order: [
                    ['price', 'DESC']
                ]
            })
            .then((products) => {
                res.render(path.resolve(__dirname, '../views/grids/variedades.ejs'), {
                    products, toThousand
                });
            });
            break;
            default:
                db.products.findAll()
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/variedades.ejs'), {
                        products, toThousand
                    });
                });
                break;
        }
    },
    'search': (req, res) => {
        db.experiences.findAll({
                where: {
                    description: {
                        [Op.like]: `%${req.query.search}%`
                    }
                },
                include : {
                    all: true,
                    nested: true
                }
            })
            .then(result => {
                res.render(path.resolve(__dirname, '../views/grids/search.ejs'), {result});
            })
            .catch(error => res.send(error))
    },
    'seeAll': (req, res) => {
        switch (req.params.order) {
            case 'az':
                db.products.findAll({
                    order: [
                        ['name', 'ASC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/allProducts.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'za':
                db.products.findAll({
                    order: [
                        ['name', 'DESC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/allProducts.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'lowest':
                db.products.findAll({
                    order: [
                        ['price', 'ASC']
                    ]
                })
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/allProducts.ejs'), {
                        products, toThousand
                    });
                });
                break;
            case 'highest':
            db.products.findAll({
                order: [
                    ['price', 'DESC']
                ]
            })
            .then((products) => {
                res.render(path.resolve(__dirname, '../views/grids/allProducts.ejs'), {
                    products, toThousand
                });
            });
            break;
            default:
                db.products.findAll()
                .then((products) => {
                    res.render(path.resolve(__dirname, '../views/grids/allProducts.ejs'), {
                        products, toThousand
                    });
                });
                break;
        }
    }
};

module.exports = gridController;