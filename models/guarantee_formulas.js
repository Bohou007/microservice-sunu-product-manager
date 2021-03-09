'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guarantee_Formulas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Guarantee_Formulas.init({
    guarantee_id: DataTypes.INTEGER,
    formulas_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Guarantee_Formulas',
  });
  return Guarantee_Formulas;
};