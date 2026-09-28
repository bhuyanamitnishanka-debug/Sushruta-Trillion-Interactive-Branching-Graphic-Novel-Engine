# Sushruta-Trillion: Production Deployment Architecture Whitepaper
This document provides a clean summary of the runtime environment, data management, and containerization layers that power the multi-class `Sushruta-Trillion` simulation framework.

## 🏢 1. High-Level Ecosystem Topology
The system uses a decentralized architecture separating client views, ingestion APIs, backend calculation tracks, and backup synchronization loops.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        1. Client Access Ingress                        │
│ [ Interactive HTML5 UI ] <─── Port 80 ───> [ Nginx Container ]         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP REST Requests
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        2. Core Processing Hub                          │
│ [ FastAPI Microservice App ] <─── Port 8000 ───> [ Pydantic Gates ]    │
│ ├── Subsystem Route A: Neuro-Sleep Engine                              │
│ ├── Subsystem Route B: Cardio-Stroke Engine                            │
│ ├── Subsystem Route C: Computational Oncology Engine                   │
│ └── Subsystem Route D: Vacuum Optics Physics Engine                    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Local Disk Persistence
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     3. Storage & Caching Layers                        │
│ [ simulation_db.json ] <─ Atomic Write ─> [ Backup Sync Thread ]       │
└───────────────────────────────────────────────────┬────────────────────┘
                                                    │ HTTP POST Stream
                                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       4. Offsite Archival Ring                         │
│ [ Gemini-Flask Backup Service ] <─── Port 8080 ───> Local Storage      │
└────────────────────────────────────────────────────────────────────────┘
```

## ⚙️ 2. Core Architectural Subsystems

### Ingestion Grid & API Pipeline
*   **Edge Router:** Powered by asynchronous FastAPI running over an ASGI web server layer (`Uvicorn`). It opens an OpenAPI gateway mapping types via Pydantic model configurations.
*   **Asynchronous Processing:** Long-running mathematical arrays evaluate equations natively on separate process lines, ensuring zero-block ingress for multi-client connections.

### Persistence & Storage Topology
*   **Atomic Database Logging:** Transactions append records straight to a structured `simulation_db.json` document repository. The system executes atomic disk calls to prevent concurrency crashes.
*   **Gemini-Flask Archival Loop:** An asynchronous outbound client task mirrors logs instantly to a separate Python-Flask listener on port `8080`, saving encrypted data blocks natively inside an isolated filesystem workspace.

### Security Integrity Gates
*   **Automated Boundary Interceptors:** Dedicated logic layers interrupt processing parameters if they fall outside safe limits—protecting cellular, vascular, or optical paths before committing metrics to disk.

## 🐳 3. Container Orchestration & CI/CD Delivery

*   **Docker Container Multi-Tenancy:** Isolation structures split compute scripts into lightweight, alpine-based Linux execution images—freezing dependency matrices to bypass environmental configuration drift.
*   **Continuous Integration Platform:** Integrated with GitHub Actions CI workflows to enforce compliance checks, testing compilation patterns on every branch pull event to ensure zero runtime issues.
