/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var bodyParser = require('body-parser');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// Load the Cloudant library.
var Cloudant = require('@cloudant/cloudant');

var me = 'f56528eb-a4ac-404b-aca2-06d2698cdf60-bluemix'; // Set this to your own account
var password = '6b01291ccc8a51483ddc95b662042a87ec980fa3430858d27497c50986661249';

// Initialize the library with my account.
var cloudant = Cloudant({account:me, password:password});

cloudant.db.list(function(err, allDbs) {
  // console.log(allDbs)
  console.log('All my databases: %s', allDbs.join(', '))
});


// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

//handle the data from user
app.post('/project', function(req, res){
  var project=req.body;
  var db = cloudant.db.use('facebooksentiment');

  db.insert(facebooksentiment, function(err,body,headers){
    if (err){
      res.send('project not inserted'+ err.message);
      return console.log('[test.insert]', err.message);
    }
  });






  console.log('You have inserted a new project.');
  res.send('project received');
})

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
