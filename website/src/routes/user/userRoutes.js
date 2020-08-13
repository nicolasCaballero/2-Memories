const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const bcrypt = require('bcrypt');
const userController = require('../../controllers/userController');
const loggedInMiddleware = require('../../middlewares/loggedInMiddleware');
const db = require('../../db/models');


const {
    check,
    validationResult,
    body
} = require('express-validator');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../../public/img/users'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({
    storage
});

router.get('/login', userController.login);
db.users.findAll()
    .then((users) => {
        router.post('/login', [
            body('email').custom((value) => {
                for (let i = 0; i < users.length; i++) {
                    if (users[i].email == value) {
                        return true
                    }
                }
                return false
            }).withMessage('Usuario inexistente'),
            body('password').custom((value, {
                req
            }) => {
                for (let i = 0; i < users.length; i++) {
                    if (users[i].email == req.body.email) {
                        if (bcrypt.compareSync(value, users[i].password)) {
                            return true;
                        } else {
                            return false;
                        }
                    };
                };
            }).withMessage('Contraseña incorrecta'),
        ], userController.processLogin);
    })
router.get('/registro', loggedInMiddleware, userController.register);
db.users.findAll()
    .then((users) => {
        router.post('/registro', [
            // check('name').isAlpha().withMessage('El campo nombre solo debe contener letras de la A-Z'),
            // check('name').isLength({
            //     min: 1
            // }).withMessage('El campo nombre no puede estár vacío'),
            // check('lastName').isAlpha().withMessage('El campo apellido solo debe contener letras de la A-Z'),
            // check('lastName').isLength({
            //     min: 1
            // }).withMessage('El campo apellido no puede estár vacío'),
            // check('email').isEmail().withMessage('Ingrese un email válido'),
            // check('password').isLength({
            //     min: 8
            // }).withMessage('La contraseña debe contener al menos 8 caracteres'),
            body('passwordConfirmation').custom((value, {
                req
            }) => {
                if (req.body.password == value) {
                    return true
                } else {
                    return false
                }
            }).withMessage('Las contraseñas no coinciden'),
            body('email').custom(function (value) {
                for (let i = 0; i < users.length; i++) {
                    if (users[i].email == value) {
                        return false;
                    }
                }
                return true;

            }).withMessage('Este email ya se encuentra registrado!')
        ], userController.create);
    })
router.get('/logout', userController.logout);
router.get('/mi-cuenta/ver/:id', userController.usersShow);
router.put('/mi-cuenta/ver/:id', upload.single('image'), userController.saveEdit);


module.exports = router;