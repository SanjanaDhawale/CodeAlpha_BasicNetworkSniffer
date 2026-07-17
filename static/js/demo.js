console.log("Demo JS Loaded");
let demoPackets = [];
let livePackets = [];
let isLiveMode = false;
let displayedPackets = [];
let currentIndex = 0;

// Load demo data
async function loadDemoData() {
    try {
        const response = await fetch("/static/demo/demo_packets.json");
        demoPackets = await response.json();

        startSimulation();

    } catch (error) {
        console.error("Error loading demo data:", error);
    }
}

// Start simulation
function startSimulation() {

    setInterval(() => {

    if (!isLiveMode) {

        addPacket();

    }

}, 1000);

}

// Add packet to table
function addPacket() {
    if(capturePaused) return;

    const packets = isLiveMode ? livePackets : demoPackets;

if (packets.length === 0) return;

const packet = packets[currentIndex];

    displayedPackets.unshift(packet);

    const table = document.getElementById("packetTable");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${dashboardState.demoCounter++}</td>
        <td>${packet.time}</td>
        <td>${packet.source}</td>
        <td>${packet.destination}</td>
        <td>${packet.protocol}</td>
        <td>${packet.size}</td>
    `;
// 👇 Add these HERE
    row.style.cursor = "pointer";

    row.onclick = function () {
        showPacketDetails(packet);
    };

    table.prepend(row);

    if (table.rows.length > 10) {
        table.deleteRow(10);
    }

    dashboardState.totalPackets++;

    switch (packet.protocol) {

        case "TCP":
            dashboardState.tcp++;
            break;

        case "UDP":
            dashboardState.udp++;
            break;

        case "HTTPS":
            dashboardState.https++;
            break;

        case "DNS":
            dashboardState.dns++;
            break;

        case "HTTP":
            dashboardState.alerts++;
            break;
    }

    if (packet.status === "Warning") {
        dashboardState.alerts++;
    }

    updateDashboardCards();
    updateProtocolChart();
    addAlert(packet);
    addTimeline(packet);

    currentIndex++;

    if (currentIndex >= packets.length) {

    currentIndex = 0;

}
updateTrafficChart();

updatePacketSize(packet);

updatePacketHistogram(packet);

}

updateDashboardCards();

loadDemoData();

const searchInput = document.getElementById("searchInput");

const protocolFilter = document.getElementById("protocolFilter");

function filterPackets(){

    const search =
        document.getElementById("searchInput").value.toLowerCase();

    const protocol =
        document.getElementById("protocolFilter").value;

    const source =
        document.getElementById("sourceFilter").value.toLowerCase();

    const destination =
        document.getElementById("destinationFilter").value.toLowerCase();

    const status =
        document.getElementById("statusFilter").value;

    const rows =
        document.querySelectorAll("#packetTable tr");

    rows.forEach(row=>{

        const cells=row.querySelectorAll("td");

        if(cells.length<6) return;

        const rowSource=cells[2].textContent.toLowerCase();

        const rowDestination=cells[3].textContent.toLowerCase();

        const rowProtocol=cells[4].textContent;

        const text=row.textContent.toLowerCase();

        const matchSearch=
            text.includes(search);

        const matchProtocol=
            protocol==="ALL" ||
            rowProtocol===protocol;

        const matchSource=
            rowSource.includes(source);

        const matchDestination=
            rowDestination.includes(destination);

        // Status filter works only if the row contains status text
        const matchStatus=
            status==="ALL" ||
            text.includes(status.toLowerCase());

        row.style.display=

            matchSearch &&
            matchProtocol &&
            matchSource &&
            matchDestination &&
            matchStatus

            ? ""

            : "none";

    });

}

searchInput.addEventListener(
    "input",
    filterPackets
);

protocolFilter.addEventListener(
    "change",
    filterPackets
);
document.getElementById("sourceFilter")
.addEventListener("input",filterPackets);

document.getElementById("destinationFilter")
.addEventListener("input",filterPackets);

document.getElementById("statusFilter")
.addEventListener("change",filterPackets);

document.getElementById("exportBtn").addEventListener("click", exportCSV);

function exportCSV(){

    let csv = "Time,Source,Destination,Protocol,Size\n";

    displayedPackets.forEach(packet=>{

        csv += `${packet.time},${packet.source},${packet.destination},${packet.protocol},${packet.size}\n`;

    });

    const blob = new Blob([csv], {type:"text/csv"});

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "packetvision_packets.csv";

    a.click();

    URL.revokeObjectURL(url);

}
// ==========================
// Live Mode
// ==========================
let lastPacketTime = "";
async function fetchLivePackets() {

    try {

        const response = await fetch("/api/live-packets");

        const packets = await response.json();

        // Don't process if there are no packets
        if (packets.length === 0) return;

        // Display only the newest packet
       packets.reverse().forEach(packet=>{

    addLivePacket(packet);

});

    }

    catch (err) {

        console.error("Live packet error:", err);

    }

}
setInterval(function(){

    if(isLiveMode){

        fetchLivePackets();

    }

},1000);
// ====================================
// Live Packet Rendering
// ====================================

function addLivePacket(packet){
    if(capturePaused) return;

    console.log("Rendering:", packet);

    const table = document.getElementById("packetTable");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${dashboardState.liveCounter++}</td>
        <td>${packet.time}</td>
        <td>${packet.source}</td>
        <td>${packet.destination}</td>
        <td>${packet.protocol}</td>
        <td>${packet.size}</td>
    `;
    row.style.cursor = "pointer";

row.onclick = function () {
    showPacketDetails(packet);
};
    table.prepend(row);

    if(table.rows.length > 10){

        table.deleteRow(10);

    }
    displayedPackets.unshift(packet);

if (displayedPackets.length > 500) {
    displayedPackets.pop();
}

    dashboardState.totalPackets++;

    switch(packet.protocol){

    case "TCP":
        dashboardState.tcp++;
        break;

    case "UDP":
        dashboardState.udp++;
        break;

    case "HTTPS":
        dashboardState.https++;
        break;

    case "DNS":
        dashboardState.dns++;
        break;

}

    if(packet.status==="Warning") dashboardState.alerts++;

    updateDashboardCards();
updateProtocolChart();
addAlert(packet);
addTimeline(packet);

updateTrafficChart();
updatePacketSize(packet);
updatePacketHistogram(packet);
}