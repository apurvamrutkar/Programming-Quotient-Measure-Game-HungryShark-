// Initialize Phaser, and create a game of size (screen width*0.92 X screen height*0.8)
var game = new Phaser.Game(screen.width * 0.8, screen.height * 0.65,
		Phaser.AUTO, 'gameDiv');

// Create our 'main' state that will contain the game
var mainState = {

	/**
	 * Set initial life, health, score and ThresholdScore(to increase the
	 * levels).
	 */

	health : 4,
	life : 0,
	score : 0,
	thresholdScore : 32,
	flawPositionTime : 0,
	initScore : 0,
	levelArray : "",

	// life
	life : 0,

	// Define Initial Speeds
	stoneSpeed : -340,
	fishSpeed : -320,

	// Initial impetus to the speeds
	netSpeed : 40,
	arrowSpeed : -40,

	// Accuracy
	totalFish : [ 0, 0, 0, 0, 0, 0, 0 ],
	userFish : [ 0, 0, 0, 0, 0, 0, 0 ],

	// [Stone,Arrow,Net] Obstacle
	totalObstacle : [ 0, 0, 0 ],
	userHitObstacle : [ 0, 0, 0 ],

	// Timer
	userTimer : 220,
	// Pattern Score
	patternScore : 0,
	totalPatternsDisplayed : 1,

	// catch level every 5secs.

	// Level:
	level : 0,
	levelTimer : 0,
	fishtime : 590,

	preload : function() {
		// This function will be executed at the beginning
		// That's where we load the game's assets

		// load the blue background sprite
		game.load.image('background', 'assets/Lbackground.jpg');

		// Load the shark sprite
		game.load.image('shark', 'assets/shark.png');

		// Load the mouth opening of the sprite
		// The mouth opening is transparent
		game.load.image('sharkLine', 'assets/line.png');

		/**
		 * To be used to initialize a gravity fall after a key is pressed else
		 * the initialized shark is stable at the current position
		 */
		start = true;

		// load stone
		game.load.image('stone', 'assets/stone.png');

		// load arrow
		game.load.image('arrow', 'assets/arrow.png');
		game.load.image('arrowLine', 'assets/hline.png');

		// Load net
		game.load.image('net', 'assets/net.png');
		game.load.image('netLine', 'assets/hline.png');

		// health
		game.load.image('health_on', 'assets/health_life2.png');
		game.load.image('health_off', 'assets/health_life1.png');

		// load fishes
		game.load.image('greenFish', 'assets/greenFish.png');
		game.load.image('pinkFish', 'assets/yellowFish.png');
		game.load.image('blueFish', 'assets/Blue-Fish.gif');
		game.load.image('goldFish', 'assets/goldfish.png');
		game.load.image('megaFish', 'assets/Star.gif');
		game.load.image('poisonFish', 'assets/red_fish.gif');
		game.load.image('fighterShark', 'assets/fighterFish.png');
		game.load.audio('tada', 'audio/tada.wav');
		game.load.audio('lostLife', 'audio/lostLife.wav');
		game.load.audio('upSound', 'audio/up.wav');
		game.load.audio('gameOverSound', 'audio/gameOver.wav');
		game.load.audio('reduceHealthSound', 'audio/reduceHealth.wav');
		game.load.audio('increaseHealthSound', 'audio/increaseHealth.wav');
		game.load.audio('levelSound', 'audio/level.wav');

	},

	create : function() {
		// This function is called after the preload function
		// Here we set up the game, display sprites, etc.

		// Set the physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Display the background of screen
		this.background = this.game.add.sprite(0, 0, 'background');

		// Adjust the size of background according to screen
		this.background.height = screen.height * 0.65;
		this.background.width = screen.width * 0.8;

		// Display the shark on the screen
		this.shark = this.game.add.sprite(this.background.width * 0.1,
				this.background.height * 0.4, 'shark');

		// Adjust the size of shark according to screen
		this.shark.height = this.background.height * 0.13;
		this.shark.width = this.background.width * 0.13;

		this.sharkLine = this.game.add.sprite(this.background.width * 0.1
				+ this.shark.width - 15, this.background.height * 0.4
				+ this.shark.height - 35, 'sharkLine');

		this.sharkLine.height = 25;
		this.sharkLine.width = 14;

		this.levelTimer = 0;

		// Add gravity to the shark to make it fall
		game.physics.arcade.enable(this.shark);
		game.physics.arcade.enable(this.sharkLine);

		// Display small fishes to eat
		this.fishes = game.add.group();// creating a group of fishes
		this.fishes.enableBody = true;// add physics to group
		/**
		 * Green Fish : 20; Pink Fish: 16 Poison Fish : 7; Mega Fish : 4 Blue
		 * Fish : 4; Fighter Shark : 4 Gold Fish : 2
		 */
		for (var int = 0; int < 20; int++) {
			this.fishes.create(0, 0, 'greenFish', null, false);
			if (int < 16)
				this.fishes.create(0, 0, 'pinkFish', null, false);
			if (int < 7)
				this.fishes.create(0, 0, 'poisonFish', null, false);
			if (int < 4) {
				this.fishes.create(0, 0, 'megaFish', null, false);
				this.fishes.create(0, 0, 'blueFish', null, false);
				this.fishes.create(0, 0, 'fighterShark', null, false);
			}
			if (int < 2) {
				this.fishes.create(0, 0, 'goldFish', null, false);

			}
		}

		// net group
		this.nets = game.add.group();
		this.nets.enableBody = true;
		this.nets.createMultiple(3, 'net');

		// netLine group
		// so that the user Shark losses life only when it comes BELOW the Net,
		// not when it touches it above
		this.netsLine = game.add.group();
		this.netsLine.enableBody = true;
		this.netsLine.createMultiple(3, 'netLine');

		// stone group
		this.stones = game.add.group(); // Create a group
		this.stones.enableBody = true; // Add physics to the group
		this.stones.createMultiple(15, 'stone'); // Create 15 stones

		// arrow group
		this.arrows = game.add.group(); // Create a group
		this.arrows.enableBody = true; // Add physics to the group
		this.arrows.createMultiple(5, 'arrow'); // Create 5 hook
		// arrow Line group
		// so that user shark looses life only when it gets hit by arrow tip,
		// not anywhere between arrow body
		this.arrowsLine = game.add.group(); // Create a group
		this.arrowsLine.enableBody = true; // Add physics to the group
		this.arrowsLine.createMultiple(5, 'arrowLine'); // Create 5 hook

		// spacebar event handler
		spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		// Call the 'jump' function when the spacekey is hit
		spaceKey.onDown.add(this.jump, this);

		// fish pattern
		this.fishPattern = game.add.group();
		this.fishPattern.enableBody = true;
		this.fishPattern.create(0, 0, 'greenFish', null, false);
		this.fishPattern.create(0, 0, 'pinkFish', null, false);
		this.fishPattern.create(0, 0, 'blueFish', null, false);
		this.fishPattern.create(0, 0, 'pinkFish', null, false);
		this.fishPattern.create(0, 0, 'greenFish', null, false);
		this.patternFishCount = 0;
		this.prevIndex = 0;

		// Timecheck for pattern to be displayed after particular intervals
		this.timeCheck = game.time.now + 10000;

		/*
		 * game.add.text(540, 20, "Level:", { font : "30px Arial", fill :
		 * "#ffffff" }); this.labelLevel = game.add.text(640, 20, this.level+"", {
		 * font : "30px Arial", fill : "#ffffff" });
		 */

		// score :0
		game.add.text(this.background.width / 2 - 80,
				this.background.height * 0.9, "Score:", {
					font : "30px Arial",
					fill : "#ffffff"
				});
		this.labelScore = game.add.text(this.background.width / 2 + 30,
				this.background.height * 0.9, this.score + "", {
					font : "30px Arial",
					fill : "#ffffff"
				});

		// health = 5;

		/*game.add.text(170, 20, "Health:", {
			font : "30px Arial",
			fill : "#ffffff"
		});

		this.labelHealth = game.add.text(320, 20, this.health + "", {
			font : "30px Arial",
			fill : "#ffffff"
		});*/

		// health image on
		this.health_image_on = game.add.group();
		this.health_image_on.enableBody = true;
		this.health_image_on.createMultiple(4, 'health_on');
		
		// health image off
		this.health_image_off = game.add.group();
		this.health_image_off.enableBody = true;
		this.health_image_off.createMultiple(4, 'health_off');
		
		//add healths to game
		this.addHealth(4, 0);
		// life = 5;

		/*
		 * game.add.text(170, 20, "TScore:", { font : "30px Arial", fill :
		 * "#ffffff" }); this.labelLife = game.add.text(270, 20,
		 * this.thresholdScore + "", { font : "30px Arial", fill : "#ffffff" });
		 * 
		 * game.add.text(380, 20, "IScore:", { font : "30px Arial", fill :
		 * "#ffffff" }); this.labelIscore = game.add.text(480, 20,
		 * this.initScore + "", { font : "30px Arial", fill : "#ffffff" });
		 */

		// Timer Display on screen
		game.add.text(this.background.width * 0.8, 15, "Time:", {
			font : "30px Arial",
			fill : "#ffffff"
		});
		this.labelTimer = game.add.text(this.background.width * 0.8 + 80, 15,
				this.userTimer + "", {
					font : "30px Arial",
					fill : "#ffffff"
				});
		// Timer Display on screen
		/*
		 * game.add.text(this.background.width * 0.63, 15, "Time:", { font :
		 * "30px Arial", fill : "#ffffff" }); this.labelTimerB =
		 * game.add.text(this.background.width * 0.6 + 130, 15, this.levelTimer +
		 * "", { font : "30px Arial", fill : "#ffffff" });
		 */

		// Ta-Da
		this.lifeSound = game.add.audio('tada');
		// Lost Life
		this.lostLifeSound = game.add.audio('lostLife');
		// Up Sound
		this.upSound = game.add.audio('upSound');
		// Game Over
		this.gameOverSound = game.add.audio('gameOverSound');
		// Reduce Health
		this.reduceHealthSound = game.add.audio('reduceHealthSound');
		// Increase Health
		this.increaseHealthSound = game.add.audio('increaseHealthSound');
		// Level Up
		this.levelSound = game.add.audio('levelSound');

		// for detection of the position of user Shrk
		this.up = false;
		this.boundaryHeightForSafePosition = this.background.height * 0.25;
	},

	update : function() {
		// This function is called 60 times per second
		// It contains the game's logic
		// If the shark is out of the world (too high or too low), call the
		// 'restartGame' function

		// for fish pattern display
		// whole fish pattern is displayed at a stretch in one go
		if (!start) {
			if (this.patternFishCount > 4) {
				this.timeCheck = game.time.now + 10000;
				this.patternFishCount = 0;

			} else {
				if ((game.time.now - this.timeCheck) >= 150) {

					this.addFishPattern();
					this.timeCheck = game.time.now + 200;
					if (this.patternFishCount === 4) {
						this.totalPatternsDisplayed += 1;
					}
					this.patternFishCount++;

				}
			}
		}

		// to caluculate the the total time user stays at the flaw position
		// where UP defines the boolean value if it in the flaw
		// position
		if (this.shark.y < this.boundaryHeightForSafePosition && !this.up) {
			this.start = game.time.now;
			this.up = true;
		} else if (this.shark.y > this.boundaryHeightForSafePosition && this.up
				&& this.start > 0) {
			// saving time in secs
			this.flawPositionTime += ((game.time.now - this.start) / 1000);
			this.up = false;
		}

		// to reduce life if shark goes out of the game boundaries
		if (this.shark.inWorld == false)
			this.reduceLife();

		game.physics.arcade.overlap(this.shark, this.stones,
				this.reduceHealthStone, null, this);
		game.physics.arcade.overlap(this.shark, this.arrowsLine,
				this.reduceHealthArrow, null, this);
		game.physics.arcade.overlap(this.shark, this.arrows, this.killArrow,
				null, this);
		game.physics.arcade.overlap(this.sharkLine, this.fishes, this.hideFish,
				null, this);
		game.physics.arcade.overlap(this.shark, this.netsLine, this.reduceLife,
				this.hitNetObstacle, this);
		game.physics.arcade.overlap(this.sharkLine, this.fishPattern,
				this.hideFish, this.addPatternScore, this);

	},

	// add Health images
	addHealth : function(count, index) {

		var x = this.background.width * 0.02 + 40 * index;
		var y = this.background.height * 0.03;
		for (var i = index,j=0; j < count; i++,j++) {
			var health_off = this.health_image_off.getAt(i);
			if(health_off.alive){
				health_off.kill();
			}
			var health_on = this.health_image_on.getAt(i);
			health_on.reset(x, y);
			x += 40;
		}
	},
	// remove health
	removeHealth : function(index) {
		var x = this.background.width * 0.02 + 40 * index;
		var y = this.background.height * 0.03;
		for (var i = index; i < 4; i++) {
			var health_on = this.health_image_on.getAt(i);
			health_on.kill();
			var health_off = this.health_image_off.getAt(i);
			health_off.reset(x, y);
			x += 40;
		}
	},

	// set the arrow to invisble if it hit the shark
	killArrow : function(shark, arrow) {
		arrow.kill();
	},

	// to display net
	displayNet : function() {
		this.addNet();
	},
	// to display net
	addNet : function() {
		if (this.nets.countLiving() > 0) {
			return;
		} else {
			var net = this.nets.getFirstDead();
			var netLine = this.netsLine.getFirstDead();
			// Adjust the size of background according to screen
			net.height = this.background.height * 0.13;
			net.width = this.background.width * 0.13;

			// starting position of Net, variable x axis: from 50-100% of game
			// width, fixed y axis
			x = ((Math.random() * 0.5) + 0.5) * this.background.width;
			y = this.background.height * 0.1;
			net.reset(x, y);

			// variable velocity of net
			var horizontalVelocity = Math.floor(Math.random() * -300);
			var verticalVelocity = Math.floor(Math.random() * 100) + 40;
			net.body.velocity.x = horizontalVelocity + this.netSpeed;
			net.body.velocity.y = verticalVelocity - this.netSpeed / 4;

			// Add 'net' to the total
			this.totalObstacle[2]++;

			net.checkWorldBounds = true;
			net.outOfBoundsKill = true;

			netLine.height = 15;
			netLine.width = net.width;

			netLine.reset(x, y + 45);

			netLine.body.velocity.x = horizontalVelocity + this.netSpeed;
			netLine.body.velocity.y = verticalVelocity - this.netSpeed / 4;
			// Kill the net when it's no longer visible
			netLine.checkWorldBounds = true;
			netLine.outOfBoundsKill = true;
		}
	},

	// to store data of 'Net' obstacels hit by user
	hitNetObstacle : function() {
		this.userHitObstacle[2]++;
		return true;
	},

	// add small fishes
	addFish : function() {

		var fish = this.fishes.getRandom();
		while (fish.alive) {
			fish = this.fishes.getRandom();
		}

		this.fishCount(this.totalFish, fish.key);
		// set new position
		var height = Math.floor(Math.random() * (this.background.height * 0.6))
				+ (this.background.height * 0.2);
		fish.reset(this.background.width - 50, height);
		fish.body.velocity.x = this.fishSpeed;

		// To keep size constant to 7% times the game window size for ordinary
		// fishes and
		// a bit larger for the Fighter shark and Star(mega) Fish
		if (fish.key !== "fighterShark" && fish.key !== "megaFish") {
			fish.width = this.background.width * 0.07;
			fish.height = this.background.height * 0.07;
		} else if (fish.key !== "megaFish") {
			fish.width = this.background.width * 0.15;
			fish.height = this.background.height * 0.15;

		} else {
			fish.width = this.background.width * 0.07;
			fish.height = this.background.height * 0.1;

		}
		// Kill the pipe when it's no longer visible
		fish.checkWorldBounds = true;
		fish.outOfBoundsKill = true;

	},

	// display fishes, ad one fish each time the function is called
	displayFishes : function() {
		this.addFish();
	},

	// keep a fish Count of the total number of fishes displayed
	fishCount : function(array, fish) {
		switch (fish) {

		case "greenFish":
			array[0]++;
			break;
		case 'pinkFish':
			array[1]++;
			break;
		case 'megaFish':
			array[2]++;
			break;
		case 'poisonFish':
			array[3]++;
			break;
		case 'blueFish':
			array[4]++;
			break;
		case 'goldFish':
			array[5]++;
			break;
		case 'fighterShark':
			array[6]++;
			break;

		}

	},

	// uppdate the score as well as keep a fish count eaten up by the user
	userScore : function(fish) {

		switch (fish.key) {

		case 'greenFish':
			this.score += 1;
			this.initScore += 1;
			// this.labelIscore.text=this.initScore;
			this.labelScore.text = this.score;
			this.updateLevel();
			break;
		case 'pinkFish':
			this.score += 2;
			this.initScore += 2;
			// this.labelIscore.text=this.initScore;
			this.labelScore.text = this.score;
			this.updateLevel();
			break;
		case 'megaFish':
			this.score += 3;
			this.initScore += 3;
			// this.labelIscore.text=this.initScore;
			this.labelScore.text = this.score;
			this.updateLevel();
			break;
		case 'poisonFish':
			this.reduceHealth(2);
			//this.labelHealth.text = this.health;
			break;
		case 'blueFish':
			this.increaseHealth();
			//this.labelHealth.text = this.health;
			break;
		case 'goldFish':
			this.increaseLife();
			// this.labelLife.text = this.life;
			break;
		case 'fighterShark':
			this.reduceLife();
			// this.labelLife.text = this.life;
			break;

		}

	},

	// reduce the health by value given as input and update it
	reduceHealth : function(value) {
		if (this.health <= value)
			this.reduceLife();
		else {
			this.reduceHealthSound.play();

			this.health -= value;
			this.removeHealth(this.health);
			//this.labelHealth.text = this.health;
		}
	},

	// increase the health if less than 4
	increaseHealth : function() {
		if (this.health < 4) {
			this.increaseHealthSound.play();
			this.addHealth(1, this.health);
			this.health++;
			
		}
	},

	// increase life of user if less than 4
	increaseLife : function() {
		if (this.health < 4) {
			this.lifeSound.play();
			this.health = 4;
			this.addHealth(4, 0);
			//this.labelHealth.text = this.health;
		}
	},

	// update level after a particular score, increase speed of the entire game
	// Sprites
	updateLevel : function() {
		if (this.initScore > this.thresholdScore && this.level < 4) {
			this.level++;
			// this.labelLevel.text = this.level;
			this.levelSound.play();
			this.stoneSpeed -= 60;
			this.fishSpeed -= 80;
			this.netSpeed -= 40;
			this.arrowSpeed += 40;
			this.initScore = this.thresholdScore;
			this.thresholdScore *= 2;
			// this.labelLife.text = this.thresholdScore;
			this.fishtime -= 90;

		}
	},
	/**
	 * Hide the fishes after they overlap with the shark. Add the score to the
	 * user's tally. The score addition depends on the type of fish eaten. The
	 * function increases the speed after a particular threshold
	 */
	hideFish : function(sharkLine, fish) {
		this.userScore(fish);
		this.fishCount(this.userFish, fish.key);
		fish.kill();
	},

	/**
	 * Reduce the health of the user if the shark interacts with the hook. The
	 * function reduces the health by 1. If the health is to its minimum and
	 * cannot be reduced further then the Life of the user's tally is reduced.
	 */
	reduceHealthArrow : function(shark, arrowsLine) {
		this.reduceHealth(1);
		this.userHitObstacle[1]++;
		arrowsLine.kill();
	},

	/**
	 * Reduce the health of the user if the shark interacts with the stone. The
	 * function reduces the health by 2. If the health is to its minimum and
	 * cannot be reduced further then the Life of the user's tally is reduced.
	 */
	reduceHealthStone : function(shark, stone) {
		this.reduceHealth(2);
		this.userHitObstacle[0]++;
		stone.kill();
	},

	/**
	 * Reduce the life of the user by 1. If the life is to its minimum and
	 * cannot be reduced further then the game is stopped.
	 */
	reduceLife : function(shark, killer) {

		this.lostLifeSound.play();

		this.health = 4;
		//this.labelHealth.text = this.health;
		// this.labelLife.text = this.life + "";
		this.restartGame();

	},

	// play the game over sound,
	// submit the scores to the register servlet by appending the score to the
	// url
	// and destroy the game context
	stopGame : function() {

		this.gameOverSound.play();
		for (var int = 0; int < 10000; int++)
			;

		if (this.up) {
			this.flawPositionTime += (game.time.now - this.start) / 1000;
		}

		var s = "/HungryShark/register?";
		// total Score
		s += "score=" + this.score + "&";
		// lives lost
		s += "life=" + (-this.life) + "&";
		// level Array
		s += "levelArray=" + this.levelArray + "&";

		// flawPositionTime level by level
		s += "flawPositionTime=" + this.flawPositionTime + "&";
		// fishDetails total
		for (var i = 0; i < this.totalFish.length; i++) {
			s += "totalFish=" + this.totalFish[i] + "&";
		}
		// fishDetails user
		for (var i = 0; i < this.userFish.length; i++) {
			s += "userFish=" + this.userFish[i] + "&";
		}
		// total Obstacle
		for (var i = 0; i < this.totalObstacle.length; i++) {
			s += "totalObstacle=" + this.totalObstacle[i] + "&";
		}
		// user hit obstacle
		for (var i = 0; i < this.userHitObstacle.length; i++) {
			s += "userHitObstacle=" + this.userHitObstacle[i] + "&";
		}
		// pattern Score
		s += "patternScore=" + this.patternScore + "&";
		// total patterns displayed to user
		s += "totalPatternsDisplayed=" + this.totalPatternsDisplayed;
		game.destroy();
		window.location.assign(s);
	},

	/**
	 * Returns a random integer between min (inclusive) and max (inclusive)
	 * Using Math.round() will give you a non-uniform distribution
	 */
	getRandomInt : function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	// Make the shark jump
	jump : function() {

		this.upSound.play();

		// Add a vertical velocity to the shark
		// if(this.shark.y>30){
		this.shark.body.velocity.y = -400;
		this.sharkLine.body.velocity.y = -400;
		// }
		if (start) {
			this.shark.body.gravity.y = 900;
			this.sharkLine.body.gravity.y = 900;
			start = false;

			// Game Timer
			this.timer = game.time.events.loop(1000, this.updateTime, this);

			/**
			 * To actually add obstacles in the game, we need to call the
			 * addObstacle() function after random seconds between 1.0 to 2.0.
			 * We can do this by adding a timer in the create() function.
			 */
			this.timer = game.time.events.loop(this.getRandomInt(1000, 1500),
					this.addObstacle, this);// getRandomInt(1000,2000)

			/**
			 * display fishes from start and then after a interval between 500
			 * to 1000 millisec
			 */
			this.displayFishes();
			this.timer = game.time.events
					.loop(
							(Math.floor(Math.random() * this.fishtime) + this.fishtime),
							this.displayFishes, this);

			/**
			 * display nets from start and then after a interval between 3000 to
			 * 6000 millisec
			 */
			this.timer = game.time.events.loop((Math.floor(Math.random() * 5
					* this.fishtime) + 5000 - 5 * this.fishtime),
					this.displayNet, this);
			/*******************************************************************
			 * timer loop for updating level every 5sec
			 */
			this.timer = game.time.events.loop(1000, this.addLevelToLevelArray,
					this);
		}
	},

	// add the current level to level Array
	addLevelToLevelArray : function() {
		if (this.userTimer % 5 === 0)
			this.levelArray += this.level + ",";
	},

	// Restart the game
	restartGame : function() {
		// Start the 'main' state, which restarts the game
		if (this.levelTimer > 5 && this.level > -2) {
			this.levelTimer = 0;
			this.level--;
			// this.labelLevel.text = this.level;
			// this.levelSound.play();
			this.stoneSpeed += 60;
			this.fishSpeed += 80;
			this.netSpeed += 40;
			this.arrowSpeed -= 40;
			this.thresholdScore /= 2;
			this.life -= 1;
			this.initScore = this.thresholdScore / 2;

			// this.labelLife.text = this.thresholdScore;
			this.fishtime += 90;
		} else {
			this.initScore = 0;
		}
		game.state.restart(true, true, 'main');
	},

	// update the timer, to update time to be displayed on the gaming screen
	updateTime : function() {
		if (this.userTimer > 0) {
			this.userTimer--;
		} else {
			this.stopGame();
		}
		this.labelTimer.text = this.userTimer;
		this.levelTimer++;
		// this.labelTimerB.text = this.levelTimer;
	},

	/**
	 * Function to add a stone in the game. By default, all the stones contained
	 * in the group are dead and not displayed. So we pick a dead stone, display
	 * it, and make sure to automatically kill it when it's no longer visible.
	 * This way we never run out of stones.
	 */
	addStoneObstacle : function(x, y, sizeOfStone) {
		// Get the first dead stone of our group
		var stone = this.stones.getFirstDead();

		// set height and width of stone
		stone.width = this.background.width * 0.07;
		stone.height = this.background.height * 0.07 * sizeOfStone;

		// Set the new position of the stone
		stone.reset(x, y);

		// Add velocity to the stone to make it move left
		stone.body.velocity.x = this.stoneSpeed;

		// Add the Stone to the total
		this.totalObstacle[0]++;

		// Kill the stone when it's no longer visible
		stone.checkWorldBounds = true;
		stone.outOfBoundsKill = true;
	},

	/**
	 * Function to add a arrow in the game. By default, all the arrow contained
	 * in the group are dead and not displayed. So we pick a dead arrow, display
	 * it, and make sure to automatically kill it when it's no longer visible.
	 * This way we never run out of arrows.
	 */
	addArrowObstacle : function(x, y) {
		// Get the first dead arrow of our group
		var arrow = this.arrows.getFirstDead();
		var arrowLine = this.arrowsLine.getFirstDead();

		// set height and width of hook
		arrow.height = this.background.height * 0.07;
		arrow.width = this.background.width * 0.07;

		arrowLine.height = 10;
		arrowLine.width = 10;

		// Set the new position of the hook
		arrow.reset(x, y);
		arrowLine.reset(x, y + 30);

		// Add velocity to the arrow to make it move left down
		arrow.body.velocity.x = -(this.getRandomInt(300 + this.arrowSpeed,
				500 + this.arrowSpeed));
		arrow.body.velocity.y = this.getRandomInt(100, 150);
		arrowLine.body.velocity.x = arrow.body.velocity.x;
		arrowLine.body.velocity.y = arrow.body.velocity.y;

		// Add arrow to the total
		this.totalObstacle[1]++;

		// Kill the arrow when it's no longer visible
		arrow.checkWorldBounds = true;
		arrow.outOfBoundsKill = true;

		arrowLine.checkWorldBounds = true;
		arrowLine.outOfBoundsKill = true;
	},

	/**
	 * Add obstacle(stones and arrows) to the game
	 */
	addObstacle : function() {
		// Pick where the obstacle will be
		var obstacle = this.getRandomInt(1, 10);

		// Add stone obstacle
		if (obstacle > 7) {
			this.addStoneObstacle(this.background.width * 0.92,
					this.background.height * (1 - (obstacle - 7) * 0.07),
					obstacle - 7);
			/* alert("stone"); */
		}
		// Add arrow obstacle
		if (obstacle < 3)
			this.addArrowObstacle(
					this.getRandomInt(this.background.width * 0.25,
							this.background.width * 0.75),
					this.background.height * 0.1);

	},
	// add fishes of fish pattern
	addFishPattern : function() {

		var fish = this.fishPattern.getAt(this.patternFishCount);

		this.fishCount(this.totalFish, fish.key);
		// set new position
		var height = (Math.floor(Math.random() * 0.2) + 0.1)
				* this.background.height;
		fish.reset(this.background.width - 50, height);
		fish.body.velocity.x = this.fishSpeed;

		fish.width = this.background.width * 0.07;
		fish.height = this.background.height * 0.07;

		// Kill the pipe when it's no longer visible
		fish.checkWorldBounds = true;
		fish.outOfBoundsKill = true;

	},

	/**
	 * Fish pattern add patternscore Pattern score is only added if the whole
	 * pattern is eaten by user as displayed at a stretch so checking condition
	 * of prevIndex of pattern eaten and current index == 1 and also the game
	 * time difference between 2 continuous pattern display as they are only
	 * shown after 2 sec and next pattern comes after 6sec
	 */
	addPatternScore : function(sharkLine, fish) {

		var index = this.fishPattern.getIndex(fish);
		if (index === this.prevIndex + 1
				&& ((game.time.now - this.timeCheck) < 5000)) {
			if (index === 4) {
				this.patternScore += 1;
				this.score += 6;
				this.increaseHealth();
				this.labelScore.text = this.score;
				//this.labelHealth.text = this.health;
				this.prevIndex = -1;
			} else {
				this.prevIndex += 1;
			}
		}
		return true;
	},

};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);
game.state.start('main');
