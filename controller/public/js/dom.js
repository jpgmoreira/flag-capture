document.getElementById('frame-delay-range').addEventListener('input', (e) => {
	document.getElementById('frame-delay-label').innerHTML = e.target.value + 'ms';
});

document.getElementById('update-screen-checkbox').addEventListener('change', (e) => {
	mustUpdateScreen = !mustUpdateScreen;
});
