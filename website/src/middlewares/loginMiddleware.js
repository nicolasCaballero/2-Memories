const fs = require('fs');
const path = require('path');
const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/users.json')));

let loginMiddleware = (req, res, next) => {
    next();
    if (req.cookies.rememberme != undefined && req.session.loggedInUser == undefined) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == req.cookies.rememberme) {
                userToLogIn = users[i];
                break;
            };
        };
        req.session.loggedInUser = userToLogIn;
    };
};

module.exports = loginMiddleware;