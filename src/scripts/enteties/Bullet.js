import {SpriteFactory} from "../view/SpriteFactory";
import {Move} from "../control/Move";
import {AnimationFactory} from "../view/AnimationFactory";

export class Bullet {
    constructor(direction, speed, damage, x, y) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.move = new Move(direction, speed);
        this.lastTime = 0;
        this.active = true;
        this.damage = damage;
        this.collisionShape = {x: 0, y: 0, width: 10, height: 10};
        this.sprites = {};
        const images = new SpriteFactory(
            'bullets',
            64, 64,
            32, 32
        );
        const animationSheet = new AnimationFactory("explosion",
            250, 250,
            62, 62, require('../maps/explosion.json'));
        this.animations = animationSheet.getAnimation("explosion", 20, false);
        this.sprites["left"] = images.getSprite(3, -100, -100);
        this.sprites["right"] = images.getSprite(4, -100, -100);
        this.sprites["down"] = images.getSprite(1, -100, -100);
        this.sprites["up"] = images.getSprite(2, -100, -100);
        this.view = this.sprites[direction];
    }

    update(time) {
        if (this.lastTime === 0) {
            this.lastTime = time;
            return;
        }
        if (this.active) {
            this.move.move(this, time - this.lastTime);
        }
        this.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
        this.lastTime = time;
        if (this.view === this.animations) {
            this.view.update(time);
            this.view.onEnd = () => {
                this.active = false;

            };
        }
    }

    explosion() {
        this.view = this.animations;
    }

}