const path = require('path');

let userController = {
    'login': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/users/login'));
    },
    'register': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/users/register'));
    }
};

module.exports = userController;