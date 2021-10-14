const { verify } = require("../../Classes/tokenVerification");
const {
  deleteConfigFromList,
  getUserByID,
} = require("../../Classes/userModel");

const deleteConfig = async (req, res) => {
  const decodedID = verify(req, res);

  if (decodedID) {
    const isDeleted = await deleteConfigFromList(decodedID, req.body, res);
    if (isDeleted) {
      const user = await getUserByID(decodedID);
      return res.status(200).json(user.configs);
    }
  }
  return;
};

module.exports = { deleteConfig };
