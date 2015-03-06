'use strict';

angular.module('mmApp.homeService', []).service('userService', 
	['$http', '$resource', function($http, $resource){

  //List all tracks of artist per plattform
  this.tracks = function(){
  	return $resource('http://localhost:8080/api/tracks');
  }

  //Number of shares per track
  this.trackShares = function(){
  	return $resource('http://localhost:8080/api/tracks/1');
  }

}]);
