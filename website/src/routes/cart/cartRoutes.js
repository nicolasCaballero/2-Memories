const express = require('express');
const router = express.Router();
const cartController = require ('../../controllers/cartController');
const notLoggedInMiddleware = require('../../middlewares/notLoggedInMiddleware');

router.post('/carrito/agregar', notLoggedInMiddleware, cartController.addToCart);

module.exports = router;