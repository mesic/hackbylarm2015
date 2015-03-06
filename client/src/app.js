'use strict';

// Declare app level module which depends on views, and components
angular.module('mmApp', [
    'ngRoute',
    'ngResource',
    'mmApp.home',
    'mmApp.homeService',
    'mmApp.about',
    'mmApp.aboutService'
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/home', {
        templateUrl: 'components/home/home.html',
        controller: 'HomeController'
    })
    .when('/about', {
        templateUrl: 'components/about/about.html',
        controller: 'AboutController'
    })
    .otherwise({redirectTo: '/home'});
}]);
