var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');
var methodOverride = require('method-override');

var app = express();

app.use(methodOverride('_method'));

// after clicking POST button to render new post input
router.get('/post', isLoggedIn, function(req,res) {
  res.render("post.ejs")
  // console.log("post input rendered");
})

// after clicking create post button
router.post('/create', isLoggedIn, function(req,res) {
  // console.log("look here:", req.user.dataValues.id);
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
      res.redirect("/posting/posts");
      // console.log("display image posted rendered");
    }
    else {
      // console.log("failed to create new post");
      // flash message for successful post?
      req.flash('error', 'failed to create post. please post again');
      res.redirect('/posting/create');
    }
  })
})

// after clicking on VIEW YOUR POSTS button
router.get('/posts', isLoggedIn, function(req,res) {
  // console.log("look here:", req.user.dataValues.id);

  db.posting.findAll({
    where: {userID: req.user.dataValues.id}
  }).then(function(data) {
    // console.log(data);
    // console.log("number of posts by current user:", data.length);
    res.render("posts.ejs", {data:data})
    // console.log("view all post by user rendered");
  })
})

router.get('/posts/:id/edit', isLoggedIn, function(req,res) {
  db.posting.find({
    where: {id: req.params.id}
  }).then(function(data) {
    // console.log("look here:", data);
    // console.log("");
    res.render("post_edit.ejs", {data:data});
    // console.log("post_edit rendered");
  })
})


router.put('/posts/:id', isLoggedIn, function(req,res) {
  console.log("updating hereeeeee");
  db.posting.update({
    title: req.body.title,
    address: req.body.address,
    imageURL: req.body.imageURL,
    description: req.body.description
  }, {
    where: {
      id: req.params.id
    }
  }).then(function() {
    console.log("post updated");
    res.redirect('/posting/posts');
    console.log("directed to view all posts");
  })
})



// router.delete



module.exports = router;
