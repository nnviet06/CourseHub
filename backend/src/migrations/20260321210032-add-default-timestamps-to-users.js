'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()'),
    })
    await queryInterface.changeColumn('users', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()'),
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: null,
    })
    await queryInterface.changeColumn('users', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: null,
    })
  }
};
