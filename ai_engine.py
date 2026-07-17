import google.generativeai as genai
from config import GEMINI_API_KEY

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

# Load model
model = genai.GenerativeModel("gemini-2.5-flash")


def generate_network_summary(packets):

    if not packets:
        return "No network packets are available for analysis."

    prompt = f"""
You are an expert Cyber Security Analyst.

Analyze the following network packets and provide a short professional summary.

Packets:
{packets}

Give:
1. Overall network health
2. Suspicious activity (if any)
3. Most common protocol
4. Brief conclusion

Keep the response under 150 words.
"""

    try:

        response = model.generate_content(prompt)

        return response.text

    except Exception as e:

        return f"AI Error: {str(e)}"


def generate_recommendations(packets):

    if not packets:
        return "No recommendations available."

    prompt = f"""
You are a Cyber Security Expert.

Based on these network packets:

{packets}

Provide 5 practical security recommendations.

Keep them short and in bullet points.
"""

    try:

        response = model.generate_content(prompt)

        return response.text

    except Exception as e:

        return f"AI Error: {str(e)}"


def chat_with_ai(question, packets):

    prompt = f"""
You are PacketVision AI Assistant.

Current Network Packets:

{packets}

User Question:

{question}

Answer professionally and concisely.
"""

    try:

        response = model.generate_content(prompt)

        return response.text

    except Exception as e:

        return f"AI Error: {str(e)}"