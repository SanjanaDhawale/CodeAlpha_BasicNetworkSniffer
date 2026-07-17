let capturePaused = false;

document.getElementById("pauseBtn").addEventListener("click", () => {

    capturePaused = true;

});

document.getElementById("resumeBtn").addEventListener("click", () => {

    capturePaused = false;

});