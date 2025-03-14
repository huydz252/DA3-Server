const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Booking = sequelize.define("Booking", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    court_id: { type: DataTypes.INTEGER, allowNull: false },
    booking_date: { type: DataTypes.DATEONLY, allowNull: false },
    status: { type: DataTypes.ENUM("pending", "confirmed", "canceled"), defaultValue: "pending" }
});

module.exports = Booking;
