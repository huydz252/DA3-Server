const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BookingDetail = sequelize.define("BookingDetail", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    booking_id: { type: DataTypes.INTEGER, allowNull: false },
    start_time: { type: DataTypes.TIME, allowNull: false },
    end_time: { type: DataTypes.TIME, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false }
});

module.exports = BookingDetail;
