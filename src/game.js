window.Game = (function (){

	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.birdy'), this);
		this.isPlaying = false;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	Game.prototype.start = function() {
		
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	Game.prototype.reset = function() {
		this.player.reset();
	};


	Game.prototype.gameover = function() {
		this.isPlaying = false;

		// Should be refactored into a Scoreboard class.
		// var that = this;
		// var scoreboardEl = this.el.find('.Scoreboard');
		// scoreboardEl
		// 	.addClass('is-visible')
		// 	.find('.Scoreboard-restart')
		// 		.one('click', function() {
		// 			scoreboardEl.removeClass('is-visible');
		// 			that.start();
		// 		});
	};

	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();