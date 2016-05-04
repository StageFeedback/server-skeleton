var AWS = require('aws-sdk');
var fs = require('fs');
var zlib = require('zlib');

//Modules
var DynamoDBAddData = require('../DynamoDB/dynamoDB');

var s3 = new AWS.S3({region: "us-west-1"});

/*
*  List all Buckets
*/
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

/*
* Upload Large media to S3
*/
exports.uploadLargeFileToBucket = function (req, res) {
  var filePath = '/Users/Tanvimarballi/Desktop/IMG_0134.jpg';

  var body = fs.createReadStream(filePath).pipe(zlib.createGzip());
  var params = {Bucket: 'stagefeedback', Key: req.params.title, Body: body}

  s3.upload(params)
  .on('httpUploadProgress', function(evt) {
      console.log(evt);
    })
  .send(function(err,data) {
      if (err) {
        res.send(err);
      }
      else {
        console.log('uploaded to S3');
        DynamoDBAddData.uploadData(data.Location)
        res.send('Success');
      }
    })
}

/*
* Get a file from S3
*/
exports.getFileFromBucket = function(req, res) {
  var file = require('fs').createWriteStream('/Users/Tanvimarballi/Desktop/file1.jpg');
  s3.getObject({Bucket: 'stagefeedback', Key: req.params.body}).createReadStream().pipe(file);
}
