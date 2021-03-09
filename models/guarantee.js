'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guarantee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Guarantee.init({
    code_guarantee: DataTypes.STRING,
    guarantee_name: DataTypes.STRING,
    description: DataTypes.TEXT,
    ref_calcule: DataTypes.STRING,
    status: DataTypes.INTEGER,
    disabledAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Guarantee',
  });
  return Guarantee;
};