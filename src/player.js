window.Player = (function() {

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30.0;
	var INITIAL_POSITION_Y = 25.0;

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
			var audioElem = document.getElementById("jumpSound");
			audioElem.src = "birdie.mov"; 
			audioElem.play();
			audioElem.loop = false;
			this.pos.y -= 0.12 * 20;
			this.jump -= 1;
			this.gravity = 0;
			this.inTheAir = true;
		}
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
			this.pos.y += delta * 0.60 + this.gravity;
			this.gravity += 0.03;
			this.checkCollision();			
		}

		// Update UI
		this.el.css('transform', ' translate3d(' + this.pos.x + 'em, ' + this.pos.y + 'em, 0em)');
			
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
				//this.death();
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
		//console.log("player pos: ", this.pos.x, " pipe pos: ",pipe.pos.x + WIDTH, " has point: ", pipe.hasPoint)
		if(this.pos.x >= pipe.pos.x + WIDTH && pipe.hasPoint == true){
			//console.log("------- UPDATE SCORE -----");
			this.score += 1;
			pipe.hasPoint = false;
		}
	}
	Player.prototype.death = function() {
		console.log("DEATH", this.game.WORLD_HEIGHT);
		console.log("DEATH", this.pos.y + WIDTH);
		console.log("DEATH", this.pos.y - (0.04 * 20) + WIDTH);
		console.log("PLAY");
		while(this.pos.y + WIDTH < this.game.WORLD_HEIGHT){
			this.pos.y += 1;
		}
	}
	return Player;

})();