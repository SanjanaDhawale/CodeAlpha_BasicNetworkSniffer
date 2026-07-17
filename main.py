from banner import show_banner
from packet_sniffer import start_sniffer
from colorama import Fore, init

init(autoreset=True)


def main():
    show_banner()

    try:
        start_sniffer()

    except KeyboardInterrupt:
        print("\n")
        print(Fore.RED + "=" * 60)
        print(Fore.GREEN + " Network Sniffer Stopped Successfully")
        print(Fore.RED + "=" * 60)
        print(Fore.YELLOW + "Thank you for using CodeAlpha Basic Network Sniffer.")
        print()


if __name__ == "__main__":
    main()