const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../controllers/adminController');

router.get('/admin', adminController.index);
router.get('/admin/memoriesCreate', adminController.memoriesCreate);
module.exports = router;