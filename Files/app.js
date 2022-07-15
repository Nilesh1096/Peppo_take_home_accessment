const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/TempDB");

const postSchema = {
 name: String,
 email: String,
 mobile: Number,
 item_name: String,
 item_type:String,
 price : Number
};

const Post = mongoose.model("Post", postSchema);


app.get("/", function(req, res){
  res.render("checkout");
});

app.get("/thankYou", function(req, res){
  res.render("thankYou");
     });

app.post("/", function(req, res){
  const post = new Post ({
    name: req.body.postName,
    email: req.body.postEmail,
    mobile: req.body.postMobile,
    item_name: req.body.postItemName,
    item_type:req.body.postItemType,
    price:req.body.postPrice
 });

 post.save(function(err){

  if (!err){
    console.log(post);
    res.redirect("/thankYou");

  }
});

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
