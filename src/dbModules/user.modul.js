const mongoose = require("mongoose");
const HardwareSchema = require("./hardware.modul").HardwareScema;
const ConfigScema = require("./hardware.modul").ConfigScema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  hardware: [HardwareSchema],

  configs: {
    type: [ConfigScema],
    required: false,
  },
});

module.exports = mongoose.model("users", userSchema);
