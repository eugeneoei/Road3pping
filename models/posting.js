'use strict';
module.exports = function(sequelize, DataTypes) {
  var posting = sequelize.define('posting', {
    userID: DataTypes.INTEGER,
    title: DataTypes.STRING,
    address: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return posting;
};
