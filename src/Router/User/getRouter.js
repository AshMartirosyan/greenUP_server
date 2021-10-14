const express = require("express");

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

const {
  getHardwaresList,
  getConfigsList,
} = require("../../Services/User/userGet");

router.get("/hardwares", (req, res) => {
  getHardwaresList(req, res);
});

router.get("/configs", (req, res) => {
  getConfigsList(req, res);
});

module.exports = router;
