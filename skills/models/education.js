'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Education.init({
    degree: DataTypes.STRING,
    university: DataTypes.STRING,
    parentId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    EndDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Education',
  });
  return Education;
};