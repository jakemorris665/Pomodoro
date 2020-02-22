const startBtn  = document.getElementById("mainBtn");
const resetBtn  = document.getElementById("resetBtn");
const timer     = document.getElementById("timer");
const breakTime = 5;
resetBtn.disabled = true;

const interval   = 1000;

let time = 25;
let duration = moment.duration(time, "minutes");
let timerOn = false;
let intervalId;

const countDown = function(){
    if(timerOn === false && !intervalId){
        resetBtn.disabled = false;
        timerOn = true;
        startBtn.textContent = "Pause";

        intervalId = (setInterval(function(){
            duration.subtract(interval, "milliseconds");
            timer.textContent = moment(duration.asMilliseconds()).format('mm:ss')
        }, interval));
    } else {
        timerOn = false;
        clearInterval(intervalId);
        intervalId = null;
        startBtn.textContent = "Resume";
    }
}

const reset = function(){
    clearInterval(intervalId);
    duration = moment.duration(time, "minutes");
    timer.textContent = moment(duration.asMilliseconds()).format('mm:ss')
    startBtn.textContent = "Start";
    resetBtn.disabled = true;
    timerOn = false;
    intervalId = null;  
}

startBtn.addEventListener('click', countDown);
resetBtn.addEventListener('click', reset);