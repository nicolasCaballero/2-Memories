const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcrypt');
const adminController = require('../../controllers/adminController');
const adminRoleMiddleware = require('../../middlewares/adminMiddlewares/adminRoleMiddleware');
const adminLoggedInMiddleware = require('../../middlewares/adminMiddlewares/adminLoggedInMiddleware');
const db = require('../../db/models');
const {
    check,
    validationResult,
    body
} = require('express-validator');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../../public/img/adminUsers'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({
    storage
});

router.get('/admin/login', adminLoggedInMiddleware, adminController.login);
router.post('/admin/login', [
        check('email').isEmail().withMessage('Email incorrecto'),
        check('password').isLength({ min: 6}).withMessage('La contraseña debe contener al menos 6 caracteres')
        ], adminController.processLogin);
router.get('/admin/register', adminController.register);
router.post('/admin/register', upload.single('photo'), [
    check('name').isAlpha().withMessage('El campo name solo debe contener letras de la A-Z'),
    check('name').isLength({
        min: 1
    }).withMessage('El campo name no puede estár vacío'),
    check('username').isAlpha().withMessage('El campo username solo debe contener letras de la A-Z'),
    check('username').isLength({
        min: 1
    }).withMessage('El campo username no puede estár vacío'),
    check('username').isLowercase().withMessage('El campo username no puede contener mayúsculas'),
    check('email').isEmail().withMessage('Ingrese un email válido'),
    check('password').isLength({
        min: 8
    }).withMessage('La contraseña debe contener al menos 8 caracteres')
], adminController.userCreate);
router.get('/admin/logout', adminController.logout);
router.get('/admin/users/list', adminRoleMiddleware, adminController.usersList);
router.get('/admin/users/list/view/:id', adminController.usersShow);
router.get('/admin/users/list/delete/:id', adminRoleMiddleware, adminController.usersDelete);
router.get('/admin/users/list/edit/:id', adminRoleMiddleware, adminController.userEdit);
router.put('/admin/users/list/edit/:id', upload.single('photo'), adminRoleMiddleware, adminController.userSaveEdit);

module.exports = router;