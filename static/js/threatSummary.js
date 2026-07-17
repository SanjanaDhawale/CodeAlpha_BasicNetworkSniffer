const threatStats = {

    Safe: 0,

    Monitoring: 0,

    Warning: 0

};

function updateThreatSummary(packet){

    if(packet.status in threatStats){

        threatStats[packet.status]++;

    }

    document.getElementById("safeCount").textContent =
        threatStats.Safe;

    document.getElementById("monitorCount").textContent =
        threatStats.Monitoring;

    document.getElementById("warningCount").textContent =
        threatStats.Warning;

}