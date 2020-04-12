export class Sprite {
    constructor(imageName, sourceX, sourceY, width, height, x = 0, y = 0) {
        this.imageName = imageName;
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }

    setXY(x, y) {
        this.x = x;
        this.y = y;
    }
}