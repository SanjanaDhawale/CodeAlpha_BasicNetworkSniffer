// ======================================
// PacketVision Dashboard
// Developed by Sanjana Dhawale
// ======================================

console.log("Dashboard JS Loaded");

// Dashboard State
const dashboardState = {
    totalPackets: 0,
    demoCounter: 1,
    liveCounter: 1,

    tcp: 0,
    udp: 0,
    https: 0,
    dns: 0,
    alerts: 0
};
function resetDashboardStats(){

    dashboardState.totalPackets = 0;

    dashboardState.demoCounter = 1;

    dashboardState.liveCounter = 1;

    dashboardState.tcp = 0;

    dashboardState.udp = 0;

    dashboardState.https = 0;

    dashboardState.dns = 0;

    dashboardState.alerts = 0;

    updateDashboardCards();

    updateProtocolChart();

}

// ==============================
// Update Statistics Cards
// ==============================

function updateDashboardCards() {

    document.getElementById("packetCount").textContent =
        dashboardState.totalPackets.toLocaleString();

    document.getElementById("tcpCount").textContent =
        dashboardState.tcp;

    document.getElementById("udpCount").textContent =
        dashboardState.udp;

    document.getElementById("alertCount").textContent =
        dashboardState.alerts;

}

// ==============================
// Add Live Alert
// ==============================

function addAlert(packet) {

    const container = document.getElementById("alertContainer");

    // Remove "Waiting for packets..." message
    if (container.children.length === 1 &&
        container.textContent.includes("Waiting")) {

        container.innerHTML = "";

    }

    const colors = {

        Safe: "#22C55E",

        Monitoring: "#FACC15",

        Warning: "#EF4444"

    };

    const icons = {

        Safe: "🟢",

        Monitoring: "🟡",

        Warning: "🔴"

    };

    const color = colors[packet.status] || "#22C55E";
    const icon = icons[packet.status] || "🟢";

    const alertCard = document.createElement("div");

    alertCard.className = "alert-card";

    alertCard.innerHTML = `

        <div class="alert-left"
             style="border-left:5px solid ${color};">

            <h4>${icon} ${packet.protocol}</h4>

            <p>
                ${packet.source}
                <br>
                ↓
                <br>
                ${packet.destination}
            </p>

            <small>${packet.time}</small>

        </div>

    `;

    container.prepend(alertCard);

    while (container.children.length > 5) {

        container.removeChild(container.lastChild);

    }

}
function addTimeline(packet){

    const container =
        document.getElementById("timelineContainer");

    if(container.children.length===1 &&
       container.textContent.includes("Waiting")){

        container.innerHTML="";

    }

    const item=document.createElement("div");

    item.className="timeline-item";

    item.innerHTML=`
        <strong>${packet.protocol}</strong><br>
        ${packet.source} → ${packet.destination}
        <br>
        <small>${packet.time}</small>
    `;

    container.prepend(item);

    while(container.children.length>6){

        container.removeChild(container.lastChild);

    }

}
function showPacketDetails(packet){

    const modal = document.getElementById("packetModal");

    const details = document.getElementById("packetDetails");

    details.innerHTML = `

        <div class="detail-row">
            <strong>Time</strong>
            <span>${packet.time}</span>
        </div>

        <div class="detail-row">
            <strong>Source IP</strong>
            <span>${packet.source}</span>
        </div>

        <div class="detail-row">
            <strong>Destination IP</strong>
            <span>${packet.destination}</span>
        </div>

        <div class="detail-row">
            <strong>Protocol</strong>
            <span>${packet.protocol}</span>
        </div>

        <div class="detail-row">
            <strong>Payload Size</strong>
            <span>${packet.size}</span>
        </div>

        <div class="detail-row">
            <strong>Status</strong>
            <span>${packet.status}</span>
        </div>

    `;

    modal.style.display="block";

}

const closeBtn = document.getElementById("closeModal");

if (closeBtn) {

    closeBtn.onclick = function () {

        document.getElementById("packetModal").style.display = "none";

    };

}

window.onclick=function(event){

    const modal=document.getElementById("packetModal");

    if(event.target===modal){

        modal.style.display="none";

    }


}
// ==============================
// Demo / Live Mode Toggle
// ==============================

const demoBtn = document.getElementById("demoMode");
const liveBtn = document.getElementById("liveMode");

if (demoBtn && liveBtn) {

    demoBtn.addEventListener("click", function () {
        isLiveMode = false;
        resetDashboardStats();
        dashboardState.demoCounter = 100;
        document.getElementById("packetTable").innerHTML = "";

        demoBtn.classList.add("active-mode");
        liveBtn.classList.remove("active-mode");
        document.getElementById("modeText").textContent = "DEMO MODE";
        document.getElementById("modeText").style.color = "#FACC15";
        document.getElementById("modeDot").style.background = "#facc15";

        alert("Demo Mode Activated");


    });

    liveBtn.addEventListener("click", function () {
        isLiveMode = true;
        resetDashboardStats();
        dashboardState.liveCounter = 1;
        document.getElementById("packetTable").innerHTML = "";

        liveBtn.classList.add("active-mode");
        demoBtn.classList.remove("active-mode");
        document.getElementById("modeText").textContent = "LIVE CAPTURE";
        document.getElementById("modeText").style.color = "#22C55E";
        document.getElementById("modeDot").style.background = "#22C55E";

        alert("Live Mode Activated");

    });

}
function resetDashboardCards(){

    dashboardState.totalPackets = isLiveMode ? 1 : 100;

    dashboardState.tcp = 0;

    dashboardState.udp = 0;

    dashboardState.https = 0;

    dashboardState.dns = 0;

    dashboardState.alerts = 0;

    updateDashboardCards();

    updateProtocolChart();

}