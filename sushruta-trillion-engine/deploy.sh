#!/usr/bin/env bash
# ==============================================================================
# Sushruta-Trillion Engine: Local Automated Initialization Runner (deploy.sh)
# Builds and validates the multi-container microservice stack:
# - Frontend: Nginx on port 80 serving interactive multi-class dashboard
# - Backend:  FastAPI on port 8000 executing chemo-informatics computations
# ==============================================================================

set -e

echo "============================================================"
echo "🚀 SUSHRUTA-TRILLION: MULTI-CONTAINER INITIALIZATION RUNNER"
echo "============================================================"

# Step 1: Run 100-Iteration Diagnostic Batch Suite
echo "🧪 [1/4] Running 100-Iteration High-Throughput Batch Tester..."
python3 -m tests.batch_tester

# Step 2: Validate System Core Compilation
echo "🔍 [2/4] Validating Backend Microservice Compilation..."
python3 -c "import main; print('✅ Backend microservice compiles successfully.')"

# Step 3: Check Docker Environment
echo "🐳 [3/4] Checking Docker Environment..."
if ! command -v docker &> /dev/null; then
    echo "⚠️ Docker is not installed or not in PATH. Skipping container boot."
    exit 0
fi

# Step 4: Build & Launch Linked Ecosystem via Docker Compose
echo "🚢 [4/4] Launching Multi-Container Stack (Nginx + FastAPI)..."
if command -v docker-compose &> /dev/null; then
    docker-compose up -d --build
else
    docker compose up -d --build
fi

echo ""
echo "============================================================"
echo "✅ DEPLOYMENT ECOSYSTEM ONLINE & OPERATIONAL"
echo "============================================================"
echo "🌐 Frontend Dashboard: http://localhost:80"
echo "⚡ Backend API Engine: http://localhost:8000"
echo "📖 Swagger API Docs:   http://localhost:8000/docs"
echo "🩺 Health Check Probe: http://localhost:8000/health"
echo "============================================================"
