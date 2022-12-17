'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Experience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Experience.init({
    company: DataTypes.STRING,
    position: DataTypes.STRING,
    Description: DataTypes.STRING,
    parentId: DataTypes.INTEGER,
    startMonthDate: DataTypes.DATE,
    startYearDate: DataTypes.DATE,
    EndMonthDate: DataTypes.DATE,
    EndYearDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Experience',
  });
  return Experience;
};