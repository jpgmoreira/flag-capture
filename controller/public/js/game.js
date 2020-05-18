const $deaths = document.getElementById('deaths');
const $flags = document.getElementById('flags');
const $reward = document.getElementById('reward');

let cppInitialized = false;

const GAME_WIDTH = 10;
const GAME_HEIGHT = 10;

const ACTIONS = ['up', 'down', 'left', 'right'];

const initialState = [0, 0, 9, 9, 0];

const currState = [...initialState];

const obstacles = [];

let dead = false;

let totalDeaths = 0;
let totalFlags = 0;
let totalReward = 0.0;

const repositionFlag = () => {
	let row, col;
	do {
		row = getRandomInt(0, (GAME_HEIGHT - 1) / 3) * 3;
		col = getRandomInt(0, (GAME_WIDTH - 1) / 3) * 3;
	} while(obstacles.some(obs => obs[0] == row && obs[1] == col));
	currState[2] = row;
	currState[3] = col;
}

const computeReward = () => {
	let reward = -0.1;
	if (currState[0] == currState[2] && currState[1] == currState[3]) {
		reward = 100.0;
		totalFlags++;
		$flags.innerHTML = totalFlags;
		repositionFlag();
	}
	else if (obstacles.some(obs =>
		obs[0] == currState[0] && obs[1] == currState[1]
	)) {
		totalDeaths++;
		$deaths.innerHTML = totalDeaths;
		dead = true;
		reward = -60.0;
	}
	totalReward += reward;
	$reward.innerHTML = totalReward.toFixed(1);
	return reward;
}

// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
const getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

let totalObstacles = 25;

const generateObstacles = () => {
	let row, col;
	while (obstacles.length < totalObstacles) {
		row = getRandomInt(0, GAME_HEIGHT - 1);
		col = getRandomInt(0, GAME_WIDTH - 1);
		if (row == currState[0] && col == currState[1]) continue;
		if (row == currState[2] && col == currState[3]) continue;		
		obstacles.push([row, col]);
	}
	drawObstacles(obstacles);
}

const computeDanger = () => {
	currState[4] = 0;
	const playerUp = [currState[0], currState[1] - 1];
	const playerDown = [currState[0], currState[1] + 1];
	const playerLeft = [currState[0] - 1, currState[1]];
	const playerRight = [currState[0] + 1, currState[1]];
	if (obstacles.some(obs => obs[0] == playerUp[0] && obs[1] == playerUp[1]))
		currState[4] |= 1;
	if (obstacles.some(obs => obs[0] == playerDown[0] && obs[1] == playerDown[1]))
		currState[4] |= 2;
	if (obstacles.some(obs => obs[0] == playerLeft[0] && obs[1] == playerLeft[1]))
		currState[4] |= 4;
	if (obstacles.some(obs => obs[0] == playerRight[0] && obs[1] == playerRight[1]))
		currState[4] |= 8;
}

let mustUpdateScreen = true;

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
	if (dead) {
		currState[0] = 0;
		currState[1] = 0;
		dead = false;
	}

	const reward = computeReward();

	computeDanger();

	currState.forEach((element) => {
		sendToProcess(element);
	});
	sendToProcess(reward);

	// Update screen:
	if (mustUpdateScreen) {
		updateScreen(currState, dead);
	}
}
