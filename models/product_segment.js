'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_Segment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product_Segment.init({
    product_id: DataTypes.INTEGER,
    segment_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_Segment',
  });
  return Product_Segment;
};