const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const adminController = require('../../controllers/adminController');
const adminNotLoggedInMiddleware = require('../../middlewares/adminMiddlewares/adminNotLoggedInMiddleware');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {cb(null, path.resolve(__dirname, '../../../public/img/packs'));},
  filename: function (req, file, cb) {cb(null, file.originalname);}
})

const upload = multer({storage});

router.get('/admin',adminNotLoggedInMiddleware, adminController.index);
router.get('/access/denied', adminController.denied);
router.get('/admin/memories/create', adminController.memoriesCreate);
router.post('/admin/memories/create', upload.single('image'), adminController.memoriesSave);
router.get('/admin/memories/list', adminController.memoriesList);
router.get('/admin/memories/list/view/:sku', adminController.memoriesShow);
router.get('/admin/memories/list/delete/:sku', adminController.memoriesDelete);
router.get('/admin/memories/list/edit/:sku', adminController.memoriesEdit);
router.put('/admin/memories/list/edit/:sku', upload.single('image'), adminController.memoriesSaveEdit);
router.get('/admin/orders/list',adminNotLoggedInMiddleware, adminController.ordersList);
router.get('/admin/orders/detail/:id', adminNotLoggedInMiddleware, adminController.ordersDetail);

module.exports = router;