var express = require('express');
var db = require("../models/");
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');
var bodyParser = require('body-parser');

module.exports = function (io) {

	// parse application/x-www-form-urlencoded
	router.use(bodyParser.urlencoded({ extended: false }));

	// parse application/json
	router.use(bodyParser.json());

	router.get('/', function (req, res) {
		db.Tweet.findAll({ include: [ db.User ] }).then(function(tweets){
			res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
		});
	});

	router.get('/users/:userId', function(request, response) {
		var userId = request.params.userId;
		db.Tweet.findAll({ where: {UserId: userId}, include: [db.User] }).then(function (tweets) {
    		response.render('index', { title: 'Twitter.js - Posts by '+tweets[0].User.name, tweets: tweets, showForm: true });
		});
	});


	router.get('/tweets/:id', function(request, response) {
		var id = request.params.id;
		console.log(id);
		db.Tweet.findById(id, { include: [ db.User ] }).then(function (tweet) {
			console.log(tweet);
    		response.render('index', { title: 'Twitter.js', tweets: [tweet], showForm: true });
		});
	});

	router.post('/tweets', function(request, response) {
		var name = request.body.name;
		var text = request.body.text;
		db.User.findOrCreate({where: {name: name}, defaults: {pictureUrl: "http://previews.123rf.com/images/upthebanner/upthebanner1004/upthebanner100400080/6779506-photo-male-portrait-close-up-on-white-backdrop-Stock-Photo-man-face-bald.jpg"}})
		.spread(function(user, created) {
			return db.Tweet.build({UserId: user.id, tweet: text}).save();
		})
		.then(function(tweet) {
			io.sockets.emit('new_tweet', [tweet]);
			response.redirect("/");
		});
	});

	return router;

};