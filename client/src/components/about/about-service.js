'use strict';

angular.module('mmApp.aboutService', []).service('aboutService', 
	['$http', '$resource', function($http, $resource){

  //List all tracks of artist per plattform
  this.youtubeFanbase = function(){
    //Youtube
    return $resource('http://localhost:8080/api/youtube/fanbase');
  }    

}]);
