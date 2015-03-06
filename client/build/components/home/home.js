'use strict';

angular.module('mmApp.home', [])

.controller('HomeController', 
	['$scope', 'userService', function($scope, UserService) {
  	

  	//Load shares on a specific track
 	UserService.trackShares().query(function (data) {
    	$scope.trackShares = data;

    	chartInit(data);	

    });

    //Load all tracks
 	UserService.tracks().query(function (data) {
    	$scope.tracks = data;
    	
    });




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
	                data: data[0]["facebook"]
	            },
	            {
	                label: "My Second dataset",
	                fillColor: "rgba(151,187,205,0.2)",
	                strokeColor: "rgba(151,187,205,1)",
	                pointColor: "rgba(151,187,205,1)",
	                pointStrokeColor: "#fff",
	                pointHighlightFill: "#fff",
	                pointHighlightStroke: "rgba(151,187,205,1)",
	                data: data[0]["twitter"]
	            }
	        ]
	    };

	    var ctx = document.getElementById("myChart").getContext("2d");
	    var myLineChart = new Chart(ctx).Line(data, options);   
	}     

}]);
