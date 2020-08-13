let adminLoggedInMiddleware = (req, res, next) => {
    if (req.session.loggedInAdminUser) {
        res.redirect('/admin');
    }
    next();
};

module.exports = adminLoggedInMiddleware;