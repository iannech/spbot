var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 5000));

// Server index page
app.get("/", function(req, res){
  res.send("Deployed");
});

// Facebook webhook
// Used for verification
app.get("/webhook", function(req, res){
  if(req.query["hub.verify_token"] === 'my_token'){
    console.log("Verified webhook");
    res.status(200).send(req.query["hub.challenge"]);
  }else{
    console.error("verification failed. The tokens do not match.");
    res.sendStatus(403);
  }
});
