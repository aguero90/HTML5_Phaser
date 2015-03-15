

function Bonus(game) {

    this.game = game;

    /**
     * Sprite del player
     *
     * @type Phaser.Sprite
     */
    this.sprite = null;

    /**
     * Questo oggetto contiene le proprietà x e y
     *
     * @type {Point} - Indica il punto di entrata del player
     */
    this.entryPoint = {x: 300, y: 400};

    /**
     * La grandezza del player (dipende se è nello stato di power up o no)
     *
     * @type Number
     */
    this.dimension = 0.2;

    /**
     * Data creazione bonus
     *
     * @type Number
     */
    this.creationTime = null;
}

Bonus.prototype = {
    // metodi
    // =========================================================================
    preload: function () {

    },
    create: function () {

        this.sprite = this.game.add.sprite(this.entryPoint.x, this.entryPoint.y, 'atlas', "triangle");
        this.game.physics.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.allowGravity = false;
        this.sprite.body.immovable = true;
        this.sprite.scale.setTo(this.dimension);
        this.sprite.anchor.setTo(0, 0);

        this.creationTime = Date.now();

    },
    update: function () {

        // se dopo 5 secondi il bonus non è stato preso lo ricreo
        if (Date.now() - this.creationTime > 5000) {
            this.restore();
        }

    },
    restore: function () {

        this.sprite.kill();

        var isGood = false;
        var rect = new Phaser.Rectangle(0, 0, this.sprite.width, this.sprite.height);

        while (!isGood) {

            isGood = true;
            rect.x = Math.random() * this.game.width;
            rect.y = Math.random() * this.game.height;


            level.platforms.forEach(function (platform) {
                if (rect.intersects(platform.body.sprite.getBounds())) {
                    isGood = false;
                }
            }, this);

        }

        this.sprite.reset(rect.x, rect.y);
        this.creationTime = Date.now();
    }
};

Bonus.prototype.constructor = Bonus;














