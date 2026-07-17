from colorama import Fore, Style, init
from datetime import datetime

init(autoreset=True)

def show_banner():
    print(Fore.CYAN + "=" * 65)
    print(Fore.GREEN + "        🛡️  CodeAlpha - Basic Network Sniffer")
    print(Fore.CYAN + "=" * 65)
    print(Fore.YELLOW + f" Started At : {datetime.now().strftime('%d-%m-%Y %H:%M:%S')}")
    print(Fore.MAGENTA + " Developed By : Sanjana Dhawale")
    print(Fore.CYAN + "=" * 65)
    print()