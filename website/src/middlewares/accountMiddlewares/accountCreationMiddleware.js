const db = require('../../db/models')
const users = db.users;
let {check, validationResult, body} = require('express-validator');

let accountCreationMiddleware = [
    check('name').isAlpha().withMessage('El nombre solo debe contener letras de la A-Z'),
    check('name').isLength({ min: 1 }).withMessage('El nombre no puede estar vacío'),
    check('lastName').isAlpha().withMessage('El apellido solo debe contener letras de la A-Z'),
    check('lastName').isLength({ min: 1 }).withMessage('El apellido no puede estar vacío'),
    check('password', 'La contraseña debe contener al ménos 6 caracteres, una minúscula, un número y una mayúscula').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/, 'i'),
    body('email').custom(async (value) => Array.from(await users.findAll()) .filter(u => u.email == value).length > 0 ? Promise.reject("¡El email ya se encuentra registrado!") : true),
]

module.exports = accountCreationMiddleware;