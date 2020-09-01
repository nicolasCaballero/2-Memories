const db = require('../db/models');

module.exports = (req, res, next) => {
    if (req.session.loggedInUser) {
        db.items.findAndCountAll({
                where: {
                    userId: req.session.loggedInUser.id,
                    state: 1
                },
                force: true
            })
            .then(data => {
                res.locals.cartQty = data.count;
                return next();
            })
    } else {
        return next();
    }
};