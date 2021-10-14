const fetch = require("node-fetch");
const MetioModel = require("../../Classes/metioModel");

const updateCurrentWeather = async (cityID) => {
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=metric&appid=533326ddd6518a2a124296e12c82ba19`
  )
    .then((res) => res.json())
    .then(async (data) => {
      //Update data on DB
      await MetioModel.updateCurrentWeatherInfo(data);
    })
    .catch((error) => {
      console.warn(error);
      return;
    });
};

const updateForecastWeather = (cityID) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?id=${cityID}&units=metric&appid=6bc2f94dd98d90d1299be3fab517f8c9&cnt=1`
  )
    .then((res) => res.json())
    .then(async (data) => {
      //Update data on DB
      await MetioModel.updateForecastWeatherInfo(data);
    })
    .catch((error) => {
      console.warn(error);
      return;
    });
};

const updatefiveDayForecastWeather = (cityID) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?id=${cityID}&units=metric&appid=533326ddd6518a2a124296e12c82ba19&cnt=30`
  )
    .then((res) => res.json())
    .then(async (data) => {
      await MetioModel.updateFiveDayForecastWeather(data);
    })
    .catch((error) => {
      console.warn(error);
      return;
    });
};

module.exports = {
  updateCurrentWeather,
  updateForecastWeather,
  updatefiveDayForecastWeather,
};
