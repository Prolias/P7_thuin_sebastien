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
      User.hasMany(models.Post, {onDelete: 'cascade', hooks:true, foreignKey: 'userId'})
      User.hasMany(models.Comments, {onDelete: 'cascade', hooks:true, foreignKey: 'userId'})
      User.hasMany(models.Vote, {onDelete: 'cascade', hooks:true})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};