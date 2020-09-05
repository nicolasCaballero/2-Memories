const db = require('../db/models');


let loginMiddleware = (req, res, next) => {
    res.locals.loggedInUser = false;
    if (req.session.loggedInUser) {
        res.locals.loggedInUser = req.session.loggedInUser;
        return next();
    } else if (req.cookies.rememberme) {
        db.users.findOne({
                where: {
                    email: req.cookies.rememberme
                },
                force: true
            })
            .then(user => {
                req.session.loggedInUser = user;
                res.locals.loggedInUser = user;
                return next();
            });
    } else {
        return next();
    }
};

module.exports = loginMiddleware;