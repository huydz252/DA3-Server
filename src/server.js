require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const multer = require('multer');
const path = require('path');
const models = require('./models'); // Import tất cả model

//import routes
const userRoutes = require('./routes/userRoutes');
const courtRoutes = require('./routes/courtRouter')
const uploadRoutes = require('./routes/uploadRouter');

const app = express()
const port = process.env.PORT || 2502;
const hostname = process.env.HOST_NAME || 'localhost';

//config req.body
app.use(express.json()) //for json
app.use(express.urlencoded({ extended: true })) //for form data

//config db
const sequelize = require('./config/database');
sequelize.authenticate()
    .then(() => console.log('✅ Kết nối database thành công!'))
    .catch(err => console.error('❌ Lỗi kết nối database:', err));

async function syncDatabase() {
    try {
        await sequelize.sync({ force: true }); // Dùng { force: true } nếu muốn xóa & tạo lại bảng
        console.log('✅ Database đã được đồng bộ!');
    } catch (error) {
        console.error('❌ Lỗi đồng bộ hóa database:', error);
    }
}

syncDatabase();

const options = {
    host: process.env.HOST_NAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,   // Mật khẩu MySQL của bạn
    database: process.env.DB_NAME  // Tên database bạn đã tạo
};

//routes
app.use('/', userRoutes);
app.use('/', courtRoutes);
app.use('/', uploadRoutes);

app.listen(port, hostname, () => {
    console.log(`server running on {`, hostname, ',', port, '}');
})