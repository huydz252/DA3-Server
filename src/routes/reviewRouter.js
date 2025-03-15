const express = require('express');
const router = express.Router();
const reviewController = require('../controller/reviewController');

router.post("/review", reviewController.createReview)
router.put("/review/edit", reviewController.editReview)

module.exports = router;