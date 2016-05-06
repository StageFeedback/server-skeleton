var AWS = require('aws-sdk');
var fs = require('fs');
var zlib = require('zlib');

//Modules
var DynamoDBAddData = require('../DynamoDB/dynamoDB');

var s3 = new AWS.S3({region: "us-west-1"});
var bucketName = 'stagefeedback';

//--------------------------------------------GET CALLS-----------------------------------------

/*
*  List all my buckets
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
* Get a file from my bucket
*/
exports.getFile = function(req, res) {
  var file = require('fs').createWriteStream('/Users/Tanvimarballi/Desktop/file1.jpg');
  s3.getObject({Bucket: bucketName, Key: req.params.body}).createReadStream().pipe(file);
}


//--------------------------------------------POST CALLS-----------------------------------------


/*
* Upload Large media to S3
*/
exports.uploadMedia = function (req, res) {

   var body = fs.createReadStream(req.body.path).pipe(zlib.createGzip());
   var params = {
     Bucket: bucketName,
     Key: req.body.title,
     Body: body
   }

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
