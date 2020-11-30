"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Chats", {
      fields: ["UserId"],
      type: "foreign key",
      name: "add fk to chats from user id",
      references: {
        table: "Users",
        field: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Chats", "UserId", {});
  },
};
