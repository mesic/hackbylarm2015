'use strict';

angular.module('mmApp.home', [])

.controller('HomeController', 
	['$scope', 'userService', function($scope, UserService) {
  	

  	//Load shares on a specific track
 	UserService.trackShares().query(function (data) {
    	$scope.trackShares = data;
    });

    //Load all tracks
 	UserService.tracks().query(function (data) {
    	$scope.tracks = data;
    	chartInit();
    });


	function chartInit(){
	    var options = {bezierCurve: false};

	    var data = {
	        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
	        datasets: [
	            {
	                label: "My First dataset",
	                fillColor: "rgba(59,89,152,1.0)",
	                strokeColor: "rgba(59,89,152,1.0)",
	                pointColor: "rgba(59,89,152,1.0)",
	                pointStrokeColor: "#fff",
	                pointHighlightFill: "#fff",
	                pointHighlightStroke: "rgba(59,89,152,1.0)",
	                data: [65, 59, 80, 81, 56, 55, 85]
	            },
	            {
	                label: "My Second dataset",
	                fillColor: "rgba(0,172,237,1.0)",
	                strokeColor: "rgba(0,172,237,1.0)",
	                pointColor: "rgba(0,172,237,1.0)",
	                pointStrokeColor: "#fff",
	                pointHighlightFill: "#fff",
	                pointHighlightStroke: "rgba(0,172,237,1.0)",
	                data: [28, 48, 40, 19, 86, 27, 76]
	            }
	        ]
	    };

	    var ctx = document.getElementById("myChart").getContext("2d");
	    var myLineChart = new Chart(ctx).Line(data, options);   
	}     

}]);
