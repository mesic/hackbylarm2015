'use strict';

angular.module('mmApp.homeService', []).service('userService', ['$http', function($http){

  this.getUsers = function(){
    return $http.get('http://localhost:3000/api/users');
  };

}]);
