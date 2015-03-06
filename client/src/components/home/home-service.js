'use strict';

angular.module('mmApp.homeService', []).service('userService', 
	['$http', '$resource', function($http, $resource){

  //List all tracks of artist per plattform
  this.youtubeTracks = function(){
  	return $resource('http://localhost:8080/api/youtube/tracks');
  }

  this.youtubeTrack = function(){
    return $resource('http://localhost:8080/api/youtube/tracks/:id', {id:'@id'});
  }

  this.spotifyTracks = function(){
  	return $resource('http://localhost:8080/api/spotify/tracks');
  }

  this.spotifyTrack = function(){
    return $resource('http://localhost:8080/api/spotify/tracks/:id', {id:'@id'});
  }

  this.soundcloudTracks = function(){
  	return $resource('http://localhost:8080/api/soundcloud/tracks');
  }  

  this.soundcloudTrack = function(){
    return $resource('http://localhost:8080/api/soundcloud/tracks/:id', {id:'@id'});
  }    

}]);
