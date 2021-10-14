const { verify } = require("../../Classes/tokenVerification");
const { getUserByID } = require("../../Classes/userModel");
const { addNewConfigToList } = require("../../Classes/userModel");

const addNewConfig = async (req, res) => {
  const decodedID = verify(req, res);
  if (decodedID) {
    const isUpdated = await addNewConfigToList(decodedID, req.body, res);
    if (isUpdated) {
      const user = await getUserByID(decodedID, res);
      return res.status(200).send(user.configs);
    }
  }
  return;
};

module.exports = { addNewConfig };
