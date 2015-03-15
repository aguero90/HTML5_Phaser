
function Level(game) {

    this.game = game;

    this.platforms = {};

    /**
     * @type {Object} - contiene tutti i suoni del livello
     */
    this.sounds = {};
}

Level.prototype = {
    preload: function () {

        this.game.load.image('ground', 'assets/textures/platform.png');

        // carichiamo i suoni relativi al livello
        this.game.load.audio('background', ['assets/audio/Background.mp3', 'assets/audio/Background.ogg']);
        this.game.load.audio('bonus', ['assets/audio/Coin.mp3', 'assets/audio/Coin.ogg']);
    },
    create: function () {

        this.game.stage.backgroundColor = '#222222';

        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;

        var ground = this.platforms.create(0, this.game.world.height - 15, 'ground');
        ground.scale.setTo(2.5, 1);

//        this.world.addRigidBody(this._createPlatform(7, 5, 18, 5.5));
//        this.world.addRigidBody(this._createPlatform(20, 9, 30, 9.5));
//        this.world.addRigidBody(this._createPlatform(0, 10, 7, 10.5));
//        this.world.addRigidBody(this._createPlatform(12, 13, 20, 13.5));
//        this.world.addRigidBody(this._createPlatform(2, 17, 10, 17.5));
//        this.world.addRigidBody(this._createPlatform(18, 17, 25, 17.5));

        var platform1 = this.platforms.create(7 * 30, 5 * 30, 'ground');
        var platform2 = this.platforms.create(20 * 30, 9 * 30, 'ground');
        var platform3 = this.platforms.create(0 * 30, 10 * 30, 'ground');
        var platform4 = this.platforms.create(12 * 30, 13 * 30, 'ground');
        var platform5 = this.platforms.create(2 * 30, 17 * 30, 'ground');
        var platform6 = this.platforms.create(18 * 30, 17 * 30, 'ground');

        platform1.scale.setTo(0.9, 0.5);
        platform2.scale.setTo(1, 0.5);
        platform3.scale.setTo(0.5, 0.5);
        platform4.scale.setTo(0.6, 0.5);
        platform5.scale.setTo(0.6, 0.5);
        platform6.scale.setTo(0.6, 0.5);

        this.platforms.setAllChildren("body.immovable", true);
        this.platforms.setAllChildren("body.allowGravity", false); // tutti i soldi non sono soggetti a forza di gravità



        // aggiungiamo i suoni
        this.sounds.background = this.game.add.audio("background");
        this.sounds.bonus = this.game.add.audio("bonus");

        // Se vogliamo che il suono abbia un fade in dobbiamo aspettare prima che
        // sia stato completato il decoding
        this.sounds.background.onDecoded.add(function () {
            this.sounds.background.fadeIn(5000, true);
        }, this);
    },
    update: function () {

    }
};

Level.prototype.constructor = Level;

