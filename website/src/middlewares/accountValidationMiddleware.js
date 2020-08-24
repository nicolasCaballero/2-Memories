let accountValidationMiddleware = (req, res, next) => {
    if (req.session.loggedInUser.id != req.params.id) {
        res.redirect('/mi-cuenta/ver/' + req.session.loggedInUser.id);
    }
    next();
};

module.exports = accountValidationMiddleware;