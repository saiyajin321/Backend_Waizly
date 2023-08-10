'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, { foreignKey: 'UserId' })
      Product.belongsTo(models.Category, { foreignKey: 'CategoryId' })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name Cannot Be Empty" },
        notNull: { msg: "Invalid Name" }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Category Cannot Be Empty" },
        notNull: { msg: "Invalid Category" }
      }
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Color Cannot Be Empty" },
        notNull: { msg: "Invalid Color" }
      }
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Size Cannot Be Empty" },
        notNull: { msg: "Invalid Size" }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Price Cannot Be Empty" },
        notNull: { msg: "Invalid Price" }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Description Cannot Be Empty" },
        notNull: { msg: "Invalid Description" }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "User Cannot Be Empty" },
        notNull: { msg: "Invalid User" }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};