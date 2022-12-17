'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      website: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      noOfEmployees: {
        type: Sequelize.INTEGER
      },
      typeOfBusiness: {
        type: Sequelize.STRING
      },
      YearEstablishes: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Companies');
  }
};