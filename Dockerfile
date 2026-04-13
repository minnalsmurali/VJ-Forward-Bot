FROM python:3.10-slim

WORKDIR /VJ-Forward-Bot

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y git gcc && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt
COPY . .
CMD sh -c "gunicorn app:app & python3 main.py"
