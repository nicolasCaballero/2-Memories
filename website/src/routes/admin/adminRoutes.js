const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const adminController = require('../../controllers/adminController');
const {
  check,
  validationResult,
  body
} = require('express-validator');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../public/img/packs'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

const upload = multer({
  storage
});

router.get('/admin', adminController.index);
router.get('/admin/memoriesCreate', adminController.memoriesCreate);
router.post('/admin/memoriesCreate', upload.single('image'), adminController.memoriesSave);
router.get('/admin/listado-memories', adminController.memoriesList);
router.get('/admin/listado-memories/view/:sku', adminController.memoriesShow);
router.get('/admin/listado-memories/delete/:sku', adminController.memoriesDelete);
router.get('/admin/listado-memories/edit/:sku', adminController.memoriesEdit);
router.put('/admin/listado-memories/edit/:sku', upload.single('image'), adminController.memoriesSaveEdit);
router.get('/admin/experienceCreate', adminController.experienceCreate);

module.exports = router;