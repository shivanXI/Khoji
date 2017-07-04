//026661e42cb7f09bffab8cf66dd4d043
var zomatoKey = "your_key"

getCategoriesOfAllRestaurants();

function getCategoriesOfAllRestaurants(){
	$.ajax({
		url: 'https://developers.zomato.com/api/v2.1/cities?',
		headers: {
			user_key : 'your_key',
			city_ids : '1',
			count : '2'
		},
		success: function(result){
			console.log(result);
		}
	});
}


