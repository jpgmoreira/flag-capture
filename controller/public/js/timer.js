const $timer = document.getElementById('timer');

let lastTime = Date.now();
let seconds = 0, minutes = 0, hours = 0;

const updateTimer = () => {
	let now = Date.now();
	const diff = now - lastTime;

	if (diff > 1000) {
		seconds++;
		lastTime = now;
	}
	else {
		return;
	}

	if (seconds == 60) {
		minutes++;
		seconds = 0;
	}
	if (minutes == 60) {
		hours++;
		minutes = 0;
	}

	const strSeconds = (seconds < 10 ? '0' : '' ) + seconds.toString();
	const strMinutes = (minutes < 10 ? '0' : '' ) + minutes.toString();
	const strHours = (hours < 10 ? '0' : '' ) + hours.toString();

	$timer.innerHTML = `${strHours}:${strMinutes}:${strSeconds}`;
}
