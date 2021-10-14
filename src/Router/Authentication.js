const express = require("express");

const serverService = require("../Services/auth");

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

//If everything is ok, send the info
router.get("/", function (req, res) {
  serverService.authenticate(req, res);
});

module.exports = router;
