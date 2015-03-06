var connect = require('connect');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var request = require('request');
querystring = require('querystring');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/build'));
app.use(express.static(__dirname + '/../client'));

var SOUNDCLOUD_CLIENT_ID = '5791890dd6a8c62dfbe0294c26487095';

function generateSharesPerHourForLastTwoWeeks() {
	var ret = [];
	for (i=0;i<14*24;i++) {
		ret.push(Math.floor(Math.random() * 18) + 1);
	}
	return ret;
}

function generateSharesPerDayForLast90Days() {
	var ret = [];
	for (i=0;i<90;i++) {
		ret.push(Math.floor(Math.random() * 150) + 20);
	}
	return ret;
}

// FACEBOOK SETUP
/**
request('https://graph.facebook.com/fql?q=SELECT%20like_count,%20total_count,%20share_count,%20comment_count%20FROM%20link_stat%20WHERE%20url%20=%20%22' + 'https://soundcloud.com/kygo/firestone-ft-conrad' + '%22', function(error, response, body){
	var object = JSON.parse(body);
	console.log(object.data[0].share_count);
});

// TWITTER SETUP
request('http://urls.api.twitter.com/1/urls/count.json?url=https://soundcloud.com/kygo/firestone-ft-conrad', function(error, response, body){
	var object = JSON.parse(body);
});

// GOOGLE BLOG SEARCH SETUP
request('https://ajax.googleapis.com/ajax/services/search/blogs?v=1.0&q=kygo', function(error, response, body){
	var object = JSON.parse(body);
	console.log(object.responseData.cursor.estimatedResultCount);
});

**/

var apiRouter = express.Router();

apiRouter.get('/spotify/tracks', function(req, res){
	var spotifyUsername = req.param('username');
	//var spotifyUsername = "4gzpq5DPGxSnKTe4SA8HAU"; //Coldplay

	request('http://ws.spotify.com/search/1/track.json?q=artist:' + spotifyUsername, function(error, response, body){
		var spotifyTracks = JSON.parse(body);
		var ret = [];
		for (var i=0;i < spotifyTracks.tracks.length; i++){
			var trackId = spotifyTracks.tracks[i].href.split(':')[2];
			ret.push({
				id: trackId,
				shareLink: 'https://open.spotify.com/track/' + trackId,
				title: spotifyTracks.tracks[i].name,
				shares: {
					fb: {
						hours: generateSharesPerHourForLastTwoWeeks(),
						days: generateSharesPerDayForLast90Days()
					},
					twitter: {
						hours: generateSharesPerHourForLastTwoWeeks(),
						days: generateSharesPerDayForLast90Days()
					}
				}
			});			
		}
		res.json(ret);
	});
})

apiRouter.get('/soundcloud/tracks', function(req, res){
	var soundcloudUsername = req.param('username');
	//var soundcloudUsername = "coldplayofficial";
	request('https://api.soundcloud.com/resolve.json?url=http://soundcloud.com/' + soundcloudUsername + '&client_id='+SOUNDCLOUD_CLIENT_ID, function(error, response, body){
		var object = JSON.parse(body);
		if (object.id) {
			request('https://api.soundcloud.com/users/' + object.id + '/tracks.json?limit=200&client_id='+SOUNDCLOUD_CLIENT_ID, function(error1, response1, body1){
				var soundcloudTracks = JSON.parse(body1);
				var ret = [];
				for (var i=0;i < soundcloudTracks.length; i++){
					ret.push({
						id: soundcloudTracks[i].id,
						shareLink: soundcloudTracks[i].permalink_url,
						title: soundcloudTracks[i].title,
						shares: {
							fb: {
								hours: generateSharesPerHourForLastTwoWeeks(),
								days: generateSharesPerDayForLast90Days()
							},
							twitter: {
								hours: generateSharesPerHourForLastTwoWeeks(),
								days: generateSharesPerDayForLast90Days()
							}
						}
					});			
				}
				res.json(ret);
			});
		} else {
			res.json([]);
		}
	});	
})

apiRouter.get('/youtube/tracks', function(req, res){
	var youtubeUsername = req.param('username');
	// youtubeUsername = "ColdplayVEVO";

	var ytParams = { 
		key: 'AIzaSyDEJh6AKpKH3-0qC7bPvCSPVuIIIt4WSqI',
	    maxResults: 50,
	    part: 'contentDetails,snippet',
	    forUsername: youtubeUsername
	};
	request('https://www.googleapis.com/youtube/v3/channels?' + querystring.stringify(ytParams), function(error, response, body){
		var object = JSON.parse(body);
		if (object.items.length) {
			var playlist = object.items[0].contentDetails.relatedPlaylists.uploads;
			if (playlist) {
				var ytParams1 = { 
					key: 'AIzaSyDEJh6AKpKH3-0qC7bPvCSPVuIIIt4WSqI',
		            maxResults: 50,
		            part: 'contentDetails,snippet',
		            playlistId: playlist
				};
				request('https://www.googleapis.com/youtube/v3/playlistItems?' + querystring.stringify(ytParams1), function(error1, response1, body1){
					var object1 = JSON.parse(body1);
					var ret = [];
					for (var i=0;i < object1.items.length; i++){
						ret.push({
							id: object1.items[i].contentDetails.videoId,
							shareLink: 'https://www.youtube.com/watch?v=' + object1.items[i].contentDetails.videoId,
							title: object1.items[i].snippet.title,
							shares: {
								fb: {
									hours: generateSharesPerHourForLastTwoWeeks(),
									days: generateSharesPerDayForLast90Days()
								},
								twitter: {
									hours: generateSharesPerHourForLastTwoWeeks(),
									days: generateSharesPerDayForLast90Days()
								}
							}
						});
					}
					res.json(ret);
				});
			}
		} else {
			res.json([]);
		}
	});
})

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
