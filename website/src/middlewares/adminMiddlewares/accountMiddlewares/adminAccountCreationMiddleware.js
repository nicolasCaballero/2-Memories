const db = require('../../../db/models');
const users = db.AdminUsers;
let {check, validationResult, body} = require('express-validator');

let adminAccountCreationMiddleware = [
    check('name').isAlpha().withMessage('El campo nombre solo debe contener letras de la A-Z'),
    check('name').isLength({ min: 1 }).withMessage('El campo nombre no puede estar vacío'),
    check('username').isAlpha().withMessage('El campo nombre de usuario solo debe contener letras de la A-Z'),
    check('username').isLength({ min: 1 }).withMessage('El campo nombre de usuario no puede estar vacío'),
    check('username').isLowercase().withMessage('El campo nombre de usuario no puede contener mayúsculas'),
    check('password', 'La contraseña debe contener al ménos 8 caracteres, una minúscula, un número y una mayúscula').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i'),
    body('email').custom(async (value) => Array.from(await users.findAll()) .filter(u => u.email == value).length > 0 ? Promise.reject("¡El email ya se encuentra registrado!") : true),
]

module.exports = adminAccountCreationMiddleware;