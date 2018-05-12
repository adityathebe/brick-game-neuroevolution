class Generation {
    constructor(population) {
        this.population = population;
        this.species = [];
        this.generation = 1;
        this.high_score = 0;
        this.total_score = 0;
    }

    initialize() {
        for (let i = 0; i < this.population; i++) {
            let y = Math.random() * width;
            this.species.push(new Player({ id: i, x: y, y: height - 20, d: 40 }));
            this.species[i].id = i;
        }
    }

    pick_one(range) {
        let index = 0;
        let r = random(range);
        while (r > 0) {
            r -= this.species[index].score;
            index += 1;
        }

        index -= 1;
        return this.species[index].clone();
    }

    evolve() {
        this.generation += 1;
        let gen_highscore = Math.max.apply(Math, this.species.map(o => o.score));
        this.high_score = gen_highscore > this.high_score ? gen_highscore : this.high_score;

        // Calculate Total Score of this Generation
        let total_score = 0;
        this.species.forEach((creature) => {
            total_score += creature.score;
        });

        // Store New Childs Temporarily in this array
        let new_generation = [];

        for (let i = 0; i < this.population; i++) {
            let parentA = this.pick_one(total_score);
            let parentB = this.pick_one(total_score);
            parentA.mutate();
            parentB.mutate();
            // console.log(i + 1, "Parents", parentA.id, parentB.id)

            let child = parentA.crossover(parentB);
            child.mutate();
            child.id = i;
            new_generation.push(child);
        }
        this.species = new_generation
    }
}