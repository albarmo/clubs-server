"use strict";
const { Model } = require( "sequelize" );

// import function hash password
const { getHash } = require( "../helpers/bcrypt" );
const { v4: uuidv4 } = require( 'uuid' );

module.exports = ( sequelize, DataTypes ) =>
{
  class User extends Model
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( models )
    {
      User.hasMany( models.Room, {
        sourceKey: 'id',
        foreignKey: 'user1',
      } );
      User.hasMany( models.Message, {
        sourceKey: 'id',
        foreignKey: 'senderId',
      } );
    }
  }
  User.init(
    {
      fullname: DataTypes.STRING,
      nickname: DataTypes.STRING,
      status: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          argv: true,
          msg: 'email is already in use',
        },
        validate: {
          notEmpty: {
            args: true,
            msg: 'Email cannot be empty',
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          argv: true,
          msg: 'phone number is already in use',
        },
        validate: {
          notEmpty: {
            args: true,
            msg: 'User phone number cannot be empty',
          },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Failed, password cant be empty!",
          },
          len: {
            args: [ 6, 20 ],
            msg:
              "password length must greater than 6 and less than 20 characters",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate( instance, option )
        {
          instance.id = uuidv4();
          instance.password = getHash( instance.password );
          instance.status = "available";
        },
        beforeUpdate( instance )
        {
          instance.password = getHash( instance.password );
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
