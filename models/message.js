'use strict';
const {
  Model
} = require( 'sequelize' );

const { v4: uuidv4 } = require( 'uuid' );

module.exports = ( sequelize, DataTypes ) =>
{
  class Message extends Model
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( models )
    {
      Message.belongsTo( models.User, {
        targetKey: 'id',
        foreignKey: 'senderId',
      } );
      Message.belongsTo( models.User, {
        targetKey: 'id',
        foreignKey: 'recipentId',
      } );
      Message.belongsTo( models.Room, {
        targetKey: 'id',
        foreignKey: 'roomId',
      } );
    }
  };
  Message.init( {
    senderId: DataTypes.STRING,
    recipentId: DataTypes.STRING,
    content: DataTypes.STRING,
    roomId: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    hooks: {
      beforeCreate( instance, option )
      {
        instance.id = uuidv4();
      },
    },
    sequelize,
    modelName: 'Message',
  } );
  return Message;
};