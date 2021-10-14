const mongoose = require("mongoose");
const WeatherSchema = require("./currentWeather.modul").WeatherSchema;

const fiveDayforecastWeatherSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  weather: {
    type: [WeatherSchema],
    required: false,
  },
  humidity: {
    type: Number,
    required: true,
  },
  pop: {
    type: Number,
    required: true,
  },
  rain: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model(
  "fiveDayforecastWeather",
  fiveDayforecastWeatherSchema
);
