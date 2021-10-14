const mongoose = require("mongoose");

const ConfigScema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  normal: {
    type: String,
    required: true,
  },
  min: {
    type: String,
    required: true,
  },
});

const HardwareScema = new mongoose.Schema({
  _id: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    required: false,
  },
  plant: {
    type: String,
    required: false,
  },
  moistureValue: {
    type: Number,
    required: true,
  },
  valveState: {
    type: Number,
    required: false,
  },
  auto: {
    type: Boolean,
    required: false,
  },
  config: {
    type: ConfigScema,
    required: false,
  },
});

const hardwareModel = mongoose.model("hardwares", HardwareScema);
const configModel = mongoose.model("config", ConfigScema);

module.exports = { hardwareModel, HardwareScema, configModel, ConfigScema };
