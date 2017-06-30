var uberClientId = "YOUR_CLIENT_ID", uberServerToken = "YOUR_SERVER_TOKEN";

var userLatitude, userLongitude, partyLatitude, partyLongitude;

navigator.geolocation.watchPosition(function(position){
	//for GPS location
	console.log(position);

	userLatitude = position.coords.latitude;
	userLongitude = position.coords.longitude;
});