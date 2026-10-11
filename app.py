from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Replace these with your real links
LINKS = {
    "tutorial": "https://youtube.com/@Tech_VJ",   # How To Create Free
    "setup":    "https://youtu.be/A-iIh_5WAlk",   # How To Setup Bot
    "try_bot":  "https://t.me/FilezForvadBoT",    # Try Forward Bot
}


@app.route("/")
def home():
    return render_template("index.html", links=LINKS)


@app.route("/health")
def health():
    return jsonify(status="ok")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
