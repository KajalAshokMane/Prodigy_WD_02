let startTime;
let isRunning = false;
let lapCounter = 1;

function startStopwatch() {
    if (!isRunning) {
        startTime = new Date().getTime();
        isRunning = true;
        updateDisplay();
        updateButtons('Pause');
        lapCounter = 1;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        updateButtons('Resume');
    }
}

function resetStopwatch() {
    isRunning = false;
    startTime = null;
    lapCounter = 1;
    updateDisplay();
    updateButtons('Start');
    clearLapTimes();
}

function lap() {
    if (isRunning) {
        const lapTime = calculateLapTime();
        displayLapTime(lapTime);
        lapCounter++;
    }
}

function calculateLapTime() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    startTime = currentTime;
    return formatTime(elapsedTime);
}

function formatTime(time) {
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return (
        pad(hours) + ":" +
        pad(minutes) + ":" +
        pad(seconds) + "." +
        padMilliseconds(milliseconds)
    );
}

function pad(value) {
    return value < 10 ? "0" + value : value;
}

function padMilliseconds(value) {
    return value < 10 ? "00" + value : (value < 100 ? "0" + value : value);
}

function updateDisplay() {
    const display = document.getElementById("display");
    if (isRunning) {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;
        display.textContent = formatTime(elapsedTime);
        requestAnimationFrame(updateDisplay);
    }
}

function updateButtons(action) {
    const startButton = document.querySelector('button:nth-child(1)');
    const pauseButton = document.querySelector('button:nth-child(2)');

    switch (action) {
        case 'Start':
            startButton.textContent = 'Start';
            pauseButton.disabled = true;
            break;
        case 'Pause':
            startButton.textContent = 'Pause';
            pauseButton.disabled = false;
            break;
        case 'Resume':
            startButton.textContent = 'Resume';
            pauseButton.disabled = true;
            break;
    }
}

function displayLapTime(lapTime) {
    const lapTimesContainer = document.getElementById("lap-times");
    const listItem = document.createElement("li");
    listItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapTimesContainer.appendChild(listItem);
}

function clearLapTimes() {
    const lapTimesContainer = document.getElementById("lap-times");
    lapTimesContainer.innerHTML = "";
}
updateDisplay();
updateButtons('Start');
