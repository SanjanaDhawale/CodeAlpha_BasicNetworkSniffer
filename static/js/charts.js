let protocolChart;

function createProtocolChart() {

    const ctx = document
        .getElementById("protocolChart")
        .getContext("2d");

    protocolChart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: [

                "TCP",

                "UDP",

                "HTTPS",

                "DNS"

            ],

            datasets: [{

                data: [

                    dashboardState.tcp,

                    dashboardState.udp,

                    dashboardState.https,

                    dashboardState.dns

                ],

                backgroundColor: [

                    "#00E5FF",

                    "#22C55E",

                    "#FACC15",

                    "#EF4444"

                ],

                borderWidth: 0

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    labels: {

                        color: "white"

                    }

                }

            }

        }

    });

}

function updateProtocolChart() {

    protocolChart.data.datasets[0].data = [

        dashboardState.tcp,

        dashboardState.udp,

        dashboardState.https,

        dashboardState.dns

    ];

    protocolChart.update("active");
}

window.onload = createProtocolChart;