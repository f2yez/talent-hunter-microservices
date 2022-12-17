'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Experiences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      Description: {
        type: Sequelize.STRING
      },
      parentId: {
        type: Sequelize.INTEGER
      },
      startMonthDate: {
        type: Sequelize.DATE
      },
      startYearDate: {
        type: Sequelize.DATE
      },
      EndMonthDate: {
        type: Sequelize.DATE
      },
      EndYearDate: {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Experiences');
  }
};