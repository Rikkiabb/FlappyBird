window.Pipe = (function (){

	var INITIAL_POSITION_X = 20;
	var INITIAL_POSITION_Y = 20;
	var INITIAL_WIDTH = 15;
	var INITIAL_HEIGHT = 40;

	var Pipe = function(el) {
		this.el = el;
		this.pos = { x: 0, y: 0 };
		this.size = {w: 0, h: 0};

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	Pipe.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		this.size.w = INITIAL_WIDTH;
		this.size.h = INITIAL_HEIGHT;
	};

	Pipe.prototype.onFrame = function(delta) {
		// if (Controls.keys.right) {
		// 	this.pos.x += delta * SPEED;
		// }
		// if (Controls.keys.left) {
		// 	this.pos.x -= delta * SPEED;
		// }
		// if (Controls.keys.down) {
		// 	this.pos.y += delta * SPEED;
		// }
		// if (Controls.keys.up) {
		// 	this.pos.y -= delta * SPEED;

		// }
		// if (Controls.keys.space) {
		// 	if(Controls.didJump()){
		// 		this.pos.y -= 0.3333 * SPEED;
		// 	}
			
		// }

		// this.pos.y += delta * SPEED;
		

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) scale(' + this.size.w + 'em, ' + this.size.h + 'em)');
		// this.el.css('transform', 'scale(' + this.size.w + 'em, ' + this.size.h + 'em)');
	};

	return Pipe;
})();