// Creates the addCtrl Module and Controller and depends on 'gservice' and geolocation

var queryCtrl = angular.module('queryCtrl', ['geolocation', 'gservice']);
queryCtrl.controller('queryCtrl', function($scope, $log, $http, $rootScope, geolocation, gservice){

	$scope.formData = {};
	var queryBody = {};

	geolocation.getLocation().then(function(data){
		coords = {lat: data.coords.latitude, lng: data.coords.longitude};

		//set these coords to HTML5 coordinates
		$scope.formData.longitude = parseFloat(coords.lng).toFixed(3);
		$scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
	});

	//Get coordinates when a mouse click event is detected
	$rootScope.$on("clicked", function(){

		//Using gservice developed
		$scope.$apply(function(){
			$scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
			$scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
		});
	});

	

}