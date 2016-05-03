var AWS = require('aws-sdk');
var DynamoDBAddData = require('../DynamoDB/dynamoDB');

var s3 = new AWS.S3({region: "us-west-1"});

exports.listBuckets = function(req, res) {

  s3.listBuckets(function(err, data) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(data);
      for (var index in data.Buckets) {
        var bucket = data.Buckets[index];
      }
    }
  });
}

exports.uploadToBucket = function(req, res){
  s3.upload(
    {
      Bucket: 'stagefeedback',
      Key: req.params.body,
      Body: req.params.body
    },

    function(err, data) {

      if (err) {
        res.send(err);
      }
      else {
        res.send(data.Location);
        DynamoDBAddData.uploadData(data.Location);
      }
    });
}
