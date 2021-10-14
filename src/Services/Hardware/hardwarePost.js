const { verify } = require("../../Classes/tokenVerification");
const HardwareModel = require("../../Classes/hardwareModel");
const UserModel = require("../../Classes/userModel");
const Metio = require("../Metio/metio");
const Cities = require("../../Constants/cities");

const simplePostRequest = async (req, res) => {
  console.log(req.body);
  let decodedID = verify(req, res);
  const user = await UserModel.getUserByID(decodedID, res);

  if (user) {
    HardwareModel.updateHardwareInfoInDB(user, req);

    await Metio.updateForecastWeather(Cities[req.body.location]);

    await HardwareModel.updateValveState(
      user,
      req.body._id,
      Cities[req.body.location]
    );

    const hard = HardwareModel.getHardwareByID(user.hardware, req.body["_id"]);

    return res.status(200).send({
      valveState: hard.valveState,
    });
  }
  return;
};

module.exports = { simplePostRequest };
