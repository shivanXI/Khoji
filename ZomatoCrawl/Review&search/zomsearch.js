//026661e42cb7f09bffab8cf66dd4d043
'use strict';
const request = require('request');

const mapState = {
	zom : 'https://developers.zomato.com/api/v2.1/categories'
  //tripura : 'https://data.gov.in/api/datastore/resource.json?resource_id=c34b34f7-a301-49f5-9219-d35e5a650c39',
  //andhra : 'https://data.gov.in/api/datastore/resource.json?resource_id=5d959416-0b9a-42b9-9592-edfaf3edc85c',
};

const getLiveZom = (callback, query) => {
  //console.log(mapState.query);
  var url ='';
  /*if( query = 'tripura') {
    url = mapState.tripura + '&api-key=15694df88e77c2829f0bf4a870db7b1d';
  }
  else {
    url = mapState.andhra + '&api-key=15694df88e77c2829f0bf4a870db7b1d';
  }*/
  url = mapState.zom + '&user-key=026661e42cb7f09bffab8cf66dd4d043';
  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      console.log(typeof(JSON.parse(body)));
      return callback(JSON.parse(body));
    }
  });
}

module.exports = {
  getLiveZom
}

