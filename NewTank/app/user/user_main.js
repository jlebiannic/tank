var io = require('socket.io')
var $ = require('jquery');

$(function(){
	// Connexion à socket.io
	var socket = io.connect('http://localhost:8080');
	$('#go').click(function(){
		socket.emit('go');
	});


});