'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'postings',
      'category',
      Sequelize.STRING
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'postings',
      'category',
      Sequelize.STRING
    )
  }
};
