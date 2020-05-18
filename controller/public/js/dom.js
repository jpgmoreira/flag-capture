const $frameDelayLabel = document.getElementById('frame-delay-label');
const $screenCheckbox = document.getElementById('update-screen-checkbox');

$frameDelayRange.addEventListener('input', (e) => {
	$frameDelayLabel.innerHTML = e.target.value + 'ms';
});

$screenCheckbox.addEventListener('change', (e) => {
	mustUpdateScreen = !mustUpdateScreen;
});
