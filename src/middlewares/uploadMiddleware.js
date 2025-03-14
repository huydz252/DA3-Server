const multer = require("multer");
const path = require("path");

const fs = require("fs");
const uploadDir = "uploads/";

// Kiểm tra và tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("📂 Thư mục 'uploads/' đã được tạo!");
}


// Cấu hình lưu trữ file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Lưu file vào thư mục uploads/
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // giữ nguyên tên file
    },
});

// Bộ lọc file (chỉ cho phép ảnh)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Chỉ hỗ trợ định dạng ảnh JPG, PNG!"), false);
    }
};

// Middleware upload file
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
});

module.exports = upload;
