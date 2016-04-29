var express = require('express');
var AWS = require('aws-sdk');

var app = express();

AWS.config.update({
  region: "us-west-1",
  endpoint: "https://dynamodb.us-west-1.amazonaws.com"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Names",
    KeySchema: [
        { AttributeName: "year", KeyType: "HASH"},  //Partition key
        { AttributeName: "title", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "year", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

app.get('/createTable:', function(req, res)
{
  dynamodb.createTable(params, function(err, data) {
    if (err) {
      res.send(err);
    }
    else {
      res.send('Table Created');
    }
  });
});

app.listens(3000);
