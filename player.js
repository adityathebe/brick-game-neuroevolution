class Player {
    constructor(params) {
        this.x = params.x;
        this.y = params.y;
        this.diameter = params.d;
        this.radius = params.d / 2;
        this.score = 0;
        this.alive = true;
        this.color = 255;
        this.shift = params.d / 4 || 5;

        if (params.brain instanceof NeuralNetwork) {
            this.brain = params.brain;
        } else {
            this.brain = new NeuralNetwork(3, 5, 1)
        }
    }

    kill() {
        this.alive = false;
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
        if (y_param <= (this.radius + wall.width)) {
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
        inputs.push((this.x - wall.length) / width);
        inputs.push((wall.r2.x - this.x) / width);

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
        let temp_clone = new Player({ x: this.x, y: this.y, d: this.diameter, brain: this.brain.clone() });   // Make a duplicate of this object
        return temp_clone;
    }

    mutate() {
        function fn(x) {
            if (random(1) < 0.01) {
                let offset = randomGaussian() * 0.5;
                let newx = x + offset;
                return newx;
            }
            return x;
        }

        let ih = this.brain.input_weights.dataSync().map(fn);
        let ih_shape = this.brain.input_weights.shape;
        this.brain.input_weights = tf.tensor(ih, ih_shape);

        let ho = this.brain.output_weights.dataSync().map(fn);
        let ho_shape = this.brain.output_weights.shape;
        this.brain.output_weights = tf.tensor(ho, ho_shape);
    }

    crossover(partner) {
        let parentA_dna = this.brain.input_weights.dataSync();
        let parentB_dna = partner.brain.input_weights.dataSync();
        let parents = [parentA_dna, parentB_dna];

        let child_dna = [];
        for (let i = 0; i < parentA_dna.length; i++) {
            let select = Math.floor(Math.random() * 2);
            child_dna.push(parents[select][i]);
        }
        let child = this.clone();
        child.brain.input_weights = tf.tensor(child_dna, this.brain.input_weights.shape);
        return child
    }
}