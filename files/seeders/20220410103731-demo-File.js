"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("files", [
      {
        id: 1,
        name: "./Files/3_1649329142908file.png",
        type: "image/png",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "./Files/3_1649329142908file.png",
        type: "image/png",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('files', null, {});
  },
};
