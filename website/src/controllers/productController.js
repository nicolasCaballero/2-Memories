const path = require('path');
const db = require('../db/models');

let productController = {
    'show': (req, res) => {
        db.products.findByPk(req.params.sku, {
                include: [{
                    association: 'productExperiences'
                }]
            })
            .then((product) => {
                res.render(path.resolve(__dirname, '../views/product/productDetail.ejs'), {
                    product
                });
            });
    },
    'experiencies': (req, res) => {
        db.experiences.findByPk(req.params.id)
            .then((experience) => {
                res.render(path.resolve(__dirname, '../views/product/experiences.ejs'), {
                    experience
                });
            });
    }
};

module.exports = productController;