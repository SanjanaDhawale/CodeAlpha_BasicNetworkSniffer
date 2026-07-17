function updateClock(){

    const now = new Date();

    document.getElementById("liveClock").textContent =
        now.toLocaleTimeString();

}

updateClock();

setInterval(updateClock,1000);