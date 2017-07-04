//026661e42cb7f09bffab8cf66dd4d043
var zomatoKey = "026661e42cb7f09bffab8cf66dd4d043"

getCategoriesOfAllRestaurants();

function getCategoriesOfAllRestaurants(){
	$.ajax({
		url: "https://developers.zomato.com/api/categories",
		headers: {
			Authorization: zomatoKey
		},
		data: {
			category_id = "3"
		},
		success: function(result){
			console.log(result);
		}
	});
}