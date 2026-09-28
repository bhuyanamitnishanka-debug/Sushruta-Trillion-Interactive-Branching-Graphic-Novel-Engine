"""
Sushruta-Trillion Engine: Comprehensive Pytest Test Suite
Tests FastAPI REST endpoints, Pydantic validation, multi-class math models,
boundary safety flags, and 100-run automated diagnostics.
"""

import pytest
import sys
import os

# Add root directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fastapi.testclient import TestClient
from main import app
from core.math_models import (
    calculate_abio,
    calculate_scyp,
    calculate_tsnayu,
    calculate_bp_stability,
    evaluate_safety_status,
    calculate_tumor_suppression,
    calculate_healthy_cell_survival,
    evaluate_oncology_safety_status
)
from core.medicine_classes import (
    HybridCNSMedicine,
    CVStrokeShield01,
    ONCOPathCheck01
)
from tests.batch_tester import run_100_batch_diagnostics

client = TestClient(app)

# -------------------------------------------------------------
# 1. Health & System Probe Tests
# -------------------------------------------------------------
def test_root_probe():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "operational"
    assert "version" in data
    assert "neuro-sleep" in data["supported_classes"]
    assert "cardio-stroke" in data["supported_classes"]
    assert "comp-oncology" in data["supported_classes"]

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["container_ready"] is True

# -------------------------------------------------------------
# 2. Math Foundation Unit Tests
# -------------------------------------------------------------
def test_bioavailability_curve():
    # A_bio with 0 volume should be 1.0 baseline
    assert calculate_abio(0.0) == 1.0
    # A_bio with 1.5 mL should be 1.0 + (0.50 * 1.5) / 3.0 = 1.25
    assert pytest.approx(calculate_abio(1.5), 0.01) == 1.25
    # As asymptotic saturation approaches 1.50
    assert calculate_abio(100.0) < 1.50

def test_cyp450_stress_and_ashwagandha_buffering():
    # Without ashwagandha, high hypnotic causes high stress
    high_stress = calculate_scyp(20.0, 1.0, 0.0)
    assert high_stress > 80.0
    # With 300mg ashwagandha, hepatocyte stress is buffered downwards
    buffered_stress = calculate_scyp(20.0, 1.0, 300.0)
    assert buffered_stress < high_stress

def test_oncology_tumor_suppression_and_cytoprotection():
    # High chemo payload suppresses tumor angiogenesis
    suppression = calculate_tumor_suppression(50.0, 300.0)
    assert 0.70 <= suppression <= 0.99
    
    # Healthy cell survival without cytoprotection drops
    unprotected = calculate_healthy_cell_survival(60.0, 0.0)
    # With Shatavari cytoprotective matrix, healthy cells are shielded
    protected = calculate_healthy_cell_survival(60.0, 200.0)
    assert protected > unprotected

# -------------------------------------------------------------
# 3. Class 1: Neuro-Sleep API Route Simulation Tests
# -------------------------------------------------------------
def test_simulate_neuro_sleep_approved():
    payload = {
        "codename": "TEST-SYNCHRO-APPROVED",
        "parameters": {
            "allopathic_hypnotic_mg": 10.0,
            "asava_carrier_ml": 2.0,
            "ashwagandha_mg": 250.0,
            "snayu_stimulants_mg": 25.0,
            "bp_modulators_mg": 50.0
        }
    }
    response = client.post("/api/v3/simulate/neuro-sleep", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["class_executed"] == "neuro-sleep"
    assert data["cross_interaction_validator"]["safety_clearance_status"] == "APPROVED"
    assert data["simulation_pathways"]["neuro_and_snayu_vector"]["gaba_receptor_binding_rate"] > 0

def test_simulate_neuro_sleep_critical_toxicity():
    payload = {
        "codename": "TEST-SYNCHRO-TOXIC",
        "parameters": {
            "allopathic_hypnotic_mg": 45.0,
            "asava_carrier_ml": 4.0,
            "ashwagandha_mg": 10.0,
            "snayu_stimulants_mg": 90.0,
            "bp_modulators_mg": 10.0
        }
    }
    response = client.post("/api/v3/simulate/neuro-sleep", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["cross_interaction_validator"]["safety_clearance_status"] == "CRITICAL_TOXICITY"

# -------------------------------------------------------------
# 4. Class 2: Cardio-Stroke API Route Simulation Tests
# -------------------------------------------------------------
def test_simulate_cardio_stroke_approved():
    payload = {
        "codename": "TEST-CV-STROKESHIELD-01",
        "parameters": {
            "allopathic_antiplatelet_level": 75.0,
            "arjuna_extract_level": 400.0,
            "guggulu_purified_level": 150.0
        }
    }
    response = client.post("/api/v3/simulate/cardio-stroke", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["class_executed"] == "cardio-stroke"
    assert data["cross_interaction_validator"]["safety_clearance_status"] == "APPROVED"
    assert "cardiovascular_hemodynamics" in data["simulation_pathways"]

def test_simulate_cardio_stroke_hemorrhage_risk():
    payload = {
        "codename": "TEST-CV-HEMORRHAGE",
        "parameters": {
            "allopathic_antiplatelet_level": 98.0,
            "arjuna_extract_level": 20.0,
            "guggulu_purified_level": 10.0
        }
    }
    response = client.post("/api/v3/simulate/cardio-stroke", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["cross_interaction_validator"]["safety_clearance_status"] == "CRITICAL_HEMORRHAGE_RISK"

# -------------------------------------------------------------
# 5. Class 3: Computational Oncology API Route Simulation Tests
# -------------------------------------------------------------
def test_simulate_comp_oncology_approved():
    payload = {
        "codename": "TEST-ONCO-APPROVED",
        "parameters": {
            "allopathic_chemo_intensity": 45.0,
            "apoptosis_herbal_intensity": 350.0,
            "cytoprotective_factor": 150.0
        }
    }
    response = client.post("/api/v3/simulate/comp-oncology", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["class_executed"] == "comp-oncology"
    assert data["cross_interaction_validator"]["safety_clearance_status"] == "APPROVED"
    assert data["cross_interaction_validator"]["cytoprotective_shield_engaged"] is True

def test_simulate_comp_oncology_bone_marrow_suppression():
    payload = {
        "codename": "TEST-ONCO-CRITICAL-SUPPRESSION",
        "parameters": {
            "allopathic_chemo_intensity": 75.0,
            "apoptosis_herbal_intensity": 500.0,
            "cytoprotective_factor": 10.0
        }
    }
    response = client.post("/api/v3/simulate/comp-oncology", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["cross_interaction_validator"]["safety_clearance_status"] == "CRITICAL_BONE_MARROW_SUPPRESSION"

# -------------------------------------------------------------
# 6. Database Analytics Route Test
# -------------------------------------------------------------
def test_analytics_endpoint():
    response = client.get("/api/v3/analytics")
    assert response.status_code == 200
    data = response.json()
    assert "total_simulations_recorded" in data
    assert "approved_count" in data

# -------------------------------------------------------------
# 7. 100-Trial Automated Boundary Diagnostic Suite Test
# -------------------------------------------------------------
def test_100_batch_diagnostic_suite():
    results = run_100_batch_diagnostics(seed=42)
    assert results["total_trials_per_class"] == 100
    assert results["cns_summary"]["approved"] + results["cns_summary"]["warning"] + results["cns_summary"]["critical"] == 100
    assert results["cardio_summary"]["approved"] == 100
    assert results["oncology_summary"]["approved"] > 50
    assert "sample_cns_trial" in results
    assert "sample_cardio_trial" in results
    assert "sample_onco_trial" in results
