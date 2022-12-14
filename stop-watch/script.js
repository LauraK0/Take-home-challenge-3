const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const lapBtn = document.getElementById('lap');
const clearBtn = document.getElementById('clear');
const resetBtn = document.getElementById('reset');
const lapDisplay = document.querySelector("ul");

let hrDisplay = document.getElementById('hour');
let minDisplay = document.getElementById('minute');
let secDisplay = document.getElementById('second');
let csDisplay = document.getElementById('centisecond');

let hr = '00';
let min = '00';
let sec = '00';
let cs = '00';

let timer = false;

/*event listeners*/
document.addEventListener("DOMContentLoaded", getLaps);
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
lapBtn.addEventListener("click", addLap);
clearBtn.addEventListener("click", clearLaps);
resetBtn.addEventListener("click", resetTimer);

function startTimer() {
  startBtn.classList.add("active");
  stopBtn.classList.remove("stopActive");
  if (timer === false) {
    timer = true;
    startTimer = setInterval(() => {
      cs++;
      cs = cs < 10 ? "0" + cs : cs;
      if (cs == 100) {
        sec++;
        sec = sec < 10 ? "0" + sec : sec;
        cs = "0" + 0;
      } else if (sec == 60) {
        min++;
        min = min < 10 ? "0" + min : min;
        sec = "0" + 0;
      } else if (min == 60) {
        hr++;
        hr = hr < 10 ? "0" + hr : hr;
        min = "0" + 0;
      }
      updateDisplay();
    }, 10);
  }
};

function stopTimer() {
  startBtn.classList.remove("active");
  stopBtn.classList.add("stopActive");
  clearInterval(startTimer);
  timer = false;
};

function resetTimer() {
  startBtn.classList.remove("active");
  stopBtn.classList.remove("stopActive");
  clearInterval(startTimer);
  hr = '00';
  min = '00';
  sec = '00';
  cs = '00';
  updateDisplay();
  timer = false;
};

function addLap() {
  let lap = document.createElement("li");
  lap.innerHTML = `${hr}:${min}:${sec}:${cs}`;
  lapDisplay.appendChild(lap);
  saveLap(lap.innerHTML);
};


function clearLaps() {
  lapDisplay.innerHTML = "";
};

function updateDisplay() {
  csDisplay.innerHTML = cs;
  secDisplay.innerHTML = sec;
  minDisplay.innerHTML = min;
  hrDisplay.innerHTML = hr;
}

function getLaps() {
  let laps;
  if (localStorage.getItem('laps') === null) {
    laps = [];
  } else {
    laps = JSON.parse(localStorage.getItem('laps'));
  }
  laps.forEach(function (lap) {
    let newLap = document.createElement("li");
    newLap.innerHTML = `${hr}:${min}:${sec}:${cs}`;
    lapDisplay.appendChild(newLap);
    });
}

function saveLap(lap) {
  let laps;
  if (localStorage.getItem('laps') === null) {
    laps = [];
  } else {
    laps = JSON.parse(localStorage.getItem('laps'));
  }
  laps.push(lap);
  localStorage.setItem('laps', JSON.stringify(laps));
}

function removeLocal() {
  let laps;
  localStorage.removeItem('laps', JSON.stringify(laps));
}




