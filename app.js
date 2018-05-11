let generation = null;
let stones = [];
let slider;
let wall = null;

function setup() {
    createCanvas(380, 580);
    textSize(20);

    // slider
    slider = createSlider(1, 20, 1);

    // Create a population
    generation = new Generation(20);
    generation.initialize();

    // Create wall
    wall = new Wall(0, 100);
    wall.init();
}

function draw() {
    for (let n = 0; n < slider.value(); n++) {
        for (let m = 0; m < generation.species.length; m++) {
            generation.species[m].score += 1;
            generation.species[m].think(wall);
    
            // Check if the player hits the wall
            if (generation.species[m].hit(wall)) {
                generation.kill_creature(m);
            }
        }

        //  If all players die, start new generation
        if (generation.species.length === 0) {
            wall.reset();
            wall.velocity = 4;
            generation.evolve();
        }
        
        wall.fall();
        if (wall.y > height + wall.width) {
            wall.reset();
        }

        // Increase speed of wall with score
        if (generation.species[0].score != 0 && generation.species[0].score % 1000 === 0) {
            wall.increase_velocity(1);
        }
    }
    
    // Show Stats on the screen
    background(0)
    wall.show();
    generation.species.forEach((player) => {
        player.show();
    });

    let txt = `Generation: ${generation.generation}\nPopulation: ${generation.species.length}\nScore: ${generation.species[0].score}\nHigh Score: ${generation.high_score}\nVelocity: ${wall.velocity.toFixed(2)}`;
    text(txt, 20, 40);
    text(`${slider.value()}x`, width - 50, 40)
}

function keyPressed() {
    if (key === ' ') {
        noLoop()
    }

    if (keyCode === ENTER) {
        loop()
    }
}