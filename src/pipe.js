window.Pipe = (function (){

	var Controls = window.Controls;

	var INITIAL_POSITION_X = 0;
	var INITIAL_POSITION_Y = -10;
	var INITIAL_WIDTH = 5;
	var INITIAL_HEIGHT = 40;

	var Pipe = function(top, bottom, POS_X) {
		INITIAL_POSITION_X = POS_X;

		this.top = top;
		this.bottom = bottom;

		this.top.pos = { x: 0, y: 0 };
		this.top.size = {w: 0, h: 0};

		this.bottom.pos = { x: 0, y: 0 };
		this.bottom.size = {w: 0, h: 0};
		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	Pipe.prototype.reset = function() {
		this.top.pos.x = INITIAL_POSITION_X;
		this.top.pos.y = INITIAL_POSITION_Y;
		this.top.size.w = INITIAL_WIDTH;
		this.top.size.h = INITIAL_HEIGHT;

		this.bottom.pos.x = INITIAL_POSITION_X;
		this.bottom.pos.y = INITIAL_POSITION_Y + 13;
		this.bottom.size.w = INITIAL_WIDTH;
		this.bottom.size.h = INITIAL_HEIGHT;
	};

	Pipe.prototype.onFrame = function(delta) {

		this.top.pos.x -= delta * 10;
		this.bottom.pos.x -= delta * 10;
		if(this.top.pos.x <= -6){
			// 0  ->  13
			//-30 -> -17
			var newYpos = Math.floor((Math.random() * (-30))) + 1;
			this.top.pos.x = INITIAL_POSITION_X;
			this.bottom.pos.x = INITIAL_POSITION_X;
			this.top.pos.y = newYpos;
			this.bottom.pos.y = newYpos + 13;
		}



		// Update UI
		this.top.css('transform', 'translateZ(0) translate(' + this.top.pos.x + 'em, ' + this.top.pos.y + 'em)');
		this.bottom.css('transform', 'translateZ(0) translate(' + this.bottom.pos.x + 'em, ' + this.bottom.pos.y + 'em)');
	};

	return Pipe;
})();