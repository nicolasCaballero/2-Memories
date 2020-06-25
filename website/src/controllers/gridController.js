const path = require('path');

let gridController = {
    'show': (req, res) => {
        res.render(path.resolve(__dirname, '../views/grids/gastronomia.ejs'));
    }
};

module.exports = gridController;