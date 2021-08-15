//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const _ = require('lodash');

const homeStartingContent = "Welcome to my Blog Website. I created this project while learning to use ExpressJs. Add /compose at the end of url and start typing your own post. The posts are saved on the server side hence would not be deleted till the server is active.";
const aboutContent1 = "This blog site is made by Aryan Gupta, a student of Chitkara University 2019-23 batch. To contact with me go to the ";
const aboutContent2 = '/contact';
const aboutContent3 = "section of this website"
const contactContent = "Here are my handles:";

const app = express();
const PORT = process.env.PORT || 3000;

let posts=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req, res){
  res.render("home",{
    firstPara:homeStartingContent,
    posts:posts
  });
});

app.get("/about", function(req, res){
  res.render("about",{
    about:aboutContent1,
    link: aboutContent2,
    cont: aboutContent3
  });
});

app.get("/contact", function(req, res){
  res.render("contact",{
    contact:contactContent
  });
});

app.get("/compose",function(req,res){
  res.render("compose");
})
app.get("/posts/:topic",function(req,res){
  const requestedTopic = _.lowerCase(req.params.topic);

  posts.forEach(function(element){
    const realTopics=_.lowerCase(element.postTitle)
    if(realTopics == requestedTopic){
      res.render("post",{
        postTitle:element.postTitle,
        Para:element.postBody
      });
    }
  });
});

app.post("/compose",function(req,res){
  var post={
    postTitle:req.body.postTitle,
    postBody:req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.listen(PORT, function() {
  console.log("Server started on port 3000");
});
