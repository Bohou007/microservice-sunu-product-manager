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
    }
  };
  Product.init({
    code_product: DataTypes.STRING,
    product_name: DataTypes.STRING,
    code_filiale: DataTypes.STRING,
    age_min: DataTypes.INTEGER,
    age_max: DataTypes.INTEGER,
    slug: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    disabledAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};