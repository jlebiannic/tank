var express = require('express');
var path = require('path');

var app = express();

//app.use(express.static(__dirname + '/asset'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/tank.html'));
});

app.get('/asset/*', function(req, res) {
    //console.log(req.path);
    res.sendFile(path.join(__dirname, req.path));
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(8080);