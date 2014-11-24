var express = require('express');
var app = express();
var winston = require('winston');
var underscore = require('underscore');
var bodyParser = require('body-parser');
var moment = require('moment');
var low = require('lowdb');
var db = low('db.json');
var unirest = require('unirest');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(bodyParser());

winston.log('info', 'Hello distributed log files!');

function getTwitter(url){
	unirest.get('http://cdn.api.twitter.com/1/urls/count.json?url='+url)
	.end(function (response) {
		var data = response.body;
		var checkData = db('urls').find({ 'url': url }).value();
		if(checkData===undefined){
			db('urls').push({'url':url,'twitter':{'count':data.count}});	
		}else{
			console.log("Updating value");			
			db('urls').find({'url':url}).assign({'twitter':{'count':data.count}});
		}
		
	});
}

function getFacebook(url){
	unirest.get('https://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27'+url+'%27')
	.end(function (response) {
		var data = JSON.parse(response.body);
		var checkData = db('urls').find({ 'url': url }).value();
		
		console.log(data);
		if(data.data!==undefined){					
			if(checkData===undefined){
				db('urls').push({'url':url,'facebook':{'share_count':data.data[0].share_count,'like_count':data.data[0].like_count,'comment_count':data.data[0].comment_count,'total_count':data.data[0].total_count}});	
			}else{
				console.log("Updating value");			
				db('urls').find({'url':url}).assign({'facebook':{'share_count':data.data[0].share_count,'like_count':data.data[0].like_count,'comment_count':data.data[0].comment_count,'total_count':data.data[0].total_count}});
			}
		}
	});
}



app.get('/', function(req, res){
	console.log("Index");

});

app.get('/shared/:url', function(req, res){	
	var urlProcess = req.param('url');
	winston.log("info","Processing "+urlProcess);
	var data   = db('urls').find({ url: urlProcess }).value();
	getTwitter(urlProcess);
	getFacebook(urlProcess);
	winston.log(data);
	var result= db('urls').find({'url':urlProcess}).value();
	if(result===undefined){
		res.send({"result":0});
	}else{
		res.send(result);	
	}
	
});

app.post('/batch', function(req, res){	
	var urlProcess = req.body.url;
	var results=[];
	for(var i =0;i<urlProcess.length;i++){
		getTwitter(urlProcess[i]);
		getFacebook(urlProcess[i]);
		var result = db('urls').find({'url':urlProcess[i]}).value();
		if(result===undefined){
			results.push({'url':urlProcess[i],'result':0});
		}else{
			results.push(result);	
		}
		
	}
	if(results.length===0){
		res.send({"results":0});
	}else{
		res.send(results);	
	}
});


app.listen(3001);