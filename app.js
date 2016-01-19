//This is a super cool app
var express = require ( 'express' );
var swig = require ('swig');
var routes = require('./routes/');
var socketio = require('socket.io');

var app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static('public'));



swig.setDefaults({ cache: false });


var server = app.listen(3000, function() {
	console.log("server listening");
});

var io = socketio.listen(server);
app.use('/', routes(io));