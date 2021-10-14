const { verify } = require("../../Classes/tokenVerification");
const { getUserByID } = require("../../Classes/userModel");

const getHardwaresList = async (req, res) => {
  console.log("Ekav");
  let decodedID = verify(req, res);
  const user = await getUserByID(decodedID, res);
  if (user) {
    return res.status(200).send(user.hardware);
  }
};

const getConfigsList = async (req, res) => {
  const decodedID = verify(req, res);
  const user = await getUserByID(decodedID, res);
  if (user) {
    return res.status(200).send(user.configs);
  }
};

module.exports = { getHardwaresList, getConfigsList };
