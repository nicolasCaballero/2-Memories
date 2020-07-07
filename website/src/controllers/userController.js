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
            res.redirect('/');
        } else {
            return res.render(path.resolve(__dirname, '../views/users/register'), {
                errors: errors.errors
            });
        }
    }
};

module.exports = userController;