const { getHardwareByID } = require("../../Classes/hardwareModel");
const { verify } = require("../../Classes/tokenVerification");
const {
  getUserByID,
  changeManyHardwareValveState,
  changeAllHardwaresValveState,
  changeHardwareConfig,
  updateConfigList,
} = require("../../Classes/userModel");

const changeMany = async (req, res) => {
  let decodedID = verify(req, res);
  const user = await getUserByID(decodedID, res);
  if (user) {
    await changeManyHardwareValveState(user, req.body);
    //TO DO. Get all hardwares.
    const hardware = getHardwareByID(user.hardware, req.body.hardwareIDs[0]);
    return res.status(200).send(hardware);
  }
  return;
};

const changeAll = async (req, res) => {
  let decodedID = verify(req, res);
  const user = await getUserByID(decodedID, res);
  if (user) {
    await changeAllHardwaresValveState(user, req.body);
    return res.status(200).send(user.hardware);
  }
  return;
};

const changeConfig = async (req, res) => {
  let decodedID = verify(req, res);
  if (decodedID) {
    const isUpdated = await changeHardwareConfig(decodedID, req.body, res);
    if (isUpdated) {
      const user = await getUserByID(decodedID, res);
      const hardware = getHardwareByID(user.hardware, req.body.hardwareId);
      return res.status(200).send(hardware);
    }
  }
  return;
};

const updateConfigInList = async (req, res) => {
  let decodedID = verify(req, res);
  if (decodedID) {
    const isUpdatedInList = await updateConfigList(decodedID, req.body, res);
    if (isUpdatedInList) {
      const user = await getUserByID(decodedID, res);
      return res.status(200).send(user.configs);
    }
  }
  return;
};

module.exports = { changeMany, changeAll, changeConfig, updateConfigInList };
