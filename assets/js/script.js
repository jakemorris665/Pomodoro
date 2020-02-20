const startBtn = document.getElementById("mainBtn");
const resetBtn = document.getElementById("resetBtn");
const timer = document.getElementById("timer");
const interval = 1000;
let time = 25;
let duration = moment.duration(time, "minutes");

timer.textContent = "25:00";

const countDown = function(){
    setInterval(function(){
    duration.subtract(interval, "milliseconds");
    timer.textContent = moment(duration.asMilliseconds()).format('mm:ss')
}, interval)
}

startBtn.addEventListener('click', countDown)