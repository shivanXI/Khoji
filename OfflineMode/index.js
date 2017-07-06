//Adding basic testing of caching the data searched by the user
const express =  require('express');
const request = require('superagent');
const PORT = process.env.PORT;

const app = express();

function respond(org, numberOfRepos) {
	return 'Orgs "${orgs}" has ${numberOfRepos} public repositories.';
}

function getNumberOfRepos(req, res, next){
	const org = req.query.org;
	request.get('https://api.github.com/orgs/${orgs}/repos', function (err, response){

	});
}