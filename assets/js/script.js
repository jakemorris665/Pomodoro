const startBtn  = document.getElementById("mainBtn");
const resetBtn  = document.getElementById("resetBtn");
const timer     = document.getElementById("timer");
const breakOptn = document.getElementById("breakTime");
const taskNbr   = document.getElementById("taskNbr");
const next      = document.getElementById("nextBlock");
const interval  = 1000;
const sound = new Audio("assets/media/bell.wav");

let breakTime = 5;
let workTime = 25;
let taskNum = 1;
let duration = moment.duration(workTime, "minutes");
let intervalId;
let working = true;
let breaking = false;

resetBtn.disabled = false;

const breakValue = function(){
    breakTime = Number(breakOptn.value);
    next.textContent = `${breakTime} minute break`
}

const buttonPress = function(){

    if(startBtn.value === "false"){
        countDown();
    } else {
        pause();
    }
}

const countDown = function(){

    startBtn.value = true;
    
    if(!intervalId){
    startBtn.textContent = "Pause";
    intervalId = (setInterval(function(){
        if(duration._milliseconds > 0){
            duration.subtract(interval, "milliseconds");
            timer.textContent = moment(duration.asMilliseconds()).format('mm:ss')
        } else {
            sound.play();
            taskNbr.textContent = `${++taskNum}`;
            clearInterval(intervalId);
            intervalId = null;
            if(working){
                next.textContent =  `${workTime} minutes of work`
                working = false;
                breaking = true;
                duration.add(breakTime, "m");
            } else {
                next.textContent = `${breakTime} minute break`
                working = true;
                breaking = false;
                duration.add(workTime, "m");
            }
            countDown();
        }
        }, interval));
    }
}

const pause = function(){

    startBtn.value = false;
    clearInterval(intervalId);
    intervalId = null;
    startBtn.textContent = "Resume";
}

const reset = function(){

    clearInterval(intervalId);
    intervalId = null;
    startBtn.value = false;
    startBtn.textContent = "Start";
    
    if(working == true){
        duration._milliseconds = 0;
        duration.add(workTime, "m");
    } else {
        duration._milliseconds = 0;
        duration.add(breakTime, "m");
    }
    timer.textContent = moment(duration.asMilliseconds()).format('mm:ss')

}

startBtn.addEventListener('click', buttonPress);
resetBtn.addEventListener('click', reset);
breakOptn.addEventListener('change', breakValue);