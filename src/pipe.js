window.Pipe = (function (){

	var Controls = window.Controls;

	var INITIAL_POSITION_X = 60;
	var INITIAL_POSITION_X2 = 95;
	var INITIAL_POSITION_Y = -10;
	var INITIAL_WIDTH = 5;
	var INITIAL_HEIGHT = 40;

	var Pipe = function(top, bottom, top2, bottom2) {

		this.top = top;
		this.bottom = bottom;
		this.top2 = top2;
		this.bottom2 = bottom2;

		this.top.pos = { x: 0, y: 0 };
		this.top.size = {w: 0, h: 0};

		this.bottom.pos = { x: 0, y: 0 };
		this.bottom.size = {w: 0, h: 0};

		this.top2.pos = { x: 0, y: 0 };
		this.top2.size = {w: 0, h: 0};

		this.bottom2.pos = { x: 0, y: 0 };
		this.bottom2.size = {w: 0, h: 0};

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	Pipe.prototype.reset = function() {
		this.top.pos.x = INITIAL_POSITION_X;
		this.top.pos.y = INITIAL_POSITION_Y;
		this.top.size.w = INITIAL_WIDTH;
		this.top.size.h = INITIAL_HEIGHT;

		this.bottom.pos.x = INITIAL_POSITION_X;
		this.bottom.pos.y = INITIAL_POSITION_Y + 13 + INITIAL_HEIGHT;
		this.bottom.size.w = INITIAL_WIDTH;
		this.bottom.size.h = INITIAL_HEIGHT;

		this.top2.pos.x = INITIAL_POSITION_X2;
		this.top2.pos.y = INITIAL_POSITION_Y;
		this.top2.size.w = INITIAL_WIDTH;
		this.top2.size.h = INITIAL_HEIGHT;

		this.bottom2.pos.x = INITIAL_POSITION_X2;
		this.bottom2.pos.y = INITIAL_POSITION_Y + 13 + INITIAL_HEIGHT;
		this.bottom2.size.w = INITIAL_WIDTH;
		this.bottom2.size.h = INITIAL_HEIGHT;
	};

	Pipe.prototype.onFrame = function(delta) {

		this.top.pos.x -= delta * 10;
		this.bottom.pos.x -= delta * 10;

		this.top2.pos.x -= delta * 10;
		this.bottom2.pos.x -= delta * 10;

		if(this.top.pos.x <= -6){

			var min = -32;
			var max = -2;
			var newYpos = Math.floor(Math.random() * (max - min + 1)) + min;

			this.top.pos.x = INITIAL_POSITION_X;
			this.bottom.pos.x = INITIAL_POSITION_X;
			this.top.pos.y = newYpos;
			this.bottom.pos.y = newYpos + 13 + INITIAL_HEIGHT;
		}
		if(this.top2.pos.x <= -6){

			var min = -32;
			var max = -2;
			var newYpos = Math.floor(Math.random() * (max - min + 1)) + min;
			this.top2.pos.x = INITIAL_POSITION_X;
			this.bottom2.pos.x = INITIAL_POSITION_X;
			this.top2.pos.y = newYpos;
			this.bottom2.pos.y = newYpos + 13 + INITIAL_HEIGHT;
		}



		// Update UI
		this.top.css('transform', 'translateZ(0) translate(' + this.top.pos.x + 'em, ' + this.top.pos.y + 'em)');
		this.bottom.css('transform', 'translateZ(0) translate(' + this.bottom.pos.x + 'em, ' + this.bottom.pos.y + 'em)');

		this.top2.css('transform', 'translateZ(0) translate(' + this.top2.pos.x + 'em, ' + this.top2.pos.y + 'em)');
		this.bottom2.css('transform', 'translateZ(0) translate(' + this.bottom2.pos.x + 'em, ' + this.bottom2.pos.y + 'em)');
	};

	return Pipe;
})();