const jwt = require("jsonwebtoken");
const keys = require("../Constants/keys");

const verify = (req, res) => {
  var token = req.headers["x-access-token"];
  const privateKey =
    req.headers.device == "mobile"
      ? keys.MOBILE_TOKEN_KEY
      : keys.HARDWARE_TOKEN_KEY;
  if (!token) {
    return res
      .status(400)
      .send({ auth: false, messasge: "No token provided." });
  }

  return jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
      return;
    } else {
      return decoded.id;
    }
  });
};

module.exports = { verify };
