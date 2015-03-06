'use strict';

angular.module('mmApp.home', [])

.controller('HomeController', 
	['$scope', 'userService', function($scope, UserService) {
  	
    //Load all tracks
 	$scope.loadYoutubeTracks = function(){
 		UserService.youtubeTracks().query(function (data) {
    		$scope.tracks = data;
    	});
 	}

    chartInit();

	function chartInit(){
	    var options = {bezierCurve: false};

	    var data = {
	        labels: ["January", "February", "March", "April", "May", "June", "July"],
	        datasets: [
	            {
	                label: "My First dataset",
	                fillColor: "rgba(220,220,220,0.2)",
	                strokeColor: "rgba(220,220,220,1)",
	                pointColor: "rgba(220,220,220,1)",
	                pointStrokeColor: "#fff",
	                pointHighlightFill: "#fff",
	                pointHighlightStroke: "rgba(220,220,220,1)",
	                data: [65, 59, 80, 81, 56, 55]
	            },
	            {
	                label: "My Second dataset",
	                fillColor: "rgba(151,187,205,0.2)",
	                strokeColor: "rgba(151,187,205,1)",
	                pointColor: "rgba(151,187,205,1)",
	                pointStrokeColor: "#fff",
	                pointHighlightFill: "#fff",
	                pointHighlightStroke: "rgba(151,187,205,1)",
	                data: [28, 48, 40, 19, 86, 27, 90]
	            }
	        ]
	    };

	    var ctx = document.getElementById("myChart").getContext("2d");
	    var myLineChart = new Chart(ctx).Line(data, options);   
	}     

}]);
