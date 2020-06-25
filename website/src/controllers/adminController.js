const path = require('path');

let adminController = {
    'index': (req, res) => {
        res.render(path.resolve(__dirname, '../views/admin/index.ejs'));
    },
    'memoriesCreate': (req, res) => {
        res.render(path.resolve(__dirname, '../views/admin/memoriesCreate.ejs'));
    },
    'experienceCreate': (req, res) => {
        res.render(path.resolve(__dirname, '../views/admin/experienceCreate.ejs'));
    }
};

module.exports = adminController;