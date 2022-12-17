'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Job.init({
    companyIdy: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    JobType: DataTypes.STRING,
    level: DataTypes.STRING,
    skills: DataTypes.STRING,
    experience: DataTypes.STRING,
    min: DataTypes.INTEGER,
    max: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    JobLocation: DataTypes.STRING,
    IsRemotly: DataTypes.BOOLEAN,
    draft: DataTypes.BOOLEAN,
    releaseJob: DataTypes.BOOLEAN,
    approve: DataTypes.BOOLEAN,
    privacy: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};