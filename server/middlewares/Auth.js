const { checkToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentification = (req, res, next) => {
  const decoded = checkToken(req.headers.access_token);
  console.log(`auth`, decoded);
  User.findOne({
    where: {
      name: decoded.name,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "user not found",
        });
      } else {
        req.userData = decoded;
        next();
      }
    })
    .catch((error) => {
      return res.status(500).json({ msg: error.message });
    });
};

module.exports = authentification;
