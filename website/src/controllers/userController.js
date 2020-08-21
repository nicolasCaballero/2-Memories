const path = require('path');
const fs = require('fs');
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
        db.users.findAll()
            .then((user) => {
                let errors = validationResult(req);
                let userToLogIn;
                userToLogIn = user.filter((u) => {
                    return u.email == req.body.email && bcrypt.compareSync(req.body.password, u.password)
                });
                if (userToLogIn == "") {
                    res.render(path.resolve(__dirname, '../views/users/login.ejs'), {
                        Title: 'Login',
                        usuarioMail: req.body.email,
                        password: req.body.password,
                        old: req.body,
                        errors: errors.mapped()
                    });
                } else {
                    req.session.loggedInUser = userToLogIn[0];
                }
                if (req.body.remember) {
                    res.cookie('rememberme', userToLogIn[0].email, {
                        maxAge: 1000 * 60 * 60 * 24
                    })
                }
                return res.redirect('/');

            });
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
        } else {
            return res.render(path.resolve(__dirname, '../views/users/register'), {
                old: req.body,
                errors: errors.errors
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