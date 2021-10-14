const express = require("express");

const {
  changeMany,
  changeAll,
  changeConfig,
  updateConfigInList,
} = require("../../Services/User/userPost");

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.post("/multipleValveState", (req, res) => {
  changeMany(req, res);
});

router.post("/allValveState", (req, res) => {
  changeAll(req, res);
});

router.post("/changeHardwareConfig", (req, res) => {
  changeConfig(req, res);
});

router.post("/updateConfigInList", (req, res) => {
  updateConfigInList(req, res);
});

module.exports = router;
