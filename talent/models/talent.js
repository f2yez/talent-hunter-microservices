'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Talent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Talent.init({
    birthData: DataTypes.DATE,
    jobTyp: DataTypes.STRING,
    Availability: DataTypes.STRING,
    experienceLevel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Talent',
  });
  return Talent;
};