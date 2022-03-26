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
    name:{
      type:  DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'name cannot be empty'
        },
        notNull:{
          msg: 'name cannot be null'
        }
      }
    },
    verificationId: {
      type:  DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'verification ID cannot be empty'
        },
        notNull:{
          msg: 'verification ID cannot be null'
        }
      }
    },
    address: {
      type:  DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'address cannot be empty'
        },
        notNull:{
          msg: 'address cannot be null'
        }
      }
    },
    dateOfBirth:  {
      type:  DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'date of birth cannot be empty'
        },
        notNull:{
          msg: 'date of birth  cannot be null'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};