# Evolution Simulation

This is a mini game I am currently working on to learn Genetic Algorithm.

**[DEMO](https://adityathebe.github.io/brick-game-neuroevolution/)**

### Objective 

To avoid the falling walls. 

As the score builds up, the velocity of the falling wall increases and the gap between the two walls decreases.

### Neural Network Structure

**3 - 5 - 1**

### Inputs to Neural Network

Three different parameters is fed into the Neural Netwok.
- Height of the wall / Height of the game screen
- End of the left wall / Width of the screen
- Start of the seond wall / Width of the screen

### Decision
There are 3 decisions to make.
- Move Left if output < 0.33
- Move Right if output < 0.67
- Stay still