var uberClientId = "YOUR_CLIENT_ID", 
	uberServerToken = "YOUR_SERVER_TOKEN";

var userLatitude, 
	userLongitude, 
	partyLatitude, 
	partyLongitude;

navigator.geolocation.watchPosition(function(position){
	//for GPS location
	console.log(position);

	userLatitude = position.coords.latitude;
	userLongitude = position.coords.longitude;

	//Querying Uber API
	getEstimatesForUserLocation(userLatitude, userLongitude);
});

function getEstimatesForUserLocation(latitude, longitude){
	$.ajax({
		url: "https://api.uber.com/v1/estimates/price",
		headers: {
			Authorization: "Token" uberServerToken
		},
		data: {
			start_latitude: latitude,
			start_longitude: longitude,
			end_latitude: partyLatitude,
			end_longitude: partyLongitude
		},
		success: function(result){
			console.log(result);
		}
	});
}

