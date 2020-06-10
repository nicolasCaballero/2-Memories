const path = require ('path');

let mainController = {
    'index': (req, res) => {
        res.render(path.resolve(__dirname, '../views/index/index.ejs'));
    },
    'about': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/index/nosotros.ejs'));
    },
    'help': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/index/ayuda.ejs'));
    },
    'tyc': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/index/tyc.ejs'));
    },
    'paymenths': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/index/paymenths.ejs'));
    },
    'contact': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/index/contact.ejs'));
    }
};
module.exports = mainController;