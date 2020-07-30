let notLoggedInMiddleware = (req, res, next) => {
    if (!req.session.loggedInUser) {
        res.redirect('/login');
    }
    next();
};

module.exports = notLoggedInMiddleware;