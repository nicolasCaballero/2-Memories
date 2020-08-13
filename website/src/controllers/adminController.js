const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const {
    check,
    validationResult,
    body
} = require('express-validator');

const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/products.json')));
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
        res.redirect('/admin/categories-list');
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
                id:req.params.id
            }
        });
        res.redirect('/admin/categories-list');
    },
    'categoriesDelete': (req, res) => {
        db.categories.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/admin/categories-list');
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
        res.redirect('/admin/listado-memories');
    },
    'experienceCreate': (req, res) => {
        res.render(path.resolve(__dirname, '../views/admin/experienceCreate.ejs'));
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
                include: [{
                    association: 'productCategory'
                }]
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
        res.redirect('/admin/listado-memories');
    },
    'memoriesEdit': (req, res) => {
        let productRequest = db.products.findByPk(req.params.sku);
        let categoryRequest = db.categories.findAll();

        Promise.all([productRequest, categoryRequest])
            .then(([product, categories]) => {
                res.render(path.resolve(__dirname, '../views/admin/memoriesEdit.ejs'), {product, categories});
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
                sku:req.params.sku
            }
        });
        res.redirect('/admin/listado-memories');
    },
    'login': (req, res) => {
        res.render(path.resolve(__dirname, '../views/admin/login.ejs'));
    },
    'processLogin': (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/adminUsers.json')));
            for (let i = 0; i < users.length; i++) {
                if (users[i].email == req.body.email) {
                    if (bcrypt.compareSync(req.body.password, users[i].password)) {
                        var userToLogIn = users[i];
                        break;
                    };
                };
            };
            if (userToLogIn == undefined) {
                return res.render(path.resolve(__dirname, '../views/admin/login.ejs'), {
                    Title: 'Login',
                    usuarioMail: req.body.email,
                    password: req.body.password,
                    old: req.body,
                    errors: errors.mapped()
                });
            };
            req.session.loggedInAdminUser = userToLogIn;
            if (req.body.remember != undefined) {
                res.cookie('remembermeAdmin', userToLogIn.email, {
                    maxAge: 1000 * 60 * 60 * 24
                });
            };
            res.redirect('/admin');
        } else {

            return res.render(path.resolve(__dirname, '../views/admin/login.ejs'), {
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
        res.redirect('/admin');
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
            });
            res.redirect('/admin');
        } else {
            return res.render(path.resolve(__dirname, '../views/admin/register'), {
                errors: errors.errors
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
        let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/adminUsers.json')));
        let userId = req.params.id;
        let user = users.filter(u => u.id != userId);
        usersJSON = JSON.stringify(user, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../models/adminUsers.json'), usersJSON);
        res.redirect('/admin/listado-users');
    },
    'userEdit': (req, res) => {
        let adminUsers = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/adminUsers.json')));
        let adminId = req.params.id;
        let user = adminUsers.find(u => u.id == adminId);
        res.render(path.resolve(__dirname, '../views/admin/userEdit.ejs'), {
            user
        });
    },
    'userSaveEdit': (req, res) => {
        let adminUsers = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/adminUsers.json')));
        console.log('prueba: 1', req.body);
        req.body.id = req.params.id;
        let userUpdate = adminUsers.map(u => {
            if (u.id == req.body.id) {
                u.name = req.body.name,
                    u.username = req.body.username,
                    u.email = req.body.email,
                    u.photo = u.photo,
                    u.role = parseInt(req.body.role)
            }
            return u;
        });
        adminUsersJSON = JSON.stringify(userUpdate, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../models/adminUsers.json'), adminUsersJSON);
        res.redirect('/admin/listado-users');
    }
};

module.exports = adminController;