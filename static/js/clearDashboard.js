document.getElementById("clearBtn").addEventListener("click", clearDashboard);

function clearDashboard(){

    // Packet Table
    document.getElementById("packetTable").innerHTML = "";

    // Alerts
    document.getElementById("alertContainer").innerHTML =
        "<p style='color:#94A3B8;'>Waiting for packets...</p>";

    // Timeline
    document.getElementById("timelineContainer").innerHTML =
        "<p class='timeline-empty'>Waiting for activity...</p>";

    // Search
    document.getElementById("searchInput").value="";

    // Protocol Filter
    document.getElementById("protocolFilter").value="ALL";

    // Reset packet list
    displayedPackets=[];
    resetDashboardCards();

    alert("Dashboard Cleared");

}