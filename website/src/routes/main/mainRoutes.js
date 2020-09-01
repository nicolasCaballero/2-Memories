const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/mainController');
const notLoggedInMiddleware = require('../../middlewares/notLoggedInMiddleware');


router.get('/', mainController.index);
router.get('/abrir/memorie', notLoggedInMiddleware, mainController.open);
router.get('/nosotros', mainController.about);
router.get('/ayuda', mainController.help);
router.get('/terminos-y-condiciones', mainController.tyc);
router.get('/metodos-de-pago', mainController.paymenths);
router.get('/metodos-de-envio', mainController.shipments);
router.get('/contacto', mainController.contact);

module.exports = router;