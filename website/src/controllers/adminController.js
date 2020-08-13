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
                res.render(path.resolve(__dirname, '../views/admin/categoriesEdit.ejs'), {category});
            })
    },
    'categoriesSaveEdit': (req, res) => {
        let categories = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/categories.json')));
        req.body.id = req.params.id;
        let categoriesUpdate = categories.map(c => {
            if (c.id == req.body.id) {
                c.category = req.body.category,
                    c.image = c.image,
                    c.visibility = req.body.visibility
            }
            return c;
        });
        categorieJSON = JSON.stringify(categoriesUpdate, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../models/categories.json'), categorieJSON);
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
            special_price: parseInt(req.body.special_price),
            qty: parseInt(req.body.qty),
            categoryId: parseInt(req.body.categoryId)
        });
        res.redirect('/admin/listado-memories');
    },
    'experienceCreate': (req, res) => {
        res.render(path.resolve(__dirname, '../views/admin/experienceCreate.ejs'));
    },
    'memoriesList': (req, res) => {
        db.products.findAll()
            .then((products) => {
                res.render(path.resolve(__dirname, '../views/admin/memoriesList.ejs'), {
                    products
                });
            });
    },
    'memoriesShow': (req, res) => {
        db.products.findByPk(req.params.sku)
            .then((product) => {
                res.render(path.resolve(__dirname, '../views/admin/memoriesDetail.ejs'), {
                    product
                });
            });
        db.categories.findAll()
            .then((category) => {
                res.render(path.resolve(__dirname, '../views/admin/memoriesDetail.ejs'), {
                    category
                });
            });
    },
    'memoriesDelete': (req, res) => {
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/products.json')));
        let productId = req.params.sku;
        let product = products.filter(p => p.sku != productId);
        productsJSON = JSON.stringify(product, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../models/products.json'), productsJSON);
        res.redirect('/admin/listado-memories');
    },
    'memoriesEdit': (req, res) => {
        db.products.findByPk(req.params.sku)
            .then((product) => {
                res.render(path.resolve(__dirname, '../views/admin/memoriesEdit.ejs'), {
                    product
                });
            })
    },
    'memoriesSaveEdit': (req, res) => {
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/products.json')));
        req.body.sku = req.params.sku;
        let productUpdate = products.map(p => {
            if (p.sku == req.body.sku) {
                p.name = req.body.name,
                    p.description = req.body.description,
                    p.image = p.image,
                    p.visibility = req.body.visibility,
                    p.categories = req.body.categories,
                    p.price = parseInt(req.body.price),
                    p.special_price = parseInt(req.body.special_price),
                    p.qty = parseInt(req.body.qty)
            }
            return p;
        });
        productJSON = JSON.stringify(productUpdate, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../models/products.json'), productJSON);
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
        res.cookie('remembermeAdmin', null, { maxAge: -1 });
        res.redirect('/admin');
    },
    'register': (req, res) => {
        res.render(path.resolve(__dirname, '../views/admin/register.ejs'));
    },
    'userCreate': (req, res, next) => {
        let completeUsers = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/adminUsers.json')));
        let lastUserId = completeUsers.pop();
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