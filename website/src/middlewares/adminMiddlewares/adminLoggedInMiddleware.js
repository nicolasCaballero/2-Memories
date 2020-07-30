let loggedInMiddleware = (req, res, next) => {
    if (req.session.loggedInAdminUser) {
        res.redirect('/');
    }
    next();
};

module.exports = adminLoggedInMiddleware;