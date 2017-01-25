var express = require('express');
var path = require('path');

var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/asset'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/tank.html'));
});

app.get('/asset/*', function(req, res) {
    //console.log(req.path);
    res.sendFile(path.join(__dirname, req.path));
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});


io.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('go', function() {
        socket.broadcast.emit('go');
    });

});

app.listen(8080);