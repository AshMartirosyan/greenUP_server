const mongoose = require("mongoose");

const SowTimeSchema = new mongoose.Schema({
  springStart: {
    type: Date,
    required: false,
  },
  springEnd: {
    type: Date,
    required: false,
  },
  autumnStart: {
    type: Date,
    required: false,
  },
  autumnEnd: {
    type: Date,
    required: false,
  },
});

const PlantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  plantSpringTypes: {
    type: [String],
    required: false,
  },
  plantAutumnTypes: {
    type: [String],
    required: false,
  },
  sowTime: {
    type: SowTimeSchema,
    required: false,
  },
});

module.exports = mongoose.model("plants", PlantSchema);
