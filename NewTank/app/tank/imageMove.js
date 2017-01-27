(function(jQuery) {

	var ImageMove = function() {
		var STEP = 12;
		var ROTATE_STEP = 20;
		var DELTA_ANGLE = 0;

		var w = window,
		    d = document,
		    e = d.documentElement,
		    g = d.getElementsByTagName('body')[0],
		    x = w.innerWidth || e.clientWidth || g.clientWidth,
		    y = w.innerHeight|| e.clientHeight|| g.clientHeight;


			var minTop = 0;
			var maxTop = y;
			var minLeft = 0;		
			var maxLeft = x;

		// Renvoie la propriété css sous forme d'entier
		jQuery.fn.cssNum = function(prop){
			var v = parseInt(this.css(prop),10);
			return isNaN(v) ? 0 : v;
		};	

		function toRadians (angle) {
		  
		  return angle * (Math.PI / 180);
		}

		this.moveForward = function() {
			$(document).keyup();
		}

		this.initObjMoveRotate = function (obj, config) {

			if(config){
				DELTA_ANGLE = config.delta||DELTA_ANGLE;
				STEP = config.step||STEP;
				ROTATE_STEP = config.rotateStep||ROTATE_STEP;
			}

			var value = 0;
			var realValue = value + DELTA_ANGLE;
			
			var cosStep;
			var sinStep;

			calcAfterRotate(); 

			obj.rotate({ 
			  bind:
			  {
			    click: function(){
			      value = getValue (value);
			      $(this).rotate({ animateTo:value})
			    }
			  }
			});


			function rotateLeft(value){
				return value -= ROTATE_STEP;
			}

			function rotateRight(value){
				return value += ROTATE_STEP;
			}

			var getValue = null;

			$(document).keydown(function(e) {
				var top = obj.cssNum('top');
				var left = obj.cssNum('left');	

				//console.log('top: ' + top + ', left: ' + left);

				switch(e.which) {
					case 37: // left
						getValue = rotateLeft
						obj.trigger('click');
						calcAfterRotate();
					break;

					case 39: // right
						getValue = rotateRight;
						obj.trigger('click');
						calcAfterRotate();
					break;

					case 38: // up
						if(realValue >=0 && realValue < 90) {
							obj.css('top', top + sinStep);
							obj.css('left', left + cosStep);
						} else if(realValue >= 90 && realValue < 180) {
							obj.css('top', top + cosStep);
							obj.css('left', left - sinStep);
						} else if(realValue >= 180 && realValue < 270) {
							obj.css('top', top - sinStep);
							obj.css('left', left - cosStep);
						} else if(realValue >= 270 && realValue <= 360) {
							obj.css('top', top - cosStep);
							obj.css('left', left + sinStep);
						}												
					break;
					
					default: return;
				}
				e.preventDefault(); // prevent the default action (scroll / move caret)
			});

			function calcAfterRotate(){
				var valueModulo = value % 360;
				valueModulo = valueModulo<0?360+valueModulo:valueModulo;
				realValue = (valueModulo + DELTA_ANGLE)%360;
				var angle = toRadians(valueModulo%90);
				//angle = toRadians(realValue % 90);
				cosStep = Math.cos(angle) * STEP;
				sinStep = Math.sin(angle) * STEP;

				console.log('angle: ' + angle);
				console.log('value: ' + value);
				console.log('realValue: ' + realValue);		
			}
		}




		/*
		this.initObjMove = function(obj) {
			maxTop = maxTop - obj.height() - step;
			maxLeft = maxLeft - obj.width() - step;
			$(document).keydown(function(e) {
				var top = obj.cssNum('top');
				var left = obj.cssNum('left');	

				console.log('top: ' + top + ', left: ' + left);
				
				switch(e.which) {
					case 37: // left
						if(left>minLeft) obj.css('left', left-step);
					break;

					case 38: // up
						if(top>minTop) obj.css('top', top-step);
					break;

					case 39: // right
						if(left<maxLeft) obj.css('left', left+step);
					break;

					case 40: // down
						if(top<maxTop) obj.css('top', top+step);
					break;

					/*case 36: // Diagonale haut et gauche
						if(top>0) obj.css('top', top-step);
						if(left>40) obj.css('left', left-step);
					break;
					
					default
				}
				e.preventDefault(); // prevent the default action (scroll / move caret)
			});

		}*/

	}
	window.imageMove = new ImageMove();
})(jQuery);