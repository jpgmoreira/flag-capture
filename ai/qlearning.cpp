#include <iostream>
#include <limits>
#include <map>
#include "qlearning.hpp"
using namespace std;

const double INF = numeric_limits<double>::infinity();

map<state, double> Q;

void initQ() {
	for (int pr = 0; pr < GAME_HEIGHT; pr++)
		for (int pc = 0; pc < GAME_WIDTH; pc++)
			for (int fr = 0; fr < GAME_HEIGHT; fr++)
				for (int fc = 0; fc < GAME_WIDTH; fc++)
					for (int d = 0; d < DANGER_VALUES; d++)
						for (int a = 0; a < N_ACTIONS; a++)
							Q[state{ pr, pc, fr, fc, d, a }] = Q_INIT_VAL;
}

void start() {
	initQ();

	cout << "Initialized Q table." << flush;

	state currState;
	state lastState = { 0, 0, 1, 1, 0, DOWN };

	int prefAction;
	int lastAction = DOWN;

	double reward;

	double maxCurrQ;

	while (true) {
		// 1. Read curr state and reward:
		for (int i = 0; i < STATE_SIZE; i++) {
			cin >> currState[i];
		}
		cin >> reward;

		// 2. Compute highest Q for current state, and preferred action:
		maxCurrQ = -INF;
		for (int i = 0; i < N_ACTIONS; i++) {
			currState.back() = i;
			if (Q[currState] > maxCurrQ) {
				maxCurrQ = Q[currState];
				prefAction = i;
			}
		}

		// 3. Update Q[lastState, lastAction] via value iteration using Bellman's equation:
		lastState.back() = lastAction;
		Q[lastState] += ALPHA * (reward + GAMMA * maxCurrQ - Q[lastState]);

		// 4. Apply epsilon-greedy exploration strategy:


		// 5. Send action to controller. Update variables for next iteration:
		cout << prefAction << flush;
		lastAction = prefAction;
		lastState = currState;
	}

}
