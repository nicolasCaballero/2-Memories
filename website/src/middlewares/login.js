const fs = require('fs');
const path = require('path');
const completeUsers = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/users.json')));

module.exports = (req, res, next) => {
    res.locals.user = false;
    if (req.session.user) {
        res.locals.user = req.session.user;
        return next();
    } else if (req.cookies.email) {
        let user = completeUsers.find(user => user.email == req.cookies.email)

        req.session.user = user;
        res.locals.user = user;
        return next();
    } else {
        return next();
    }
}