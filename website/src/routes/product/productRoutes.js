const express = require('express');
const router = express.Router();
const path = require('path');
const productController = require ('../../controllers/productController');

router.get('/detalle/:sku', productController.show);
router.get('/carrito/:sku', productController.addtoCart);
router.get('/experiencia/id', productController.experiencies);



module.exports = router;