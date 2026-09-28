"""
Sushruta-Trillion Engine: 100-Run Automated Diagnostic Suite
Tests boundary combinations across CNS, Cardiovascular, & Computational Oncology medicine classes.
"""

import sys
import os
import random
from typing import Dict, Any, List

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

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
from core.medicine_classes import HybridCNSMedicine, CVStrokeShield01, ONCOPathCheck01

def run_100_batch_diagnostics(seed: int = 42) -> Dict[str, Any]:
    """Runs a 100-trial automated boundary analysis suite."""
    random.seed(seed)
    cns_trials: List[Dict[str, Any]] = []
    cardio_trials: List[Dict[str, Any]] = []
    onco_trials: List[Dict[str, Any]] = []

    cns_approved = 0
    cns_warning = 0
    cns_critical = 0

    cardio_approved = 0

    onco_approved = 0
    onco_warning = 0
    onco_critical = 0

    for i in range(1, 101):
        # 1. CNS Simulation Run
        hyp = round(random.uniform(2.0, 35.0), 1)
        asava = round(random.uniform(0.5, 4.0), 1)
        ashwa = round(random.uniform(50.0, 350.0), 1)
        snayu = round(random.uniform(10.0, 75.0), 1)
        bp = round(random.uniform(20.0, 70.0), 1)

        cns_med = HybridCNSMedicine(hyp, asava, ashwa, snayu, bp)
        res_cns = cns_med.simulate()
        status = res_cns["safety_status"]

        if status == "APPROVED":
            cns_approved += 1
        elif status == "WARNING_HIGH_ACCUMULATION":
            cns_warning += 1
        else:
            cns_critical += 1

        cns_trials.append({
            "trial_id": i,
            "category": "CNS_Sleep",
            "hypnotic_mg": hyp,
            "asava_ml": asava,
            "ashwa_mg": ashwa,
            "snayu_mg": snayu,
            "results": res_cns,
        })

        # 2. Cardiovascular Stroke Shield Run
        aspirin = round(random.uniform(40.0, 100.0), 1)
        arjuna = round(random.uniform(150.0, 450.0), 1)
        guggulu = round(random.uniform(50.0, 200.0), 1)
        c_asava = round(random.uniform(0.5, 3.0), 1)

        cardio_med = CVStrokeShield01(aspirin, arjuna, guggulu, c_asava)
        res_cardio = cardio_med.calculate_cardio_metrics({
            "baseline_bp_systolic": random.uniform(120.0, 160.0),
            "arterial_shear_stress_dynes": random.uniform(14.0, 28.0),
            "prior_ischemic_events": random.choice([0, 0, 1]),
        })
        if res_cardio["safety_status"] == "APPROVED":
            cardio_approved += 1

        cardio_trials.append({
            "trial_id": i,
            "category": "Cardio_Stroke_Prophylaxis",
            "antiplatelet_mg": aspirin,
            "arjuna_mg": arjuna,
            "guggulu_mg": guggulu,
            "stroke_mitigation_pct": res_cardio["stroke_risk_mitigation_score_pct"],
            "safety_status": res_cardio["safety_status"],
        })

        # 3. Computational Oncology Run
        chemo = round(random.uniform(10.0, 70.0), 1)
        apoptosis = round(random.uniform(100.0, 500.0), 1)
        cyto = round(random.uniform(40.0, 250.0), 1)
        o_asava = round(random.uniform(1.0, 3.0), 1)

        onco_med = ONCOPathCheck01(chemo, apoptosis, cyto, o_asava)
        res_onco = onco_med.calculate_oncology_metrics()
        o_status = res_onco["cross_interaction_validator"]["safety_clearance_status"]

        if o_status == "APPROVED":
            onco_approved += 1
        elif "WARNING" in o_status:
            onco_warning += 1
        else:
            onco_critical += 1

        onco_trials.append({
            "trial_id": i,
            "category": "Computational_Oncology",
            "chemo_intensity": chemo,
            "tulsi_apoptosis_mg": apoptosis,
            "shatavari_cyto_mg": cyto,
            "tumor_suppression_vel": res_onco["simulation_pathways"]["oncology_tumor_kinetics"]["tumor_angiogenesis_inhibition_velocity"],
            "healthy_survival_pct": res_onco["simulation_pathways"]["healthy_tissue_cytoprotection"]["non_tumor_cellular_integrity_score"],
            "safety_status": o_status,
        })

    return {
        "total_trials_per_class": 100,
        "cns_summary": {
            "approved": cns_approved,
            "warning": cns_warning,
            "critical": cns_critical,
            "pass_rate_pct": float(cns_approved),
        },
        "cardio_summary": {
            "approved": cardio_approved,
            "pass_rate_pct": float(cardio_approved),
        },
        "oncology_summary": {
            "approved": onco_approved,
            "warning": onco_warning,
            "critical": onco_critical,
            "pass_rate_pct": float(onco_approved),
        },
        "sample_cns_trial": cns_trials[0],
        "sample_cardio_trial": cardio_trials[0],
        "sample_onco_trial": onco_trials[0],
    }

if __name__ == "__main__":
    import json
    results = run_100_batch_diagnostics()
    print("=" * 60)
    print("SUSHRUTA-TRILLION 100-RUN AUTOMATED BATCH DIAGNOSTICS")
    print("=" * 60)
    print(json.dumps(results, indent=2))
