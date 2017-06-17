// Dependencies
var mongoose        = require('mongoose');
var User            = require('./model.js');

// Opens App Routes
module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db
    app.get('/users', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = User.find({});
        query.exec(function(err, users){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all users
            res.json(users);
        });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new users in the db
    app.post('/users', function(req, res){

        // Creates a new User based on the Mongoose schema and the post bo.dy
        var newuser = new User(req.body);

        // New User is saved in the db.
        newuser.save(function(err){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new user
            res.json(req.body);
        });
    });

    app.post('/query/', function(req, res){

        var lat     = req.body.latitude;
        var lng     = req.body.longitude;
        var distance = req.body.distance;

        var query = User.find({}); //Opens a generic mongoose query.

        // filter by max Distance
        if(distance){

            //using MongoDB's geospatial querying features (lng, lat order)
            query  = query.where('location').near({ center: {type: 'Point', coordinates: [lng, lat]},
                 maxDistance: distance * 1609.34, spherical: true
            });
        }

        query.exec(function(err, users){
            if(err)
                res.send(err);
            res.json(users);
        });
    });
};  