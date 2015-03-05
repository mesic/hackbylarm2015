'use strict';

angular.module('mmApp.home', [])

.controller('HomeController', 
	['$scope', 'userService', function($scope, userService) {
  
  // var users = userService.getUsers();
  
  // users.success(function(data){
  //   $scope.users = data;
  // });
	var s  = 2;
	console.log(s);

 	userService.test().query(function (data) {
    	$scope.almir = data;
    });


}]);
