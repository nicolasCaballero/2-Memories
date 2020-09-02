const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const userController = require('../../controllers/userController');
const loggedInMiddleware = require('../../middlewares/loggedInMiddleware');
const accountValidationMiddleware = require('../../middlewares/accountValidationMiddleware');
const notLoggedInMiddleware = require('../../middlewares/notLoggedInMiddleware');
const processLoginMiddleware = require('../../middlewares/accountMiddlewares/processLogin');
const accountCreationMiddleware = require('../../middlewares/accountMiddlewares/accountCreationMiddleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {cb(null, path.resolve(__dirname, '../../../public/img/users'));},
    filename: function (req, file, cb) {cb(null, file.originalname);}
});
const upload = multer({storage});

router.get('/login', userController.login);
router.post('/login', processLoginMiddleware, userController.processLogin);
router.get('/registro', loggedInMiddleware, userController.register);
router.post('/registro', accountCreationMiddleware, userController.create);
router.get('/users/list', userController.showAll),
router.get('/logout', userController.logout);
router.get('/mi-cuenta/ver/:id', notLoggedInMiddleware, accountValidationMiddleware, userController.usersShow);
router.put('/mi-cuenta/ver/:id', upload.single('photo'), userController.saveEdit);
router.get('/mi-cuenta/compras', userController.compras);
router.get('/mi-cuenta/compras/detalle', userController.comprasDetail);


module.exports = router;