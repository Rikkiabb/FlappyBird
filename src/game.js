window.Game = (function (){

	var audio = document.getElementById('background_audio');

	document.getElementById('mute').addEventListener('click', function (e)
	{
	    e = e || window.event;
	    audio.muted = !audio.muted;
	    e.preventDefault();
	}, false);

	var Game = function(el) {
		this.el = el;

		this.pipe1 = new window.Pipe(this.el.find('.topObstacle'), this.el.find('.bottomObstacle'), this.el.find('.topObstacle2'), this.el.find('.bottomObstacle2'));
		//this.pipe2 = new window.Pipe(this.el.find('.topObstacle2'), this.el.find('.bottomObstacle2'), 40);
		//this.pipe2 = new window.Pipe(this.el.find('.bottomObstacle'));
		this.player = new window.Player(this.el.find('.birdy'), this);
		this.isPlaying = false;
		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	Game.prototype.start = function() {
		
		this.reset();
		$(".ground").css("-webkit-animation-play-state", "running");
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

		//this.pipes.onFrame(delta);

		// Update game entities.
		this.player.onFrame(delta);
		this.pipe1.onFrame(delta);
		//this.pipe2.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	Game.prototype.reset = function() {
		this.player.reset();
		this.pipe1.reset();
		this.player.score = 0;
	};


	Game.prototype.gameover = function() {
		this.isPlaying = false;
		$(".ground").css("-webkit-animation-play-state", "paused");


		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};

	Game.prototype.WORLD_WIDTH = 60;
	Game.prototype.WORLD_HEIGHT = 52;

	return Game;
})();