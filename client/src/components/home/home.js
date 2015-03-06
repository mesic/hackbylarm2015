'use strict';


var timeFrame = [7,14,30,90];

var selectedTimeFrame = 1;

var selectedItem = 0;


angular.module('mmApp.home', [])

.controller('HomeController', 
	['$scope', 'userService', function($scope, UserService) {

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
				facebookData = data[selectedItem]["shares"]["fb"]["hours"].slice(0,168);
				twitterData = data[selectedItem]["shares"]["twitter"]["hours"].slice(0,168);


		        break;
		    case 1:
		        
				// 14 days, show hours
				facebookData = data[selectedItem]["shares"]["fb"]["hours"];
				twitterData = data[selectedItem]["shares"]["twitter"]["hours"];

		        break;
		    case 2:
				// 30 days, show days		        

				facebookData = data[selectedItem]["shares"]["fb"]["days"].slice(0,30);
				twitterData = data[selectedItem]["shares"]["twitter"]["days"].slice(0,30);

		        break;
		    case 3:
				// 90 days, show days
				facebookData = data[selectedItem]["shares"]["fb"]["days"].slice(0,90);
				twitterData = data[selectedItem]["shares"]["twitter"]["days"].slice(0,90);

				break;
		}


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
	                data: facebookData
	            },
	            {
	                label: "My Second dataset",
	                fillColor: "rgba(151,187,205,0.2)",
	                strokeColor: "rgba(151,187,205,1)",
	                pointColor: "rgba(151,187,205,1)",
	                pointStrokeColor: "#fff",
	                pointHighlightFill: "#fff",
	                pointHighlightStroke: "rgba(151,187,205,1)",
	                data: twitterData
	            }
	        ]
	    };
	    $('#graph').html('<canvas id="myChart" width="400" height="400"></canvas>');
	    var canvas = document.getElementById("myChart")
	    var ctx = canvas.getContext("2d");
	    var myLineChart = new Chart(ctx).Line(data, options);   
	}     

}]);
