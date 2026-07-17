let totalPacketSize = 0;
let totalPacketCount = 0;

let largestPacket = 0;
let smallestPacket = Infinity;

function updatePacketSize(packet){

    const size = parseInt(packet.size);

    if(isNaN(size)) return;

    totalPacketSize += size;

    totalPacketCount++;

    if(size > largestPacket){

        largestPacket = size;

    }

    if(size < smallestPacket){

        smallestPacket = size;

    }

    document.getElementById("avgPacketSize").textContent =
        Math.round(totalPacketSize / totalPacketCount) + " B";

    document.getElementById("maxPacketSize").textContent =
        largestPacket + " B";

    document.getElementById("minPacketSize").textContent =
        smallestPacket + " B";

}