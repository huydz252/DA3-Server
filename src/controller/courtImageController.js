const multer = require("multer");
const path = require("path");

// Cấu hình nơi lưu trữ ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Lưu file vào thư mục uploads
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Giữ nguyên tên file gốc
    }
});

// Lọc file (chỉ chấp nhận ảnh)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Chỉ chấp nhận file ảnh (JPG, PNG)"), false);
    }
};

const upload = multer({ storage, fileFilter });

// Hàm upload ảnh
const uploadCourtImage = async (req, res) => {
    try {
        const { court_id } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: "Vui lòng chọn file ảnh!" });
        }

        const imageUrl = `/uploads/${req.file.filename}`; // Đường dẫn ảnh

        // Lưu vào database
        const newImage = await CourtImage.create({
            court_id,
            image_url: imageUrl
        });

        res.status(201).json({ message: "Upload ảnh thành công!", newImage });
    } catch (error) {
        res.status(500).json({ message: "Lỗi upload ảnh!", error });
    }
};

module.exports = { upload, uploadCourtImage };
