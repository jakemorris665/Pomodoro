const startBtn  = document.getElementById("mainBtn");
const resetBtn  = document.getElementById("resetBtn");
const timerTxt  = document.getElementById("timer");
const breakTime = document.getElementById("breakTime");
const nextBlock = document.getElementById("nextBlock");
const taskNbr   = document.getElementById("taskNbr");
const interval  = 1000;

let workTime = 25;

let intervalId;
let duration;
let state;

const buttonHandler = function() {
    resetBtn.disabled = false;
    var isStarting = true;
    if(startBtn.value == 'start' || startBtn.value == 'resume') {
        var resume = startBtn.value == 'resume' ? true : false;

        startBtn.value = 'break'; 
        startBtn.textContent = "Pause";

        if(!duration) duration = moment.duration(workTime, "minutes");
        if(state == 'break') isStarting = false;

        counter(isStarting, resume);
    } else {
        startBtn.value = 'resume';
        startBtn.textContent = "Resume";

        stopTimer();
    }
}

const counter = function(isStarting, resume) {
    state = isStarting ? 'work' : 'break';

    updateText();
    prepareNextBlock(isStarting, resume);
    if(intervalId) updateTaskNbr();

    intervalId = (setInterval(function() {
        if(duration._milliseconds > 0) {
            duration.subtract(interval, "milliseconds");
            timerTxt.textContent = moment(duration.asMilliseconds()).format('mm:ss');
        } else {
            intervalId = null;
            
            stopTimer();
            counter(!isStarting);
        }
    }, interval));
}

const setTimeForBlock = function(isStarting) {
    if(!intervalId) {
        if(!isStarting) {
            duration = moment.duration(getBreakTime(true), "minutes");
        } else {
            duration = moment.duration(workTime, "minutes");
        }
    }
}

const prepareNextBlock = function(isStarting, resume) {
    setTimeForBlock(isStarting);

    if(resume) {
        if(state == 'work') {
            isStarting = true;
            state = null;
        } else if (state == 'break') {
            isStarting = false;
            state = null;
        }
    }
}

const getBreakTime = function(asNumber) {
    const time = parseInt(breakTime.value);

    if(asNumber) return time
    return moment(moment.duration(time, "minutes").asMilliseconds()).format('mm:ss');
}

const updateText = function() {
    if(state == 'work') {
        nextBlock.textContent = getBreakTime(true) + ' minute break';
    } else {
        nextBlock.textContent = workTime + ' minute work';
    }
}

const updateTaskNbr = function(reset) {
    if(reset) {
        taskNbr.textContent = 1;
    } else {
        taskNbr.textContent = isNaN(parseInt(taskNbr.textContent)) ? 1 : parseInt(taskNbr.textContent) + 1;
    }
}

const stopTimer = function() {
   if(intervalId) clearInterval(intervalId);
};

const init = function(){
    stopTimer();
    intervalId = null;
    state = 'work';

    resetBtn.disabled = true;
    timerTxt.textContent = moment(moment.duration(workTime, "minutes").asMilliseconds()).format('mm:ss');
    startBtn.value = 'start';
    startBtn.textContent = "Start";

    updateTaskNbr(true);
    updateText();
}

init();

startBtn.addEventListener('click', buttonHandler);
resetBtn.addEventListener('click', init);