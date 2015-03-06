var connect = require('connect');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var express = require('express');
//var db = mongoskin.db('mongodb://<dbuser>:<password>@your.host.com:dbport/database', {safe:true});
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/build'));

credentials = {
	facebook: {
		clientID: process.env.FACEBOOK_ID || '923195097723030',
		clientSecret: process.env.FACEBOOK_SECRET || '41c17e0e110d358a738cffff24eef2f3',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'xP3wLS2YuUylvFAfTDtlfdRKJ',
		clientSecret: process.env.TWITTER_SECRET || 'f4k88mZAWIJDc3EnCf98qMb6EZapsQmUO6NFrdiyGlrG6tegcP',
		callbackURL: '/auth/twitter/callback'
	},
	twitterCounter: {
		apiKey: '39578770216b332a668c8b7a5d3e218e'
	},
	instagram: {
		clientID: process.env.INSTAGRAM_CLIENT_ID || '2ea4a18199f4443ca69c0be6e6180c86',
		clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || '417441686fac4bfaad89172d4ceb924a',
		callbackURL: '/auth/instagram/callback'
	},
	soundcloud: {
		clientID: process.env.SOUNDCLOUD_CLIENT_ID || '5791890dd6a8c62dfbe0294c26487095',
		clientSecret: process.env.SOUNDCLOUD_CLIENT_SECRET || '3a94a6721fae03ac65ce6bc84ae2a214',
		callbackURL: '/auth/soundcloud/callback'
	},
	spotify: {
		clientID: '73f7b323b1894ccb86ff3584c7de2ce1',
		clientSecret: 'd735c3da3ae14c2b88f7751cce8d5906',
		callbackURL: '/auth/spotify/callback'
	}
};

// TWITTER SETUP
TWITTER_CONSUMER_KEY = 'myUQ6sNZjLiZDc5tbzkLlBuCA';
TWITTER_CONSUMER_SECRET = 'pdHti68cDuLhJp27h1TfZkAgVgUWdkjYoIW6PFk7OENAA8fg8G'
TWITTER_ACCESS_TOKEN = '1511048018-ErgCI8AMrYpoF56p4grUSAFaZbmbpt1js7mEZ4c';
TWITTER_ACCESS_SECRET = 'tUcevP3q4GMMewQw1HmnEhrqivjn8IC0Gc3YQ3ATzkZ5T';

var Twitter = require('twitter');
var twitterClient = new Twitter({
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
  access_token_key: TWITTER_ACCESS_TOKEN,
  access_token_secret: TWITTER_ACCESS_SECRET,
});
// TWITTER SETUP
twitterClient.get('search/tweets.json', {q: 'https://soundcloud.com/kygo/firestone-ft-conrad', since:'2015-03-01', count: 100}, function(error, tweets, response){
  console.log(tweets.statuses.length); 
});

var request = require('request');
request('http://urls.api.twitter.com/1/urls/count.json?url=https://soundcloud.com/kygo/firestone-ft-conrad', function(error, response, body){
	console.log(body);
});

// SOUNDCLOUD SETUP
var request = require('request');
request('https://api.soundcloud.com/tracks?client_id='+credentials.soundcloud.clientID, function(error, response, body){
});

// FACEBOOK SETUP
var request = require('request');
request('https://graph.facebook.com/fql?q=SELECT%20like_count,%20total_count,%20share_count,%20comment_count%20FROM%20link_stat%20WHERE%20url%20=%20%22https://soundcloud.com/kygo/firestone-ft-conrad%22', function(error, response, body){
	console.log(body);
});

var apiRouter = express.Router();
apiRouter.get('/', function(reeq, res){
	res.send('hei');
})

//Mock data
//TRACKS
apiRouter.get('/tracks', function(req, res){
	res.json(require("../client/mock_data/tracks.json"));
})

apiRouter.get('/tracks/1', function(req, res){
	res.json(require("../client/mock_data/track_shares.json"));
})

app.use('/api', apiRouter);

app.use(express.static(__dirname + '/../client/build'));

var port = 8080;

app.listen(port);
