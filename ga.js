class Generation {
    constructor(population) {
        this.population = population;
        this.species = [];
        this.saved_species = [];
        this.generation = 1;
        this.high_score = 0;
    }

    clear() {
        this.species = [];
    }

    initialize() {
        for (let i = 0; i < this.population; i++) {
            let y = Math.random() * width
            this.species.push(new Player(y, height - 20, 40));
        }
    }

    kill_creature(index) {
        let killed_creature = this.species.splice(index, 1)[0];
        this.saved_species.push(killed_creature);
    }

    calculate_fitness() {
        let total_score = 0;
        this.saved_species.forEach((creature) => {
            total_score += creature.score;
        });

        // Assign fitness to each creature
        for (let i = 0; i < this.population; i++) {
            this.saved_species[i].fitness = this.saved_species[i].score / total_score;
        }
    }

    poolSelection() {
        let index = 0;
        let r = random(1);
        while (r > 0) {
            let f = this.saved_species[index].fitness;
            r -= f;
            index += 1;
        }

        index -= 1;
        let child = this.saved_species[index].clone();
        child.mutate(mutate_fn);
        return child;
    }

    evolve() {
        let gen_highscore = Math.max.apply(Math, this.saved_species.map(o => o.score));
        this.high_score = gen_highscore > this.high_score ? gen_highscore : this.high_score;
        this.generation += 1;
        this.calculate_fitness();
        for (let i = 0; i < this.population; i++) {
            let selected_creature = this.poolSelection();
            this.species[i] = selected_creature;
        }
        this.saved_species = [];
    }
}


function mutate_fn(x) {
    if (random(1) < 0.1) {
        let offset = randomGaussian() * 0.5;
        let newx = x + offset;
        return newx;
    } else {
        return x;
    }
}