"""
Sushruta-Trillion Engine: Core Mathematical Models
Biochemical & Pharmacokinetic Equations for Allopathy + Ayurveda Chemo-Informatics
"""

import math
from typing import Dict, Any

def calculate_abio(v_asava: float, alpha: float = 0.50, km: float = 1.5) -> float:
    """
    1. Bioavailability Amplification Function (A_bio)
    Non-linear Michaelis-Menten equivalent saturation curve.
    Formula: A_bio(V_asava) = 1.0 + (alpha * V_asava) / (V_asava + Km)
    """
    safe_v = max(0.0, float(v_asava))
    return round(1.0 + (alpha * safe_v) / (safe_v + km), 3)

def calculate_scyp(
    d_allopathic: float,
    d_ashwagandha: float,
    a_bio: float,
    beta: float = 4.5,
    gamma: float = 12.0
) -> float:
    """
    2. Hepatic Cytochrome P450 Functional Stress Matrix (S_cyp)
    Linear synthetic toxic load buffered by logarithmic botanical cytoprotection.
    Formula: S_cyp = max(0, min(100, beta * D_allopathic * A_bio - gamma * ln(1 + D_ashwagandha)))
    """
    safe_allopathic = max(0.0, float(d_allopathic))
    safe_ashwa = max(0.0, float(d_ashwagandha))
    toxic_load = beta * safe_allopathic * a_bio
    herbal_shield = gamma * math.log(1.0 + safe_ashwa)
    stress = toxic_load - herbal_shield
    return round(max(0.0, min(100.0, stress)), 2)

def calculate_tsnayu(
    d_snayu: float,
    a_bio: float,
    lambda_sens: float = 0.03
) -> float:
    """
    3. Snayu Active Stage Reflex Tone Function (T_snayu)
    Asymptotic neuromuscular reflex tone bound strictly between 0.0 and 1.0.
    Formula: T_snayu = 1.0 - exp(-(lambda * D_snayu * A_bio))
    """
    safe_snayu = max(0.0, float(d_snayu))
    tone = 1.0 - math.exp(-(lambda_sens * safe_snayu * a_bio))
    return round(max(0.0, min(1.0, tone)), 3)

def calculate_bp_stability(d_bp: float) -> float:
    """
    4. Hemodynamic Blood Pressure Stability Index
    Vascular resistance stabilization centered at 120 mmHg equivalence.
    """
    safe_bp = max(0.0, float(d_bp))
    deviation = abs(120.0 - (safe_bp * 2.4))
    return round(max(0.0, min(100.0, 100.0 - deviation)), 1)

def calculate_tumor_suppression(chemo_payload: float, apoptosis_herbal: float) -> float:
    """
    5. Tumor Angiogenesis & Proliferation Suppression Velocity
    Synergy of synthetic cytotoxic payload and botanical apoptosis inducers.
    Formula: min(0.99, (chemo_payload * 0.015) + (apoptosis_herbal * 0.0005))
    """
    safe_chemo = max(0.0, float(chemo_payload))
    safe_herbal = max(0.0, float(apoptosis_herbal))
    return round(min(0.99, (safe_chemo * 0.015) + (safe_herbal * 0.0005)), 3)

def calculate_healthy_cell_survival(chemo_payload: float, cytoprotective_matrix: float) -> float:
    """
    6. Non-Tumor Cellular Integrity & Survival Score (0-100%)
    Aggressive chemotherapy degrades healthy cells; cytoprotective herbs preserve baseline cell health.
    Formula: max(0.0, min(100.0, 100.0 - (chemo_payload * 1.2) + (cytoprotective_matrix * 0.15)))
    """
    safe_chemo = max(0.0, float(chemo_payload))
    safe_cyto = max(0.0, float(cytoprotective_matrix))
    survival = 100.0 - (safe_chemo * 1.2) + (safe_cyto * 0.15)
    return round(max(0.0, min(100.0, survival)), 1)

def evaluate_oncology_safety_status(tumor_suppression: float, healthy_cell_survival: float) -> str:
    """
    Oncology multi-vector therapeutic window safety validator.
    Prevents lethal bone marrow suppression and systemic toxicity.
    """
    if tumor_suppression > 0.90 and healthy_cell_survival < 40.0:
        return "CRITICAL_BONE_MARROW_SUPPRESSION"
    elif healthy_cell_survival < 60.0:
        return "WARNING_SYSTEMIC_TOXICITY"
    return "APPROVED"

def evaluate_safety_status(s_cyp: float, t_snayu: float, bp_stability: float) -> str:
    """Multi-vector clinical safety threshold validator."""
    if s_cyp > 85.0 or t_snayu > 0.95 or bp_stability < 35.0:
        return "CRITICAL_TOXICITY"
    elif s_cyp > 60.0 or t_snayu > 0.88 or bp_stability < 65.0:
        return "WARNING_HIGH_ACCUMULATION"
    return "APPROVED"

# --- 🌿 CLASS 4: DEEP-TISSUE REGENERATION & WOUND MATRIX KINETICS ---
def calculate_tensile_healing_rate(
    c_asiatica_mg: float,
    c_curcumin_mg: float,
    k_col: float = 0.015,
    alpha: float = 18.5,
    beta: float = 0.008
) -> float:
    """
    Class 4: Tensile Wound Healing Acceleration (H_tensile)
    Models Type I/III collagen fibril cross-linking buffered by NF-kB anti-inflammatory kinetics.
    Formula: H_tensile = alpha * ln(1 + k_col * C_asiatica) * (1 - exp(-beta * C_curcumin))
    """
    safe_asiatica = max(0.0, float(c_asiatica_mg))
    safe_curcumin = max(0.0, float(c_curcumin_mg))
    val = alpha * math.log(1.0 + k_col * safe_asiatica) * (1.0 - math.exp(-beta * safe_curcumin))
    return round(min(100.0, max(0.0, val)), 2)

def calculate_ecm_remodeling_index(
    c_asiatica_mg: float,
    c_aloe_mg: float,
    c_zinc_mg: float
) -> float:
    """
    Class 4: Extracellular Matrix (ECM) Remodeling & Epithelialization Velocity
    Models metalloproteinase (MMP-1/8) suppression under zinc chelation and hyaluronic stimulation.
    Formula: R_ecm = (1.5 * C_asiatica + 0.8 * C_aloe) / (1.0 + (C_zinc / 100.0)^2)
    """
    safe_asiatica = max(0.0, float(c_asiatica_mg))
    safe_aloe = max(0.0, float(c_aloe_mg))
    safe_zinc = max(0.0, float(c_zinc_mg))
    val = (1.5 * safe_asiatica + 0.8 * safe_aloe) / (1.0 + math.pow(safe_zinc / 100.0, 2))
    return round(val, 2)

def evaluate_regeneration_safety_status(
    tensile_healing: float,
    c_curcumin_mg: float,
    c_zinc_mg: float
) -> str:
    """
    Safety Clearance Gate for Deep-Tissue Wound Healing Formulation
    """
    if c_zinc_mg > 85.0:
        return "CRITICAL_ZINC_CYTOTOXICITY_RISK"
    if c_curcumin_mg < 50.0:
        return "WARNING_HYPERTROPHIC_SCARRING_RISK"
    if tensile_healing >= 30.0:
        return "APPROVED_ACCELERATED_REGENERATION"
    return "APPROVED_STANDARD_HEALING"

