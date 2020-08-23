const express = require('express');
const router = express.Router();
const path = require('path');
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
    });
router.get('/registro', loggedInMiddleware, userController.register);
db.users.findAll()
    .then((users) => {
        router.post('/registro', upload.single('image'), [
            check('name').isAlpha().withMessage('El nombre solo debe contener letras de la A-Z'),
            check('name').isLength({
                min: 1
            }).withMessage('El nombre no puede estar vacío'),
            check('lastName').isAlpha().withMessage('El apellido solo debe contener letras de la A-Z'),
            check('lastName').isLength({
                min: 1
            }).withMessage('El apellido no puede estar vacío'),
            check('password', 'La contraseña debe contener al ménos 6 caracteres, una minúscula, un número y una mayúscula').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/, 'i'),
            body('email').custom(value => {
                let counter = 0;
                for (let i = 0; i < users.length; i++) {
                    if (users[i].email == value) {
                        counter++;
                    }
                }
                if (counter > 0) {
                    return false;
                } else {
                    return true;
                }
            }).withMessage('El email ya se encuentra registrado'),
            body('photo').custom((value, {
                req
            }) => {
                let ext
                if (req.file = !undefined) {
                    return true;
                } else {
                    ext = '' + path.extname(req.files[0].filename).toLowerCase();
                }
                if (ext == '.jpg' || ext == '.jpeg' || ext == '.png' || ext == '.gif') {
                    return true;
                }
                return false;
            }).withMessage('Solo se aceptan archivos con extensión JPG, JPEG, PNG o GIF')

        ], userController.create)
    });
router.get('/logout', userController.logout);
router.get('/mi-cuenta/ver/:id', userController.usersShow);
router.put('/mi-cuenta/ver/:id', upload.single('image'), userController.saveEdit);


module.exports = router;