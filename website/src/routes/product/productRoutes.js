const express = require('express');
const router = express.Router();
const productController = require ('../../controllers/productController');
const notLoggedInMiddleware = require('../../middlewares/notLoggedInMiddleware');

router.get('/detalle/:sku', productController.show);
router.get('/experiencia/:id', productController.experiencies);

module.exports = router;