var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "contacts";

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var db;

mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, database){
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = database;
  console.log("database connection ready");

  var server = app.listen(process.env.PORT || 8080, function(){
    var port = server.address().port;
    console.log("App is now running on port:", port);
  });
});


function handleError(res, reason, message, code){
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.get("/contacts", function(req, res){
  
});
