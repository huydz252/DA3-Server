const express = require('express');
const upload = require('../middlewares/uploadMiddleware'); // Import middleware
const router = express.Router();

router.post('/uploadImage', upload.single('image'), (req, res) => {
    console.log(req.file); // Debug để kiểm tra file có được nhận không

    if (!req.file) {
        return res.status(400).json({ message: "Vui lòng chọn file ảnh!" });
    }

    res.json({ message: "Tải ảnh lên thành công!", filePath: `/uploads/${req.file.filename}` });
});

module.exports = router;
