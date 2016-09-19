var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();

// router.post('/signup', function(req, res) {
//   // find or create a user, providing the name and password as default values
//   db.user.findOrCreate({
//     where: { email: req.body.email },
//     defaults: {
//       name: req.body.name,
//       password: req.body.password
//     }
//   }).spread(function(user, created) {
//     if (created) {
//       // if created, success and redirect home
//       console.log('User created!');
//       res.redirect('/');
//     } else {
//       // if not created, the email already exists
//       console.log('Email already exists');
//       res.redirect('/auth/signup');
//     }
//   }).catch(function(error) {
//     // if an error occurs, let's see what the error is
//     console.log('An error occurred: ', error.message);
//     res.redirect('/auth/signup');
//   });
// });

// after clicking signup button
router.get("/signup", function(req,res){
  res.render("auth/signup.ejs");
  console.log("sign up page rendered");
})

// after submitting sign up
router.post("/signup", function signup(req,res) {
  db.user.findOrCreate({
    where: {username: req.body.username},
    defaults: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    }
  }).spread(function(data,created) {
    if(created) {
      // render user page with client's username
      // res.render('user.ejs', {data:data});
      // console.log("home page rendered after sign up");
      passport.authenticate('local', {
        // redirect to user. but i need the data!!!!
        // how is the data going to be redirected together?
        successRedirect: '/user',
        successFlash: 'Account created and logged in'
      })(req, res);
      console.log(req);
    }
    else {
      // if not created ie username already exists
      // console.log('Email already exists');
      req.flash('error', 'Email already exists. Please try again.');
      res.redirect('/auth/signup');
      console.log("failed to signed up. redirected to sign in page");
      // res.render('auth/signup.ejs');
      // console.log("route back to sign up page");
    }
  }).catch(function(error) {
    // if an error occurs, let's see what the error is
    console.log('An error occurred: ', error.message);
    req.flash('error', error.message);
    // res.render('auth/signup.ejs');
    res.redirect('/auth/signup');
  });
});

// after clicking login button
router.get("/login", function(req,res) {
  res.render("auth/login.ejs");
  console.log("log in page rendered")
});

// after submitting login
router.post('/login', passport.authenticate('local', {
  // is this successRedirect correct? ie route to app.post
  // login in index.js? seems wrong but how?
  successRedirect: '/user',
  successFlash: 'Successfully logged in!',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password. Please try again.'

}));
// console.log("auth log in post");

router.get('/logout', function(req, res) {
  req.logout();
  console.log('logged out');
  req.flash('success', 'You have logged out successfully!');
  res.redirect('/');
});



module.exports = router;
