const express = require("express");
const bookingController = require("../controller/bookingController");

const router = express.Router();

// API: Đặt sân
router.get("/bookings", bookingController.getAlllBooking);
router.post("/bookings/create", bookingController.createBooking);

module.exports = router;
