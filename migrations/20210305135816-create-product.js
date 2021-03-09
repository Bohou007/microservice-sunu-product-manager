'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code_product: {
        allowNull: false,
        type: Sequelize.STRING
      },
      product_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      code_filiale: {
        type: Sequelize.STRING
      },
      age_min: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      age_max: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      slug: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      status: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      disabledAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};