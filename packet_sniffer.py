from scapy.all import sniff
from scapy.layers.inet import IP
from colorama import Fore
from datetime import datetime

packet_count = 0


def process_packet(packet):
    """
    Process each captured packet and display useful information.
    """

    global packet_count
    packet_count += 1

    if packet.haslayer(IP):

        source_ip = packet[IP].src
        destination_ip = packet[IP].dst
        protocol = packet[IP].proto
        timestamp = datetime.now().strftime("%H:%M:%S")

        payload_size = len(packet.payload)

        print(Fore.CYAN + "-" * 65)
        print(Fore.GREEN + f"Packet #{packet_count}")
        print(Fore.YELLOW + f"Time          : {timestamp}")
        print(Fore.WHITE + f"Source IP     : {source_ip}")
        print(Fore.WHITE + f"Destination IP: {destination_ip}")
        print(Fore.MAGENTA + f"Protocol      : {protocol}")
        print(Fore.BLUE + f"Payload Size  : {payload_size} bytes")
        print(Fore.CYAN + "-" * 65)


def start_sniffer():

    print(Fore.GREEN + "\nStarting Network Sniffer...\n")
    print(Fore.YELLOW + "Press Ctrl + C to stop.\n")

    sniff(prn=process_packet, store=False)