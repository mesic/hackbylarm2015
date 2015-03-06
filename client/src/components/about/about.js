'use strict';


angular.module('mmApp.about', [])

.controller('AboutController', 
	['$scope', 'aboutService', function($scope, aboutService) {

	aboutService.loadFanbase().query(function (data) {
		$scope.fanbaseData = data;
    });
    
}]);
