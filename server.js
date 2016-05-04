
/*
  Notes:
  1) Create an IAM user(StageProject for this project) on the IAM USer management console.
  2) For working with a dynamodb use the region and the endpoint of your table.
*/

var express = require('express');
var app = express();

/*
* Modules
*/
var S3Actions = require('./src/S3/s3');

app.get('/listBuckets', S3Actions.listBuckets);
app.get('/upload/:title', S3Actions.uploadLargeFileToBucket);

app.listen(3000);
