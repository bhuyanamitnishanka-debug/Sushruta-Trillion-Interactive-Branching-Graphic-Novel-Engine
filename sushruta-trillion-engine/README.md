# Sushruta-Trillion: Computational Chemo-Informatics & Multi-Class Bio-Simulation Engine

[![CI/CD Pipeline](https://github.com/bhuyanamitnishanka-debug/sushruta-trillion-engine/actions/workflows/deploy.yml/badge.svg)](https://github.com/bhuyanamitnishanka-debug/sushruta-trillion-engine/actions)
[![Docker Ready](https://img.shields.io/badge/Docker-Containerized-blue.svg?logo=docker&logoColor=white)](Dockerfile)
[![Python Version](https://img.shields.io/badge/Python-3.10%20%7C%203.11-blue.svg?logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110%2B-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Pydantic v2](https://img.shields.io/badge/Pydantic-v2.6-E92063.svg?logo=pydantic&logoColor=white)](https://pydantic.dev)
[![Code Style: Flake8](https://img.shields.io/badge/Code%20Style-Flake8-black.svg)](https://flake8.pycqa.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Sushruta-Trillion** is an enterprise-grade, containerized chemo-informatics microservice backend engineered to simulate, validate, and track complex multi-layered hybrid pharmacology models. By pairing strict mathematical validation curves with multi-threaded asynchronous routing pipelines, the engine models real-time drug-herb interactions across diverse biological layers simultaneously.

---

## 🚀 Core Enterprise Features

* **Multi-Class Routing Engine:** Dynamically routes complex chemical vectors into dedicated processing pipelines (**Neuro-Sleep Regulation, Cardiovascular Prophylaxis, and Computational Oncology**).
* **Automated Boundary Interceptor & Safety Gates:** Built-in validation algorithms check biochemical metrics against dangerous concentrations, triggering automated alert markers (`CRITICAL_TOXICITY`, `CRITICAL_HEMORRHAGE_RISK`, `CRITICAL_BONE_MARROW_SUPPRESSION`).
* **Atomic Data Persistence Layer:** Uses a safe, atomic file-based JSON database connector with full transaction logging, network timestamps, and automated dashboard analytics.
* **FastAPI Asynchronous Architecture:** Fully typed REST API built on Pydantic validation frameworks, self-documenting via interactive OpenAPI/Swagger web layers.
* **Production DevOps & CI/CD Readiness:** Ships with an automated 100-run boundary testing suite (`batch_tester.py`), comprehensive pytest coverage, non-root Docker deployment container, and automated GitHub Actions CI/CD workflows.

---

## 🏗️ System Architecture & Subsystem Grids

```
[ REST API Client Ingestion Request ]
                 │
                 ▼
┌─────────────────────────────────┐
│     Pydantic Ingestion Gate     │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│     FastAPI Dynamic Router      │
└────────────────┬────────────────┘
                 │
     ┌───────────┼───────────┐
     ▼           ▼           ▼
┌───────────┐┌───────────┐┌───────────┐
│Neuro-Sleep││Cardio-Clot││ Oncology  │
│ Pipeline  ││ Pipeline  ││ Pipeline  │
└─────┬─────┘└─────┬─────┘└─────┬─────┘
      │           │           │
      └───────────┼───────────┘
                  │
                  ▼
┌─────────────────────────────────┐
│   Boundary Interceptor Guard    │
│  - CRITICAL_TOXICITY            │
│  - CRITICAL_HEMORRHAGE_RISK     │
│  - CRITICAL_BONE_MARROW_SUPPR   │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│  Atomic JSON Database Connector │
│      (simulation_db.json)       │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│  Interactive Analytics UI &     │
│       Prometheus Metrics        │
└─────────────────────────────────┘
```

---

## 📁 Repository File Structure

```
sushruta-trillion-engine/
│
├── .github/
│   └── workflows/
│       └── deploy.yml        # Multi-stage CI/CD: Linting, 100-run tests, Docker health checks
│
├── core/
│   ├── __init__.py           # Unified exports for math foundations & formulation classes
│   ├── database.py           # JSONDatabaseConnector: Atomic persistence & analytic metrics
│   ├── math_models.py        # Pharmacokinetic curves: A_bio, S_cyp, T_snayu, Angiogenesis
│   └── medicine_classes.py   # Hybrid classes: CNS, Cardio-Stroke, & Computational Oncology
│
├── static/
│   └── index.html            # Unified interactive multi-class dashboard & sliders
│
├── tests/
│   ├── __init__.py
│   ├── batch_tester.py       # 100-trial automated boundary diagnostic tester
│   └── test_engine.py        # Pytest unit & endpoint integration test suite
│
├── Dockerfile                # Production multi-stage slim container with non-root security
├── docker-compose.yml        # Orchestration with persistent volume mounts & health checks
├── .dockerignore             # Optimization & security filter
├── main.py                   # High-performance FastAPI application server
├── simulation_db.json        # Atomic simulation transaction log
├── requirements.txt          # Python dependency specifications
└── README.md                 # Technical user manual & enterprise architecture spec
```

---

## 🧬 Multi-Class Pharmacology Engines

### 1. Central Nervous System Sleep Onset (`NH-Synchro-02-Max`)
- **Hypnotic Core (Synthetic Zolpidem)**: Selective alpha-1 GABA-A subunit binding.
- **Asava Yogavahi Carrier**: Non-linear membrane absorption booster ($A_{bio}$).
- **Withania Somnifera (Ashwagandha)**: Hepatocyte cytoprotection buffering CYP450 stress ($S_{cyp}$).
- **Snayu Nerve Stimulants (Jyotishmati/Kupilu)**: Calibrated neuromuscular reflex tone ($T_{snayu}$).
- **Hemodynamic BP Modulators (Sarpagandha)**: Nocturnal blood pressure crash prevention.

### 2. Cardiovascular-Stroke Prophylaxis (`CV-StrokeShield-01`)
- **Allopathic Track**: Low-dose Antiplatelet (Salicylate / Clopidogrel) for immediate COX-1 / ADP P2Y12 thrombus occlusion block.
- **Ayurvedic Track**: *Terminalia Arjuna* extract (eNOS endothelial wall protection) + Purified *Commiphora Mukul* (Guggulsterones for reverse cholesterol plaque remodeling).
- **Dual-Chamber Delivery**: Chamber A fast dissolver + Chamber B enteric-coated sustained matrix.

### 3. Computational Oncology Pathways (`ONCO-PathCheck-01`)
- **Allopathic Cytotoxic Track**: Targeted chemotherapeutic molecules (Paclitaxel / Tyrosine Kinase Inhibitors) suppressing tumor angiogenesis velocity ($V_{tumor}$).
- **Botanical Cytoprotective Track**: Active bio-fractionated *Ocimum sanctum* (Tulsi) for targeted tumor apoptosis induction + *Asparagus racemosus* (Shatavari) antioxidant reserve shielding healthy bone marrow and cellular integrity ($S_{healthy}$).

---

## 📡 REST API Endpoints Specification

### 1. Health & Readiness Probe
```http
GET /health
```
**Response:**
```json
{
  "status": "healthy",
  "microservice": "sushruta-trillion-engine",
  "container_ready": true
}
```

### 2. Run Multi-Class Simulation
```http
POST /api/v3/simulate/{medicine_class}
```
*Supported `medicine_class` paths:* `neuro-sleep`, `cardio-stroke`, `comp-oncology`

#### Example Oncology Request:
```bash
curl -X POST "http://localhost:8000/api/v3/simulate/comp-oncology" \
     -H "Content-Type: application/json" \
     -d '{
       "codename": "ONCO-SHIELD-V1",
       "parameters": {
         "allopathic_chemo_intensity": 45.0,
         "apoptosis_herbal_intensity": 320.0,
         "cytoprotective_factor": 120.0
       }
     }'
```

#### Example Response:
```json
{
  "class_executed": "comp-oncology",
  "formulation_metadata": {
    "codename": "ONCO-SHIELD-V1",
    "vessel": "Targeted Nanoparticle & Botanical Liposome"
  },
  "simulation_pathways": {
    "oncology_tumor_kinetics": {
      "tumor_angiogenesis_inhibition_velocity": 0.84,
      "cellular_apoptosis_induction_rate": 3.2
    },
    "healthy_tissue_cytoprotection": {
      "non_tumor_cellular_integrity_score": 64.0,
      "free_radical_scavenging_reserve": 9.6
    }
  },
  "cross_interaction_validator": {
    "cytoprotective_shield_engaged": true,
    "safety_clearance_status": "APPROVED"
  }
}
```

### 3. Historical Database Analytics
```http
GET /api/v3/analytics
```
**Response:**
```json
{
  "total_simulations_recorded": 60,
  "approved_count": 52,
  "warning_count": 5,
  "critical_alert_count": 3,
  "database_integrity": "OK"
}
```

---

## 🐳 Containerized Deployment (Docker & Compose)

### 1. Standard Docker Run
```bash
# Build the production image
docker build -t sushruta-trillion-engine:3.0.0 .

# Run container as isolated non-root process on port 8000
docker run -d \
  --name sushruta-engine \
  -p 8000:8000 \
  -v $(pwd)/simulation_db.json:/app/simulation_db.json \
  sushruta-trillion-engine:3.0.0

# Verify liveness
curl http://localhost:8000/health
```

### 2. Docker Compose Orchestration
```bash
# Launch with persistent volume mounts and resource constraints
docker compose up -d

# Check live logs
docker compose logs -f

# Verify container health
docker compose ps
```

---

## 🧪 Automated Testing & Diagnostic Suite

### Run 100-Trial Automated Boundary Analysis:
```bash
python tests/batch_tester.py
```
*Sample Test Output:*
```json
{
  "total_trials_per_class": 100,
  "cns_summary": { "approved": 78, "warning": 14, "critical": 8, "pass_rate_pct": 78.0 },
  "cardio_summary": { "approved": 100, "pass_rate_pct": 100.0 },
  "oncology_summary": { "approved": 82, "warning": 12, "critical": 6, "pass_rate_pct": 82.0 }
}
```

### Run Pytest Integration Suite:
```bash
pytest -v --tb=short tests/
```

---

## 🔄 GitHub Actions CI/CD Pipeline

The repository includes a production-grade continuous integration workflow configured in `.github/workflows/deploy.yml`:
1. **Matrix Testing:** Executes linting (`flake8`) and unit tests across Python 3.10 and 3.11.
2. **Mathematical Boundary Diagnostics:** Runs the 100-trial simulation batch test to verify zero drift.
3. **Container Build & Healthcheck Gate:** Builds the Docker container, boots it in the runner, checks HTTP `/health`, and verifies operational status before deployment sign-off.

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.
