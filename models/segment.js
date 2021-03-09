'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Segment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Segment.init({
    segment_name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    disabledAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Segment',
  });
  return Segment;
};