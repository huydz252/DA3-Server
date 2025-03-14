const express = require("express");
const router = express.Router();
const courtController = require("../controller/courtController");

router.get("/courts", courtController.getAllCourts);
router.get("/courts/:id", courtController.getCourtById);
router.post("/courts/create", courtController.createCourt);
router.put("/courts/update/:id", courtController.updateCourt);
router.delete("/courts/delete/:id", courtController.deleteCourt);

module.exports = router;
