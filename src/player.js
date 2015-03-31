window.Player = (function() {

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	var SPEED = 30;
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30.0;
	var INITIAL_POSITION_Y = 25.0;

	// Initalize the player
	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.score = 0;
		this.jump = 5;
		this.gravity = 0;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		this.gravity = 0;
		this.score = 0;
		this.jump = 5;
	};

	Player.prototype.onFrame = function(delta) {
		
		if(Controls.didJump()){
			// Jumping sound
			var audioElem = document.getElementById("jumpSound");
			audioElem.src = "sounds/birdie.mov"; 
			audioElem.play();
			audioElem.loop = false;

			// Starts jumping
			this.pos.y -= 0.12 * 20;
			this.jump -= 1;
			this.gravity = 0;
			this.inTheAir = true;
		}

		// Makes jumping more smooth
		if(this.inTheAir == true){
			if(this.jump == 4){
				this.pos.y -= 0.10 * 20;
				this.jump -= 1;
			}
			else if(this.jump == 3){
				this.pos.y -= 0.09 * 20;
				this.jump -= 1;
			}
			else if(this.jump == 2){
				this.pos.y -= 0.05 * 20;
				this.jump -= 1;
			}		
			else if(this.jump == 1){
				this.pos.y -= 0.04 * 20;
				this.jump -= 1;
			}
			else if(this.jump == 0){
				this.jump = 5;
				this.inTheAir = false;
			}		
		}
		else{
			// Player drops
			this.pos.y += delta * 0.60 + this.gravity;

			// Gravity increases
			this.gravity += 0.03;

			this.checkCollision();			
		}

		// Update UI
		this.el.css('transform', ' translate3d(' + this.pos.x + 'em, ' + this.pos.y + 'em, 0em)');
			
	};

	Player.prototype.checkCollision = function() {
		// Updates score in left top corner
		$("#myScore").text(this.score);

		// Checks for collition
		this.checkCollisionWithBounds();
		this.checkCollisionWithTopPipes(this.game.pipe1.top);
		this.checkCollisionWithTopPipes(this.game.pipe1.top2);
		this.checkCollisionWithBottomPipes(this.game.pipe1.bottom);
		this.checkCollisionWithBottomPipes(this.game.pipe1.bottom2);

		// Checks if the player has passed an obstacle
		this.updateScore(this.game.pipe1.top);
		this.updateScore(this.game.pipe1.top2);
		
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
				//this.death();
				return this.game.gameover();			
		}
	};

	Player.prototype.checkCollisionWithTopPipes = function(pipe) {
		var top = pipe;

		if(this.pos.x + WIDTH >= top.pos.x &&
			this.pos.y <= top.pos.y + top.size.h &&
			this.pos.x <= top.pos.x + top.size.w
		){
			return this.game.gameover();	
		}
	};

	Player.prototype.checkCollisionWithBottomPipes = function(pipe) {
		var bottom = pipe;

		if(this.pos.x + WIDTH >= bottom.pos.x &&
			this.pos.y + HEIGHT >= bottom.pos.y &&
			this.pos.x <= bottom.pos.x + bottom.size.w 
		){
			return this.game.gameover();
		}
	};

	Player.prototype.updateScore = function(pipe) {
		// when player passes a pipe we increment the score
		if(this.pos.x >= pipe.pos.x + WIDTH && pipe.hasPoint == true){
			this.score += 1;
			pipe.hasPoint = false;
		}
	};

	return Player;
})();