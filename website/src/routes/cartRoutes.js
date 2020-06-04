const express = require('express');
const router = express.Router();
const path = require('path');
const cartController = require('../controllers/cartController');

router.get('/cart', cartController.detail);
router.get('/cart/add', cartController.add);
module.exports = router;