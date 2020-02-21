const startBtn  = document.getElementById("mainBtn");
const resetBtn  = document.getElementById("resetBtn");
const timer     = document.getElementById("timer");
const breakTime = document.getElementById('breakTime').value || 5;

const interval   = 1000;

let time = 25;
let duration = moment.duration(time, "minutes");
let timerOn = false;
let intervalId;

const countDown = function(){
    if(timerOn === false && !intervalId){
        timerOn = true;
        startBtn.textContent = "Pause";

        intervalId = (setInterval(function(){
            duration.subtract(interval, "milliseconds");
            timer.textContent = moment(duration.asMilliseconds()).format('mm:ss')
        }, interval));
    } else {
        startBtn.textContent = "Continue";
        timerOn = false;
        clearInterval(intervalId);
        intervalId = null;
    }
}

startBtn.addEventListener('click', countDown);