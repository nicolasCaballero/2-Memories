const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../../controllers/adminController');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.resolve(__dirname, '../../../public/img/experiences'));
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// })

// const upload = multer({
//     storage
// });

router.get('/admin/experiences-list', adminController.experiencesList);
router.get('/admin/experiences-create', adminController.experienceCreate);




module.exports = router;