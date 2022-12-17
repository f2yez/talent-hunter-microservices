'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    fullName: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.STRING,
    planId: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    profileId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    country: DataTypes.STRING,
    image: DataTypes.STRING,
    vitrified: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};