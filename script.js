// Homepage variables
const bodyDisplay = document.querySelector("body");
const container = document.querySelector(".container");
const menubtn = document.querySelector(".menuBar");
const playbtn = document.querySelector(".play");
const resetbtn = document.querySelector(".reset");
const display = document.querySelector(".time");
const currentStateDisplay = document.querySelector(".current-state");


// Modal variables
const modal = document.querySelector(".modal");
const workDecBtn = document.querySelector(".workDecrement");
const workIncBtn = document.querySelector(".workIncrement");
const breakDecBtn = document.querySelector(".breakDecrement");
const breakIncBtn = document.querySelector(".breakIncrement");
const workTimeDisplay = document.querySelector(".work-time");
const breakTimeDisplay = document.querySelector(".break-time");

// Default Values
let workMinutes = 25;
let breakMinutes = 5;

const timer = {
    workTime: workMinutes * 60,
    breakTime: breakMinutes * 60,
    isPaused: true,
    status: "Work",
}

// Homepage section
menubtn.addEventListener("click", function() {
    (!menubtn.classList.contains("active")) ? openMenu() : closeMenu();
});

// Temp values to record whether changes were made during menu 
let tempWork;
let tempBreak;

function openMenu() {
    menubtn.classList.add("active");
    modal.classList.add("active");
    container.classList.add("inactive");
    tempWork = workMinutes;
    tempBreak = breakMinutes;
}

function closeMenu() {
    menubtn.classList.remove("active");
    modal.classList.remove("active");
    container.classList.remove("inactive");

    // Check for changes if so, update display
    if (tempWork !== workMinutes && timer.status === "Work"){
    updateValues();
    }
    else if (tempBreak !== breakMinutes && timer.status === "Break") {
        updateValues();
    }
    else if (tempWork !== workMinutes) {
        updateWorkTime();
    }
    else if (tempBreak !== breakMinutes) {
        updateBreakTime();
    }
}

playbtn.addEventListener("click", function() {
    (!playbtn.classList.contains("paused")) ? pause() : unpause();
});

function pause() {
    playbtn.classList.add("paused");
    timer.isPaused = true;
}

function unpause() {
    playbtn.classList.remove("paused");
    timer.isPaused = false;
}

window.setInterval(function() {
    if (!timer.isPaused && timer.status === "Work") {
        timer.workTime -= 1;
    }
    else if (!timer.isPaused) {
        timer.breakTime -= 1;
    }
    updateDisplay();
}, 1000);

resetbtn.addEventListener("click", function() {
    updateValues();
    pause();
    updateDisplay();
});

function updateValues() {
    timer.workTime = workMinutes * 60;
    timer.breakTime = breakMinutes * 60;
}

function updateBreakTime() {
    timer.breakTime = breakMinutes * 60;
}

function updateWorkTime() {
    timer.workTime = workMinutes * 60;
}

function updateDisplay() {
    let minutes;
    let seconds;
    if (timer.status === "Work") {
        minutes = parseInt(timer.workTime / 60);
        seconds = parseInt(timer.workTime % 60);
    }
    else if (timer.status === "Break") {
        minutes = parseInt(timer.breakTime / 60);
        seconds = parseInt(timer.breakTime % 60);
    }
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = minutes + ":" + seconds;
    document.title = `(${minutes}:${seconds}) Pomodoro - ${timer.status}`;

    if (parseInt(minutes) === 0 && parseInt(seconds) === 0) {
        updateStatus();
        updateDisplay();
    }
    currentStateDisplay.textContent = (timer.status === "Work") ? "Work" : "Break";
}

updateDisplay();


function updateStatus() {
    if (timer.status === "Work") {
        timer.status = "Break";
        bodyDisplay.style.backgroundColor = "#e5d9fd";
        alert("It's time to Break!");
    }
    else {
        timer.status = "Work";
        bodyDisplay.style.backgroundColor = "#ffdfdf";
        updateValues();
        alert("It's time to get back to Work!");
    }
}

// Modal Section
function updateModalDisplay() {
    workTimeDisplay.textContent = workMinutes;
    breakTimeDisplay.textContent = breakMinutes;
}

updateModalDisplay();

workDecBtn.addEventListener("click", function() {
    if (workMinutes > 5) {
        workMinutes -= 5;
        updateModalDisplay()
    }
});

workIncBtn.addEventListener("click", function() {
    if (workMinutes < 60) {
        workMinutes += 5;
        updateModalDisplay()
    }
});

breakDecBtn.addEventListener("click", function() {
    if (breakMinutes > 1) {
        breakMinutes -= 1;
        updateModalDisplay()
    }
});

breakIncBtn.addEventListener("click", function() {
    if (breakMinutes < 60) {
        breakMinutes += 1;
        updateModalDisplay()
    }
});