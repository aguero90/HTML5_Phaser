
// costanti
// =============================================================================
Player.STANDARD_VELOCITY_X = 150;
Player.STANDARD_VELOCITY_Y = -150;
Player.UPGRADED_VELOCITY_X = 200;
Player.UPGRADED_VELOCITY_Y = -200;
Player.STANDARD_DIMENSION = 0.3;
Player.UPGRADED_DIMENSION = 0.4;
Player.COINS_LIMIT = 100;


function Player(game) {

    this.game = game;

    /**
     * Sprite del player
     *
     * @type Phaser.Sprite
     */
    this.sprite = null;

    /**
     * Riferimento al controller del gioco
     *
     * @type Object - An object containing properties: up, down, left and right. Which can be polled like any other Phaser.Key object.
     */
    this.cursors = null;

    /**
     * Questo oggetto contiene le proprietà x e y
     *
     * @type {Point} - Indica il punto di entrata del player
     */
    this.entryPoint = null;

    /**
     * <true> se il player è nello stato di power up
     * <false> altrimenti
     *
     * @type boolean
     */
    this.powerUp = false;

    /**
     * La velocità corrente del player lungo l'asse X
     *
     * @type Number
     */
    this.velocityX = 150;

    /**
     * La velocità corrente del player lungo l'asse Y
     *
     * @type Number
     */
    this.velocityY = -150;

    /**
     * La grandezza del player (dipende se è nello stato di power up o no)
     *
     * @type Number
     */
    this.dimension = 0.3;

    /**
     * Il numero di monete raccolte dal giocatore
     *
     * @type Number
     */
    this.coins = 0;

    /**
     * Il numero di vite del giocatore
     *
     * @type Number
     */
    this.lives = 3;

    /**
     * @type {Object} - contiene tutti i suoni relativi al player
     */
    this.sounds = {};
}

Player.prototype = {
    // metodi
    // =========================================================================
    preload: function () {
        // carichiamo il player
        // NOTA: il path parte dal file in cui viene incluso il JS: index.html
        // NOTA: in Phaser devo avere immagini in potenze di 2 per usare le texture atlas
        // NOTA: Usare sempre l'orientamento verticale delle immagini
        this.game.load.atlas('player', 'assets/textures/atlas/Player.png', 'assets/textures/atlas/Player.json');

        // carichiamo i suoni relativi al player
        this.game.load.audio('1UP', ['assets/audio/1UP.mp3', 'assets/audio/1UP.ogg']);
        this.game.load.audio('coin', ['assets/audio/Coin.mp3', 'assets/audio/Coin.ogg']);
        this.game.load.audio('death', ['assets/audio/Death.mp3', 'assets/audio/Death.ogg']);
        this.game.load.audio('powerUp', ['assets/audio/PowerUp.mp3', 'assets/audio/PowerUp.ogg']);
    },
    create: function () {

        this.entryPoint = level.getPlayerEntryPoint();

        // this.sprite = this.game.add.sprite(32, this.game.world.height - 24 * 4, 'player', "p1_stand.png");
        // per fare in modo che all'inizio il player sia sempre nella posizione definita durante la
        // creazione del livello con Tiled
        this.sprite = this.game.add.sprite(this.entryPoint.x, this.entryPoint.y, 'player', "p1_stand.png");
        this.game.physics.enable(this.sprite);
        this.sprite.body.bounce.y = 0.1;
        this.sprite.scale.setTo(this.dimension);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.body.collideWorldBounds = true;
        // Really handy function for when you are creating arrays of animation data but it's using frame names and not numbers.
        // For example imagine you've got 30 frames named: 'explosion_0001-large' to 'explosion_0030-large'
        // You could use this function to generate those by doing:
        // Phaser.Animation.generateFrameNames('explosion_', 1, 30, '-large', 4);
        // @method Phaser.Animation.generateFrameNames
        // NOTA: dovrebbe funzionare anche per il formato HASH di JSON, ma a quanto pare mi dava problemi
        this.sprite.animations.add("run", Phaser.Animation.generateFrameNames("p1_walk", 1, 11, ".png", 2), 30, true);

        this.cursors = this.game.input.keyboard.createCursorKeys();

        // aggiungiamo i suoni
        this.sounds.oneUP = this.game.add.audio("1UP");
        this.sounds.coin = this.game.add.audio("coin");
        this.sounds.death = this.game.add.audio("death");
        this.sounds.powerUp = this.game.add.audio("powerUp");
    },
    update: function () {

        if (this.cursors.up.isDown) {
            this._jump();
        }

        if (this.cursors.left.isDown) {
            this._runLeft();
        } else if (this.cursors.right.isDown) {
            this._runRight();
        } else {
            this._idle();
        }


        if (this.cursors.down.isDown && this.sprite.body.onFloor()) {
            this._lower();
        }
    },
    _runRight: function () {

        if (this.sprite.scale.x <= 0) {
            // se è rivolto verso sinistra lo giriamo a destra
            this.sprite.scale.x *= -1;
        }

        if (this.sprite.body.onFloor()) {
            this.sprite.animations.play("run");
        }
        this.sprite.body.velocity.x = this.velocityX;
    },
    _runLeft: function () {

        if (this.sprite.scale.x > 0) {
            // se è rivolto verso destra lo giriamo a sinistra
            this.sprite.scale.x *= -1;
        }
        if (this.sprite.body.onFloor()) {
            this.sprite.animations.play("run");
        }
        this.sprite.body.velocity.x = -this.velocityX;
    },
    _jump: function () {

        if (this.sprite.body.onFloor()) {
            this.sprite.body.velocity.y = this.velocityY;
        }

        this.sprite.animations.stop("run");
        this.sprite.frame = 3;
    },
    _lower: function () {

        this.sprite.body.velocity.x = 0;
        this.sprite.frame = 0;
    },
    _idle: function () {

        if (this.sprite.body.onFloor()) {
            this.sprite.body.velocity.x = 0;
            this.sprite.animations.stop("run");
            this.sprite.frame = 4; // puoi usare solo gli indici e non i nomi tipo "p1_stand.png"
        }
    },
    collectCoin: function (player, coin) {

        this.coins++;
        this.sounds.coin.play();

        if (this.coins >= Player.COINS_LIMIT) {

            this.coins = 0;
            this.lives++;
            this.sounds.oneUP.play();
        }

        coin.destroy();
    },
    collectItem: function (player, item) {

        console.log("powerUp");
        this.sounds.powerUp.play();

        if (!this.powerUp) {
            this.velocityX = Player.UPGRADED_VELOCITY_X;
            this.velocityY = Player.UPGRADED_VELOCITY_Y;
            this.dimension = Player.UPGRADED_DIMENSION;
            this.sprite.scale.setTo(this.dimension);
            this.powerUp = true;
        }

        item.destroy();
    },
    die: function () {

        console.log("player.die");
        this.sounds.death.play();

        if (this.lives > 0) {
            this.lives--;
        }

        this._powerDown();
        this.sprite.x = this.entryPoint.x;
        this.sprite.y = this.entryPoint.y;
    },
    setToEntryPoint: function () {
        this.entryPoint = level.getPlayerEntryPoint();
        this.sprite.x = this.entryPoint.x;
        this.sprite.y = this.entryPoint.y;
    },
    bringToTop: function () {
        this.sprite.bringToTop();
    },
    _powerDown: function () {

        this.velocityX = Player.STANDARD_VELOCITY_X;
        this.velocityY = Player.STANDARD_VELOCITY_Y;
        this.dimension = Player.STANDARD_DIMENSION;
        this.sprite.scale.setTo(this.dimension);
        this.powerUp = false;
    }
};

Player.prototype.constructor = Player;











