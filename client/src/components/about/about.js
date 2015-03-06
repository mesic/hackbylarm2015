'use strict';


angular.module('mmApp.about', [])

.controller('AboutController', 
	['$scope', 'aboutService', function($scope, aboutService) {

<<<<<<< HEAD
	if(angular.isUndefined($scope.youtubeUsername))
		$scope.youtubeUsername = "kanyewestvevo"
	var d = "asd";
	$scope.youtubeFanbase = function(){
		aboutService.youtubeFanbase().get({'username': $scope.youtubeUsername}, function (data) {	
			$scope.youtubeFansebase = data;
		});		
	}
=======
	aboutService.loadFanbase().query(function (data) {
		$scope.fanbaseData = data;
>>>>>>> origin/master

		updateFanbase(data[0]);

		
    });

	function updateFanbase(data){

		for(var k in data){

			$('#'+k+'-total').html(data[k].total);
			$('#'+k+'-sinceYesterday').html(data[k].sinceYesterday);
		}

	}
    
}]);
