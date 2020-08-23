const path = require('path');
const bcrypt = require('bcrypt');
const {
    check,
    validationResult,
    body
} = require('express-validator');
const db = require('../db/models');


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
    }
};

module.exports = userController;