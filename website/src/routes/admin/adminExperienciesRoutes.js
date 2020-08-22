const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const adminController = require('../../controllers/adminController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../../public/img/experiences'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({
    storage
});

router.get('/admin/experiences-list', adminController.experiencesList);
router.get('/admin/experiences-create', adminController.experienceCreate);
router.post('/admin/experiences-create', upload.single('image'), adminController.experienceSave);
router.get('/admin/experience/delete/:id', adminController.experienceDelete);
router.get('/admin/experience/view/:id', adminController.experienceShow);




module.exports = router;