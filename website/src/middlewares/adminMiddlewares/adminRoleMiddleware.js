let adminRoleMiddleware = (req, res, next) => {
    if (req.session.loggedInAdminUser && req.session.loggedInAdminUser.role == 2) {
        res.redirect('/access/denied');
    }
    next();
};

module.exports = adminRoleMiddleware;