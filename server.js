
/*
  Notes:
  1) Create an IAM user(StageProject for this project) on the IAM USer management console.
  2) For working with a dynamodb use the region and the endpoint of your table.
*/

var express = require('express');
var AWS = require('aws-sdk');

var app = express();

AWS.config.update({
  region: "us-west-1",
  endpoint: "https://dynamodb.us-west-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();

app.get('/addName/:name',function(req, res) {
  var params = {
    TableName: "Names",
    Item:{
      "names": req.params.name
    }
  }

  docClient.put(params, function(err, data) {
    if (err) {
      res.send('Error: '+err);
    }
    else {
      res.send("Added item:");
    }
  });
});
app.listen(3000);
