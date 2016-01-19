//This is a super cool app
var express = require ( 'express' );
var swig = require ('swig');

var app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

swig.setDefaults({ cache: false });


app.listen(3000, function() {
	console.log("server listening");
});

app.use(function(request, response, next) {
	console.log(request.method + " " + request.url);

	next();
});

app.use('/special', function(request, response, next) {
	console.log("This is the special area");
	next();
});

app.get('/', function(request, response) {
	var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
	response.render('index', {title: 'Hall of Fame', people: people});
});

app.get('/news', function(request, response) {
	response.send("Welcome to news!");
});


	// var locals = {title: "An example", people: [{name: "Gandalf"}, {name: "Hermione"}, {name: "Frodo"}] };

	// swig.renderFile(__dirname + '/views/index.html', locals, function(err, output) {
	// 	console.log(output);
	// });