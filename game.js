let generation = null;
let stones = [];
let slider;
let wall = null;
let players_alive;

const POPULATION = 20;
const WALL_GAP = 100;

function setup() {
    createCanvas(380, 580);
    textSize(20);

    // slider
    slider = createSlider(1, 10, 1);

    // Create a population
    generation = new Generation(POPULATION);
    generation.initialize();

    // Create wall
    wall = new Wall(0, WALL_GAP);
    wall.init();
}

function draw() {
    
    for (let n = 0; n < slider.value(); n++) {
        for (let m = 0; m < generation.population; m++) {
            if (generation.species[m].alive) {
                generation.species[m].score += 1;
                generation.species[m].think(wall);
                
                // Check if the player hits the wall
                if (generation.species[m].hit(wall)) {
                    generation.species[m].kill();
                }
            }
        }
        
        // Wall Controls
        wall.fall();
        if (wall.y > height) {
            wall.reset();
        }

        players_alive = generation.species.filter(m => m.alive);        

        //  If all players die, start new generation
        if (players_alive.length === 0) {
            wall.reset();
            wall.velocity = 4;
            wall.gap = WALL_GAP;
            generation.evolve();
            return;
        }

        // Increase speed and decrease the gaap of wall
        if (players_alive[0].score != 0 && players_alive[0].score % 1000 === 0) {
            wall.increase_velocity(1);
            wall.gap -= 1;
        }
    }
    
    // Drawing Stuffs here
    background(0)
    wall.show();
    generation.species.forEach((player) => {
        if (player.alive) {
            player.show();
        }
    });
    
    // Show Stats on the screen
    let txt = `Generation: ${generation.generation}\nPopulation: ${players_alive.length}\nScore: ${players_alive[0].score}\nHigh Score: ${generation.high_score}\nVelocity: ${wall.velocity.toFixed(2)}`;
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