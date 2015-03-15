
function Level(game) {

    this.game = game;

    /**
     * @type {Number} - Il numero del livello corrente
     */
    this.number = 1;

    /**
     * @type {Phaser.Tilemap} - La mappa del livello
     */
    this.map = null;

    /**
     * @type {Object} - Oggetto che contiene tutti i layer del livello
     */
    this.layers = {};

    /**
     * @type {Phaser.Group} - Gruppo che contiene le monete del livello
     */
    this.coins = null;

    /**
     * @type {Phaser.Group} - Gruppo che contiene gli item del livello
     */
    this.items = null;

    /**
     * @type {Phaser.Group} - Gruppo che contiene i blocchi del livello
     */
    this.blocks = null;

    /**
     * @type {Phaser.Group} - gruppo contenente tutti i tile che compongono la bandiera della vittoria
     */
    this.flag = null;

    /**
     * @type {Object} - contiene tutti i suoni del livello
     */
    this.sounds = {};

    /*
     * @type {boolean} - per simulare la pausa del gioco/livello
     */
    this.paused = false;
}

Level.prototype = {
    preload: function () {
        // carichiamo la mappa
        this.game.load.tilemap('level_1', 'assets/tilemaps/maps/Level_1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('level_2', 'assets/tilemaps/maps/Level_2.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.spritesheet('tiles', 'assets/tilemaps/tiles/superMarioTiles.png', 16, 16);

        // carichiamo i suoni relativi al livello
        this.game.load.audio('background', ['assets/audio/Background.mp3', 'assets/audio/Background.ogg']);
        this.game.load.audio('pause', ['assets/audio/Pause.mp3', 'assets/audio/Pause.ogg']);
    },
    create: function () {

        // Nota: stiamo assumendo che ogni livello abbia sempre la stessa struttura:
        //      - sia creato usando solo le tile di "tiles" sotto il nome di "Tileset"
        //      - siano presenti 3 layer: Background1, Background2, Collision
        //      - siano presenti 4 objectGroup: Coins, Blocks, Flag, Players
        this.map = this.game.add.tilemap("level_" + this.number);
        this.map.addTilesetImage('Tileset', 'tiles');

        this.game.stage.backgroundColor = '#6888FF'; // al posto di caricare INUTILMENTE tutte la tail del background!
        // this.layers.background1 = this.map.createLayer('Background1');
        this.layers.background2 = this.map.createLayer('Background2');
        this.layers.collision = this.map.createLayer('Collision');
        // this.layers.collision.debug = true;
        // riduciamo la grandezza del mondo alla grandezza del layer
        this.layers.collision.resizeWorld();

        // tutte le tail della mappa con cui si può collidere
        this.map.setCollision([10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 40], true, this.layers.collision);
        // settiamo una callback specifica per la tail numero 11 che rappresenta la moneta
        this.map.setTileIndexCallback(11, player.collectCoin, this.map, this.layers.collision);

        // Coins
        this.coins = this.game.add.group();
        this.coins.enableBody = true;

        // inseriamo nel gruppo coins, tutti quegli elementi del layer di oggetti
        // "Item" che hanno gid 11 e gli applichiamo come texture
        // il frame numero 11 dello spritesheet tiles
        // cioè andiamo a riprendere tutte le monete che in Tiled abbiamo messo
        // nell'objectLayer "Item", li assegniamo al gruppo coins e gli
        // assegnamo la texture adatta ( cioè la tile della moneta )
        //
        // NOTA: per 91 elementi questa funzione ci impiega 20 secondi e
        // blocca il browser per un po'
        this.map.createFromObjects("Coins", 11, "tiles", 10, true, false, this.coins);
        this.coins.setAllChildren("body.immovable", true);
        this.coins.setAllChildren("body.allowGravity", false); // tutti i soldi non sono soggetti a forza di gravità

        // Blocks
        this.blocks = this.game.add.group();
        this.blocks.enableBody = true;
        this.map.createFromObjects("Blocks", 14, "tiles", 13, true, false, this.blocks);
        this.blocks.setAllChildren("body.allowGravity", false);
        this.blocks.setAllChildren("body.immovable", true);

        // Items
        this.items = this.game.add.group();
        this.items.enableBody = true;

        // Flag
        this.flag = this.game.add.group();
        this.flag.enableBody = true;
        this.map.createFromObjects("Flag", 5, "tiles", 4, true, false, this.flag);
        this.map.createFromObjects("Flag", 10, "tiles", 9, true, false, this.flag);
        this.map.createFromObjects("Flag", 17, "tiles", 16, true, false, this.flag);
        this.flag.setAllChildren("body.allowGravity", false);
        this.flag.setAllChildren("body.immovable", true);

        // aggiungiamo i suoni
        this.sounds.background = this.game.add.audio("background");
        this.sounds.pause = this.game.add.audio("pause");

        // Se vogliamo che il suono abbia un fade in dobbiamo aspettare prima che
        // sia stato completato il decoding
        this.sounds.background.onDecoded.add(function () {
            this.sounds.background.fadeIn(5000, true);
        }, this);
    },
    update: function () {

    },
    playerHitBlock: function (player, block) {
        console.log("hitted");
        var item;

        // il blocco cambia texture solo se viene colpito da sotto
        // e se non è stato mai colpito
        if (block.body.touching.down && !block.hitted) {

            block.hitted = true;
            block.loadTexture('tiles', 15);
            item = this.items.create(block.x, block.y - block.height, "tiles", 11);
            item.body.velocity.x = 50;
            item.body.bounce.x = 1;
        }
    },
    getPlayerEntryPoint: function () {
        return {
            x: this.map.objects["Players"][0].x,
            y: this.map.objects["Players"][0].y
        };
    },
    pause: function () {

        // NOTA: non possiamo usare game.paused = true/false
        //       poichè blocca qualsiasi cosa! anche eventi di input ecc
        //       Perciò dobbiamo simulare noi la pausa rimuovendo tutti gli
        //       elementi di interazione

        if (!this.paused) {

            this.sounds.pause.play();

            /*<QUI DOBBIAMO DISABILITARE TUTTO CIO' CHE È INTERATTIVO>*/
            player.sprite.body.enable = false;
            player.sprite.animations.stop();

            for (var sound in this.sounds) {
                if (this.sounds.hasOwnProperty(sound) && this.sounds[sound].key !== "pause" && this.sounds[sound].isPlaying) {
                    this.sounds[sound].pause();
                }
            }

            for (var sound in player.sounds) {
                if (player.sounds.hasOwnProperty(sound) && player.sounds[sound].isPlaying) {
                    player.sounds[sound].pause();
                }
            }


            screens.pauseScreen.show();
            this.paused = true;
        }

    },
    unpause: function () {

        this.sounds.pause.play();

        if (this.paused) {

            /*<QUI DOBBIAMO ABILITARE TUTTO CIO' CHE ABBIAMO DISABILITATO>*/
            player.sprite.body.enable = true;


            for (var sound in this.sounds) {
                if (this.sounds.hasOwnProperty(sound) && this.sounds[sound].paused) {
                    this.sounds[sound].resume();
                }
            }

            for (var sound in player.sounds) {
                if (player.sounds.hasOwnProperty(sound) && player.sounds[sound].paused) {
                    player.sounds[sound].resume();
                }
            }

            screens.pauseScreen.hide();
            this.paused = false;
        }

    },
    destroy: function () {

        for (var sound in this.sounds) {
            if (this.sounds.hasOwnProperty(sound) && this.sounds[sound].isPlaying) {
                this.sounds[sound].stop();
            }
        }

        this.coins.destroy(true);
        this.blocks.destroy(true);
        this.items.destroy(true);
        this.flag.destroy(true);

        for (var layer in this.layers) {
            this.layers[layer].destroy();
        }

        this.map.destroy();
    },
    next: function () {
        this.number++;
        this.destroy();
        this.create();
    }
};

Level.prototype.constructor = Level;

