const packetSizeBuckets = {
    small: 0,      // 0 - 200 B
    medium: 0,     // 201 - 500 B
    large: 0,      // 501 - 1000 B
    extraLarge: 0  // 1000+ B
};

const packetHistogram = new Chart(
    document.getElementById("packetHistogram"),
    {

        type: "bar",

        data: {

            labels: [

                "0-200 B",
                "201-500 B",
                "501-1000 B",
                "1000+ B"

            ],

            datasets: [{

                label: "Packets",

                data: [0,0,0,0],

                backgroundColor: [

                    "#22C55E",
                    "#38BDF8",
                    "#FACC15",
                    "#EF4444"

                ],

                borderRadius: 6

            }]

        },

        options: {

            responsive: true,

            animation: false,

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    }
);

function updatePacketHistogram(packet){

    const size = parseInt(packet.size);

    if(isNaN(size)) return;

    if(size <= 200){

        packetSizeBuckets.small++;

    }

    else if(size <= 500){

        packetSizeBuckets.medium++;

    }

    else if(size <= 1000){

        packetSizeBuckets.large++;

    }

    else{

        packetSizeBuckets.extraLarge++;

    }

    packetHistogram.data.datasets[0].data = [

        packetSizeBuckets.small,

        packetSizeBuckets.medium,

        packetSizeBuckets.large,

        packetSizeBuckets.extraLarge

    ];

    packetHistogram.update();

}