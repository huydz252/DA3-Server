const { Op } = require("sequelize");
const moment = require("moment");
const { Booking, Schedule, Court } = require("../models"); // Import models

// Hàm tạo booking
const createBooking = async (req, res) => {
    try {
        const { user_id, court_id, booking_date, start_time, end_time } = req.body;

        // Chuyển đổi start_time và end_time sang Date
        const startTimeObj = moment(`${booking_date} ${start_time}`, "YYYY-MM-DD HH:mm").toDate();
        const endTimeObj = moment(`${booking_date} ${end_time}`, "YYYY-MM-DD HH:mm").toDate();

        console.log("Start Time:", startTimeObj);
        console.log("End Time:", endTimeObj);

        // Kiểm tra nếu giờ vào lớn hơn hoặc bằng giờ ra
        if (startTimeObj >= endTimeObj) {
            return res.status(400).json({ message: "Giờ vào phải nhỏ hơn giờ ra." });
        }

        // Lấy lịch mở cửa của sân
        const schedules = await Schedule.findAll({
            where: { court_id },
            attributes: ["open_time", "close_time"],
        });

        if (!schedules.length) {
            return res.status(404).json({ message: "Không tìm thấy lịch hoạt động của sân." });
        }

        // Kiểm tra khoảng thời gian có thuộc ít nhất một khung giờ hợp lệ không
        const isValidTime = schedules.some(schedule => {
            const openTimeObj = moment(`${booking_date} ${schedule.open_time}`, "YYYY-MM-DD HH:mm").toDate();
            const closeTimeObj = moment(`${booking_date} ${schedule.close_time}`, "YYYY-MM-DD HH:mm").toDate();
            return startTimeObj >= openTimeObj && endTimeObj <= closeTimeObj;
        });

        if (!isValidTime) {
            return res.status(400).json({
                message: `Thời gian đặt không hợp lệ. Vui lòng kiểm tra lại lịch hoạt động của sân.`,
            });
        }

        // Kiểm tra trùng lịch
        const existingBooking = await Booking.findOne({
            where: {
                court_id,
                booking_date,
                [Op.or]: [
                    { start_time: { [Op.between]: [startTimeObj, endTimeObj] } },
                    { end_time: { [Op.between]: [startTimeObj, endTimeObj] } },
                    { [Op.and]: [{ start_time: { [Op.lte]: startTimeObj } }, { end_time: { [Op.gte]: endTimeObj } }] },
                ],
            },
        });

        if (existingBooking) {
            return res.status(400).json({ message: "Sân đã có người đặt vào khung giờ này." });
        }

        // Tính tổng tiền
        const court = await Court.findByPk(court_id);
        if (!court) {
            return res.status(404).json({ message: "Không tìm thấy sân." });
        }

        const hours = (endTimeObj - startTimeObj) / (1000 * 60 * 60); // Chuyển ms -> giờ
        const total_price = hours * court.price_per_hour;

        // Tạo booking
        const newBooking = await Booking.create({
            user_id,
            court_id,
            booking_date,
            start_time: startTimeObj,
            end_time: endTimeObj,
            total_price,
            status: "pending",
        });

        res.status(201).json({ message: "Đặt sân thành công!", booking: newBooking });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Lỗi server, vui lòng thử lại." });
    }
};

const getAlllBooking = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.status(200).json(bookings)
    } catch (error) {
        console.log('có lỗi khi lấy danh sách đặt sân: ', error);
        res.status(500).json({ message: "lỗi khi lấy danh sách đặt sân!", error: error.message })

    }
}

module.exports = { createBooking, getAlllBooking };
