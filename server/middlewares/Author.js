const { Chat } = require("../models");

const authorization = (req, res, next) => {
  Chat.findOne({ where: { id: req.params.id } })
    .then((data) => {
      if (!data) {
        console.log(user);
        return res.status(404).json({ mesage: "data not found!" });
      } else if (data.UserId !== req.userData.id) {
        return res
          .status(401)
          .json({ msg: "You dont have access to this rooms" });
      } else {
        next();
      }
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
};

module.exports = authorization;
