const express = require('express');
const upload = require('../middlewares/uploadMiddleware'); // Import middleware
const courtImageController = require('../controller/courtImageController')
const router = express.Router();

router.post('/uploadImage', upload.single('image'), courtImageController.uploadCourtImage);

module.exports = router;
