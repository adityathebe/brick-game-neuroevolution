let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ "
let target = "ADITYA THEBE LIMBU IS AWESOME";

class DNA {
    constructor() {
        this.genes = [];
        this.fitness = 0;

        for (let i = 0; i < target.length; i++) {
            const element = chars[Math.floor(Math.random() * chars.length)]
            this.genes.push(element);
        }
    }

    measure_fitness() {
        let score = 0;
        for (let i = 0; i < this.genes.length; i++) {
            if (this.genes[i] == target[i]) {
                score++;
            }
        }
        this.fitness = score / target.length;
    }

    crossover(partner) {
        let child = new DNA();
        let midpoint = Math.floor(Math.random() * this.genes.length);

        for (let i = 0; i < this.genes.length; i++) {
            if (i > midpoint) child.genes[i] = this.genes[i];
            else child.genes[i] = partner.genes[i];
        }
        return child;
    }

    mutate(rate) {
        for (let i = 0; i < this.genes.length; i++) {
            if (Math.random() < rate) {
                this.genes[i] = chars[Math.floor(Math.random() * chars.length)]
            }
        }
    }
}

let population = [];
let mating_pool = [];
let population_size = 5000;
let generations = 100;

// Generate Initial Population
for (let i = 0; i < population_size; i++) {
    let d = new DNA()
    d.measure_fitness()
    population.push(d)
}

function main (gen) {
    
    // Create Mating Pool
    for (let i = 0; i < population.length; i++) {
        let n = Math.floor(population[i].fitness * 100);
        for (let j = 0; j < n; j++) {
            mating_pool.push(population[i]);
        }
    }

    population = [];
    for (let i = 0; i < population_size; i++) {
        let parentA = mating_pool[Math.floor(Math.random() * mating_pool.length)]
        let parentB = mating_pool[Math.floor(Math.random() * mating_pool.length)]
        let child = parentA.crossover(parentB);
        child.mutate(0.005)
        child.measure_fitness();
        population.push(child);
    }

    mating_pool = [];

    // Calculate Average Fitness
    let sum = 0;
    population.forEach((p) => {
        sum += p.fitness;
    })
    console.log("Generation", gen, "Fitness:", sum/population_size)
}

for (let i = 0; i < generations; i++) {
    main(i+1)  
}

population.forEach((p) => {
    if (p.fitness > 0.98)
    console.log(p.genes.join(''))
})