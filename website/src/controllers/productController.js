const path = require('path');
const db = require('../db/models');
const toThousand = n =>n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");


let productController = {
    'show': (req, res) => {
        db.products.findByPk(req.params.sku, {
                include: [{
                    association: 'productExperiences'
                }]
            })
            .then((product) => {
                res.render(path.resolve(__dirname, '../views/product/productDetail.ejs'), {product, toThousand});
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