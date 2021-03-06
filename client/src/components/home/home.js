'use strict';


angular.module('mmApp.home', [])

.controller('HomeController', 
	['$scope', 'userService', function($scope, UserService) {

	$scope.selectedTimeFrame = {
	  days: 7,
	  id: 1,
	  label: 'Last 7 days - Per hour',
	};

	$scope.timeFrames = [{
	  days: 7,
	  id: 1,
	  label: 'Last 7 days - Per hour',
	}, {
	  days: 14,
	  id:2,
	  label: 'Last 14 days - Per hour',
	}, {
	  days: 30,
	  id:3,
	  label: 'Last 30 days - Per day',
	}, {
	  days: 90,
	  id:4,
	  label: 'Last 90 days - Per day',
	}];	

	$scope.currentTrack;

	$scope.source = '';
	$scope.youtubeUsername = 'ColdplayVEVO';
	$scope.spotifyUsername = 'avicii';
	$scope.soundcloudUsername = 'aviciiofficial';
	$scope.loaded = true;

 	$scope.loadYoutubeTracks = function(){
 		$scope.loaded = true;
 		$('#graph').html('');
  		$scope.tracks = "";	 					
		UserService.youtubeTracks().query({'username': $scope.youtubeUsername}, function (data) {
			$scope.tracks = data;
			$scope.source = 'Youtube';	
			$scope.showTrack($scope.tracks[0]);	
		}).$promise.then(
			function(data){
				$scope.loaded = false;					
			}
		);
	}

    //Load all Spotify tracks
 	$scope.loadSpotifyTracks = function(){
 		$scope.loaded = true;
 		$('#graph').html('');
  		$scope.tracks = "";			 		
 		UserService.spotifyTracks().query({'username': $scope.spotifyUsername}, function (data) {
    		$scope.tracks = data;
    		$scope.source = 'Spotify';
    		$scope.showTrack($scope.tracks[0]);	
		}).$promise.then(
			function(data){
				$scope.loaded = false;					
			}
		);
 	}

    //Load all SoundCloud tracks
 	$scope.loadSoundcloudTracks = function(){
 		$scope.loaded = true;
 		$('#graph').html('');
 		$scope.tracks = "";			 		
 		UserService.soundcloudTracks().query({'username': $scope.soundcloudUsername}, function (data) {
    		$scope.tracks = data;
    		$scope.source = 'SoundCloud';
    		$scope.showTrack($scope.tracks[0]);	
		}).$promise.then(
			function(data){
				$scope.loaded = false;					
			}
		);
 	}

 	$scope.showTrack = function(track){
 		switch(track.type) {
 			case 'soundcloud':
 				UserService.soundcloudTrack().get({id: track.id}, function(data){
 					$scope.currentTrack = data;
 					chartInit($scope.currentTrack);
 				});
 				break;
 			case 'youtube':
 				UserService.youtubeTrack().get({id: track.id}, function(data){
 					$scope.currentTrack = data;
 					chartInit($scope.currentTrack);
 				});
 				break;
 			case 'spotify':
 				UserService.spotifyTrack().get({id: track.id}, function(data){
 					$scope.currentTrack = data;
 					chartInit($scope.currentTrack);
 				});
 				break;
 		}
 	} 	
 	
 	$scope.updateChart = function() {
 		chartInit($scope.currentTrack);
 	}

	function getDatesForChart(numberOfDays){

		var dateArray = [];

		for (var i = 0; i < numberOfDays; i++) { 
			
			var date = new Date();
 			date.setDate(date.getDate() - i - 1);
 			date.setDate(date.getDate() - numberOfDays + i);
			var dateLabel = date.getDate()+'/'+ (date.getMonth()+1) +'/'+date.getFullYear();


			dateArray[i] = dateLabel;

		}

		return dateArray;

	}

	function calculateTotalShares(socialMediaPlatform){
			var myTotal = 0; 

			for(var i=0, len=socialMediaPlatform.length; i<len; i++){
			    myTotal += socialMediaPlatform[i]; 
			}

			return myTotal;		
	}


	function chartInit(data){
	    var options = {bezierCurve: false, pointDot : false};

	    var labels = getDatesForChart($scope.selectedTimeFrame.days);

		var facebookData = [];
	    var twitterData = [];


	    switch ($scope.selectedTimeFrame.days) {
		    case 7:
		        
		    	// 7 days, show hours (7*24h = 168h)
				facebookData = data["shares"]["fb"]["hours"].slice(168, 336);
				twitterData = data["shares"]["twitter"]["hours"].slice(168, 336);

			    var newLabels = [];

			    for (var i = 0; i <= 144; i++) {
			    	
			    	if(i%24 == 0){
						newLabels[i] = labels[i/24];
			    	}
			    	else{
			    		newLabels[i] = "";
			    		
			    	}

			    };

			    labels = newLabels;


		        break;
		    case 14:
		        
				// 14 days, show hours
				facebookData = data["shares"]["fb"]["hours"];
				twitterData = data["shares"]["twitter"]["hours"];

			    var newLabels = [];

			    for (var i = 0; i <= 312; i++) {
			    	
			    	if(i%24 == 0){
						newLabels[i] = labels[i/24];
			    	}
			    	else{
			    		newLabels[i] = "";
			    		
			    	}

			    };

			    labels = newLabels;


		        break;
		    case 30:
				// 30 days, show days		        

				facebookData = data["shares"]["fb"]["days"].slice(60, 90);
				twitterData = data["shares"]["twitter"]["days"].slice(60, 90);

			    for (var i = 0; i < labels.length; i++) {
			    	
			    	if(i%7 != 0){
						labels[i] = "";
			    	}
			    };

		        break;
		    case 90:
				// 90 days, show days
				facebookData = data["shares"]["fb"]["days"].slice(0,90);
				twitterData = data["shares"]["twitter"]["days"].slice(0,90);

			    for (var i = 0; i < labels.length; i++) {
			    	
			    	if(i%7 != 0){
						labels[i] = "";
			    	}
			    };

				break;
		}

	    var chartdata = {
	        labels: labels,
	        datasets: [
	            {
	                label: "My First dataset",
	                fillColor: "rgba(59,89,152,0.1)",
	                strokeColor: "rgba(59,89,152,1.0)",
	                pointColor: "rgba(59,89,152,1.0)",
	                pointStrokeColor: "#fff",
	                pointHighlightFill: "#fff",
	                pointHighlightStroke: "rgba(59,89,152,1.0)",
	                data: facebookData
	            },
	            {
	                label: "My Second dataset",
	                fillColor: "rgba(0,172,237,0.1)",
	                strokeColor: "rgba(0,172,237,1.0)",
	                pointColor: "rgba(0,172,237,1.0)",
	                pointStrokeColor: "#fff",
	                pointHighlightFill: "#fff",
	                pointHighlightStroke: "rgba(0,172,237,1.0)",
	                data: twitterData
	            }
	        ]
	    };

	    //Calculate total shares per platform
	    var totalFacebookShares = data.shares.fb.total;
	    var totalTwitterShares = data.shares.twitter.total;
	    var totalGoogleBlogShares = data.shares.googleBlogs.total;

	    $('#graph').html(
	    	'<h4>' + data.title + '</h4>' +
	    	'<div>' +
	    		'<span>Total shares per platform: </span>' +	    	
	    		'<span style="color: #3b5998">Facebook: &#x25cf ' + totalFacebookShares + '</span>' +
	    		'&nbsp;<span style="color: #00aced">    Twitter: &#x25cf ' + totalTwitterShares + '</span>' +
	    		'&nbsp;<span style="color: red">    Google blogs: &#x25cf ' + totalGoogleBlogShares + '</span>' +
	    		(data.type == 'soundcloud' ? '&nbsp;<span style="color: orange">    (Soundcloud plays: &#x25cf ' + data.playbackCount + ')</span>': '') +
	    	'</div> </br>' + 
	    	'<canvas id="myChart" width="550" height="400"></canvas>');
	    
	    var canvas = document.getElementById("myChart")
	    var ctx = canvas.getContext("2d");
	    var myLineChart = new Chart(ctx).Line(chartdata, options);   
	}     

}]);
