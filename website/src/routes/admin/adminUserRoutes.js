const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const adminController = require('../../controllers/adminController');
const adminRoleMiddleware = require('../../middlewares/adminMiddlewares/adminRoleMiddleware');
const adminLoggedInMiddleware = require('../../middlewares/adminMiddlewares/adminLoggedInMiddleware');
const adminNotLoggedInMiddleware = require('../../middlewares/adminMiddlewares/adminNotLoggedInMiddleware');
const adminAccountValidationMiddleware = require('../../middlewares/adminMiddlewares/adminAccountValidationMiddleware');
const adminAccountCreationMiddleware = require('../../middlewares/adminMiddlewares/accountMiddlewares/adminAccountCreationMiddleware');
const adminProcessLoginMiddleware = require('../../middlewares/adminMiddlewares/accountMiddlewares/adminProcessLoginMiddleware');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {cb(null, path.resolve(__dirname, '../../../public/img/adminUsers'));},
    filename: function (req, file, cb) {cb(null, file.originalname);}
})
const upload = multer({storage});

router.get('/admin/login', adminLoggedInMiddleware, adminController.login);
router.post('/admin/login', adminProcessLoginMiddleware, adminController.processLogin);
router.get('/admin/register', adminController.register);
router.post('/admin/register', upload.single('photo'), adminAccountCreationMiddleware, adminController.userCreate);
router.get('/admin/logout', adminController.logout);
router.get('/admin/users/list', adminRoleMiddleware, adminController.usersList);
router.get('/admin/account/:id', adminNotLoggedInMiddleware, adminAccountValidationMiddleware, adminController.myAccount);
router.get('/admin/users/list/view/:id', adminController.usersShow);
router.get('/admin/users/list/delete/:id', adminRoleMiddleware, adminController.usersDelete);
router.get('/admin/users/list/edit/:id', adminRoleMiddleware, adminController.userEdit);
router.put('/admin/users/list/edit/:id', upload.single('photo'), adminRoleMiddleware, adminController.userSaveEdit);

module.exports = router;