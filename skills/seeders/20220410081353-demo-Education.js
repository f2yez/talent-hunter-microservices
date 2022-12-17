"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("education", [
      {
        id: 1,
        degree: 60,
        university: "IUG",
        parentId: 4,
        startDate: "2022-04-06 10:53:31",
        EndDate: "2023-04-13 10:53:33",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("education", null, {});
  },
};
