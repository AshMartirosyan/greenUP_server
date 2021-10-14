const users = require("../dbModules/user.modul");
const jwt = require("jsonwebtoken");
const keys = require("../Constants/keys");

function getCredentials(req, res) {
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf("Basic ") === -1
  ) {
    return res.status(401).json({ message: "Missing Authorization Header" });
  }
  //Have to check if in the db has the user with requested username and password
  const base64Credentials = req.headers.authorization.split(" ")[1];
  var credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
  return credentials.split(":");
}

const authenticate = (req, res) => {
  console.log(1);
  const [username, password] = getCredentials(req, res);
  const privateKey = () => {
    return req.headers.device == "mobile"
      ? keys.MOBILE_TOKEN_KEY
      : keys.HARDWARE_TOKEN_KEY;
  };
  let user = users.findOne(
    { username: username, password: password },
    (err, user) => {
      if (!err) {
        var token = jwt.sign({ id: user._id }, privateKey(), {
          expiresIn: 2592000, // expires in 1 months
        });
        res.status(200).send({ auth: true, token: token });
      } else {
        res.status(401).json({ message: "Invalid Authentication Credentials" });
      }
    }
  );
};

module.exports = { authenticate };
