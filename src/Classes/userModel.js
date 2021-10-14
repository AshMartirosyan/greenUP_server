const Users = require("../dbModules/user.modul");
const Config = require("../dbModules/hardware.modul").configModel;
const { getHardwareByID } = require("./hardwareModel");
const mongoose = require("mongoose");

const getUserByID = async (id, res) => {
  if (id) {
    return await Users.findById(id, (err, user) => {
      if (!err && user) {
        return user;
      }
      if (err) {
        res.status(404).send("No User found.");
      } else {
        res.status(500).send("There was a problem finding the User.");
      }
      return;
    });
  } else {
    res.status(404).send("Something went wrong");
    return;
  }
};

const changeManyHardwareValveState = async (user, body) => {
  body.hardwareIDs.forEach(async (id) => {
    const hardware = await getHardwareByID(user.hardware, id);
    hardware.auto = body.auto;
    hardware.valveState = body.valveState;
  });
  await user.save();
};

const changeAllHardwaresValveState = async (user, body) => {
  user.hardware = user.hardware.map((hard) => {
    hard.valveState = body.valveState;
    hard.auto = body.auto;
    return hard;
  });

  await user.save();
};

const changeHardwareConfig = async (decodedId, body, res) => {
  return await Users.updateOne(
    {
      _id: decodedId,
      "hardware._id": body.hardwareId,
    },
    {
      $set: {
        "hardware.$.config._id": body.config.id,
        "hardware.$.config.type": body.config.type,
        "hardware.$.config.normal": body.config.normal,
        "hardware.$.config.min": body.config.min,
      },
    },
    (err) => {
      if (err) return res.status(404).json({ message: err });
      return true;
    }
  );
};

const updateConfigList = async (decodedId, body, res) => {
  return await Users.updateOne(
    { _id: decodedId, "configs._id": mongoose.Types.ObjectId(body.id) },
    {
      $set: {
        "configs.$.type": body.type,
        "configs.$.normal": body.normal,
        "configs.$.min": body.min,
      },
    },
    (err) => {
      if (err) return res.status(404).json({ message: err });
      return true;
    }
  );
};

const deleteConfigFromList = async (decodedId, body, res) => {
  return await Users.findByIdAndUpdate(
    { _id: decodedId },
    { $pull: { configs: { _id: body.id } } },
    (err) => {
      if (err) return res.status(404).json({ message: "Error" });
      return true;
    }
  );
};

const addNewConfigToList = async (decodedId, body, res) => {
  const newConfig = new Config();
  newConfig.type = body.type;
  newConfig.normal = body.normal;
  newConfig.min = body.min;

  return await Users.updateOne(
    { _id: decodedId },
    { $addToSet: { configs: newConfig } },
    (err) => {
      if (err) {
        return res.status(404).json({ message: "Error" });
      }
      return true;
    }
  );
};

module.exports = {
  getUserByID,
  changeManyHardwareValveState,
  changeAllHardwaresValveState,
  changeHardwareConfig,
  addNewConfigToList,
  deleteConfigFromList,
  updateConfigList,
};
