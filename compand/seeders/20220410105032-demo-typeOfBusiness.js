"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert(
      "typeofbusinesses",
      [
        {
          id: 1,
          name: "manger",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("typeofbusinesses", null, {});
  },
};
