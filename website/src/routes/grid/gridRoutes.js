const express = require('express');
const router = express.Router();
const gridController = require('../../controllers/gridController');

router.get('/gastronomia', gridController.gastronomyShow);
router.get('/bienestar', gridController.wellbeingShow);
router.get('/escapadas', gridController.escapeShow);
router.get('/entretenimiento', gridController.entertainmentShow);
router.get('/aventura', gridController.adventureShow);
router.get('/cursos', gridController.coursesShow);
router.get('/search', gridController.search);

module.exports = router;