# server-skeleton

1) clone this repository. Open your terminal and navigate to the root folder of this Repo <br>
2) Do an NPM install (Make sure you have npm installed). <br> 
3) Grab the AWS access ID and secret from the IAM user management console and store it in the credentials file in     ~/.aws/credentials <br>
4) Start the server from your terminal using the following command: node server.js (make sure you have node installed) <br>
5) Open a new terminal window and type: <br>
<br>
POST:- curl -i -X POST -H 'Content-Type: application/json' -d '{"title": "<title>", "path": "<path to file>"' http://localhost:3000/upload/

<br>

GET:- curl -i -X GET http://localhost:3000/listBuckets


