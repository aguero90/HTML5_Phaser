
function Screen(game) {

    this.game = game;

}

Screen.prototype = {
    preload: function () {

    },
    create: function () {

        this.game.stage.backgroundColor = '#787878';

        this.textToShow = this.game.add.text(this.game.width / 2, this.game.height / 2, this.text, {font: "16px arial", fill: "#ffffff", fontWeight: "bold"});
        this.textToShow.fixedToCamera = true;
    },
    update: function () {

    }
};


Screen.prototype.constructor = Screen;

