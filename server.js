
/*
  Notes:
  1) Create an IAM user(StageProject for this project) on the IAM USer management console.
  2) For working with a dynamodb use the region and the endpoint of your table.
*/

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/*
* Modules
*/
var S3Actions = require('./src/S3/s3');

app.post('/upload/', S3Actions.uploadMedia);
app.get('/listBuckets', S3Actions.listBuckets);

app.listen(3000);
