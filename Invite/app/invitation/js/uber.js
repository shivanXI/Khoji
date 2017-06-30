var uberClientId = "YOUR_CLIENT_ID", 
	uberServerToken = "YOUR_SERVER_TOKEN";

var userLatitude, 
	userLongitude, 
	partyLatitude, 
	partyLongitude;

var timer;

navigator.geolocation.watchPosition(function(position){
	//for GPS location
	console.log(position);

	userLatitude = position.coords.latitude;
	userLongitude = position.coords.longitude;

	//Refreshing the coords after 1 min as recommended by uber in DOCS
	if(typeof timer === typeof undefined){
		timer = setInterval(function(){
			getEstimatesForUserLocation(userLatitude, userLongitude);
		}, 60000);
	
	//Querying Uber API
	getEstimatesForUserLocation(userLatitude, userLongitude);
	
	}
});

//Ajax Request from uber API
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
			console.log(JSON.stringify(result));

			//results is array of dictionaries containing different categories of rides of Uber
			var data = result['prices'];
			if (typeof data != typeof undefined){
				//sort the categories by time for shortest pickup time
				data.sort(function(t0, t1){
					return t0.duration - t1.duration;
				});

				//Pick up the shortest one
				var shortest = data[0];
				if(typeof shortest != typeof undefined){
					console.log("Updating time estimates.....");
					$("#time").html("In "+ Math.ceil(shortest.duration / 60.0) + " Min");
				}
			}
		}
	});
}

