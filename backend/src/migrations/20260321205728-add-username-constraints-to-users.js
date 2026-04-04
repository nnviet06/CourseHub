'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('users', {
      fields: ['username'],
      type: 'check',
      name: 'user_name_not_blank',
      where: {
        username: { [Sequelize.Op.ne]: '' }
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('users', 'user_name_not_blank')
  }
};
