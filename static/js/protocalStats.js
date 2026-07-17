function updateProtocolStats(){

    document.getElementById("tcpStat").textContent =
        dashboardState.tcp;

    document.getElementById("udpStat").textContent =
        dashboardState.udp;

    document.getElementById("httpsStat").textContent =
        dashboardState.https;

    document.getElementById("dnsStat").textContent =
        dashboardState.dns;

    document.getElementById("httpStat").textContent =
        dashboardState.alerts;

}