from scapy.all import sniff
from datetime import datetime

captured_packets = []


def process_packet(packet):

    try:

        # --------------------------
        # Detect Protocol
        # --------------------------

        protocol = "OTHER"

        if packet.haslayer("TCP"):
            protocol = "TCP"

        elif packet.haslayer("UDP"):
            protocol = "UDP"

        elif packet.haslayer("ICMP"):
            protocol = "ICMP"

        # --------------------------
        # Source & Destination
        # --------------------------

        source = packet.src if hasattr(packet, "src") else "Unknown"
        destination = packet.dst if hasattr(packet, "dst") else "Unknown"

        # --------------------------
        # Packet Size
        # --------------------------

        packet_size = len(packet)

        # --------------------------
        # Threat Detection
        # --------------------------

        status = "Safe"

        if protocol == "OTHER":
            status = "Monitoring"

        if packet_size > 1200:
            status = "Monitoring"

        if packet_size > 1500:
            status = "Warning"

        if destination == "255.255.255.255":
            status = "Warning"

        # --------------------------
        # AI Threat Detection
        # --------------------------

        ai_result = {
            "level": "LOW",
            "confidence": 95,
            "reason": "Normal network traffic detected."
        }

        if status == "Monitoring":
            ai_result = {
                "level": "MEDIUM",
                "confidence": 72,
                "reason": "Unusual packet size or protocol detected."
            }

        elif status == "Warning":
            ai_result = {
                "level": "HIGH",
                "confidence": 91,
                "reason": "Potential suspicious network activity."
            }

        # --------------------------
        # Store Packet
        # --------------------------

        packet_info = {

            "time": datetime.now().strftime("%H:%M:%S"),

            "source": source,

            "destination": destination,

            "protocol": protocol,

            "size": f"{packet_size} B",

            "status": status,

            "ai": ai_result

        }

        captured_packets.insert(0, packet_info)

        if len(captured_packets) > 50:
            captured_packets.pop()

    except Exception as e:
        print("Packet Error:", e)


# --------------------------
# Start Packet Sniffer
# --------------------------

def start_sniffer():

    sniff(
        prn=process_packet,
        store=False
    )


# --------------------------
# Return Captured Packets
# --------------------------

def get_packets():

    return captured_packets