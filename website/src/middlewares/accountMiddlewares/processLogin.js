const bcrypt = require('bcryptjs');
const db = require('../../db/models')
const users = db.users;
let {check, validationResult, body} = require('express-validator');


let processLogin = [
    body('email').custom(async (value, {req}) => Array.from(await users.findAll()).filter(u => (u.email== value && bcrypt.compareSync(req.body.password, u.password))).length < 1 ? Promise.reject("Credenciales Inválidas") : true),
]

module.exports = processLogin;
