var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');


passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.user.findById(id).then(function(user) {
    cb(null, user);
  }).catch(cb);
});

passport.use(new LocalStrategy({
  // usernameField and passwordField are special keywords by
  // passport. so the values have to be changed accordingly
  // to what you name as your username and password
  usernameField: 'username',
  passwordField: 'password'
}, function(username, password, cb) {
  db.user.find({
    where: { username: username }
  }).then(function(user) {
    if (!user || !user.validPassword(password)) {
      cb(null, false);
    } else {
      cb(null, user);
    }
  }).catch(cb);
}));

console.log("passport working");

module.exports = passport;
