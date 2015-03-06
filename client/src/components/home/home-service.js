'use strict';

angular.module('mmApp.homeService', []).service('userService', 
	['$http', '$resource', function($http, $resource){

  //List all tracks of artist per plattform
  this.youtubeTracks = function(){
  	return $resource('http://localhost:8080/api/youtube/tracks');
  }

  this.spotifyTracks = function(){
  	return $resource('http://localhost:8080/api/spotify/tracks');
  }

  this.soundcloudTracks = function(){
  	return $resource('http://localhost:8080/api/soundcloud/tracks');
  }    

}]);
