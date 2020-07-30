const fs = require('fs');
const path = require('path');
const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../models/Adminusers.json')));

let loginAdminMiddleware = (req, res, next) => {
    res.locals.loggedInAdminUser = null;
    if (req.cookies.remembermeAdmin != 'undefined' && req.session.loggedInAdminUser != 'undefined') {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == req.cookies.remembermeAdmin) {
                var userToLogIn = users[i];
            };
        };
        req.session.loggedInAdminUser = userToLogIn;
        res.locals.loggedInAdminUser = userToLogIn;
    };
    next();
};

module.exports = loginAdminMiddleware;