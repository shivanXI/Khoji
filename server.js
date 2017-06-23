// Dependencies
// -----------------------------------------------------
var express         = require('express');
var mongoose        = require('mongoose');
var port            = process.env.PORT || 3000;
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var app             = express();

// Express Configuration
// -----------------------------------------------------
// Sets the connection to MongoDB
mongoose.connect("mongodb://localhost/MapApp");

// Logging and Parsing
app.use(express.static(__dirname + '/public'));                 // sets the static files location to public
app.use('/bower_components',  express.static(__dirname + '/bower_components')); // Use BowerComponents
app.use(morgan('dev'));                                         // log with Morgan
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json
app.use(methodOverride());

// Routes
// ------------------------------------------------------
require('./app/routes.js')(app);
	
	// ROUTES AND ALL NECESSITIES FOR API
	
		var router = express.Router();

		//Adding middleware to handle each request
		router.use(function(req, res, next) {
			console.log('Something is happening.');
			next(); //explore next route don't stop
		});

		//test route to test everything is working fine
		router.get('/', function(req, res) {
			res.json({	message: 'Welcome to Adda API'	});
		});

		
		//Actual request routes
		//1
		router.route('/users')
			.post(function(req, res) {
				var user = new model();
				user.username = req.body.username;
				user.age = req.body.age;
				user.save(function(err){
					if (err)
						res.send(err);
					res.json({ message: 'Testing User Created!' });
				});
			});
			.get(function(req, res) {
				model.find(function(err, user) {
					if(err)
						res.send(err);

					res.json(user);
				});
			});
			
		//2
		router.route('/users/:user_id')
			.get(function(req, res) {
				model.findById(req.params.user_id, function(err, user) {
					if (err)
						res.send(err);
					res.json(user);
				});
			});
			.put(function(req, res) {
				model.findById(req.params.bear_id, function(err, bear) {
					if(err)
						res.send(err);
					user.username = req.body.username;
					user.age = req.body.age;
					user.save(function(err) {
						if(err)
							res.send(err);
						res.json({ message: 'Testing User Updated!' });
					});
				});
			});
			.delete(function(req, res) {
				model.remove({
					_id: req.params.user_id
				}, function(err, user){
					if(err)
						res.send(err);

					res.json({ message: 'Testing user deleted successfully' });
				});
			});

			//all our routes will be prefixed with /api
			app.use('/api',router);
			var model = require('./app/model.js')

	// ROUTES AND ALL NECESSITIES FOR API


// Listen(Start the server)
// -------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port);