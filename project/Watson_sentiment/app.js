//Importing required packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:true});
var PersonalityInsightsV2 = require('watson-developer-cloud/personality-insights/v2');

var personality_insights = new PersonalityInsightsV2({
    username: '4feadb0f-45e1-4328-a01f-04c693c9fc10',
    password: 'CFs1cmjV5gm6'
});

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

app.post('/result',urlencodedParser,function(req,res) {
    var text = req.body.posts ;
    var  result = "<h3>Personality Insights results </h3>\n";

    required = {'Extraversion_parent':0,'Openness':0,"Artistic interests" : 0,"Emotionality":0,"Imagination":0,"Intellect":0,"Conscientiousness":0,"Activity level":0,"Cheerfulness":0,"Agreeableness":0,"Morality":0,"Sympathy":0,"Neuroticism":0,"Anger":0,"Anxiety":0,"Depression":0}
    personality_insights.profile({
        text: text,
        
        language: 'en' },
        function(err,response){
            if(err)
                res.send(err);
            else
                    {
                    	//console.log(response['tree']['children']);
                    	//console.log(response.tree);
                    	dfs(response['tree'],required);
                    	for(id in required) result+=id+' : \t'+required[id].toFixed(2)+' % <br />';
                    	res.send(result);
                    }
        });

});
