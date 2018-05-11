/* Simple Neural Network library that can only create neural networks of exactly 3 layers */

class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes) {
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        // Initialize random weights
        this.input_weights = tf.randomNormal([this.input_nodes, this.hidden_nodes]);
        this.output_weights = tf.randomNormal([this.hidden_nodes, this.output_nodes]);
    }

    predict(user_input) {
        /* Takes a 1D array */
        let normalized_output = null;
        tf.tidy(() => {
            let input_layer = tf.tensor(user_input, [1, this.input_nodes]);
            let hidden_layer = input_layer.matMul(this.input_weights);
            let output_layer = hidden_layer.matMul(this.output_weights);
            normalized_output = output_layer.sigmoid().dataSync();
        });
        return normalized_output;
    }

    copy() {
        return this;
    }

    mutate(val) {
        this.input_weights = this.input_weights.mul(val)
        this.output_weights = this.output_weights.mul(val)
    }
}