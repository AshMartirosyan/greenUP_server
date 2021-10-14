const express = require("express");
const { deleteConfig } = require("../../Services/User/userDelete");

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.delete("/deleteConfig", (req, res) => {
  deleteConfig(req, res);
});

module.exports = router;
