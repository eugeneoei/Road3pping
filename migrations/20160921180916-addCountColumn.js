'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'postings',
      'count',
      Sequelize.INTEGER
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'postings',
      'count',
      Sequelize.INTEGER
    )
  }
};
