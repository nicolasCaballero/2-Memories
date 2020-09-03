const path = require('path');
const bcrypt = require('bcrypt');
const {check, validationResult, body} = require('express-validator');
const db = require('../db/models');
const { reset } = require('nodemon');
const toThousand = n =>n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");

let userController = {
    'login': (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/login.ejs'));
    },
    'processLogin': (req, res, next) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            db.users.findOne({
                    where: {
                        email: req.body.email
                    }
                })
                .then((userToLogIn) => {
                    delete userToLogIn.password
                    req.session.loggedInUser = userToLogIn
                    if (req.body.remember) {
                        res.cookie('rememberme', userToLogIn.email, {
                            maxAge: 1000 * 60 * 60 * 24
                        })
                    }
                    return res.redirect('/')
                })
        } else {
            res.render(path.resolve(__dirname, '../views/users/login.ejs'), {
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
        res.cookie('rememberme', null, {
            maxAge: -1
        });
        res.redirect('/');
    },
    'showAll': (req, res) => {
        db.users.findAll()
            .then((users) => {
                res.send(users);
            })
            .catch(error => {res.send})
    },
    'register': (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/register.ejs'));
    },
    'create': (req, res, next) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            db.users.create({
                    name: req.body.name,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10)
                })
                .then((newUser) => {
                    res.redirect('/login')
                })
                .catch(error => console.log(error));
        } else {
            res.render(path.resolve(__dirname, '../views/users/register.ejs'), {
                Title: 'Login',
                usuarioMail: req.body.email,
                password: req.body.password,
                old: req.body,
                errors: errors.mapped()
            });
        }
    },
    'usersShow': (req, res) => {
        db.users.findByPk(req.params.id)
            .then((user) => {
                res.render(path.resolve(__dirname, '../views/users/miCuenta.ejs'), {
                    user
                });
            })
    },
    'saveEdit': (req, res) => {
        db.users.update({
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            photo: req.file ? req.file.filename : req.body.oldImage,
        }, {
            where: {
                id: req.params.id
            }
        });
        res.redirect('/mi-cuenta/ver/' + req.params.id);
    },
    'ordersDetail': (req, res) => {
        db.cart.findByPk(req.params.cartId, {
            include : {
                all: true,
                nested: true
            }
        })
        .then((cart) =>{
            // res.send(cart)
            res.render(path.resolve(__dirname, '../views/users/comprasDetail.ejs'), {cart, toThousand} );
        })
    },
    'history': (req, res) => {
        db.cart.findAll({
            where: {
                userId : req.session.loggedInUser.id
            },
            include: {
                all: true,
                nested: true
            }
        })
        .then(carts =>{
            res.render(path.resolve(__dirname, '../views/users/compras.ejs'), {carts, toThousand});
            // res.send(carts)
        })
    },
    'redeem': (req, res) => {
        db.cart.findByPk(req.params.cartId, {
            where: {
                userId : req.session.loggedInUser.id
            },
            include: {
                all: true,
                nested: true
            }
        })
        .then(cart =>{
            res.render(path.resolve(__dirname, '../views/users/redencionMemories.ejs'), {cart, toThousand});
            // res.send(carts)
        })
    }
};

module.exports = userController;