//This is a super cool app
var express = require ( 'express' );
var app = express();

app.listen(3000, function() {
	console.log("server listening");
});

app.use(function(request, response, next) {
	console.log(request.method + " " + request.url)

	next();
});

app.use('/special', function(request, response, next) {
	console.log("This is the special area");
	next();
});

app.get('/', function(request, response) {
	response.send("Welcome!");
});

app.get('/news', function(request, response) {
	response.send("Welcome to news!");
});
