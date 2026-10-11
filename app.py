import os
from flask import Flask, render_template, jsonify

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
WEB_DIR = os.path.join(BASE_DIR, "web")

app = Flask(
    __name__,
    template_folder=WEB_DIR,
    static_folder=WEB_DIR,
    static_url_path="/static",
)

BRAND = "@iqbaleditzz"

LINKS = {
    "tutorial": "https://youtu.be/XnBzS4B6_gA",   # How To Create Free
    "setup":    "https://youtu.be/Nm2fdF-nOpU",   # How To Setup Bot
    "try_bot":  "https://t.me/FilezForvadBoT",    # Try Forward Bot
    "brand":    "https://t.me/iqbaleditzz",       # your channel / profile (change if needed)
}


@app.route("/")
def home():
    return render_template("index.html", brand=BRAND, links=LINKS)


@app.route("/health")
def health():
    return jsonify(status="ok")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
