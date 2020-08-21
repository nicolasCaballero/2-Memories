const db = require('../../db/models');


let loginAdminMiddleware = (req, res, next) => {
    res.locals.loggedInAdminUser = false;
    if (req.session.loggedInAdminUser) {
        res.locals.loggedInAdminUser = req.session.loggedInAdminUser;
        return next();
    } else if (req.cookies.remembermeAdmin) {
        db.AdminUsers.findOne({
                where: {
                    email: req.cookies.remembermeAdmin
                }
            })
            .then(user => {
                req.session.loggedInAdminUser = user;
                res.locals.loggedInAdminUser = user;
                return next();
            });
    } else {
        return next();
    }
};

module.exports = loginAdminMiddleware;