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
    cb(null, path.resolve(__dirname, '../../../public/img/categorias'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

const upload = multer({
  storage
});

router.get('/admin/categories-create', adminController.categoriesCreate);
router.post('/admin/categories-create', upload.single('image'), adminController.categoriesSave);
router.get('/admin/categories-list', adminController.categoriesList);
router.get('/admin/categories/view/:id', adminController.categoriesShow);
router.get('/admin/categories/delete/:id', adminController.categoriesDelete);
router.get('/admin/categories/edit/:id', adminController.categoriesEdit);
router.put('/admin/categories/edit/:id', upload.single('image'), adminController.categoriesSaveEdit);

module.exports = router;