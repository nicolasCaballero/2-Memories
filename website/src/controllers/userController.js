const path = require('path');

let userController = {
    'login': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/users/login.html'));
    },
    'register': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/users/register.html'));
    }
};

module.exports = userController;