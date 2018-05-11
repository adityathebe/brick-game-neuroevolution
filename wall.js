class Wall {
    constructor(y, gap = 50) {
        this.y = y;
        this.gap = gap;
        this.width = 40;
        this.color = 255;
        this.velocity = 4;
        this.length = random(1) * width * 0.5;
    }

    init() {
        this.r1 = {
            x: 0,
            length: this.length
        }

        this.r2 = {
            x: this.length + this.gap,
            length: width - this.length - this.gap,
        }
    }

    show() {
        fill(this.color, 100)
        rect(this.r1.x, this.y, this.r1.length, this.width);
        rect(this.r2.x, this.y, this.r2.length, this.width);
    }

    fall() {
        this.y += this.velocity;
    }

    reset() {
        this.y = 0;
        this.length = random(1) * width * 0.5;
        this.init();
    }
}