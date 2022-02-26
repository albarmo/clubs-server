'use strict';
const {
  Model
} = require( 'sequelize' );

const { v4: uuidv4 } = require( 'uuid' );

module.exports = ( sequelize, DataTypes ) =>
{
  class Room extends Model
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( models )
    {
      Room.belongsTo( models.User, { foreignKey: 'user1', targetKey: 'id' } );
      Room.belongsTo( models.User, { foreignKey: 'user2', targetKey: 'id' } );
      Room.hasMany( models.Message, {
        sourceKey: 'id',
        foreignKey: 'roomId',
      } );
    }
  };
  Room.init( {
    type: DataTypes.STRING,
    user1: DataTypes.STRING,
    user2: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate( instance, option )
      {
        instance.id = uuidv4();
      },
    },
    sequelize,
    modelName: 'Room',
  } );
  return Room;
};