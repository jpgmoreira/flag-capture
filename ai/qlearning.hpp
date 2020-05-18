#pragma once

#include <array>

// Number of variables in the state:
// [ robotX, robotY, flagX, flagY, danger].
#define STATE_SIZE 5

// Game dimensions, in tiles:
#define GAME_WIDTH 10
#define GAME_HEIGHT 10

// 4 Actions: Up, Down, Left, Right:
#define N_ACTIONS 4

// 16 possible configurations of dangerous tiles
// on the 4 neighbor tiles of the current robot position.
#define DANGER_VALUES 16

// Q-Learning parameters:
// - Alpha: Learning rate.
// - Gamma: Temporal discount factor.
#define ALPHA 0.5
#define GAMMA 1.0

// STATE_SIZE + 1 because inserting the action inside
// the state simplifies the Q-Table usage in the code.
typedef std::array<int, STATE_SIZE + 1> state;

// The four possible actions:
enum : int {
	UP,
	DOWN,
	LEFT,
	RIGHT
};

// Start the Q-Learning algorithm:
void start();
