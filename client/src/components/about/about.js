'use strict';


angular.module('mmApp.about', [])

.controller('AboutController', 
	['$scope', 'aboutService', function($scope, aboutService) {

	aboutService.loadFanbase().query(function (data) {
		$scope.fanbaseData = data;

		updateFanbase(data[0]);

		
    });

	function updateFanbase(data){

		for(var k in data){

			$('#'+k+'-total').html(data[k].total);
			$('#'+k+'-sinceYesterday').html(data[k].sinceYesterday);
		}

	}
    
}]);
