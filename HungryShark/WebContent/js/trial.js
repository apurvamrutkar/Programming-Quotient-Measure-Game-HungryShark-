var game = new Phaser.Game(screen.width * .8, screen.height * .65, Phaser.AUTO,
		"gameTrialDiv");
var step = 0;
var mainState = {
	preload : function() {
		game.load.image("background", "assets/Lbackground.jpg");
		game.load.image("shark", "assets/shark.png");
		game.load.image("sharkLine", "assets/hline.png");
		start = true;
		game.load.image("gfish", "assets/greenFish.png");
		game.load.image("pfish", "assets/yellowFish.png");
		game.load.image("mfish", "assets/Star.gif");
		game.load.image("bfish", "assets/Blue-Fish.gif");
		game.load.image("goldfish", "assets/goldfish.png");
		game.load.image("rfish", "assets/red_fish.gif");
		game.load.image("ffish", "assets/fighterFish.png");
		game.load.image("arrow", "assets/arrow.png");
		game.load.image("arrowl", "assets/hline.png");
		game.load.image("stone", "assets/stone.png");
		game.load.image("net", "assets/net.png");
		game.load.image("netLine", "assets/hline.png");
		game.load.audio("tada", "audio/tada.wav");
		game.load.audio("lostLife", "audio/lostLife.wav");
		game.load.audio("upSound", "audio/up.wav");
		game.load.audio("reduceHealthSound", "audio/reduceHealth.wav");
		game.load.audio("increaseHealthSound", "audio/increaseHealth.wav")
	},
	create : function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.background = this.game.add.sprite(0, 0, "background");
		this.background.height = screen.height * .65;
		this.background.width = screen.width * .8;
		this.shark = this.game.add.sprite(this.background.width * .1,
				this.background.height * .4, "shark");
		this.shark.height = this.background.height * .13;
		this.shark.width = this.background.width * .13;
		this.sharkLine = this.game.add.sprite(this.background.width * .1
				+ this.shark.width - 15, this.background.height * .4
				+ this.shark.height - 35, "sharkLine");
		this.sharkLine.height = 25;
		this.sharkLine.width = 14;
		game.physics.arcade.enable(this.shark);
		game.physics.arcade.enable(this.sharkLine);
		this.spaceKey = this.game.input.keyboard
				.addKey(Phaser.Keyboard.SPACEBAR);
		this.spaceKey.onDown.add(this.jump, this);
		this.lifeSound = game.add.audio("tada");
		this.lostLifeSound = game.add.audio("lostLife");
		this.upSound = game.add.audio("upSound");
		this.reduceHealthSound = game.add.audio("reduceHealthSound");
		this.increaseHealthSound = game.add.audio("increaseHealthSound");
		this.spaceKey = this.game.input.keyboard
				.addKey(Phaser.Keyboard.SPACEBAR);
		this.spaceKey.onDown.add(this.jump, this);
		this.timer = 0
	},
	update : function() {
		if (game.time.now - this.timer > 1500) {
			if (step == 10) {
				game.destroy();
				window.location = "HomeOrTrial.html"
			}
			document.getElementById("msgspan").innerHTML = ""
		} else {
			document.getElementById("msg").style.display = "block"
		}
		if (!start && step == 0) {
			if (this.gfish.inWorld == false) {
				document.getElementById("msgspan").innerHTML = "Try to Eat the Green fish.";
				this.timer = game.time.now;
				this.displaygFish()
			}
		} else if (!start && step == 1) {
			if (this.pfish.inWorld == false) {
				document.getElementById("msgspan").innerHTML = "Try to Eat the Yellow fish.";
				this.timer = game.time.now;
				this.displaypFish()
			}
		} else if (!start && step == 3) {
			if (this.bfish.inWorld == false) {
				document.getElementById("msgspan").innerHTML = "Try to Eat the Blue fish.";
				this.timer = game.time.now;
				this.displaybFish()
			}
		} else if (!start && step == 2) {
			if (this.mfish.inWorld == false) {
				document.getElementById("msgspan").innerHTML = "Try to Eat the Mega fish.";
				this.timer = game.time.now;
				this.displaymFish()
			}
		} else if (!start && step == 7) {
			if (this.goldfish.inWorld == false) {
				document.getElementById("msgspan").innerHTML = "Try to Eat the Gold fish.";
				this.timer = game.time.now;
				this.displayGoldfish()
			}
		} else if (!start && step == 5) {
			if (this.rfish.inWorld == false) {
				document.getElementById("msgspan").innerHTML = "Try to Eat the Red fish.";
				this.timer = game.time.now;
				this.displayrFish()
			}
		} else if (!start && step == 8) {
			if (this.ffish.inWorld == false) {
				document.getElementById("msgspan").innerHTML = "Try to Eat the Fighter fish.";
				this.timer = game.time.now;
				this.displayfFish()
			}
		} else if (!start && step == 4) {
			if (this.arrowl.inWorld == false) {
				document.getElementById("msgspan").innerHTML = "Try to collide with the Arrow.";
				this.timer = game.time.now;
				this.displayArrow()
			}
		} else if (!start && step == 6) {
			if (this.stone.inWorld == false) {
				document.getElementById("msgspan").innerHTML = "Try to collide with the Stone.";
				this.timer = game.time.now;
				this.displayStone()
			}
		} else if (!start && step == 9) {
			if (this.net.inWorld == false) {
				document.getElementById("msgspan").innerHTML = "Try to collide with the Net";
				this.timer = game.time.now;
				this.displayNet()
			}
		}
		if (this.shark.inWorld == false) {
			this.timer = game.time.now;
			this.restartGame()
		}
		game.physics.arcade.overlap(this.sharkLine, this.gfish,
				this.collideWith, null, this);
		game.physics.arcade.overlap(this.sharkLine, this.pfish,
				this.collideWith, null, this);
		game.physics.arcade.overlap(this.sharkLine, this.bfish,
				this.collideWith, null, this);
		game.physics.arcade.overlap(this.sharkLine, this.mfish,
				this.collideWith, null, this);
		game.physics.arcade.overlap(this.sharkLine, this.goldfish,
				this.collideWith, null, this);
		game.physics.arcade.overlap(this.sharkLine, this.rfish,
				this.collideWith, null, this);
		game.physics.arcade.overlap(this.sharkLine, this.ffish,
				this.collideWith, null, this);
		game.physics.arcade.overlap(this.shark, this.arrowl, this.collideWith,
				null, this);
		game.physics.arcade.overlap(this.shark, this.stone, this.collideWith,
				null, this);
		game.physics.arcade.overlap(this.shark, this.netLine, this.collideWith,
				null, this)
	},
	displaygFish : function() {
		this.gfish = this.game.add.sprite(this.background.width,
				this.background.height * .5, "gfish");
		this.gfish.height = this.background.height * .1;
		this.gfish.width = this.background.width * .07;
		game.physics.arcade.enable(this.gfish);
		this.gfish.body.velocity.x = this.getRandomInt(-350, -250);
		this.gfish.checkWorldBounds = true;
		this.gfish.outOfBoundsKill = true
	},
	displaypFish : function() {
		this.pfish = this.game.add.sprite(this.background.width,
				this.background.height * .5, "pfish");
		this.pfish.height = this.background.height * .1;
		this.pfish.width = this.background.width * .07;
		game.physics.arcade.enable(this.pfish);
		this.pfish.body.velocity.x = this.getRandomInt(-350, -250);
		this.pfish.checkWorldBounds = true;
		this.pfish.outOfBoundsKill = true
	},
	displaybFish : function() {
		this.bfish = this.game.add.sprite(this.background.width,
				this.background.height * .5, "bfish");
		this.bfish.height = this.background.height * .1;
		this.bfish.width = this.background.width * .07;
		game.physics.arcade.enable(this.bfish);
		this.bfish.body.velocity.x = this.getRandomInt(-350, -250);
		this.bfish.checkWorldBounds = true;
		this.bfish.outOfBoundsKill = true
	},
	displaymFish : function() {
		this.mfish = this.game.add.sprite(this.background.width,
				this.background.height * .5, "mfish");
		this.mfish.height = this.background.height * .1;
		this.mfish.width = this.background.width * .07;
		game.physics.arcade.enable(this.mfish);
		this.mfish.body.velocity.x = this.getRandomInt(-350, -250);
		this.mfish.checkWorldBounds = true;
		this.mfish.outOfBoundsKill = true
	},
	displayGoldfish : function() {
		this.goldfish = this.game.add.sprite(this.background.width,
				this.background.height * .5, "goldfish");
		this.goldfish.height = this.background.height * .1;
		this.goldfish.width = this.background.width * .07;
		game.physics.arcade.enable(this.goldfish);
		this.goldfish.body.velocity.x = this.getRandomInt(-350, -250);
		this.goldfish.checkWorldBounds = true;
		this.goldfish.outOfBoundsKill = true
	},
	displayrFish : function() {
		this.rfish = this.game.add.sprite(this.background.width,
				this.background.height * .5, "rfish");
		this.rfish.height = this.background.height * .1;
		this.rfish.width = this.background.width * .07;
		game.physics.arcade.enable(this.rfish);
		this.rfish.body.velocity.x = this.getRandomInt(-350, -250);
		this.rfish.checkWorldBounds = true;
		this.rfish.outOfBoundsKill = true
	},
	displayfFish : function() {
		this.ffish = this.game.add.sprite(this.background.width,
				this.background.height * .5, "ffish");
		this.ffish.height = this.background.height * .15;
		this.ffish.width = this.background.width * .15;
		game.physics.arcade.enable(this.ffish);
		this.ffish.body.velocity.x = this.getRandomInt(-350, -250);
		this.ffish.checkWorldBounds = true;
		this.ffish.outOfBoundsKill = true
	},
	displayArrow : function() {
		this.arrowl = this.game.add.sprite(screen.width * .5,
				screen.height * .13, "arrowl");
		this.arrow = this.game.add.sprite(screen.width * .5,
				screen.height * .05, "arrow");
		this.arrow.height = this.background.height * .1;
		this.arrow.width = this.background.width * .1;
		this.arrowl.height = 10;
		this.arrowl.width = 10;
		game.physics.arcade.enable(this.arrow);
		game.physics.arcade.enable(this.arrowl);
		this.arrow.body.velocity.x = this.arrowl.body.velocity.x = this
				.getRandomInt(-400, -300);
		this.arrow.body.velocity.y = this.arrowl.body.velocity.y = this
				.getRandomInt(100, 200);
		this.arrow.checkWorldBounds = true;
		this.arrow.outOfBoundsKill = true;
		this.arrowl.checkWorldBounds = true;
		this.arrowl.outOfBoundsKill = true
	},
	displayStone : function() {
		this.stone = this.game.add.sprite(this.background.width,
				this.background.height * .6, "stone");
		this.stone.height = this.background.height * .4;
		this.stone.width = this.background.width * .15;
		game.physics.arcade.enable(this.stone);
		this.stone.body.velocity.x = this.getRandomInt(-350, -250);
		this.stone.checkWorldBounds = true;
		this.stone.outOfBoundsKill = true
	},
	displayNet : function() {
		this.net = this.game.add.sprite(screen.width * .5, screen.height * .05,
				"net");
		this.netLine = this.game.add.sprite(screen.width * .51,
				screen.height * .12, "netLine");
		this.net.height = this.background.height * .13;
		this.net.width = this.background.width * .13;
		this.netLine.height = 10;
		this.netLine.width = this.net.width;
		game.physics.arcade.enable(this.net);
		game.physics.arcade.enable(this.netLine);
		this.net.body.velocity.x = this.netLine.body.velocity.x = this
				.getRandomInt(-400, -300);
		this.net.body.velocity.y = this.netLine.body.velocity.y = this
				.getRandomInt(100, 200);
		this.net.checkWorldBounds = true;
		this.net.outOfBoundsKill = true;
		this.netLine.checkWorldBounds = true;
		this.netLine.outOfBoundsKill = true
	},
	collideWith : function(e, t) {
		t.kill();
		if (t.key === "gfish") {
			document.getElementById("msgspan").innerHTML = "You got 1 point..!!";
			this.timer = game.time.now;
			this.displaypFish()
		}
		if (t.key === "mfish") {
			document.getElementById("msgspan").innerHTML = "You got 3 points..!!";
			this.timer = game.time.now;
			this.displaybFish()
		}
		if (t.key === "pfish") {
			document.getElementById("msgspan").innerHTML = "You got 2 points..!!";
			this.timer = game.time.now;
			this.displaymFish()
		}
		if (t.key === "stone") {
			this.reduceHealthSound.play();
			document.getElementById("msgspan").innerHTML = "You lost 2 Health..!!";
			this.timer = game.time.now;
			this.displayGoldfish()
		}
		if (t.key === "arrowl") {
			this.reduceHealthSound.play();
			this.arrow.kill();
			document.getElementById("msgspan").innerHTML = "You lost 1 Health..!!";
			this.timer = game.time.now;
			this.displayrFish()
		}
		if (t.key === "goldfish") {
			this.lifeSound.play();
			document.getElementById("msgspan").innerHTML = "You got 4 Health..!!";
			this.timer = game.time.now;
			this.displayfFish()
		}
		if (t.key === "bfish") {
			this.increaseHealthSound.play();
			document.getElementById("msgspan").innerHTML = "You got 1 Health..!!";
			this.timer = game.time.now;
			this.displayArrow()
		}
		if (t.key === "rfish") {
			this.reduceHealthSound.play();
			this.arrow.kill();
			document.getElementById("msgspan").innerHTML = "You lost 2 Health..!!";
			this.timer = game.time.now;
			this.displayStone()
		}
		if (t.key === "ffish") {
			this.lostLifeSound.play();
			document.getElementById("msgspan").innerHTML = "You lost 4 Health..!!";
			this.timer = game.time.now;
			this.displayNet()
		}
		if (t.key === "netLine") {
			this.lostLifeSound.play();
			this.net.kill();
			document.getElementById("msgspan").innerHTML = "You lost 4 Health..!!";
			document.getElementById("msg").style.display = "block";
			this.timer = game.time.now
		}
		step += 1
	},
	jump : function() {
		this.upSound.play();
		this.shark.body.velocity.y = -330;
		this.sharkLine.body.velocity.y = -330;
		if (start) {
			this.shark.body.gravity.y = 850;
			this.sharkLine.body.gravity.y = 850;
			start = false;
			this.displaygFish()
		}
	},
	restartGame : function() {
		step = 0;
		game.state.restart(true, true, "main")
	},
	getRandomInt : function(e, t) {
		return Math.floor(Math.random() * (t - e + 1)) + e
	}
};
game.state.add("main", mainState);
game.state.start("main")
