'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UsersAndJobsCrons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      JobId: {
        type: Sequelize.INTEGER
      },
      companyIdy: {
        type: Sequelize.INTEGER
      },
      JobTitle: {
        type: Sequelize.STRING
      },
      userName: {
        type: Sequelize.STRING
      },
      profileId: {
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
    await queryInterface.dropTable('UsersAndJobsCrons');
  }
};