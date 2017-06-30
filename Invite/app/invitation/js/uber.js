var userLatitude, userLongitude, partyLatitude, partyLongitude;

navigator.geolocation.watchPosition(function(position){

	console.log(position);

	userLatitude = position.coords.latitude;
	userLongitude = position.coords.longitude;
});