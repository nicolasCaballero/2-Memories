const express = require('express');
const router = express.Router();
const path = require('path');
const mainController = require('../controllers/gridController');
const gridController = require('../controllers/gridController');

router.get('/gastronomia', gridController.show);
module.exports = router;