'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Formulas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Formulas.init({
    code_formulas: DataTypes.STRING,
    formulas_name: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    slug: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    disabledAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Formulas',
  });
  return Formulas;
};