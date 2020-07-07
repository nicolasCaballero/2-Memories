const express = require('express');
const router = express.Router();
const path = require('path');
const mainController = require('../controllers/gridController');
const gridController = require('../controllers/gridController');

router.get('/gastronomia', gridController.gastronomyShow);
router.get('/bienestar', gridController.wellbeingShow);
router.get('/escapadas', gridController.escapeShow);
router.get('/entretenimiento', gridController.entertainmentShow);
router.get('/aventuras', gridController.adventureShow);
router.get('/cursos', gridController.coursesShow);
module.exports = router;