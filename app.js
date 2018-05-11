let generation = null;
let stones = [];
let slider;
let wall = null;

function setup() {
    createCanvas(380, 580);
    textSize(20);

    // slider
    slider = createSlider(1, 20, 1, 5);

    // Create a population
    generation = new Generation(20);
    generation.initialize();

    // Create wall
    wall = new Wall(0, 90);
    wall.init();
}

function draw() {
    for (let n = 0; n < slider.value(); n++) {
        for (let m = 0; m < generation.species.length; m++) {
            generation.species[m].gainScore();
            generation.species[m].think(wall);
    
            // Check if the player hits the wall
            if (generation.species[m].hit(wall)) {
                generation.kill_creature(m);
            }
        }

        //  If all players die, start new generation
        if (generation.current_population === 0) {
            wall.reset();
            generation.evolve();
        }

        wall.fall();
        if (wall.y > height + wall.width) {
            wall.reset();
        }
    }
    
    
    // Draw Total Population and Current Generation
    background(0)
    let txt = `Generation: ${generation.generation}\nPopulation: ${generation.current_population}\nScore: ${generation.species[0].score.toFixed(2)}`;
    text(txt, 20, 40);
    wall.show();
    generation.species.forEach((player) => {
        player.show();
    });
}

function keyPressed() {
    if (key === ' ') {
        noLoop()
    }

    if (keyCode === ENTER) {
        loop()
    }
}