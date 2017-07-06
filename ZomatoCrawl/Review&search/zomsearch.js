//
var zomatoKey = "Your_key"

getCategoriesOfAllRestaurants();

function getCategoriesOfAllRestaurants(){
	$.ajax({
		url: 'https://developers.zomato.com/api/v2.1/cities?q=New%20Delhi&city_ids=1&count=3',
		headers: {
			user_key : 'Your_key',
		},
		success: function(result){
			console.log(JSON.stringify(result));
			var data = result['location_suggestions'];
			var first = data[0]["name"];
			console.log(first);
		}
	});
}


