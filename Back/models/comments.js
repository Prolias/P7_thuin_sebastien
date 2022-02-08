'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Comments.hasMany(models.Comments, {as: 'Comment', foreignKey: 'mainCommentId', onDelete: 'cascade', hooks:true})
      Comments.hasMany(models.Comments, {as: 'Comment', foreignKey: 'mainCommentId', sourceKey: 'id', useJunctionTable : false, onDelete: 'cascade', hooks:true})
      Comments.hasMany(models.Vote, {onDelete: 'cascade', hooks:true})
      Comments.belongsTo(models.User, {onDelete: 'cascade', hooks:true, foreignKey: 'userId'})
      Comments.belongsTo(models.Post, {onDelete: 'cascade', hooks:true, foreignKey: 'postId'})
      Comments.belongsTo(models.Comments, {onDelete: 'cascade', hooks:true, foreignKey: 'mainCommentId'})
    }
  };
  Comments.init({
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      },
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Post'
        },
        key: 'id'
      }
    },
    mainCommentId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Comments'
        },
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};