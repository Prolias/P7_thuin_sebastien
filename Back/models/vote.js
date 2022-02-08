'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Vote.init({
    vote: {
      type: DataTypes.BOOLEAN,
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
    commentId: {
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
    modelName: 'Vote',
  });
  return Vote;
};