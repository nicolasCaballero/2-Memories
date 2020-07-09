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
      cb(null, file.originalname);
    }
  })
   
const upload = multer({ storage });

router.get('/admin', adminController.index);
router.get('/admin/login', adminController.login);
router.get('/admin/memoriesCreate', adminController.memoriesCreate);
router.post('/admin/memoriesCreate', upload.single('image') ,adminController.memoriesSave);
router.get('/admin/experienceCreate', adminController.experienceCreate);
router.get('/admin/listado-memories', adminController.memoriesList);
router.get('/admin/listado-memories/view/:sku', adminController.show);
router.get('/admin/listado-memories/delete/:sku', adminController.delete);
router.get('/admin/listado-memories/edit/:sku', adminController.edit);
router.put('/admin/listado-memories/edit/:sku', adminController.saveEdit);

module.exports = router;