//026661e42cb7f09bffab8cf66dd4d043
var zomatoKey = "026661e42cb7f09bffab8cf66dd4d043"

getCategoriesOfAllRestaurants();

function getCategoriesOfAllRestaurants(){
	$.ajax({
		url: 'https://developers.zomato.com/api/v2.1/cities?',
		headers: {
			user_key : '026661e42cb7f09bffab8cf66dd4d043',
			city_ids : '1',
			count : '2'
		},
		success: function(result){
			console.log(result);
		}
	});
}


