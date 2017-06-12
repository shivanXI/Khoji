var addCtrl = angular.module('addCtrl',['geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, $rootScope, geolocation, gservice){


	$scope.formData = {};
	var coords = {};
	var lat = 0;
	var longt = 0;

	$scope.formData.latitude = 20.593;
	$scope.formData.longitude = 78.962;



	// Now Chceking the geolocation coordinates with HTML5Geolocation and Angular's geolocation library
	geolocation.getLocation().then(function(data){

		// set the latitude and longitude to HTML5 provided coordinates
		coords = {lat:data.coords.latitude, long:data.coords.longitude};

		//Change the coordinates in the location textboxes rounded to 3 decimal places
		$scope.formData.longitude = parseFloat(coords.long).toFixed(3);
		$scope.formData.latitude = parseFloat(coords.lat).toFixed(3);

		$scope.formData.htmlverified = "Yo (It is a real data thank you for giving us!!)";
		gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
	});



	// Coordinates Broadcasted by gservice on mouse click over new coordinates to move the red pointer
	$rootScope.$on("clicked", function(){
		
		//Identify the coordinates associated with help of gservice methods
		$scope.$apply(function(){
			$scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
			$scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
			$scope.formData.htmlverified = "Nope (It is protected baby don't be fake...)";
 		});
	});



	$scope.createUser = function(){
		var userData = {
			username: $scope.formData.username,
			gender: $scope.formData.gender,
			age: $scope.formData.age,
			favlang: $scope.formData.favlang,
			location: [$scope.formData.longitude, $scope.formData.latitude],
			htmlverified: $scope.formData.htmlverified
		};

		$http.post('/users', userData)
			.success(function (data){

				//Clearing the form for next user
				$scope.formData.username = "";
				$scope.formData.gender = "";
				$scope.formData.age = "";
				$scope.formData.favlang = "";

				//Refresh the map window as well with newly added data
				gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

			})
			.error(function (data){
				console.log('Error:' + data);
			});
	};
});