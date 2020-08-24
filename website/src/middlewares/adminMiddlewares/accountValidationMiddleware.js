let accountValidationMiddleware = (req, res, next) => {
    if (req.session.loggedInAdminUser.id != req.params.id) {
        res.redirect('/admin/account/' + req.session.loggedInAdminUser.id);
    }
    next();
};

module.exports = accountValidationMiddleware;