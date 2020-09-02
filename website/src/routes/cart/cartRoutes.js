const express = require('express');
const router = express.Router();
const cartController = require ('../../controllers/cartController');
const notLoggedInMiddleware = require('../../middlewares/notLoggedInMiddleware');

router.post('/carrito/agregar', notLoggedInMiddleware, cartController.addToCart);
router.post('/carrito/borrar', notLoggedInMiddleware, cartController.delete);
router.get('/carrito', notLoggedInMiddleware, cartController.cart)

module.exports = router;