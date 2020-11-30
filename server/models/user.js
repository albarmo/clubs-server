"use strict";
const { Model } = require("sequelize");

// import function hash password
const { getHash } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Chat, {
        targetKey: "id",
        foreignKey: "id",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Failed, password cant be empty!",
          },
          len: {
            args: [6, 20],
            msg:
              "password length must greater than 6 and less than 20 characters",
          },
        },
      },
      image_url: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(instance, option) {
          instance.password = getHash(instance.password);
          if (instance.image_url === "") {
            instance.image_url =
              "https://www.clipartmax.com/png/middle/257-2572603_user-man-social-avatar-profile-icon-man-avatar-in-circle.png";
          }
          if (instance.status === "") {
            instance.status = "available";
          }
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
