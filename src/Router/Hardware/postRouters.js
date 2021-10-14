const express = require("express");

const hardware = require("../../Services/Hardware/hardwarePost");

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.post("/", (req, res) => {
  /// TO DO
  hardware.simplePostRequest(req, res);
});

module.exports = router;
