//Adding basic testing of caching the data searched by the user
const express =  require('express');
const request = require('superagent');
const PORT = process.env.PORT;

//Adding REmote DIrectory Server for caching
const redis =  require('redis');
const REDIS_PORT = process.env.REDIS_PORT;

const app = express();
const client = redis.createClient(REDIS_PORT);

function respond(org, numberOfRepos) {
	return 'Orgs "${orgs}" has ${numberOfRepos} public repositories.';
}

function getNumberOfRepos(req, res, next){
	const org = req.query.org;
	request.get('https://api.github.com/orgs/${orgs}/repos', function (err, response){
		if (err) throw err;
		var repoNumber = response.body.length;
		res.send(respond(org, repoNumber));
	});
};

app.get('/repos', getNumberOfRepos);

app.listen(PORT, function (){
	console.log('app listens on port',PORT);
});