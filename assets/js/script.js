const startBtn = document.getElementById("mainBtn");
const resetBtn = document.getElementById("resetBtn");
const timer = document.getElementById("timer");
const interval = 1000;
let time = 25;
let duration = moment.duration(time, "minutes");
let timerOn = false;
let intervalId;

const countDown = function(){
    if(timerOn === false && !intervalId){
        timerOn = true;
        intervalId = (setInterval(function(){
        duration.subtract(interval, "milliseconds");
        timer.textContent = moment(duration.asMilliseconds()).format('mm:ss')
        }, interval));
        startBtn.textContent = "Pause";
    } else {
        timerOn = false;
        clearInterval(intervalId);
        intervalId = null;
        startBtn.textContent = "Resume";
    }
}

startBtn.addEventListener('click', countDown);