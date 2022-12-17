'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyIdy: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      JobType: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.STRING
      },
      skills: {
        type: Sequelize.STRING
      },
      experience: {
        type: Sequelize.STRING
      },
      min: {
        type: Sequelize.INTEGER
      },
      max: {
        type: Sequelize.INTEGER
      },
      currency: {
        type: Sequelize.STRING
      },
      JobLocation: {
        type: Sequelize.STRING
      },
      IsRemotly: {
        type: Sequelize.BOOLEAN
      },
      draft: {
        type: Sequelize.BOOLEAN
      },
      releaseJob: {
        type: Sequelize.BOOLEAN
      },
      approve: {
        type: Sequelize.BOOLEAN
      },
      privacy: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Jobs');
  }
};