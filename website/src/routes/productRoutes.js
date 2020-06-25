const express = require('express');
const router = express.Router();
const path = require('path');
const productController = require ('../controllers/productController');

router.get('/detalle', productController.detail);
router.get('/detalle/agregar', productController.add);
router.get('/detalle/experiencias', productController.experiencies);



module.exports = router;