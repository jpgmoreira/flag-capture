document.getElementById('frame-delay-range').addEventListener('input', (e) => {
	frameDelay = e.target.value;
	document.getElementById('frame-delay-label').innerHTML = e.target.value + 'ms';
});

document.getElementById('update-screen-checkbox').addEventListener('change', (e) => {
	mustUpdateScreen = !mustUpdateScreen;
});
