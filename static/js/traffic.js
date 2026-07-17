let packetsThisSecond = 0;

const trafficChart = new Chart(
    document.getElementById("trafficChart"),
    {

        type: "line",

        data: {

            labels: [],

            datasets: [{

                label: "Packets/sec",

                data: [],

                borderColor: "#06B6D4",

                backgroundColor: "rgba(6,182,212,0.2)",

                fill: true,

                tension: 0.3

            }]

        },

        options: {

            responsive: true,

            animation: false,

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    }
);

// Call this whenever a packet arrives
function updateTrafficChart(){

    packetsThisSecond++;

}

// Every second update the graph
setInterval(function(){

    const now = new Date();
    document.getElementById("packetSpeed").textContent =
    packetsThisSecond;

    trafficChart.data.labels.push(
        now.toLocaleTimeString()
    );

    trafficChart.data.datasets[0].data.push(
        packetsThisSecond
    );

    if(trafficChart.data.labels.length > 15){

        trafficChart.data.labels.shift();

        trafficChart.data.datasets[0].data.shift();

    }

    trafficChart.update();

    packetsThisSecond = 0;

},1000);