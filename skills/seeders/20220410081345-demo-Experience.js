"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("experiences", [
      {
        id: 1,
        company: "new solution",
        position: "trainer",
        Description: "university",
        parentId: 4,
        startMonthDate: "2022-11-06 09:43:02",
        startYearDate: "2028-04-06 08:43:03",
        EndMonthDate: "2022-11-06 09:43:05",
        EndYearDate: "2028-04-06 08:43:06",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("experiences", null, {});
  },
};
