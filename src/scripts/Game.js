import {Scene} from "./Scene";
import {Screen} from "./Screen";
import {Loading} from "./scenes/loading";
import {Control} from "./control/Control";
import {Menu} from "./scenes/menu";
import {GameLevel} from "./scenes/game-level";
import {GameOver} from "./scenes/game-over";


export class Game {
    constructor({width = 1856, height = 832} = {}) {
        this.screen = new Screen(width, height);
        this.screen.loadImages({
            player: '../src/img/Playersprites2.png',
            enemy: '../src/img/enemySprite.png',
            tiles: '../src/img/tiles.png',
            start: '../src/img/menu.png',
            logo: '../src/img/logo.png',
            bullets: '../src/img/bulletssprite.png',
            explosion: '../src/img/bomb-sprite.png',
            enter: '../src/img/Enter-Key.png'
        });
        this.control = new Control();
        this.currentScene = new Loading(this);
        this.currentScene.init();
    }

    changeScene(status) {
        switch (status) {
            case Scene.LOADED:
                return new Menu(this);
            case Scene.START_GAME:
                return new GameLevel(this);
            case Scene.GAME_OVER:
                return new GameOver(this);
            default:
                return new Menu(this);
        }
    }

    frame(time) {
        if (this.currentScene.status !== Scene.WORKING) {
            this.currentScene = this.changeScene(this.currentScene.status);
            this.control = new Control();
            this.currentScene.init();
        }
        this.currentScene.render(time);
        requestAnimationFrame(time => this.frame(time));
    }

    run() {
        requestAnimationFrame(time => this.frame(time));
    }
}