
function PauseScreen(game) {

    Screen.call(this, game);
}

PauseScreen.constructor = PauseScreen;
PauseScreen.prototype = Object.create(Screen.prototype, {
    text: {
        value: null,
        writable: true,
        enumerable: true,
        configurable: false
    },
    preload: {
        value: function () {
            // ...
        },
        writable: false,
        enumerable: false,
        configurable: false
    },
    create: {
        value: function () {
            // ...
        },
        writable: false,
        enumerable: false,
        configurable: false
    },
    update: {
        value: function () {
            // ...
        },
        writable: false,
        enumerable: false,
        configurable: false
    },
    show: {
        value: function () {
            // this.text = this.game.add.text(this.game.width / 2, this.game.height / 2, "Pause", {font: "16px arial", fill: "#ffffff", fontWeight: "bold"});
            // this.text.fixedToCamera = true;
            // this.text.inputEnabled = true;
            // this.text.events.onInputUp.add(level.unpause);
        },
        writable: false,
        enumerable: false,
        configurable: false
    },
    hide: {
        value: function () {
            // this.text.destroy();
        },
        writable: false,
        enumerable: false,
        configurable: false
    }
});




