
function HUD(game) {

    this.game = game;

    /**
     * @type {Phaser.Text} - Il testo che mostra il punteggio del giocatore
     */
    this.coinText = null;

    /**
     * @type {Phaser.Image} - l'icona per il soldi raccolti dal player
     */
    this.coinImage = null;

    /**
     * @type {Phaser.Text} - Il testo che mostra il punteggio del giocatore
     */
    this.lifeText = null;

    /**
     * @type {Phaser.Image} - l'icona per le vite player
     */
    this.lifeImage = null;

    /**
     * @type {Phaser.Button} - Il bottone per la pausa
     */
    this.pauseButton = null;

    /**
     * @type {Phaser.Button} - Il bottone per riprendere dalla pausa
     */
    this.unpauseButton = null;
}

HUD.prototype = {
    preload: function () {
        this.game.load.atlas('HUD', 'assets/textures/atlas/HUD.png', 'assets/textures/atlas/HUD.json');
        this.game.load.atlas('HUD2', 'assets/textures/atlas/HUD2.png', 'assets/textures/atlas/HUD2.json');
    },
    create: function () {

        this.coinImage = this.game.add.image(10, 10, "HUD2", "hud_coins.png");
        this.coinImage.scale.setTo(0.5);
        this.coinImage.fixedToCamera = true;

        this.coinText = this.game.add.text(35, 13, "x" + player.coins, {font: "20px ComicaBDBold", fill: "#ffffff", fontWeight: "bold"});
        this.coinText.fixedToCamera = true;

        this.lifeImage = this.game.add.image(10, 40, "HUD2", "hud_p1Alt.png");
        this.lifeImage.scale.setTo(0.5);
        this.lifeImage.fixedToCamera = true;


        this.lifeText = this.game.add.text(35, 43, "x" + player.lives, {font: "20px ComicaBDBold", fill: "#ffffff", fontWeight: "bold"});
        this.lifeText.fixedToCamera = true;


        this.pauseButton = this.game.add.button(0, 10, "HUD", this.pause, this, "flatDark13.png", "flatDark13.png");
        this.pauseButton.x = this.game.width - this.pauseButton.width - 10; // a 10 px dal margine destro
        this.pauseButton.fixedToCamera = true;
        // il bottone unpause lo posizioniamo fuori dallo schermo
        this.unpauseButton = this.game.add.button(0, 10, "HUD", this.unpause, this, "flatDark15.png", "flatDark15.png");
        this.unpauseButton.x = this.game.width - this.unpauseButton.width - 10;
        this.unpauseButton.fixedToCamera = true;
        this.unpauseButton.kill();
    },
    update: function () {

    },
    updateCoinText: function () {

        this.coinText.text = "x" + player.coins;
        if (player.coins === 0) {
            // se coins è tornato a 0 => probabilmente il player ha
            // guadagnato una vita
            this.updateLifeText();
        }
    },
    updateLifeText: function () {

        this.lifeText.text = "x" + player.lives;
    },
    pause: function () {

        this.pauseButton.kill();
        this.unpauseButton.revive();
        level.pause();
    },
    unpause: function () {

        this.unpauseButton.kill();
        this.pauseButton.revive();
        level.unpause();
    },
    bringToTop: function () {

        this.coinText.destroy();
        this.coinText = this.game.add.text(35, 13, "x" + player.coins, {font: "20px ComicaBDBold", fill: "#ffffff", fontWeight: "bold"});
        this.coinText.fixedToCamera = true;
        this.coinImage.bringToTop();

        this.lifeText.destroy();
        this.lifeText = this.game.add.text(35, 43, "x" + player.lives, {font: "20px ComicaBDBold", fill: "#ffffff", fontWeight: "bold"});
        this.lifeText.fixedToCamera = true;
        this.lifeImage.bringToTop();

        this.unpauseButton.bringToTop();
        this.pauseButton.bringToTop();
    }

};

HUD.prototype.constructor = HUD;
