const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    main: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const currentWeatherSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  weather: {
    type: [WeatherSchema],
    required: false,
  },
  temperature: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  rain: {
    type: Number,
    required: true,
  },
});

const currentWeatherModel = mongoose.model(
  "currentWeather",
  currentWeatherSchema
);
module.exports = { currentWeatherModel, WeatherSchema };
