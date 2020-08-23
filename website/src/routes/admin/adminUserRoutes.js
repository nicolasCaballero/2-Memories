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
db.AdminUsers.findAll()
    .then((users) => {
        router.post('/admin/login', [
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
        ], adminController.processLogin);
    });
router.get('/admin/register', adminController.register);
db.AdminUsers.findAll()
    .then((users) => {
        router.post('/admin/register', upload.single('photo'), [
            check('name').isAlpha().withMessage('El campo nombre solo debe contener letras de la A-Z'),
            check('name').isLength({
                min: 1
            }).withMessage('El campo nombre no puede estar vacío'),
            check('username').isAlpha().withMessage('El campo nombre de usuario solo debe contener letras de la A-Z'),
            check('username').isLength({
                min: 1
            }).withMessage('El campo nombre de usuario no puede estar vacío'),
            check('username').isLowercase().withMessage('El campo nombre de usuario no puede contener mayúsculas'),
            check('password', 'La contraseña debe contener al ménos 8 caracteres, una minúscula, un número y una mayúscula').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i'),
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

        ], adminController.userCreate)
    });
router.get('/admin/logout', adminController.logout);
router.get('/admin/users/list', adminRoleMiddleware, adminController.usersList);
router.get('/admin/users/list/view/:id', adminController.usersShow);
router.get('/admin/users/list/delete/:id', adminRoleMiddleware, adminController.usersDelete);
router.get('/admin/users/list/edit/:id', adminRoleMiddleware, adminController.userEdit);
router.put('/admin/users/list/edit/:id', upload.single('photo'), adminRoleMiddleware, adminController.userSaveEdit);

module.exports = router;