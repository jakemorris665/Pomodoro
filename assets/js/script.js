const startBtn  = document.getElementById("mainBtn");
const resetBtn  = document.getElementById("resetBtn");
const timer     = document.getElementById("timer");
const interval   = 1000;

resetBtn.disabled = true;
timer.textContent = "00:12";

let breakTime = .1;
let workTime = .2;
let workDuration = moment.duration(workTime, "minutes");
let breakDuration = moment.duration(breakTime, "minutes");
let workTimerOn = false;
let breakTimerOn = false;
let intervalId;
let breakId;

resetBtn.disabled = false;

const countDown = function(){
    
    if(workTimerOn === false && !intervalId){
    workTimerOn = true;
    breakTimerOn = false;
    startBtn.textContent = "Pause";
    intervalId = (setInterval(function(){
        if(workDuration._milliseconds > 0){
            workDuration.subtract(interval, "milliseconds");
            timer.textContent = moment(workDuration.asMilliseconds()).format('mm:ss')
        } else {
            clearInterval(intervalId);
            intervalId = null;
            breakDuration = moment.duration(breakTime, "minutes")
            breakTimer();
            }
        }, interval));
    } else {
        workTimerOn = false;
        clearInterval(intervalId);
        intervalId = null;
        startBtn.textContent = "Resume";
    }
}

const breakTimer = function(){

    if(breakTimerOn == false && !breakId){
        breakTimerOn = true;
        workTimerOn = false;
        timer.textContent = "00:06";
        startBtn.textContent = "Pause";
        breakId = (setInterval(function(){
            if(breakDuration._milliseconds > 0){
                breakDuration.subtract(interval, "milliseconds");
                timer.textContent = moment(breakDuration.asMilliseconds()).format('mm:ss')
            } else {
                clearInterval(breakId);
                breakId = null;
                workDuration = moment.duration(workTime, "minutes");
                countDown();
            }
        }, interval));
    } else {
        breakTimerOn = false;
        clearInterval(breakId);
        breakId = null;
        startBtn.textContent = "Resume";
    }
}

const reset = function(){
    clearInterval(intervalId);
    clearInterval(breakId);

    if(breakTimerOn) {
        breakDuration = moment.duration(breakTime, "minutes");
        timer.textContent = moment(breakDuration.asMilliseconds()).format('mm:ss')
        breakTimerOn = false;
        breakId = null;
        startBtn.textContent = "Start";
    } else if(workTimerOn) {
        workDuration = moment.duration(workTime, "minutes");
        timer.textContent = moment(workDuration.asMilliseconds()).format('mm:ss')
        workTimerOn = false;
        intervalId = null;
        startBtn.textContent = "Start";
    }
}

startBtn.addEventListener('click', countDown);
resetBtn.addEventListener('click', reset);