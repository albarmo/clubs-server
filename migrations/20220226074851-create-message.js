'use strict';
module.exports = {
  up: async ( queryInterface, Sequelize ) =>
  {
    await queryInterface.createTable( 'Messages', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      senderId: {
        type: Sequelize.UUID,
        primaryKey: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        unique: 'user-1-id',
      },
      recipentId: {
        type: Sequelize.UUID,
        primaryKey: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        unique: 'user-1-id',
      },
      roomId: {
        type: Sequelize.UUID,
        primaryKey: false,
        references: {
          model: 'Rooms',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        unique: 'message-room-id',
      },
      content: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    } );
  },
  down: async ( queryInterface, Sequelize ) =>
  {
    await queryInterface.dropTable( 'Messages' );
  }
};