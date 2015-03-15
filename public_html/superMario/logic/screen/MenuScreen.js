
function MenuScreen(game) {

    Screen.call(this, game);
}

MenuScreen.constructor = MenuScreen;
MenuScreen.prototype = Object.create(Screen.prototype, {
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
            this.text = this.game.add.text(this.game.width / 2, this.game.height / 2, "Menu", {font: "16px arial", fill: "#ffffff", fontWeight: "bold"});
            this.text.fixedToCamera = true;
        },
        writable: false,
        enumerable: false,
        configurable: false
    },
    hide: {
        value: function () {
            this.text.destroy();
        },
        writable: false,
        enumerable: false,
        configurable: false
    }
});






