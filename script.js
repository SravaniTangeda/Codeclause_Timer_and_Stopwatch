// Stopwatch
let stopwatchIntervalId;
let stopwatchMilliseconds = 0;
let stopwatchSeconds = 0;
let stopwatchMinutes = 0;
let stopwatchDisplay = document.querySelector(".stopwatch .display");

function startStopwatch() {
	stopwatchIntervalId = setInterval(() => {
		stopwatchMilliseconds += 10;
		if (stopwatchMilliseconds === 1000) {
			stopwatchMilliseconds = 0;
			stopwatchSeconds += 1;
		}
		if (stopwatchSeconds === 60) {
			stopwatchSeconds = 0;
			stopwatchMinutes += 1;
		}
		updateStopwatchDisplay();
	}, 10);
}

function stopStopwatch() {
	clearInterval(stopwatchIntervalId);
}

function resetStopwatch() {
	stopwatchMilliseconds = 0;
	stopwatchSeconds = 0;
	stopwatchMinutes = 0;
	updateStopwatchDisplay();
}

function updateStopwatchDisplay() {
	stopwatchDisplay.querySelector(".minutes").textContent = padNumber(stopwatchMinutes);
	stopwatchDisplay.querySelector(".seconds").textContent = padNumber(stopwatchSeconds);
	stopwatchDisplay.querySelector(".milliseconds").textContent = padNumber(stopwatchMilliseconds);
}

// Timer
let timerIntervalId;
let timerSecondsRemaining = 0;
let timerDisplay = document.querySelector(".timer .display");

function startTimer() {
	const timeInput = document.querySelector("#time-input");
	timerSecondsRemaining = timeInput.value * 60;
	if (timerSecondsRemaining <= 0) {
		alert("Please enter a valid time.");
		return;
	}
	timeInput.disabled = true;
	timerIntervalId = setInterval(() => {
		timerSecondsRemaining -= 1;
		if (timerSecondsRemaining === 0) {
			stopTimer();
			alert("Time's up!");
		}
		updateTimerDisplay();
	}, 1000);
}

function stopTimer() {
	clearInterval(timerIntervalId);
	document.querySelector("#time-input").disabled = false;
}

function resetTimer() {
	stopTimer();
	timerSecondsRemaining = 0;
	updateTimerDisplay();
	document.querySelector("#time-input").value = "";
	document.querySelector("#time-input").disabled = false;
}

function updateTimerDisplay() {
	const minutes = Math.floor(timerSecondsRemaining / 60);
	const seconds = timerSecondsRemaining % 60;
	timerDisplay.querySelector(".minutes").textContent = padNumber(minutes);
	timerDisplay.querySelector(".seconds").textContent = padNumber(seconds);
}

function padNumber(number) {
	if (number < 10) {
		return "0" + number.toString();
	} else {
		return number.toString();
	}
}

// Event Listeners
document.querySelector(".stopwatch .start").addEventListener("click", startStopwatch);
document.querySelector(".stopwatch .stop").addEventListener("click", stopStopwatch);
document.querySelector(".stopwatch .reset").addEventListener("click", resetStopwatch);
document.querySelector(".timer .start").addEventListener("click", startTimer);
document.querySelector(".timer .stop").addEventListener("click", stopTimer);
document.querySelector(".timer .reset").addEventListener("click", resetTimer);