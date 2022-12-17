'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersAndJobsCron extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UsersAndJobsCron.init({
    JobId: DataTypes.INTEGER,
    companyIdy: DataTypes.INTEGER,
    JobTitle: DataTypes.STRING,
    userName: DataTypes.STRING,
    profileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsersAndJobsCron',
  });
  return UsersAndJobsCron;
};