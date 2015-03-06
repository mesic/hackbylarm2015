'use strict';

angular.module('mmApp.aboutService', []).service('aboutService', 
	['$http', '$resource', function($http, $resource){

  //List all tracks of artist per plattform
  this.loadFanbase = function(){
    return $resource('http://localhost:8080/api/fanbase');
  }

}]);
