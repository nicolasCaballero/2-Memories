const express = require('express');
const router = express.Router();
const gridController = require('../../controllers/gridController');

router.get('/gastronomia/:order?', gridController.gastronomyShow);
router.get('/bienestar/:order?', gridController.wellbeingShow);
router.get('/escapadas/:order?', gridController.escapeShow);
router.get('/entretenimiento/:order?', gridController.entertainmentShow);
router.get('/aventura/:order?', gridController.adventureShow);
router.get('/cursos/:order?', gridController.coursesShow);
router.get('/search/:order?', gridController.search);
router.get('/variedades/:order?', gridController.varieties);
router.get('/products/ver-todo/:order?', gridController.seeAll);
module.exports = router;