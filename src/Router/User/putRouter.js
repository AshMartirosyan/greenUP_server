const express = require("express");
const { addNewConfig } = require("../../Services/User/userPut");

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.put("/addNewConfig", (req, res) => {
  addNewConfig(req, res);
});

module.exports = router;
