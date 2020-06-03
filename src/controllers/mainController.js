const path = require ('path');

let mainController = {
    'index': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/index/index.html'));
    },
    'about': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/index/nosotros.html'));
    },
    'help': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/index/ayuda.html'));
    },
    'tyc': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/index/tyc.html'));
    },
    'paymenths': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/index/paymenths.html'));
    },
    'contact': (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/index/contact.html'));
    }
};
module.exports = mainController;