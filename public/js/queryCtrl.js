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

	$scope.queryUsers = function(){

		queryBody = {
			longitude: parseFloat($scope.formData.longitude),
			latitude: parseFloat($scope.formData.latitude),
			distance: parseFloat($scope.formData.distance),
			male: $scope.formData.male,
			female: $scope.formData.female,
			other: $scope.formData.other,
			minAge: $scope.formData.minage,
			maxAge: $scope.formData.maxage,
			favlang: $scope.formData.favlang,
			reqVerified: $scope.formData.verified
		};

		// Post the querybody to the /query POST route to retrieve the filtered results
		$http.post('/query', queryBody)
			.success(function(queryResults){

				//Testing the queryController
				//console.log("QueryBody:");
				//console.log(queryBody);
				//console.log("QueryResults:");
				//console.log(queryResults);

				//Insert the filtered results in Google Map Service and refresh the page
				gservice.refresh(queryBody.latitude, queryBody.longitude, queryResults);
				
				$scope.queryCount = queryResults.length;
			})
			.error(function(queryResults){
				console.log('Error '  + queryResults);
			})
	};

});