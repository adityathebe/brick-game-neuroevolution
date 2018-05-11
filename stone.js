class Stone {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 20;
        this.velocity = 4;
        this.color = 255;
    }

    show() {
        fill(this.color)
        ellipse(this.x, this.y, this.radius * 2)
    }
    
    fall() {
        this.y += this.velocity;
    }

    reset() {
        this.y = 0;
        this.x = Math.floor(Math.random() * width);
    }
}