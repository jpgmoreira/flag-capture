
let cppInitialized = false;

const GAME_WIDTH = 10;
const GAME_HEIGHT = 10;

const ACTIONS = ['up', 'down', 'left', 'right'];

const initialState = [0, 0, 9, 9, 0];

const currState = [...initialState];

const computeReward = () => {
	let reward = -0.1;
	if (currState[0] == currState[2] && currState[1] == currState[3]) {
		reward = 100.0;
	}
	return reward;
}

let totalReward = 0.0;

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
	console.log(totalReward, action);

	currState.forEach((element) => {
		sendToProcess(element);
	});
	sendToProcess(reward);
}
