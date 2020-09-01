const path = require('path');
const db = require('../db/models');
const {validationResult} = require('express-validator');

let cartController = {
    'addToCart': (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()) {
            db.products.findByPk(req.body.productSku,{
                include: [{association: 'productCategory'}]
            })
            .then((product) =>{
                let qty = 1;
                return db.items.create({
                    salePrice : product.price,
                    qty : qty,
                    subTotal : qty * product.price,
                    state: 1,
                    userId: req.session.loggedInUser.id,
                    productSku: product.sku,
                    cartId: null
                })
                .then(items  => res.redirect('/detalle/' + product.sku))
                .catch(error => console.log(error)) 
            })
        } else {
            db.products.findByPk(req.body.productSku,{include: [{association: 'productCategory'}]})
            .then((product) => {res.render(path.resolve(__dirname, '../views/admin/memoriesDetail.ejs'), {product});});
        }
    }
};

module.exports = cartController;