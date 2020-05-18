let cppInitialized = false;

const GAME_WIDTH = 10;
const GAME_HEIGHT = 10;

const ACTIONS = ['up', 'down', 'left', 'right'];

const initialState = [0, 0, 9, 9, 0];

const currState = [...initialState];

const obstacles = [];

const repositionFlag = () => {
	currState[2] = getRandomInt(0, (GAME_WIDTH - 1) / 3) * 3;
	currState[3] = getRandomInt(0, (GAME_HEIGHT - 1) / 3) * 3;
}

const computeReward = () => {
	let reward = -0.1;
	if (currState[0] == currState[2] && currState[1] == currState[3]) {
		reward = 100.0;
		repositionFlag();
	}
	return reward;
}

// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
const getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

let totalObstacles = 22;

const generateObstacles = () => {
	let row, col;
	while (obstacles.length < totalObstacles) {
		row = getRandomInt(0, GAME_HEIGHT - 1);
		col = getRandomInt(0, GAME_WIDTH - 1);
		if (row == currState[0] && col == currState[1]) continue;
		if (row == currState[2] && col == currState[3]) continue;		
		obstacles.push([row, col]);
	}
	obstaclesDrawing(obstacles);
}

let totalReward = 0.0;

let mustUpdateScreen = true;
let frameDelay = 100;  // ms.

const runFrame = (actionIndex) => {
	const action = ACTIONS[actionIndex];
	switch(action) {
		case 'up':
			currState[1] = Math.max(currState[1] - 1, 0);
			break;
		case 'down':
			currState[1] = Math.min(currState[1] + 1, GAME_HEIGHT - 1);
			break;
		case 'left':
			currState[0] = Math.max(currState[0] - 1, 0);
			break;
		case 'right':
			currState[0] = Math.min(currState[0] + 1, GAME_WIDTH - 1);
			break;
	}
	const reward = computeReward();

	totalReward += reward;

	currState.forEach((element) => {
		sendToProcess(element);
	});
	sendToProcess(reward);

	// Update screen:
	if (mustUpdateScreen) {
		updateScreen(currState);
	}
}
