var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');


// after clicking CREATE button to render new post input
router.get('/create', isLoggedIn, function(req,res) {
  res.render("posting/create.ejs")
  console.log("create input rendered");
})

// after clicking create post button
router.post('/create', isLoggedIn, function(req,res) {
  console.log("look here:", req.user.dataValues.id);
  // console.log("this is current user:", currentUser);
  db.posting.findOrCreate({
    where: {address: req.body.address},
    defaults: {
      userID: req.user.dataValues.id,
      title: req.body.title,
      imageURL: req.body.imageURL,
      description: req.body.description
    }
  }).spread(function(data,created) {
    if(created) {
      res.render("post.ejs");
      console.log("display image posted rendered");
    }
    else {
      console.log("failed to create new post");
      // flash message for successful post?
      req.flash('error', 'failed to create post. please post again');
      res.redirect('/posting/create');
    }
  })
})

// after clicking on VIEW button
router.get('/view', isLoggedIn, function(req,res) {

})



module.exports = router;
