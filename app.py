from flask import Flask, render_template, jsonify, request
import threading

from packet_capture import start_sniffer, get_packets
from ai_engine import (
    generate_network_summary,
    generate_recommendations,
    chat_with_ai
)

app = Flask(__name__)


# --------------------------
# Start Scapy Sniffer
# --------------------------

sniffer_thread = threading.Thread(
    target=start_sniffer,
    daemon=True
)

sniffer_thread.start()


# --------------------------
# Routes
# --------------------------

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")


# --------------------------
# Live Packet API
# --------------------------

@app.route("/api/live-packets")
def live_packets():
    return jsonify(get_packets())


# --------------------------
# AI Summary API
# --------------------------

@app.route("/api/ai-summary", methods=["GET"])
def ai_summary():

    packets = get_packets()[:20]

    summary = generate_network_summary(packets)

    return jsonify({
        "summary": summary
    })
@app.route("/api/ai-chat", methods=["POST"])
def ai_chat():

    data = request.get_json()

    question = data.get("question", "")

    packets = get_packets()[:20]

    answer = chat_with_ai(question, packets)

    return jsonify({

        "answer": answer

    })


# --------------------------

if __name__ == "__main__":
    app.run(debug=True)