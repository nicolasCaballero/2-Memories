const path = require('path');

let userController = {
    'login': (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/login.ejs'));
    },
    'register': (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/register.ejs'));
    }
};

module.exports = userController;