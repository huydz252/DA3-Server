const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Review = sequelize.define("Review", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    court_id: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.TEXT }
});

module.exports = Review;
