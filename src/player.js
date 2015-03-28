window.Player = (function() {

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.score = 0;
		this.update = false;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Player.prototype.onFrame = function(delta) {
		
		if(Controls.didJump()){
			
			this.pos.y -= 0.35 * 20;
		}

		this.pos.y += delta * 20;
		
		this.checkCollision();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		
	};

	Player.prototype.checkCollision = function() {
		$("#myScore").text(this.score);
		this.checkCollisionWithBounds();

		this.checkCollisionWithTopPipes(this.game.pipe1.top);
		this.checkCollisionWithTopPipes(this.game.pipe1.top2);
		this.checkCollisionWithBottomPipes(this.game.pipe1.bottom);
		this.checkCollisionWithBottomPipes(this.game.pipe1.bottom2);

		this.updateScore(this.game.pipe1.top);
		this.updateScore(this.game.pipe1.top2);
		
	};
	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	}
	Player.prototype.checkCollisionWithTopPipes = function(pipe) {
		var top = pipe;

		if(this.pos.x + WIDTH >= top.pos.x &&
			this.pos.y <= top.pos.y + top.size.h &&
			this.pos.x <= top.pos.x + top.size.w
		){
			return this.game.gameover();	
		}
	}
	Player.prototype.checkCollisionWithBottomPipes = function(pipe) {
		var bottom = pipe;

		if(this.pos.x + WIDTH >= bottom.pos.x &&
			this.pos.y + HEIGHT >= bottom.pos.y &&
			this.pos.x <= bottom.pos.x + bottom.size.w 
		){
			return this.game.gameover();
		}
	}
	Player.prototype.updateScore = function(pipe) {
		if(this.pos.x > pipe.pos.x + WIDTH && this.pos.x < pipe.pos.x + WIDTH + 0.15 ){
			this.score += 1;
		}
	}
	return Player;

})();