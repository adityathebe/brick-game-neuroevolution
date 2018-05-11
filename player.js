class Player {
    constructor(x, y, d = 20) {
        this.x = x;
        this.y = y;
        this.diameter = d;
        this.radius = d / 2;
        this.score = 0;
        this.fitness = 0;

        this.shift = d / 4 || 5;
        this.velocity = 1;
        this.gravity = 0.6;
        this.color = 255

        // Neural Network
        this.brain = new NeuralNetwork(3, 5, 1)
    }

    show() {
        stroke(255)
        fill(this.color, 100)
        ellipse(this.x, this.y, this.diameter)
    }

    hit(wall) {
        let d1 = this.x - wall.r1.length;
        let d2 = wall.r2.x - this.x;
        let y_param = this.y - wall.y;
        if ( y_param < (this.radius + wall.width ) ) {
            if (d1 < this.radius || d2 < this.radius) {
                return true;
            }
        }
        return false;
    }

    moveLeft() {
        if (this.x >= this.radius) {
            this.x -= this.shift;
        }
    }

    moveRight() {
        if (this.x <= width - this.radius) {
            this.x += this.shift;
        }
    }

    think(wall) {
        let inputs = [wall.y / height];
        inputs.push( (this.x - wall.length) / width);
        inputs.push( (wall.r2.x - this.x) / width );

        let response = this.brain.predict(inputs)[0];
        if (response < 0.33) {
            this.moveLeft();
        } else if (response < 0.67) {
            this.moveRight();
        } else {
            // Stay still;
        }
    }

    clone() {
        let temp_clone = this;
        temp_clone.score = 0;
        return temp_clone;
    }

    mutate(fn) {
        let ih = this.brain.input_weights.dataSync().map(fn);
        let ih_shape = this.brain.input_weights.shape;
        this.brain.input_weights = tf.tensor(ih, ih_shape);
        
        let ho = this.brain.output_weights.dataSync().map(fn);
        let ho_shape = this.brain.output_weights.shape;
        this.brain.output_weights = tf.tensor(ho, ho_shape);
    }
}