window.Game = (function (){

	var audio = document.getElementById('background_audio');
	var flyaudio = document.getElementById('jumpSound');

	// Toggle sound on and off
	document.getElementById('mute').addEventListener('click', function (e)
	{
	    e = e || window.event;
	   	if(audio.muted){
	    	document.getElementById('mute').src="css/unmute.png";
		} else {
			document.getElementById('mute').src="css/mute.png";
		}
	    audio.muted = !audio.muted;
	    flyaudio.muted = !flyaudio.muted;
	    e.preventDefault();
	}, false);

	// Initialize game
	var Game = function(el) {

		this.el = el;
		this.pipe1 = new window.Pipe(
			this.el.find('.topObstacle'),
			this.el.find('.bottomObstacle'),
			this.el.find('.topObstacle2'),
			this.el.find('.bottomObstacle2')
		);
		this.player = new window.Player(this.el.find('.birdy'), this);
		this.isPlaying = false;
		this.hasStarted = false;
		
		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);

		// Response window size
		var fontSize = Math.min(window.innerWidth / 60, window.innerHeight / 58);
		this.el.css("font-size", fontSize + "px");

		// Listening for starting click
        $(window).on('keydown', this._onKeyDown.bind(this));
	};

	// Listening for window resizing
	$( window ).resize(function() {
  		var fontSize = Math.min(window.innerWidth / 60, window.innerHeight / 58);
		$(".gameGrid").css("font-size", fontSize + "px");
		
	});

	Game.prototype._onKeyDown = function(e){
		this.hasStarted = true;

		// Starts a new game
	    if(e.keyCode == 32 && this.isPlaying == false){
			this.el.find('.Scoreboard').removeClass('is-visible');
			this.el.find('.tiger').removeClass('is-visible');
	        this.start();
	    }
	};

	Game.prototype.start = function() {
		
		this.reset();	

		// Starts the earths rotation
		$(".ground").css("-webkit-animation-play-state", "running");

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	Game.prototype.onFrame = function() {

		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Game starting position
		if(this.hasStarted == false){
			this.pipe1.top.pos.x = 60; 
			this.pipe1.bottom.pos.x = 60;
			this.pipe1.top2.pos.x = 95; 
			this.pipe1.bottom2.pos.x = 95;
			this.player.pos.y = 25;
		}	

		// Update game entities.
		this.player.onFrame(delta);
		this.pipe1.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);			
		

	};

	Game.prototype.reset = function() {
		this.player.reset();
		this.pipe1.reset();

		this.player.score = 0;
		this.player.gravity = 0;

		// Reset background song
		var audioElem = document.getElementById("background_audio");
		audioElem.volume = 0.2;
		audioElem.src = "Daft-Punk-Instant-Crush-8-Bit-NES-Remake.mp3"; 
		audioElem.play();
	};


	Game.prototype.gameover = function() {
		this.isPlaying = false;

		// Sound of death
		var audioElem = document.getElementById("background_audio");
		audioElem.volume = 0.99;
		audioElem.src = "tiger.mov"; 
		audioElem.play();
		audioElem.loop = false;

		// shows the scoreboard and of course tiger
		var newGame = this;
		var tigerEl = this.el.find('.tiger');
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					tigerEl.removeClass('is-visible');
					newGame.start();
				});
		tigerEl.addClass('is-visible');

		// checks for new highscore
	    if(typeof(Storage) !== "undefined") {
	        if (localStorage.highScore < this.player.score) {
	            localStorage.highScore = this.player.score;
	        } 
	    }

	    // Stops the earth and displays the score
		$(".ground").css("-webkit-animation-play-state", "paused");
		$("#myScore").text("");
		$("#scoreBoardResaultMyScore").text(this.player.score);
		$("#scoreBoardResaultBest").text(localStorage.highScore);

	};

	// Sets the worlds boundaries
	Game.prototype.WORLD_WIDTH = 60;
	Game.prototype.WORLD_HEIGHT = 52;

	return Game;
})();