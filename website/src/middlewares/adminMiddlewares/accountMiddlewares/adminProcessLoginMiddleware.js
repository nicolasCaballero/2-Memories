const bcrypt = require('bcryptjs');
const db = require('../../../db/models')
const users = db.AdminUsers;
let {check, validationResult, body} = require('express-validator');


let adminProcessLogin = [
    body('username').custom(async (value, {req}) => Array.from(await users.findAll()).filter(u => (u.username== value && bcrypt.compareSync(req.body.password, u.password))).length < 1 ? Promise.reject("Credenciales Inválidas") : true),
]

module.exports = adminProcessLogin;
