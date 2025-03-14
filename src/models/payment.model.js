const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Payment = sequelize.define("Payment", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    booking_id: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    payment_method: { type: DataTypes.ENUM("cash", "online"), defaultValue: "online" },
    payment_status: { type: DataTypes.ENUM("pending", "paid", "failed"), defaultValue: "pending" }
});

module.exports = Payment;
