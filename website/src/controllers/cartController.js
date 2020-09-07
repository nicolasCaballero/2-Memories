const path = require('path');
const db = require('../db/models');
const {validationResult} = require('express-validator');
const toThousand = n =>n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");

let cartController = {
    'addToCart': (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()) {
            db.products.findByPk(req.body.productSku,{
                include: [{association: 'productCategory'}]
            })
            .then((product) =>{
                let qty = 1;
                let subtotal = 0;
                if(product.price == product.specialPrice) {
                    subtotal = product.price
                } else {
                    subtotal = product.specialPrice
                }
                return db.items.create({
                    salePrice : product.price,
                    qty : qty,
                    subTotal : qty * subtotal,
                    state: 1,
                    userId: req.session.loggedInUser.id,
                    productSku: product.sku,
                    cartId: null
                })
                .then(items  => res.redirect('/detalle/' + product.sku + '?from=cartsucces'))
                .catch(error => console.log(error)) 
            })
        } else {
            db.products.findByPk(req.body.productSku,{include: [{association: 'productCategory'}]})
            .then((product) => {res.render(path.resolve(__dirname, '../views/admin/memoriesDetail.ejs'), {product});});
        }
    },
    'cart': (req, res) => {
        db.items.findAll({
            where : {
                state: 1,
                userId: req.session.loggedInUser.id
            },
            include: {
                all: true,
                nested: true
            }
        })        
        .then((items) => {
            let total = items.reduce((total, item) => (total = total + Number(item.subTotal)),0);
            res.render(path.resolve(__dirname, '../views/cart/cart.ejs'), {cartProducts :items, total, toThousand});
        })

    },
    'delete': (req, res) => {
        db.items.destroy({
            where: {
                id : req.body.cartId,
                userId : req.session.loggedInUser.id
            }
        })
        .then(()=> res.redirect('/carrito?from=cartdelete'))
        .catch(error => console.log(error))
    },
    'shop': (req, res) => {
        let totalPrice = 0;
        db.items.findAll({
            where: {
                userId: req.session.loggedInUser.id,
                state: 1
            }
        })
        .then(items =>{
            totalPrice = items.reduce((total, item) => (total = total + Number(item.subTotal)),0);
        })
        db.cart.findOne({
            order: [['createdAt','DESC']]
        })
        .then((cart)=>{
            return db.cart.create({
                orderNumber: cart ? cart.orderNumber + 1 : 1,
                total: totalPrice,
                userId: req.session.loggedInUser.id
            })
        })
        .then(cart =>{
            db.items.update({
                state: 0,
                cartId: cart.id
            },{
                where: {
                    userId: req.session.loggedInUser.id,
                    state: 1
                }
            }
            )
        })
        .then((cart)=> res.redirect('/mi-cuenta/ver/compras/' + req.session.loggedInUser.id))
        .catch(error => console.log(error))
    }
};

module.exports = cartController;