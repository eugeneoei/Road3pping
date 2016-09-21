'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'postings',
      'longitude',
      Sequelize.DECIMAL
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'postings',
      'longitude',
      Sequelize.DECIMAL
    )
  }
};
