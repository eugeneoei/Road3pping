'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'postings',
      'latitude',
      Sequelize.DECIMAL
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'postings',
      'latitude',
      Sequelize.DECIMAL
    )
  }
};
