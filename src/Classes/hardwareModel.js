const MetioModel = require("./metioModel");
const ForecastWeather = require("../dbModules/forecastWeather.modul");

const getHardwareByID = (hardwaresJson, id) => {
  const hards = hardwaresJson.filter((hards) => String(hards["_id"]) === id);
  if (hards[1]) {
    throw new Error("Same id of objects");
  }
  return hards[0];
};

//Cankacac depqum erb hardi valveState == 1, inq@ auto a

const updateHardwareInfoInDB = async (user, req) => {
  let hardware = getHardwareByID(user.hardware, req.body["_id"]);

  // Ete auto chi, bayc arden vnasum a
  if (
    hardware.moistureValue <= hardware.config.min ||
    hardware.moistureValue >= hardware.config.normal
  ) {
    hardware.valveState = req.body.valveState;
    hardware.auto = true;
  } else if (hardware.auto) {
    hardware.valveState = req.body.valveState;
  }

  hardware.moistureValue = req.body.moistureValue;
  hardware.location = req.body.location;

  // TO DO: handle error in saveing time
  await user.save();
};

const updateValveState = async (user, hardwareID, cityId) => {
  let hardware = await getHardwareByID(user.hardware, hardwareID);

  const weather = await MetioModel.getWeatherByID(ForecastWeather, cityId);

  if (hardware.auto) {
    if (hardware.moistureValue <= hardware.config.min && weather.pop <= 0.6) {
      //Open the valve
      hardware.valveState = 0;
    } else {
      // Close the valve
      hardware.valveState = 1;
    }
  }
  await user.save();
};

module.exports = {
  getHardwareByID,
  updateHardwareInfoInDB,
  updateValveState,
};
