const sourceStats = {};

function updateTopSources(packet){

    if(!packet.source) return;

    sourceStats[packet.source] =
        (sourceStats[packet.source] || 0) + 1;

    const container =
        document.getElementById("topSources");

    container.innerHTML = "";

    Object.entries(sourceStats)

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