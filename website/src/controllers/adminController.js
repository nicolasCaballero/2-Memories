const path = require('path');
const bcrypt = require('bcryptjs');
const {
    check,
    validationResult,
    body
} = require('express-validator');

const db = require('../db/models');

let adminController = {
    'denied': (req, res) => {
        res.render(path.resolve(__dirname, '../views/admin/denied.ejs'));
    },
    'index': (req, res) => {
        res.render(path.resolve(__dirname, '../views/admin/index.ejs'));
    },
    'categoriesCreate': (req, res) => {
        res.render(path.resolve(__dirname, '../views/admin/categoriesCreate.ejs'));
    },
    'categoriesSave': (req, res) => {
        db.categories.create({
            name: req.body.name,
            image: req.file ? req.file.filename : "",
            visibility: req.body.visibility
        });
        res.redirect('/admin/categories/list');
    },
    'categoriesList': (req, res) => {
        db.categories.findAll()
            .then((categories) => {
                res.render(path.resolve(__dirname, '../views/admin/categoriesList.ejs'), {
                    categories
                });
            });
    },
    'categoriesShow': (req, res) => {
        db.categories.findByPk(req.params.id)
            .then((category) => {
                res.render(path.resolve(__dirname, '../views/admin/categoriesDetail.ejs'), {
                    category
                });
            });
    },
    'categoriesEdit': (req, res) => {
        db.categories.findByPk(req.params.id)
            .then((category) => {
                res.render(path.resolve(__dirname, '../views/admin/categoriesEdit.ejs'), {
                    category
                });
            })
    },
    'categoriesSaveEdit': (req, res) => {
        db.categories.update({
            name: req.body.name,
            image: req.file ? req.file.filename : req.body.oldImage,
            visibility: parseInt(req.body.visibility),
        }, {
            where: {
                id: req.params.id
            }
        });
        res.redirect('/admin/categories/list');
    },
    'categoriesDelete': (req, res) => {
        db.categories.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/admin/categories/list');
    },
    'memoriesCreate': (req, res) => {
        db.categories.findAll()
            .then((categories) => {
                return res.render(path.resolve(__dirname, '../views/admin/memoriesCreate.ejs'), {
                    categories
                });
            })
    },
    'memoriesSave': (req, res) => {
        db.products.create({
            name: req.body.name,
            description: req.body.description,
            image: req.file ? req.file.filename : "",
            visibility: parseInt(req.body.visibility),
            price: parseInt(req.body.price),
            specialPrice: parseInt(req.body.specialPrice),
            qty: parseInt(req.body.qty),
            categoryId: parseInt(req.body.categoryId)
        });
        res.redirect('/admin/memories/list');
    },
    'memoriesList': (req, res) => {
        db.products.findAll({
                include: [{
                    association: 'productCategory'
                }]
            })
            .then((products) => {
                res.render(path.resolve(__dirname, '../views/admin/memoriesList.ejs'), {
                    products
                });
            });
    },
    'memoriesShow': (req, res) => {
        db.products.findByPk(req.params.sku, {
                include: [{association: 'productCategory'},{association: 'productExperiences'}]
            })
            .then((product) => {
                res.render(path.resolve(__dirname, '../views/admin/memoriesDetail.ejs'), {
                    product
                });
            });
    },
    'memoriesDelete': (req, res) => {
        db.products.destroy({
            where: {
                sku: req.params.sku
            }
        })
        res.redirect('/admin/memories/list');
    },
    'memoriesEdit': (req, res) => {
        let productRequest = db.products.findByPk(req.params.sku);
        let categoryRequest = db.categories.findAll();

        Promise.all([productRequest, categoryRequest])
            .then(([product, categories]) => {
                res.render(path.resolve(__dirname, '../views/admin/memoriesEdit.ejs'), {
                    product,
                    categories
                });
            });
    },
    'memoriesSaveEdit': (req, res) => {
        db.products.update({
            name: req.body.name,
            description: req.body.description,
            image: req.file ? req.file.filename : req.body.oldImage,
            visibility: parseInt(req.body.visibility),
            price: parseInt(req.body.price),
            specialPrice: parseInt(req.body.specialPrice),
            qty: parseInt(req.body.qty),
            categoryId: parseInt(req.body.categoryId)
        }, {
            where: {
                sku: req.params.sku
            }
        });
        res.redirect('/admin/memories/list');
    },
    'experiencesList': (req, res) => {
        db.experiences.findAll()
            .then((experiences) => {
                res.render(path.resolve(__dirname, '../views/admin/experiencesList.ejs'), {
                    experiences
                });
            })
    },
    'experienceShow': (req, res) => {
        db.experiences.findByPk(req.params.id, {
                include: [{
                    association: 'experienceProducts'
                }]
            })
            .then(experience => {
                res.render(path.resolve(__dirname, '../views/admin/experienceDetail'), {
                    experience
                })
            })
    },
    'experienceDelete': (req, res) => {
        db.experiences.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/admin/experiences/list');
    },
    'experienceCreate': (req, res) => {
        db.products.findAll()
        .then((products) => {
            return res.render(path.resolve(__dirname, '../views/admin/experienceCreate.ejs'), {
                products
            });
        })
    },
    'experienceSave': (req, res) => {
        db.experiences.create({
            name: req.body.name,
            description: req.body.description,
            image: req.file ? req.file.filename : "",
            include: req.body.include,
            website: req.body.website,
            productSku: parseInt(req.body.productSku)
        });
        res.redirect('/admin/experiences/list');
    },
    'login': (req, res) => {
        res.render(path.resolve(__dirname, '../views/admin/login.ejs'));
    },
    'processLogin': (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            db.AdminUsers.findOne({
                    where: {
                        email: req.body.email
                    }
                })
                .then((userToLogIn) => {
                    delete userToLogIn.password
                    req.session.loggedInAdminUser = userToLogIn
                    if (req.body.remember) {
                        res.cookie('remembermeAdmin', userToLogIn.email, {
                            maxAge: 1000 * 60 * 60 * 24
                        })
                    }
                    return res.redirect('/admin')
                })
        } else {
            res.render(path.resolve(__dirname, '../views/admin/login.ejs'), {
                Title: 'Login',
                usuarioMail: req.body.email,
                password: req.body.password,
                old: req.body,
                errors: errors.mapped()
            });
        }
    },
    'logout': (req, res) => {
        req.session.destroy();
        res.cookie('remembermeAdmin', null, {
            maxAge: -1
        });
        res.redirect('/admin/login');
    },
    'register': (req, res) => {
        res.render(path.resolve(__dirname, '../views/admin/register.ejs'));
    },
    'userCreate': (req, res, next) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            db.AdminUsers.create({
                    name: req.body.name,
                    username: req.body.username,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    role: parseInt(req.body.role),
                    photo: req.file ? req.file.filename : "",
                })
                .then((newUser) => {
                    res.redirect('/admin')
                })
        } else {
            res.render(path.resolve(__dirname, '../views/admin/register.ejs'), {
                Title: 'Login',
                usuarioMail: req.body.email,
                password: req.body.password,
                old: req.body,
                errors: errors.mapped()
            });
        }

    },
    'usersList': (req, res) => {
        db.AdminUsers.findAll()
            .then((adminUsers) => {
                res.render(path.resolve(__dirname, '../views/admin/usersList.ejs'), {
                    adminUsers
                });
            });
    },
    'usersShow': (req, res) => {
        db.AdminUsers.findByPk(req.params.id)
            .then((user) => {
                res.render(path.resolve(__dirname, '../views/admin/userDetail.ejs'), {
                    user
                });
            });
    },
    'usersDelete': (req, res) => {
        db.AdminUsers.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/admin/users/list');
    },
    'userEdit': (req, res) => {
        db.AdminUsers.findByPk(req.params.id)
            .then((user) => {
                res.render(path.resolve(__dirname, '../views/admin/userEdit.ejs'), {
                    user
                });
            });
    },
    'userSaveEdit': (req, res) => {
        db.AdminUsers.update({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            role: parseInt(req.body.role),
            photo: req.file ? req.file.filename : req.body.oldImage,

        }, {
            where: {
                id: req.params.id
            }
        });
        res.redirect('/admin/users/list');

    }
};

module.exports = adminController;