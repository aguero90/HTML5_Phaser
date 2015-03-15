
function HUD(game) {

    this.game = game;

    /**
     * @type {Phaser.Text} - Il testo che mostra il punteggio del giocatore
     */
    this.scoreText = null;
}

HUD.prototype = {
    preload: function () {

    },
    create: function () {

        this.coinText = this.game.add.text(35, 13, "Score: " + player.score, {font: "20px ComicaBDBold", fill: "#ffffff", fontWeight: "bold"});
        this.coinText.fixedToCamera = true;
    },
    update: function () {

    },
    updateScoreText: function () {

        this.coinText.text = "Score: " + player.score;
    }
};

HUD.prototype.constructor = HUD;
