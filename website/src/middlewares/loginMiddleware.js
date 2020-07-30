const fs = require('fs');
const path = require('path');
const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/users.json')));

let loginMiddleware = (req, res, next) => {
    res.locals.loggedInUser = null;
    if (req.cookies.rememberme != 'undefined' && req.session.loggedInUser != 'undefined') {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == req.cookies.rememberme) {
                var userToLogIn = users[i];
            };
        };
        req.session.loggedInUser = userToLogIn;
        res.locals.loggedInUser = userToLogIn;
    };
    next();
};

module.exports = loginMiddleware;