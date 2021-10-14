const CurrentWeather = require("../dbModules/currentWeather.modul")
  .currentWeatherModel;

const ForecastWeather = require("../dbModules/forecastWeather.modul");
const FiveDayForecastWeather = require("../dbModules/fiveDayForecastWeather");

const getWeatherByID = (WeatherModul, id) => {
  return WeatherModul.findById(id, (err, weather) => {
    if (!err && weather) {
      return weather;
    } else if (err) {
      // Type checking error
      // TO DO -> hendle error
      throw new Error(err);
    } else {
      // Can't find weather, create new one.
      return;
    }
  });
};

const dateFromMetio = (dt, timezone) => {
  return new Date(dt * 1000 + 1000 * timezone);
};

const updateCurrentWeatherInfo = async (data) => {
  let currentWeather = await getWeatherByID(CurrentWeather, data.id);

  if (!currentWeather) {
    currentWeather = new CurrentWeather();
  }
  currentWeather._id = data.id;
  currentWeather.weather = data.weather;
  currentWeather.temperature = data.main.temp;
  currentWeather.humidity = data.main.humidity;
  currentWeather.rain = data.rain ? data.rain["1h"] : 0;

  // TO DO: handle error in saveing time
  await currentWeather.save();
};

const updateForecastWeatherInfo = async (data) => {
  let forecastWeather = await getWeatherByID(ForecastWeather, data.city["id"]);

  if (!forecastWeather) {
    forecastWeather = new ForecastWeather();
  }

  forecastWeather._id = data.city["id"];
  forecastWeather.time = dateFromMetio(data.list[0].dt, data.city.timezone);
  forecastWeather.temperature = data.list[0].main["temp"];
  forecastWeather.humidity = data.list[0].main["humidity"];
  forecastWeather.weather = data.list[0].weather;
  forecastWeather.pop = data.list[0].pop;
  forecastWeather.rain = data.list.rain ? data.list.rain["3h"] : 0;
  await forecastWeather.save();
};

const updateFiveDayForecastWeather = async (data) => {};

module.exports = {
  updateCurrentWeatherInfo,
  updateForecastWeatherInfo,
  updateFiveDayForecastWeather,
  getWeatherByID,
};
