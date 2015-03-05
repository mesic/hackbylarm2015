'use strict';

angular.module('mmApp.homeService', []).service('userService', 
	['$http', '$resource', function($http, $resource){

  this.getUsers = function(){
    return $http.get('http://localhost:3000/api/users');
  };

  this.test = function(){
  	return $resource('http://private-03414-almirmesic.apiary-mock.com/notes');
  }

}]);
