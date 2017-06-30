var userLatitude, userLongitude;

navigator.geolocation.watchPosition(function(position){

	console.log(position);
	
	userLatitude = position.coords.latitude;
	userLongitude = position.coords.longitude;
});