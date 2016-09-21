var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');
var methodOverride = require('method-override');

// convert address to longitude and latitude
var NodeGeocoder = require('node-geocoder');
var options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: process.env.KEY_SECRET, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
var geocoder = NodeGeocoder(options);

var app = express();

app.use(methodOverride('_method'));

// after clicking POST button to render new post input
router.get('/post', isLoggedIn, function(req,res) {
  res.render("post.ejs")
  // console.log("post input rendered");
})

// after clicking create post button
router.post('/create', isLoggedIn, function(req,res) {
  //  convert address to geospatial then store it in database
  // var latitude = "";
  // var longitude = "";
  geocoder.geocode(req.body.address, function(err, r) {
    console.log("look here", r);
    var latitude = r[0].latitude;
    console.log(typeof(">>>>>>>", latitude));
    var longitude = r[0].longitude;
    console.log(typeof(">>>>>>>", longitude));

    // console.log("look here:", req.user.dataValues.id);
    db.posting.findOrCreate({
      where: {address: req.body.address},
      defaults: {
        userID: req.user.dataValues.id,
        title: req.body.title,
        category: req.body.category,
        imageURL: req.body.imageURL,
        description: req.body.description,
        latitude: latitude,
        longitude: longitude
      }
    }).spread(function(data,created) {
      if(created) {
        res.redirect("/posting/posts");
        console.log(data);
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
})

// after clicking on VIEW YOUR POSTS button
// display all posts created by user
router.get('/posts', isLoggedIn, function(req,res) {
  // console.log("look here:", req.user.dataValues.id);
  db.posting.findAll({
    where: {userID: req.user.dataValues.id},
    order: [
      ['createdAt', 'ASC'],
    ]
  }).then(function(data) {
    // console.log(data);
    // console.log("number of posts by current user:", data.length);
    res.render("posts.ejs", {data:data})
    // console.log("view all post by user rendered");
  })
})

order: [
    // Will escape username and validate DESC against a list of valid direction parameters
    ['username', 'DESC'],
  ]

// allow user to make changes to respective post
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

// update new information in database
router.put('/posts/:id', isLoggedIn, function(req,res) {
  console.log("updating hereeeeee");
  db.posting.update({
    title: req.body.title,
    category: req.body.category,
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

// delete post from database
router.delete('/posts/:id', isLoggedIn, function(req,res) {
  console.log("post deleted");
  db.posting.destroy({
    where: {id: req.params.id}
  }).then(function() {
    res.redirect('/posting/posts');
  })
})


router.get('/categories/cafes', function(req,res) {
  // console.log("look here:", req);
  // console.log("display categories");
  db.posting.findAll({
      where: {category: "Cafes"}
  }).then(function(data) {
    console.log(data);
    res.render('category.ejs',{data:data});
  })
})

router.get('/categories/gym', function(req,res) {
  // console.log("look here:", req);
  // console.log("display categories");
  db.posting.findAll({
      where: {category: "Gym"}
  }).then(function(data) {
    console.log(data);
    res.render('category.ejs',{data:data});
  })
})

router.get('/categories/scenic', function(req,res) {
  // console.log("look here:", req);
  // console.log("display categories");
  db.posting.findAll({
      where: {category: "Scenic Overlook"}
  }).then(function(data) {
    console.log(data);
    res.render('category.ejs',{data:data});
  })
})

router.get('/categories/pharmacy', function(req,res) {
  // console.log("look here:", req);
  // console.log("display categories");
  db.posting.findAll({
      where: {category: "Pharmacy"}
  }).then(function(data) {
    console.log(data);
    res.render('category.ejs',{data:data});
  })
})

router.get('/categories/laundry', function(req,res) {
  // console.log("look here:", req);
  // console.log("display categories");
  db.posting.findAll({
      where: {category: "Laundry"}
  }).then(function(data) {
    console.log(data);
    res.render('category.ejs',{data:data});
  })
})

router.get('/categories/supermarkets', function(req,res) {
  // console.log("look here:", req);
  // console.log("display categories");
  db.posting.findAll({
      where: {category: "Supermarkets"}
  }).then(function(data) {
    console.log(data);
    res.render('category.ejs',{data:data});
  })
})

router.get('/categories/trails', function(req,res) {
  // console.log("look here:", req);
  // console.log("display categories");
  db.posting.findAll({
      where: {category: "Trails"}
  }).then(function(data) {
    console.log(data);
    res.render('category.ejs',{data:data});
  })
})

// '29 champs elysée paris',

// data[0].dataValues.address
module.exports = router;
