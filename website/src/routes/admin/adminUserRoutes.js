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
        cb(null, path.resolve(__dirname, '../../public/img/adminUsers'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({
    storage
});

router.get('/admin/login', adminController.login);
router.get('/admin/registro', adminController.register);
router.post('/admin/registro', [
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
], upload.single('image'), adminController.userCreate);
router.get('/admin/listado-users', adminController.usersList);
router.get('/admin/listado-users/view/:id', adminController.usersShow);
router.get('/admin/listado-users/delete/:id', adminController.usersDelete);
router.get('/admin/listado-users/edit/:id', adminController.userEdit);
router.put('/admin/listado-users/edit/:id', adminController.userSaveEdit);

module.exports = router;