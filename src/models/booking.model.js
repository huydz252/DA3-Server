const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const Booking = sequelize.define("Booking", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    court_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    booking_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    total_price: { // 🆕 Thêm cột mới
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
    },
});

module.exports = Booking


