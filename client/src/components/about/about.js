'use strict';


angular.module('mmApp.about', [])

.controller('AboutController', 
	['$scope', 'aboutService', function($scope, aboutService) {

	$scope.youtubeUsername = "kanyewestvevo";
	
	aboutService.youtubeFanbase().get({'username': $scope.youtubeUsername}, function (data) {	
		$scope.youtubeFanbase = data;
	});		

	aboutService.loadFanbase().query(function (data) {
		$scope.fanbaseData = data;
		updateFanbase(data[0]);

		
    });

	function updateFanbase(data){

		for(var k in data){

			$('#'+k+'-total').html(data[k].total);
			$('#'+k+'-sinceYesterday').html(data[k].sinceYesterday);
		}

	}
    
}]);
