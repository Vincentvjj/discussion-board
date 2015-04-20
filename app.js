var express = require('express');

var site = require('./site');
var post = require('./post');

var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({

	extended: true
}));


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/static'));

// main page	

app.get('/', site.mainpage);

// posts

app.get('/post', post.list);


app.get('/ajaxrequest', site.ajaxrequest);

app.get('/send', site.send);

app.get('/get/replies', post.getreplies);

app.post('/send/replies', post.sendreplies);


app.listen(3000, '0.0.0.0', function() {
	console.log('listening for requests send to port 3000');
});