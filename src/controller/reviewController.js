const { Court, User, Review } = require("../models");

//k cần check user_id và court_id vì chỉ đc comment khi đã đăng nhập, và vào trang court
const createReview = async (req, res) => {
    try {
        const { user_id, court_id, rating, comment } = req.body;
        console.log("📥 Dữ liệu nhận được:", req.body);

        const addReview = await Review.create(
            {
                user_id: user_id,
                court_id: court_id,
                rating: rating,
                comment: comment
            }
        );
        res.status(201).json({ message: "Comment thành công" })
    } catch (error) {
        console.log("❌ lỗi khi tạo comment: ", error);
        res.status(500).json({ message: "❌ có lỗi khi tạo comment!", error: error.message })
    }
}

const editReview = async (req, res) => {
    try {
        const { id_review, rating, comment } = req.body;
        console.log("📥 Dữ liệu nhận được:", req.body);
        const editReview = await Review.update(
            {
                rating: rating,
                comment: comment
            },
            {
                where: { id: id_review }
            }
        );
        if (editReview[0] === 0) {
            return res.status(404).json({ message: "❌ Không tìm thấy review để cập nhật!" });
        }
        console.log("✅ Cập nhật review thành công!");
        res.status(200).json({ message: "✅ Cập nhật review thành công!" });
    } catch (error) {
        console.log("❌ lỗi khi edit comment: ", error);
        res.status(500).json({ message: "❌ có lỗi khi edit comment!", error: error.message })
    }
}

module.exports = { createReview, editReview }