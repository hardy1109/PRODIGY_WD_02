let startTime;
let elapsedTime = 0;
let timerInterval;
let running = false;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function updateTime() {
  const time = Date.now() - startTime + elapsedTime;

  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  timeDisplay.textContent =
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

function pad(number) {
  return number < 10 ? '0' + number : number;
}

startButton.addEventListener('click', () => {
  if (running) return;
  running = true;
  startTime = Date.now();
  timerInterval = setInterval(updateTime, 10);
});

pauseButton.addEventListener('click', () => {
  if (!running) return;
  running = false;
  clearInterval(timerInterval);
  elapsedTime += Date.now() - startTime;
});

resetButton.addEventListener('click', () => {
  running = false;
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00.00";
  lapsList.innerHTML = "";
});

lapButton.addEventListener('click', () => {
  if (!running) return;
  const lapItem = document.createElement('li');
  lapItem.textContent = timeDisplay.textContent;
  lapsList.appendChild(lapItem);
});
