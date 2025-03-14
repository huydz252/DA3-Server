const sequelize = require("../config/database");
const User = require("./user.model");
const Court = require("./court.model");
const CourtImage = require("./courtImage.model");
const Schedule = require("./schedule.model");
const Booking = require("./booking.model");
const BookingDetail = require("./bookingDetail.model");
const Payment = require("./payment.model");
const Review = require("./review.model");

// Khai báo quan hệ giữa các bảng
User.hasMany(Court, { foreignKey: "owner_id", onDelete: "SET NULL", onUpdate: "CASCADE" });
Court.belongsTo(User, { foreignKey: "owner_id" });


Court.hasMany(CourtImage, { foreignKey: "court_id" });
CourtImage.belongsTo(Court, { foreignKey: "court_id" });

Court.hasMany(Schedule, { foreignKey: "court_id" });
Schedule.belongsTo(Court, { foreignKey: "court_id" });

User.hasMany(Booking, { foreignKey: "user_id" });
Booking.belongsTo(User, { foreignKey: "user_id" });

Court.hasMany(Booking, { foreignKey: "court_id" });
Booking.belongsTo(Court, { foreignKey: "court_id" });

Booking.hasMany(BookingDetail, { foreignKey: "booking_id" });
BookingDetail.belongsTo(Booking, { foreignKey: "booking_id" });

Booking.hasOne(Payment, { foreignKey: "booking_id" });
Payment.belongsTo(Booking, { foreignKey: "booking_id" });

User.hasMany(Review, { foreignKey: "user_id" });
Review.belongsTo(User, { foreignKey: "user_id" });

Court.hasMany(Review, { foreignKey: "court_id" });
Review.belongsTo(Court, { foreignKey: "court_id" });

module.exports = { sequelize, User, Court, CourtImage, Schedule, Booking, BookingDetail, Payment, Review };

