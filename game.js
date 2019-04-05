/*global Phaser*/
/*jslint sloppy:true, browser: true, devel: true, eqeq: true, vars: true, white: true*/
var game;

function makeApple(group, offsetX, newOffsetX) {
    var bottom = group.create(0, 100, 'apple');
    bottom.anchor.set(0, 1);
    var spacing = 100;

    function addPhysics(apple) {
        game.physics.enable(apple);
        apple.body.immovable = true;
        apple.body.allowGravity = false;
        apple.body.velocity.x = -200;
    }

    function positionApple(bottom) {
        var center = game.rnd.integerInRange(60, game.world.height,- 60);
        var left = game.world.width;
        bottom.x = left;
        bottom.y = center + spacing;
    }
    addPhysics(bottom);
    positionApple(bottom);
    bottom.x += offsetX;
    bottom.events.onOutOfBounds.add(function() {
        if (bottom.x < 0) {
            positionApple(bottom);
            bottom.x += newOffsetX;
        }

    });

}


   function makeBanana(group, offsetX, newOffsetX) {
    var bottom = group.create(0, 0, 'banana');
    bottom.anchor.set(0, 1);
    var spacing = 100;

    function addPhysics(banana) {
        game.physics.enable(banana);
        banana.body.immovable = true;
        banana.body.allowGravity = false;
        banana.body.velocity.x = -500;
    }

    function positionBanana(bottom) {
        var center = game.rnd.integerInRange(60, game.world.height - 60);
        var left = game.world.width;
        bottom.x = left;
        bottom.y = center + spacing;
    }
    addPhysics(bottom);
    positionBanana(bottom);
    bottom.x += offsetX;
    bottom.events.onOutOfBounds.add(function() {
        if (bottom.x < 0) {
            positionBanana(bottom);
            bottom.x += newOffsetX;
        }

    });

}

var mainState = {
    // Here we add all the functions we need for our state
    // For this project we will just have 3 functions
    preload: function() {
        // This function will be executed at the beginning
        // That's where we load the game's assets
        game.load.spritesheet('yoshi', 'images/yoshii.png', 40, 40);
        game.load.image('fire', 'images/fire.png');
        game.load.image('water', 'images/water.png');
        game.load.image('fire', 'images/fire-upsidedown.png');
        game.load.image('banana', 'images/bananar.png');
        game.load.image('background1', 'images/background_china.png');
        game.load.image('background2', 'images/background_desert.png');
        game.load.image('background3', 'images/background_apple.png');
        game.load.image('background4', 'images/background_city1.png');
        game.load.image('background5', 'images/background_city2.png');
        game.load.image('floor', 'images/floor_china.png');
        game.load.image('apple', 'images/poison.png');
        game.load.image('gameover','images/gameover.png');
        
    },



    create: function() {
        this.bg = game.add.tileSprite(0, 0, 1000, 600, 'background1');
        game.physics.enable(this.bg);
        this.bg.body.allowGravity = false;
        this.bg1 = game.add.tileSprite(game.world.width, 0, 1000, 600, 'background2');
        game.physics.enable(this.bg1);
        this.bg1.body.allowGravity = false;
        this.bg2 = game.add.tileSprite(game.world.width, -100, 1000, 600, 'background3');
        game.physics.enable(this.bg2);
        this.bg2.body.allowGravity = false;
        this.bg3 = game.add.tileSprite(game.world.width, 0, 1000, 600, 'background4');
        game.physics.enable(this.bg3);
        this.bg3.body.allowGravity = false;
        this.bg3.tileScale.set(1.4);
        this.bg4 = game.add.tileSprite(game.world.width, 0, 1000, 600, 'background5');
        game.physics.enable(this.bg4);
        this.bg4.body.allowGravity = false;
        this.bg4.tileScale.set(1.4);
        

    

        

        this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'yoshi');
        this.sprite.scale.set(1.2);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.animations.add('flap', [5, 6, 7, 8, 9], 10, true);
        this.sprite.animations.play('flap');
        game.physics.enable(this.sprite);
        game.physics.arcade.gravity.y = 500;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.world.height = 100;
        this.applesprite = game.add.sprite(200, 200,'apple');
        this.bananasprite = game.add.sprite(game.world.centerX, game.world.centerY, 'banana');
        this.spaceKey=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        
        
        this.floor = game.add.tileSprite(0, game.world.height - 40, game.world.width, game.world.height, null,'floor');
        this.floor.tileScale.set(0.5);

       
        
        
        this.obstacles = game.add.group();
        this.obstacles.add(this.bananasprite);
         var bananaSpacing = 200;
        var numBanana = 40;
        for (var i = 0; i < numBanana; i += 1) {
        makeBanana(this.obstacles,i * bananaSpacing);
        }
       

        game.physics.enable(this.floor);
        this.floor.body.immovable = true;
        this.floor.body.allowGravity = false;

       
       var appleSpacing = 400;
        var numApple = 40;
       for (var i = 0; i < numApple; i += 1) {
        makeApple(this.obstacles, i * appleSpacing);
        }
        

       game.physics.enable(this.floor);
       this.floor.body.immovable = true;
       this.floor.body.allowGravity = false;


    
    },





    update: function() {
        // This function is called 60 times per second
        // It contains the game's logic

         this.floor.tilePosition.x -= 200;
        if (game.physics.arcade.collide(this.sprite, this.floor)) {
            //game.paused = true;

        }
         this.floor.tilePosition.x -= 20;
        if (game.physics.arcade.collide(this.sprite, this.obstacles)) {
            game.paused = true;
            game.add.image(400, 150, 'gameover');
        }
        
        if (this.spaceKey.justDown) {
            this.sprite.body.velocity.y = -180;
        }
        this.bg.body.velocity.x = -200;
        if (this.bg.body.position.x <= 0){
            this.bg1.body.velocity.x = -200;
        }
        if (this.bg1.body.position.x <= 5){
            this.bg2.body.velocity.x = -200;
        }
        if (this.bg2.body.position.x <= 5){
            this.bg3.body.velocity.x = -200;
        }
        if (this.bg3.body.position.x <= 5){
            this.bg4.body.velocity.x = -200;
        }
        this.floor.body.velocity.x = -200;
       
       
        
    }

};

// Initialize Phaser
game = new Phaser.Game(1000, 500, Phaser.AUTO, 'gameDiv');

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', mainState);
game.state.start('main');
     