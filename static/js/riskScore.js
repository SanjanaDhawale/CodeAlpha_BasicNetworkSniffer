function updateRiskScore(){

    const total =
        threatStats.Safe +
        threatStats.Monitoring +
        threatStats.Warning;

    if(total===0) return;

    const risk = Math.round(

        (
            threatStats.Warning*2 +
            threatStats.Monitoring
        ) /

        (total*2)

        *100

    );

    document.getElementById("riskPercent").textContent =
        risk + "%";

    const level =
        document.getElementById("riskLevel");

    if(risk<30){

        level.textContent="LOW RISK";

        level.style.color="#22C55E";

    }

    else if(risk<70){

        level.textContent="MEDIUM RISK";

        level.style.color="#FACC15";

    }

    else{

        level.textContent="HIGH RISK";

        level.style.color="#EF4444";

    }

}