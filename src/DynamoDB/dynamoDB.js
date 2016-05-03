var AWS = require('aws-sdk');

var docClient = new AWS.DynamoDB.DocumentClient({region: "us-west-1",endpoint: "https://dynamodb.us-west-1.amazonaws.com"});

exports.uploadData = function(data) {

  var params = {
    TableName: "Names",
    Item : {
      "names": data
    }
  }

  docClient.put(params, function(err, data){
    if (err) {
      console.log(err);
    }
    else {
      console.log('Item Added');
    }
  })
}
