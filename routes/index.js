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
		// Here's the new method for databases
		db.Tweet.findAll({ include: [ db.User ] }).then(function(tweets){
			res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
		});
	  // var tweets = tweetBank.list();
	  // res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
	  // tweets.forEach(function(tweet) {
	  // });
	});

	router.get('/users/:name', function(request, response) {
		// var name = request.params.name;
		// User.findOne(name).then(function (user) {
  //   		return user.getTweets();
		// })
		// .then(function (tweets) {
  //   		response.render('index', JSON.stringify(tweets)); // another way of just logging the plain old values
		// });
		var name = request.params.name;
		var list = tweetBank.find( {name: name} );
		response.render('index', { title: 'Twitter.js - Posts by '+name, tweets: list, name: name, showForm: true } );
	});



	router.get('/tweets/:id', function(request, response) {
		var id = request.params.id;
		var list = tweetBank.find( {id: +id} );
		response.render('index', { title: 'Twitter.js - Post ID '+id, tweets: list } );
	});

	router.post('/tweets', function(request, response) {
		var name = request.body.name;
		var text = request.body.text;
		tweetBank.add(name, text);
		var newTweet = tweetBank.find( {name: name} );
		io.sockets.emit('new_tweet', { name: name, text: text });
		response.redirect("/");
	});

	return router;

};