export class CollisionDetector {
    constructor() {
        this.staticShapes = [];
        this.bodies = [];
        this.bullets = [];
    }

    addStaticShapes(data) {
        data.layers.forEach(layer => {
            if (layer.type == "objectgroup") {
                this.staticShapes.push(...layer.objects);
            }
        });
    }

    addKinematicBody(body) {
        this.bodies.push({
            x: body.x,
            y: body.y,
            obj: body
        });
    }

    update(time) {
        this.checkStatic(time);
    }

    checkStatic(time) {
        this.bodies.forEach(body => {
            let oldX = body.x;
            let oldY = body.y;
            let x = body.obj.x;
            let y = body.obj.y;
            //moving right
            if (x > oldX) {
                this.staticShapes.forEach(shape => {
                    if (
                        ((oldX - 1 + body.obj.collisionShape.x + body.obj.collisionShape.width) < shape.x) &&
                        ((x + body.obj.collisionShape.x + body.obj.collisionShape.width) > shape.x) &&
                        ((y + body.obj.collisionShape.y) < (shape.y + shape.height)) &&
                        ((y + body.obj.collisionShape.y + body.obj.collisionShape.height) > shape.y)
                    ) {
                        x = Math.min(x + body.obj.collisionShape.x + body.obj.collisionShape.width, shape.x)
                            - body.obj.collisionShape.x - body.obj.collisionShape.width;
                    }
                });
            }

            //moving left
            if (x < oldX) {
                this.staticShapes.forEach(shape => {
                    if (
                        ((oldX + 1 + body.obj.collisionShape.x) > (shape.x + shape.width)) &&
                        ((x + body.obj.collisionShape.x) < (shape.x + shape.width)) &&
                        ((y + body.obj.collisionShape.y) < (shape.y + shape.height)) &&
                        ((y + body.obj.collisionShape.y + body.obj.collisionShape.height) > shape.y)
                    ) {
                        x = Math.max(x + body.obj.collisionShape.x, shape.x + shape.width)
                            - body.obj.collisionShape.x;
                    }
                });
            }

            //moving down
            if (y > oldY) {
                this.staticShapes.forEach(shape => {
                    if (
                        ((oldY - 1 + body.obj.collisionShape.y + body.obj.collisionShape.height) < shape.y) &&
                        ((y + body.obj.collisionShape.y + body.obj.collisionShape.height) > shape.y) &&
                        ((x + body.obj.collisionShape.x) < (shape.x + shape.width)) &&
                        ((x + body.obj.collisionShape.x + body.obj.collisionShape.width) > shape.x)
                    ) {
                        y = Math.min(y + body.obj.collisionShape.y + body.obj.collisionShape.height, shape.y) - body.obj.collisionShape.y - body.obj.collisionShape.height;

                    }
                });
            }

            //moving up
            if (y < oldY) {
                this.staticShapes.forEach(shape => {
                    if (
                        ((oldY + 1 + body.obj.collisionShape.y) > (shape.y + shape.height)) &&
                        ((y + body.obj.collisionShape.y) < (shape.y + shape.height)) &&
                        ((x + body.obj.collisionShape.x) < (shape.x + shape.width)) &&
                        ((x + body.obj.collisionShape.x + body.obj.collisionShape.width) > shape.x)
                    ) {
                        y = Math.max(y + body.obj.collisionShape.y, shape.y + shape.height) - body.obj.collisionShape.y;
                    }
                });
            }

            body.x = x;
            body.y = y;
            body.obj.x = x;
            body.obj.y = y;

        });

    }

    bulletOutOfScreen(bullets) {
        if (bullets) {
            for (let i = 0; i < bullets.length; i++) {
                let bullet = bullets[i];
                if ((bullet.x > 1856) || (bullet.x < 0) || (bullet.y > 835) || (bullet.y < 0)) {
                    bullets.splice(i, 1);
                    i--;
                }
            }
        }
    }

    bulletsHitMap(bullets) {
        if (bullets) {
            bullets.forEach(bullet => {

                this.staticShapes.forEach(shape => {
                    if (
                        (bullet.x < shape.x + 60) &&
                        (bullet.x + bullet.collisionShape.width > shape.x) &&
                        (bullet.y < (shape.y + shape.height)) &&
                        (bullet.y + bullet.collisionShape.height > shape.y)
                    ) {
                        bullet.active = false;
                    }
                });
            });
        }
    }

    bulletsHitTanks(entity, bullets) {
        bullets.forEach(bullet => {
            if (
                (bullet.active) &&
                (bullet.x < entity.x + entity.collisionShape.x) &&
                (bullet.x + bullet.collisionShape.width > entity.x) &&
                (bullet.y < entity.y + entity.collisionShape.height) &&
                (bullet.y + bullet.collisionShape.height > entity.y)
            ) {
                bullet.explosion();
                entity.damage = entity.damage + bullet.damage;
            }

        });
    }
}