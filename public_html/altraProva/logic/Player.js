
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
    this.entryPoint = {x: 10, y: 10};

    /**
     * La velocità corrente del player lungo l'asse X
     *
     * @type Number
     */
    this.velocityX = 300;

    /**
     * La velocità corrente del player lungo l'asse Y
     *
     * @type Number
     */
    this.velocityY = -600;

    /**
     * La grandezza del player (dipende se è nello stato di power up o no)
     *
     * @type Number
     */
    this.dimension = 0.2;

    /**
     * Il punteggio del player
     *
     * @type Number
     */
    this.score = 0;

    /**
     * @type {Object} - contiene tutti i suoni relativi al player
     */
    this.sounds = {};
}

Player.prototype = {
    // metodi
    // =========================================================================
    preload: function () {
    },
    create: function () {

        this.sprite = this.game.add.sprite(this.entryPoint.x, this.entryPoint.y, 'atlas', "square");
        this.game.physics.enable(this.sprite);
        this.sprite.scale.setTo(this.dimension);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.body.collideWorldBounds = true;

        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    update: function () {

        if (this.cursors.up.isDown) {
            this._jump();
        } else if (this.cursors.down.isDown) {
            this._lower();
        }

        if (this.cursors.left.isDown) {
            this._runLeft();
        } else if (this.cursors.right.isDown) {
            this._runRight();
        } else {
            this._idle();
        }
    },
    _runRight: function () {
        this.sprite.body.velocity.x = this.velocityX;
    },
    _runLeft: function () {
        this.sprite.body.velocity.x = -this.velocityX;
    },
    _jump: function () {
        if (this.sprite.body.touching.down) {
            this.sprite.body.velocity.y = this.velocityY;
        }
    },
    _lower: function () {
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 1200;
    },
    _idle: function () {
        this.sprite.body.velocity.x = 0;
    },
    collectBonus: function (player, coin) {

        this.score += 10;
//        this.sounds.coin.play();
    }
};

Player.prototype.constructor = Player;











