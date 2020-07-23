const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../../controllers/userController');
const {
    check,
    validationResult,
    body
} = require('express-validator');

router.get('/login', userController.login);
router.get('/registro', userController.register);
router.post('/registro', [
    check('name').isAlpha().withMessage('El campo nombre solo debe contener letras de la A-Z'),
    check('name').isLength({min: 1}).withMessage('El campo nombre no puede estár vacío'),
    check('lastName').isAlpha().withMessage('El campo apellido solo debe contener letras de la A-Z'),
    check('lastName').isLength({min: 1}).withMessage('El campo apellido no puede estár vacío'),
    check('email').isEmail().withMessage('Ingrese un email válido'),
    check('password').isLength({min: 8}).withMessage('La contraseña debe contener al menos 8 caracteres')
], userController.create);
router.get('/mi-cuenta/ver/:id', userController.usersShow);


module.exports = router;