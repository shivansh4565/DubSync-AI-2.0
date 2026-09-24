FROM python:3.11-slim

# Prevent Python from buffering logs
ENV PYTHONUNBUFFERED=1

# Install FFmpeg
RUN apt-get update && apt-get install -y \
    ffmpeg \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install Python packages
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Create folders
RUN mkdir -p uploads temp outputs tts_output

# Expose FastAPI port
EXPOSE 8000

# Run FastAPI
CMD ["uvicorn","main:app","--host","0.0.0.0","--port","8000"]