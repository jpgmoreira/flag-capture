#pragma once

#include <array>

#define STATE_SIZE 5

#define GAME_WIDTH 10
#define GAME_HEIGHT 10
#define Q_INIT_VAL 0.1

#define DANGER_VALUES 16
#define N_ACTIONS 4

#define ALPHA 0.5
#define GAMMA 1.0

typedef std::array<int, STATE_SIZE + 1> state;

enum : int {
	UP,
	DOWN,
	LEFT,
	RIGHT
};

void start();
