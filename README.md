# 🛡️ PacketVision – Real-Time Network Traffic Analysis Dashboard

PacketVision is a web-based network monitoring application developed as part of the **CodeAlpha Cyber Security Internship**. The project captures live network packets, analyzes network traffic in real time, and presents the information through an interactive dashboard.

The primary goal of this project is to demonstrate how packet sniffing works using Python while providing a simple and user-friendly interface for visualizing network activity.

---

## Project Overview

Traditional packet sniffing tools often display raw packet information in a terminal, making it difficult for beginners to interpret the data. PacketVision addresses this by combining packet capture with a clean web dashboard that updates in real time.

The application captures packets using **Scapy**, processes the data on the backend with **Flask**, and displays meaningful statistics and visualizations in the browser.

---

## Features

- Live network packet capture
- Demo mode for showcasing the application without live traffic
- Real-time dashboard updates
- Protocol-wise packet analysis (TCP, UDP, ICMP, etc.)
- Live traffic monitoring graph
- Packet size distribution statistics
- Packet histogram visualization
- Search packets by IP address or protocol
- Filter captured packets
- Export captured packets as CSV
- Pause and resume packet capture
- Clear captured packet history
- Detailed packet information popup

---

## Technologies Used

### Backend
- Python
- Flask
- Scapy

### Frontend
- HTML5
- CSS3
- JavaScript
- Chart.js

---

## Project Structure

```
PacketVision/
│
├── static/
│   ├── css/
│   ├── js/
│
├── templates/
│   └── dashboard.html
│
├── app.py
├── packet_capture.py
├── config.py
├── requirements.txt
└── README.md
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/SanjanaDhawale/CodeAlpha_BasicNetworkSniffer.git
```

### 2. Navigate into the project

```bash
cd CodeAlpha_BasicNetworkSniffer
```

### 3. Create a virtual environment

```bash
python -m venv .venv
```

### 4. Activate the virtual environment

**Windows**

```bash
.venv\Scripts\activate
```

**Linux / macOS**

```bash
source .venv/bin/activate
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

### 6. Run the application

```bash
python app.py
```

Open your browser and visit:

```
http://127.0.0.1:5000
```

---

## How It Works

1. Scapy listens to the selected network interface.
2. Captured packets are processed by the Flask backend.
3. Relevant packet information is extracted.
4. The frontend fetches packet data at regular intervals.
5. Charts and statistics update automatically to reflect live network activity.

---

## Screenshots

```
<img width="1325" height="892" alt="image" src="https://github.com/user-attachments/assets/ce8950d6-201b-48b1-a41a-e9ebb6542ef7" />
<img width="1891" height="897" alt="image" src="https://github.com/user-attachments/assets/115f6844-433a-418d-9f58-24093e95dbe0" />
<img width="1887" height="896" alt="image" src="https://github.com/user-attachments/assets/1cfc0aba-d820-4816-b5c8-c8998ade71a9" />
```

## Learning Outcomes

Through this project, I gained practical experience with:

- Network packet capture using Scapy
- Understanding common network protocols
- Building REST APIs with Flask
- Real-time data visualization
- Frontend and backend integration
- Git and GitHub version control
- Structuring a complete Python project

---

## Future Improvements

Some features that can be added in future versions include:

- Threat detection
- Network device discovery
- Geographic IP visualization
- AI-assisted traffic analysis
- Authentication and user management

---

## Author

**Sanjana Dhawale**

Computer Science Engineering (AI & ML)

GitHub: https://github.com/SanjanaDhawale

LinkedIn: *linkedin.com/in/sanjana-dhawale-5a388928b

---

## Acknowledgement

This project was developed as part of the **CodeAlpha Cyber Security Internship** to strengthen practical understanding of network traffic analysis and packet sniffing using Python.
