'use strict';


var timeFrame = [7,14,30,90];

var selectedTimeFrame = 1;

var selectedItem = 0;


angular.module('mmApp.home', [])

.controller('HomeController', 
	['$scope', 'userService', function($scope, UserService) {
	
	$scope.source = '';
	$scope.youtubeUsername = 'ColdplayVEVO';
	$scope.spotifyUsername = 'avicii';
	$scope.soundcloudUsername = 'aviciiofficial';

 	$scope.loadYoutubeTracks = function(){
		UserService.youtubeTracks().query({'username': $scope.youtubeUsername}, function (data) {
			$scope.tracks = data;
			$scope.source = 'Youtube';
			$('#graph').html('');
		});
	}

    //Load all Spotify tracks
 	$scope.loadSpotifyTracks = function(){
 		UserService.spotifyTracks().query({'username': $scope.spotifyUsername}, function (data) {
    		$scope.tracks = data;
    		$scope.source = 'Spotify';
    		$('#graph').html('');
    	});
 	}


    //Load all SoundCloud tracks
 	$scope.loadSoundcloudTracks = function(){
 		UserService.soundcloudTracks().query({'username': $scope.soundcloudUsername}, function (data) {
    		$scope.tracks = data;
    		$scope.source = 'SoundCloud';
    		$('#graph').html('');
    	});
 	}

 	$scope.showTrack = function(track){
 		chartInit(track);
 	} 	
 	


	function getDatesForChart(numberOfDays){

		var dateArray = [];

		for (var i = 0; i < numberOfDays; i++) { 
			
			var date = new Date();
 			date.setDate(date.getDate() + i + 1);
			var dateLabel = date.getDate()+'/'+ (date.getMonth()+1) +'/'+date.getFullYear();


			dateArray[i] = dateLabel;

		}

		return dateArray;

	}


	function chartInit(data){
	    var options = {bezierCurve: false};

	    var labels = getDatesForChart(timeFrame[selectedTimeFrame]);

	    var facebookData = [];
	    var twitterData = [];


	    switch (selectedTimeFrame) {
		    case 0:
		        
		    	// 7 days, show hours (7*24h = 168h)
				facebookData = data["shares"]["fb"]["hours"].slice(0,168);
				twitterData = data["shares"]["twitter"]["hours"].slice(0,168);


		        break;
		    case 1:
		        
				// 14 days, show hours
				facebookData = data["shares"]["fb"]["hours"];
				twitterData = data["shares"]["twitter"]["hours"];

		        break;
		    case 2:
				// 30 days, show days		        

				facebookData = data["shares"]["fb"]["days"].slice(0,30);
				twitterData = data["shares"]["twitter"]["days"].slice(0,30);

		        break;
		    case 3:
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
	    $('#graph').html('<h4>Shares for ' + data.title + '</h4><canvas id="myChart" width="550" height="400"></canvas>');
	    var canvas = document.getElementById("myChart")
	    var ctx = canvas.getContext("2d");
	    var myLineChart = new Chart(ctx).Line(chartdata, options);   
	}     

}]);
