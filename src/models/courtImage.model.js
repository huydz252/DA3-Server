const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CourtImage = sequelize.define("CourtImage", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    court_id: { type: DataTypes.INTEGER, allowNull: false },
    image_url: { type: DataTypes.STRING(255), allowNull: false }
});

module.exports = CourtImage;
