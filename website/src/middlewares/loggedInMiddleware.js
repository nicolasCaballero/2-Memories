let loggedInMiddleware = (req, res, next) => {
    if (req.session.loggedInUser) {
        res.redirect('/');
    }
    next();
};

module.exports = loggedInMiddleware;