'use strict';

angular.module('mmApp.home', [])

.controller('HomeController', 
	['$scope', 'userService', function($scope, UserService) {

    //Load all YouTube tracks (default)
 	$scope.loadYoutubeTracks = function(){
		UserService.youtubeTracks().query(function (data) {
			$scope.tracks = data;
		});
	}

    //Load all Spotify tracks
 	$scope.loadSpotifyTracks = function(){
 		UserService.spotifyTracks().query(function (data) {
    		$scope.tracks = data;
    	});
 	}

    //Load all SoundCloud tracks
 	$scope.loadSoundcloudTracks = function(){
 		UserService.soundcloudTracks().query(function (data) {
    		$scope.tracks = data;
			chartInit(data);
    	});
 	} 	



	var timeFrame = [7,14,30,90];    

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

	function segmentData(timeFrame){
		



	}



	function chartInit(data){
	    var options = {bezierCurve: false};

	    var labels = getDatesForChart(7);

	    var data = {
	        labels: labels,
	        datasets: [
	            {
	                label: "My First dataset",
	                fillColor: "rgba(220,220,220,0.2)",
	                strokeColor: "rgba(220,220,220,1)",
	                pointColor: "rgba(220,220,220,1)",
	                pointStrokeColor: "#fff",
	                pointHighlightFill: "#fff",
	                pointHighlightStroke: "rgba(220,220,220,1)",
	                data: []//data[0]["facebook"]
	            },
	            {
	                label: "My Second dataset",
	                fillColor: "rgba(151,187,205,0.2)",
	                strokeColor: "rgba(151,187,205,1)",
	                pointColor: "rgba(151,187,205,1)",
	                pointStrokeColor: "#fff",
	                pointHighlightFill: "#fff",
	                pointHighlightStroke: "rgba(151,187,205,1)",
	                data: []//data[0]["twitter"]
	            }
	        ]
	    };

	    var ctx = document.getElementById("myChart").getContext("2d");
	    var myLineChart = new Chart(ctx).Line(data, options);   
	}     

}]);
