const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Schedule = sequelize.define("Schedule", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    court_id: { type: DataTypes.INTEGER, allowNull: false },
    open_time: { type: DataTypes.TIME, allowNull: false },
    close_time: { type: DataTypes.TIME, allowNull: false }
});

module.exports = Schedule;
