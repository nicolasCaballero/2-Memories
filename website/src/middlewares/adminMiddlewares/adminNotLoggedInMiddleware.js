let adminNotLoggedInMiddleware = (req, res, next) => {
    if (!req.session.loggedInAdminUser) {
        res.redirect('/admin/login');
    }
    next();
};

module.exports = adminNotLoggedInMiddleware;