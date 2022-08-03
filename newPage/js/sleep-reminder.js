document.getElementById('test-btn').onclick = function() {
	openClock();
}

function openClock() {
	sleepClockReminder.style.visibility = 'visible';
	sleepClockReminder.style.right = '20px';
}

function showSleepClockSetter() {
	indexCoverLayer.style.visibility = 'visible';
	sleepClockSetter.style.top = String((pageHeight-500)/2) + 'px';
	sleepClockSetter.style.visibility = 'visible';
}