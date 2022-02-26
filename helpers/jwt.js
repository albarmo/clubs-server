const jwt = require("jsonwebtoken");

function getToken(payload) {
  return jwt.sign(payload, "supersecretkey");
}

function checkToken(access_token) {
  return jwt.verify(access_token, "supersecretkey");
}

module.exports = {
  getToken,
  checkToken,
};
