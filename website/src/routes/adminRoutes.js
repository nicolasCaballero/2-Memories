const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const adminController = require('../controllers/adminController');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/img/packs'));
    },
    filename: function (req, file, cb) {
      cb(null, 'plato' + '-' + Date.now()+ path.extname(file.originalname));
    }
  })
   
const upload= multer({ storage })

router.get('/admin', adminController.index);
router.get('/admin/login', adminController.login);
router.get('/admin/memoriesCreate', adminController.memoriesCreate);
router.get('/admin/experienceCreate', adminController.experienceCreate);
router.get('/admin/listado-memories', adminController.memoriesList);
module.exports = router;