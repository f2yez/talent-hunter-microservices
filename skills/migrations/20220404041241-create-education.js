'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Education', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      degree: {
        type: Sequelize.INTEGER
      },
      university: {
        type: Sequelize.STRING
      },
      parentId: {
        type: Sequelize.INTEGER
      },
      startDate: {
        type: Sequelize.DATE
      },
      EndDate: {
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
    await queryInterface.dropTable('Education');
  }
};