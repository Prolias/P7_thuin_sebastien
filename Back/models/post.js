'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.hasMany(models.Comments, {onDelete: 'cascade', hooks:true, foreignKey: 'postId'});
      Post.hasMany(models.Vote, {onDelete: 'cascade', hooks:true});
      Post.belongsTo(models.User, {onDelete: 'cascade', hooks:true, foreignKey: 'userId'});
    }
  };
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mediaType: {
      type: DataTypes.ENUM,
      values: ['TEXT', 'IMAGE', 'VIDEO'],
      allowNull: false
    },
    mediaContent: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Post',
    tableName: 'Post'
  });
  return Post;
};