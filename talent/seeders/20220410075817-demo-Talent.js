"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("talents", [
      {
        id: 4,
        birthData: "2000-01-06 22:00:00",
        jobTyp: '["Full-time"]',
        Availability: "Looking for job",
        experienceLevel: '["Mid-level"]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("talents", null, {});
  },
};
