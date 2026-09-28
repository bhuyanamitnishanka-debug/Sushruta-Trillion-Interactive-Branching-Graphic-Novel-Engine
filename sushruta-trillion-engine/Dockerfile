# ==============================================================================
# Sushruta-Trillion: Production Multi-Class Bio-Simulation Engine
# Base Image: Python 3.11 Slim (Minimal attack surface, lightweight footprint)
# ==============================================================================
FROM python:3.11-slim AS base

# Metadata labels
LABEL maintainer="bhuyanamitnishanka@gmail.com" \
      version="3.0.0" \
      description="Sushruta-Trillion Chemo-Informatics & Multi-Class Bio-Simulation Microservice"

# Environment configurations
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app \
    PORT=8000 \
    HOST=0.0.0.0

WORKDIR /app

# Install security certificates & essential runtimes
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install Python requirements
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy source code and database assets
COPY . .

# Create a secure, non-root user with UID 10001
RUN groupadd -g 10001 appgroup && \
    useradd -u 10001 -g appgroup -s /bin/bash -m appuser && \
    chown -R appuser:appgroup /app

# Switch to non-privileged user
USER appuser

# Expose internal microservice port
EXPOSE 8000

# Built-in container health check probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health', timeout=3)" || exit 1

# Production WSGI/ASGI runner with asynchronous workers
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2", "--proxy-headers"]
