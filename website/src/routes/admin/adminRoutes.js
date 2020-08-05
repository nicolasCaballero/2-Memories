const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const adminController = require('../../controllers/adminController');
const adminNotLoggedInMiddleware = require('../../middlewares/adminMiddlewares/adminNotLoggedInMiddleware');
const {
  check,
  validationResult,
  body
} = require('express-validator');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../../public/img/packs'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

const upload = multer({
  storage
});

router.get('/admin',adminNotLoggedInMiddleware, adminController.index);
router.get('/access-denied', adminController.denied);
router.get('/admin/experiences-create', adminController.experienceCreate);
router.get('/admin/memories-create', adminController.memoriesCreate);
router.post('/admin/memories-create', upload.single('image'), adminController.memoriesSave);
router.get('/admin/listado-memories', adminController.memoriesList);
router.get('/admin/listado-memories/view/:sku', adminController.memoriesShow);
router.get('/admin/listado-memories/delete/:sku', adminController.memoriesDelete);
router.get('/admin/listado-memories/edit/:sku', adminController.memoriesEdit);
router.put('/admin/listado-memories/edit/:sku', upload.single('image'), adminController.memoriesSaveEdit);

module.exports = router;