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
    });

}]);
