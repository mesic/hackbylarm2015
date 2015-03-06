'use strict';


angular.module('mmApp.about', [])

.controller('AboutController', 
	['$scope', 'aboutService', function($scope, aboutService) {

	if(angular.isUndefined($scope.youtubeUsername))
		$scope.youtubeUsername = "kanyewestvevo"
		
	$scope.youtubeFanbase = function(){
		aboutService.youtubeFanbase().get({'username': $scope.youtubeUsername}, function (data) {	
			$scope.fanbaseData = data;
		});		
	}

}]);
