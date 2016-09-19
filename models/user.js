var bcrypt = require('bcrypt-nodejs');
// note that this is bcrypt-nodejs so the syntax is slightly different

'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },

    firstName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },

    lastName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },

    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Password must be between 8 and 99 characters'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function(createdUser, options, cb) {
        // hash the password
        // the salt is automatically generated and attached to the hash.
        // Though you can use your custom salt and there is no need for salts to
        // be persisted as it will always be included in the final hash result
        // and can be retrieved.
        // syntax here will be slightly different because you are using
        // bcrypt-nodejs instead of bcrypt
        var hash = bcrypt.hashSync(createdUser.password);
        // store the hash as the user's password
        createdUser.password = hash;
        // continue to save the user, with no errors
        cb(null, createdUser);
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        // return if the password matches the hash
        // this.password refers to the password found in the particular object row
        // note that one row in the database is returned as an object,
        // while multiple rows are returned as objects in an array
        // pay attention to this when you are accessing the values when a single
        // or multiple rows are returned from the database
        // typically, instance refers to one row of information in the database
        return bcrypt.compareSync(password, this.password);
      },
      toJSON: function() {
        // get the user's JSON data
        var jsonUser = this.get();
        // delete the password from the JSON data, and return
        delete jsonUser.password;
        return jsonUser;
      }
    }
  });
  return user;
};
