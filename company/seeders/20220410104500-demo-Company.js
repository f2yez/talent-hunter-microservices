"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert(
      "companies",
      [
        {
          id: 1,
          website: "https://www.google.ps/",
          address: "street",
          noOfEmployees: 10,
          typeOfBusiness: "1",
          YearEstablishes: 1999,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("companies", null, {});
  },
};
