var io = require ('socket.io');
//var $ = require ('jquery');
//require ('../../lib/jqueryRotate-V2.3');
//require ('./imageMove');
	
$(function(){
	var tankImg = $('#tank');  
	//tankImg.css('top', 10);
	//tankImg.css('left', 10);
	imageMove.initObjMoveRotate(tankImg, {delta : 90, step : 5, rotateStep : 5});

	socket.on('go', function(data) {
		imageMove.moveForward();
	})
});