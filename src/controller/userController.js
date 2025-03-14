const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        console.log("📥 Dữ liệu nhận được:", req.body);

        // Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã được sử dụng!' });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({ message: 'Đăng ký thành công!', user: newUser });

    } catch (error) {
        console.error("❌ Lỗi khi đăng ký:", error);
        res.status(500).json({ message: 'Lỗi đăng ký!', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra tài khoản
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Email không tồn tại!' });
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu không đúng!' });
        }

        // Tạo token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Đăng nhập thành công!', token, user });
    } catch (error) {
        console.error("❌ Lỗi khi đăng nhập:", error);
        res.status(500).json({ message: 'Lỗi đăng nhập!', error });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi lấy danh sách người dùng!', error });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, { attributes: { exclude: ["password"] } });

        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại!" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy thông tin người dùng!", error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra xem user có tồn tại không
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại!" });
        }

        // Xóa user
        await user.destroy();
        res.status(200).json({ message: "Xóa người dùng thành công!" });

    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa người dùng!", error });
    }
};



module.exports = {
    register, login, getAllUsers, getUserById, deleteUser
}