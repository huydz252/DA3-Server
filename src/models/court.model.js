const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Court = sequelize.define("Court", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    owner_id: { type: DataTypes.INTEGER, allowNull: true }, // NULL nếu chưa có chủ
    name: { type: DataTypes.STRING(100), allowNull: false },
    location: { type: DataTypes.STRING(255), allowNull: false },
    price_per_hour: { type: DataTypes.FLOAT, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM("available", "unavailable"), defaultValue: "available" }
});


module.exports = Court;
