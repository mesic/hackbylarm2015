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

	var currentTrack;

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
		}).$promise.then(
			function(data){
				$scope.loaded = false;					
			}
		);
 	}

 	$scope.showTrack = function(track){
 		chartInit(track);
 		currentTrack = track;
 	} 	
 	
 	$scope.updateChart = function() {
 		chartInit(currentTrack);
 	}


	function getDatesForChart(numberOfDays){

		var dateArray = [];

		for (var i = 0; i < numberOfDays; i++) { 
			
			var date = new Date();
 			date.setDate(date.getDate() - i - 1);
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
	    var options = {bezierCurve: false};

	    var labels = getDatesForChart($scope.selectedTimeFrame.days);

	    var facebookData = [];
	    var twitterData = [];


	    switch ($scope.selectedTimeFrame.days) {
		    case 7:
		        
		    	// 7 days, show hours (7*24h = 168h)
				facebookData = data["shares"]["fb"]["hours"].slice(168, 336);
				twitterData = data["shares"]["twitter"]["hours"].slice(168, 336);


		        break;
		    case 14:
		        
				// 14 days, show hours
				facebookData = data["shares"]["fb"]["hours"];
				twitterData = data["shares"]["twitter"]["hours"];

		        break;
		    case 30:
				// 30 days, show days		        

				facebookData = data["shares"]["fb"]["days"].slice(60, 90);
				twitterData = data["shares"]["twitter"]["days"].slice(60, 90);

		        break;
		    case 90:
				// 90 days, show days
				facebookData = data["shares"]["fb"]["days"].slice(0,90);
				twitterData = data["shares"]["twitter"]["days"].slice(0,90);

				break;
		}


	    var chartdata = {
	        labels: labels,
	        datasets: [
	            {
	                label: "My First dataset",
	                fillColor: "rgba(59,89,152,1.0)",
	                strokeColor: "rgba(59,89,152,1.0)",
	                pointColor: "rgba(59,89,152,1.0)",
	                pointStrokeColor: "#fff",
	                pointHighlightFill: "#fff",
	                pointHighlightStroke: "rgba(59,89,152,1.0)",
	                data: facebookData
	            },
	            {
	                label: "My Second dataset",
	                fillColor: "rgba(0,172,237,1.0)",
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
	    var totalFacebookShares = calculateTotalShares(facebookData);
	    var totalTwitterShares = calculateTotalShares(twitterData);

	    $('#graph').html(
	    	'<h4>Shares for ' + data.title + '</h4>' +
	    	'<div>' +
	    		'<span>Total shares per platform: </span>' +	    	
	    		'<span style="color: #3b5998">Facebook: &#x25cf ' + totalFacebookShares + '</span>' +
	    		'<span style="color: #00aced">    Twitter: &#x25cf ' + totalTwitterShares + '</span>' +
	    	'</div> </br>' + 
	    	'<canvas id="myChart" width="550" height="400"></canvas>');
	    
	    var canvas = document.getElementById("myChart")
	    var ctx = canvas.getContext("2d");
	    var myLineChart = new Chart(ctx).Line(chartdata, options);   
	}     

}]);
