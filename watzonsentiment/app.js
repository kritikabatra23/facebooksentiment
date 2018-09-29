//Importing required packages
var express = require('express');
var Chart = require('chart.js');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:true});
var PersonalityInsightsV2 = require('watson-developer-cloud/personality-insights/v2');

var personality_insights = new PersonalityInsightsV2({
    username: '4feadb0f-45e1-4328-a01f-04c693c9fc10',
    password: 'CFs1cmjV5gm6'
});
require('dotenv').load();

// Load the Cloudant library.
var Cloudant = require('@cloudant/cloudant');

//now any files in public are routed
app.use(express.static('public'));

// Initialize Cloudant with settings from .env
var username = process.env.cloudant_username || "nodejs";
var password = process.env.cloudant_password;
var cloudant = Cloudant({account:username, password:password});

function dfs(node,required) {
	//console.log(node);
	//console.log(required[node['id']]);
	
	if(required[node['id']]==0) {

		//console.log(node['id']+" : "+node['percentage'] );
		required[node['id']]=node['percentage']*100;
		}
	if(node['children']) {
		for(child in node['children']) dfs(node['children'][child],required);
	}
}

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});
app.get('/',function(req,res) {
	res.sendFile(__dirname+'/index.html');
});












app.get('/add',function(req, res){ //to add  into the database
	console.log("Username to be added : = " + req.query.username);
	req.query.username = req.query.username.trim();

	console.log("Useremail to be added : = " + req.query.useremail);
	req.query.useremail = req.query.useremail.trim();

	console.log("Password to be added : = " + req.query.userpassword);
	req.query.userpassword = req.query.userpassword.trim();

	//Search through the DB completely to check for duplicate name, before adding a new name
	var url = cloudant_url + "/names_database/_design/names_database/_view/names_database";
	var name_present = 0; //flag variable for checking if name is already present before inserting
	var name_string; //variable to store update for front end.

	//In this case, check if the ID is already present, else, insert a new document
	request({
			 url: url,
			 json: true
			}, function (error, response, body) {
		if (!error && response.statusCode === 200)
		{
			//Check if current input is present in the table, else add. If present then return with error message
			var user_data = body.rows;
			console.log("length of table: " + user_data.length);
			var loop_len = user_data.length;
			for(var i=0; i< loop_len; i++)
			{
				var doc = user_data[i];
				console.log("in Db : " + doc.value[1]);
				if(req.query.new_name === doc.value[1])
				{
					name_present = 1;
					break;
				}
			}
			if(name_present === 0) //if city is not already in the list
			{
				db.insert(req.query, function(err, data){
					if (!err)
					{
						console.log("Added new name");
						name_string="{\"added\":\"Yes\"}";
						res.contentType('application/json'); //res.contentType and res.send is added inside every block as code returns immediately
						res.send(JSON.parse(name_string));
					}
					else
					{
						console.log("Error inserting into DB " + err);
						name_string="{\"added\":\"DB insert error\"}";
						res.contentType('application/json');
						res.send(JSON.parse(name_string));

					}
				});
		    }
			else
			{
				console.log("Name is already present");
				name_string="{\"added\":\"No\"}";
				res.contentType('application/json');
				res.send(JSON.parse(name_string));
			}
		}
		else
		{
			console.log("No data from URL. Response : " + response.statusCode);
			name_string="{\"added\":\"DB read error\"}";
			res.contentType('application/json');
			res.send(JSON.parse(name_string));
		}
	});
});

















app.post('/result',urlencodedParser,function(req,res) {
    //var text = req.body.posts ;
	var text = "";
	var posts = [];
	
	var db = cloudant.db.use('posts');
	if(req.body.action=="Analyze through pie") {
    db.get(req.body.user, { revs_info: true }, function(err, body) {
	  if (!err)	{

	  	text = body['posts'].join('\n');
		  posts = body['posts'];
		 
	  	//required = {'Agreeableness':0,'Adventurousness':0,'Cautiousness':0,'Depression':0}
		  
		  required =  {'Extraversion_parent':0,'Openness':0,"Artistic interests" : 0,
		  "Emotionality":0,"Imagination":0,"Intellect":0,"Conscientiousness":0,"Activity level":0,
		  "Cheerfulness":0,"Agreeableness":0,"Morality":0,"Sympathy":0,"Neuroticism":0,"Anger":0,"Anxiety":0,
		  "Depression":0}
		
		
		personality_insights.profile({
        text: text,
        
        language: 'en' },
        function(err,response){
            if(err)
                res.send(err);
            else
                {
                    	dfs(response['tree'],required);
			fs.readFile('./public/pie.html', 'utf-8', function (err, data) {
			res.writeHead(200, { 'Content-Type': 'text/html' });
		        //res.writeHead(200, { 'Content-Type': 'text/html' });
        		//var chartData = [required['Adventurousness'],required['Agreeableness'],required['Depression'],required['Cautiousness']];
			
			//console.log('chart data');
			//console.log(chartData);

			var chartData = [required['Extraversion_parent'],required['Openness'],required['Artistic interests' ],
			required['Emotionality'],required['Imagination'],required['Intellect'],required['Conscientiousness'],required['Activity level'],
			required['Cheerfulness'],required['Agreeableness'],required['Morality'],required['Sympathy'],required['Neuroticism'],required['Anger'],required['Anxiety'],
			required['Depression']];


			 var prediction = "";
			 var base_value = 0.0;
			 var html_mappings  = {'Adventurousness':'Adventurous','Agreeableness':'Friendly', 'Intellect':'Intelligent','temperamental': 'Temperamental', 
														'Emotionality':'Emotional','Extraversion_parent':'Extraversion','Openness':'Openness',
														'Artistic interests':'Artistic', 'Imagination':'Imaginitive', 'Conscientiousness':'Conscientiousness','Activity level':'Active',
														'Cheerfulness':'Cheerful', 'Morality': 'Moral', 'Sympathy':'Sympathetic', 'Neuroticism':'Neurotic', 'Anger':'Angry', 'Anxiety':'Anxious',
														'Depression':'Depressed'}
					for(i in required) {
					   if(required[i]>base_value) {
							  prediction = i;
							  base_value = required[i];
									  } 
				   }
							  
				  var result = data.replace('{{chartData}}', JSON.stringify(chartData)).replace('{{prediction}}', html_mappings[prediction]);
							  
				  res.write(result);
				  res.end();
						  });
					  
										  }
							  });
						  }
						  else console.log(err);
						  });
						  }
						  else {
    db.get(req.body.user, { revs_info: true }, function(err, body) {
	  if (!err)	{
	  	text = body['posts'].join('\n');
		posts = body['posts'];
		 
	  	fs.readFile('./public/form_main.html', 'utf-8', function (err, data) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		var result = data.replace('<!--{{posts}}-->',Buffer.from("<h4> User posts : </h4>\n<ul> <li>"+posts.join(' </li>\n<li>')+"</li>\n</ul>",'ascii'));
		//console.log(result);
        res.write(result);
        res.end();
    });
	}
	else console.log(err);
	});
		
    }
});