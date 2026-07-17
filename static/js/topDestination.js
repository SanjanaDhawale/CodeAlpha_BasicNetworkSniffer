const destinationStats = {};

function updateTopDestinations(packet){

    if(!packet.destination) return;

    destinationStats[packet.destination] =
        (destinationStats[packet.destination] || 0) + 1;

    const container =
        document.getElementById("topDestinations");

    container.innerHTML = "";

    Object.entries(destinationStats)

        .sort((a,b)=>b[1]-a[1])

        .slice(0,5)

        .forEach(item=>{

            const row=document.createElement("div");

            row.className="top-ip-row";

            row.innerHTML=`

                <span>${item[0]}</span>

                <strong>${item[1]}</strong>

            `;

            container.appendChild(row);

        });

}