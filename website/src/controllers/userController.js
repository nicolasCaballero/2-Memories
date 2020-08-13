const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const {
    check,
    validationResult,
    body
} = require('express-validator');


let userController = {
    'login': (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/login.ejs'));
    },
    'processLogin': (req, res, next) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/users.json')));
            for (let i = 0; i < users.length; i++) {
                if (users[i].email == req.body.email) {
                    if (bcrypt.compareSync(req.body.password, users[i].password)) {
                        var userToLogIn = users[i];
                        break;
                    };
                };
            };
            if (userToLogIn == undefined) {
                return res.render(path.resolve(__dirname, '../views/users/login.ejs'), {
                    Title: 'Login',
                    usuarioMail: req.body.email,
                    password: req.body.password,
                    old: req.body,
                    errors: errors.mapped()
                });
            };
            req.session.loggedInUser = userToLogIn;
            if (req.body.remember != undefined) {
                res.cookie('rememberme', userToLogIn.email, {
                    maxAge: 1000 * 60 * 60 * 24
                });
            };
            res.redirect('/');
        } else {

            return res.render(path.resolve(__dirname, '../views/users/login.ejs'), {
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
        res.cookie('rememberme',null,{maxAge: -1});
        res.redirect('/');
    },
    'register': (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/register.ejs'));
    },
    'create': (req, res, next) => {
        let completeUsers = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/users.json')));
        let lastUserId = completeUsers.pop();
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let user = {
                id: lastUserId.id + 1,
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            }
            let archivoUsers = fs.readFileSync(path.resolve(__dirname, '../models/users.json'), {
                encoding: 'utf-8'
            });
            let users = [];
            if (archivoUsers == "") {
                users = [];
            } else {
                users = JSON.parse(archivoUsers);
            };

            users.push(user);
            usersJSON = JSON.stringify(users, null, 2);
            fs.writeFileSync(path.resolve(__dirname, '../models/users.json'), usersJSON);
            res.redirect('/mi-cuenta/ver/' + user.id);
        } else {
            return res.render(path.resolve(__dirname, '../views/users/register'), {
                old: req.body,
                errors: errors.errors
            });
        }
    },
    'usersShow': (req, res) => {
        let completeUsers = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/users.json')));
        let userId = req.params.id;
        let user = completeUsers.find(u => u.id == userId);
        res.render(path.resolve(__dirname, '../views/users/miCuenta.ejs'), {
            user
        });
    },
    'saveEdit': (req, res) => {
        let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/users.json')));
        req.body.id = req.params.id;
        let userUpdate = users.map(u => {
            if (u.id == req.body.id) {
                u.name = req.body.name,
                    u.lastName = req.body.lastName,
                    u.email = req.body.email,
                    u.password = req.body.password,
                    u.image = req.file ? req.file.filename : u.image
            }
            return u;
        });
        usersJSON = JSON.stringify(userUpdate, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../models/users.json'), usersJSON);
        res.redirect('/mi-cuenta/ver/' + req.params.id);
    }
};

module.exports = userController;