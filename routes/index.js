var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets } );
  tweets.forEach(function(tweet) {
  	console.log(tweet.id);
  });
});

router.get('/users/:name', function(request, response) {
	var name = request.params.name;
	var list = tweetBank.find( {name: name} );
	response.render('index', { title: 'Twitter.js - Posts by '+name, tweets: list } );
});

router.get('/tweets/:id', function(request, response) {
	var id = request.params.id;
	var list = tweetBank.find( {id: +id} );
	response.render('index', { title: 'Twitter.js - Post ID '+id, tweets: list } );
});

module.exports = router;