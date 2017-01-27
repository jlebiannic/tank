var express = require('express');
var path = require('path');

var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

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
    //console.log('connexion');
    socket.on('tank.forward', function() {
    	//console.log('tank.forward');
        socket.broadcast.emit('tank.forward');
    });
    socket.on('tank.backward', function() {
    	//console.log('tank.backward');
        socket.broadcast.emit('tank.backward');
    });
    socket.on('tank.right', function() {
    	//console.log('tank.right');
        socket.broadcast.emit('tank.right');
    });
    socket.on('tank.left', function() {
    	//console.log('tank.left');
        socket.broadcast.emit('tank.left');
    });

});

server.listen(8080, '192.168.0.11');