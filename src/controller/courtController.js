const { Court, User } = require("../models"); // Thêm User vào đây


const getAllCourts = async (req, res) => {
    try {
        const courts = await Court.findAll();
        res.status(200).json(courts);
    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy danh sách sân!", error });
    }
};

const getCourtById = async (req, res) => {
    try {
        const { id } = req.params;
        const court = await Court.findByPk(id);

        if (!court) {
            return res.status(404).json({ message: "Sân không tồn tại!" });
        }

        res.status(200).json(court);
    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy thông tin sân!", error });
    }
};

const createCourt = async (req, res) => {
    try {
        const { owner_id, name, location, price_per_hour, description, status } = req.body;

        const newCourt = await Court.create({
            owner_id,
            name,
            location,
            price_per_hour,
            description,
            status
        });

        res.status(201).json({ message: "Tạo sân thành công!", court: newCourt });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi tạo sân!", error });
    }
};

const updateCourt = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id sân từ URL
        const { owner_id, name, location, price_per_hour, description, status } = req.body; // Dữ liệu cập nhật

        // Kiểm tra sân có tồn tại không
        const court = await Court.findByPk(id);
        if (!court) {
            return res.status(404).json({ message: "Không tìm thấy sân!" });
        }

        // Nếu có owner_id mới, kiểm tra xem user đó có tồn tại không
        if (owner_id) {
            const owner = await User.findByPk(owner_id);
            if (!owner) {
                return res.status(400).json({ message: "Chủ sân không tồn tại!" });
            }
        }

        // Cập nhật thông tin sân
        await court.update({
            owner_id: owner_id || court.owner_id,
            name: name || court.name,
            location: location || court.location,
            price_per_hour: price_per_hour || court.price_per_hour,
            description: description || court.description,
            status: status || court.status,

        });

        console.log("✅ Cập nhật sân thành công!", court);
        res.json({ message: "Cập nhật sân thành công!", court });
    } catch (error) {
        console.error("🔥 Lỗi khi cập nhật sân:", error);
        res.status(500).json({ message: "Lỗi khi cập nhật sân!", error });
    }
};


const deleteCourt = async (req, res) => {
    try {
        const { id } = req.params;
        const court = await Court.findByPk(id);

        if (!court) {
            return res.status(404).json({ message: "Sân không tồn tại!" });
        }

        await court.destroy();
        res.status(200).json({ message: "Xóa sân thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi xóa sân!", error });
    }
};

module.exports = {
    getAllCourts,
    getCourtById,
    createCourt,
    updateCourt,
    deleteCourt
};
