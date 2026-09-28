"""
Sushruta-Trillion Engine: Medicine Formulation Classes
Defines hybrid classes for:
1. Central Nervous System (CNS) & Somnolence Kinetics (NH-Synchro-02-Max)
2. Cardiovascular-Stroke Prophylaxis & Rapid Clot Shield (CV-StrokeShield-01)
"""

import math
from typing import Dict, Any, Optional
from .math_models import (
    calculate_abio,
    calculate_scyp,
    calculate_tsnayu,
    calculate_bp_stability,
    evaluate_safety_status,
    calculate_tumor_suppression,
    calculate_healthy_cell_survival,
    evaluate_oncology_safety_status
)

class HybridCNSMedicine:
    """
    Formulation Class: NH-Synchro-02-Max
    Vascular-synchronized sleep onset with Snayu reflex preservation.
    """
    def __init__(
        self,
        hypnotic_dose_mg: float = 10.0,
        asava_carrier_ml: float = 2.0,
        ashwagandha_mg: float = 250.0,
        snayu_stimulants_mg: float = 25.0,
        bp_modulators_mg: float = 50.0,
    ):
        self.hypnotic_dose_mg = hypnotic_dose_mg
        self.asava_carrier_ml = asava_carrier_ml
        self.ashwagandha_mg = ashwagandha_mg
        self.snayu_stimulants_mg = snayu_stimulants_mg
        self.bp_modulators_mg = bp_modulators_mg

    def simulate(self) -> Dict[str, Any]:
        a_bio = calculate_abio(self.asava_carrier_ml)
        s_cyp = calculate_scyp(self.hypnotic_dose_mg, self.ashwagandha_mg, a_bio)
        t_snayu = calculate_tsnayu(self.snayu_stimulants_mg, a_bio)
        bp_stab = calculate_bp_stability(self.bp_modulators_mg)
        safety = evaluate_safety_status(s_cyp, t_snayu, bp_stab)

        return {
            "formulation": "NH-Synchro-02-Max",
            "bioavailability_multiplier": a_bio,
            "hepatic_cyp_stress": s_cyp,
            "snayu_reflex_tone": t_snayu,
            "bp_stability_index": bp_stab,
            "safety_status": safety,
            "locomotor_limpness_prevented": t_snayu >= 0.55,
            "liver_half_life_hrs": round(3.5 + (s_cyp / 100.0) * 7.5, 1),
        }

class HybridCardiovascularMedicine:
    """
    Formulation Class: Cardiovascular-Stroke Prophylaxis (CV-StrokeShield-01)
    
    Synchronized Dual-Chamber Delivery Kinetics:
      - Chamber A (Allopathic): Low-dose Antiplatelet (Acetylsalicylic Acid / Clopidogrel)
        Immediate COX-1 / ADP P2Y12 inhibition prevents thrombus occlusion in narrowed brain vessels.
      - Chamber B (Ayurvedic): Enteric-Coated Terminalia Arjuna + Purified Guggulu
        Inotropic myocardial support, eNOS endothelial protection, and reverse lipid transport plaque remodeling.
    """
    def __init__(
        self,
        antiplatelet_dose_mg: float = 75.0,
        arjuna_extract_mg: float = 350.0,
        guggulu_purified_mg: float = 150.0,
        asava_carrier_ml: float = 1.8,
        bp_modulators_mg: float = 45.0,
    ):
        self.antiplatelet_dose_mg = antiplatelet_dose_mg
        self.arjuna_extract_mg = arjuna_extract_mg
        self.guggulu_purified_mg = guggulu_purified_mg
        self.asava_carrier_ml = asava_carrier_ml
        self.bp_modulators_mg = bp_modulators_mg

    def calculate_cardio_metrics(self, patient_parameters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Calculates cerebrovascular stroke prophylactic efficacy and endothelial safety.
        Evaluates platelet inhibition, shear stress protection, and arterial plaque remodeling.
        """
        params = patient_parameters or {}
        baseline_bp_sys = float(params.get("baseline_bp_systolic", 138.0))
        baseline_shear_stress = float(params.get("arterial_shear_stress_dynes", 18.5))
        prior_ischemic_events = int(params.get("prior_ischemic_events", 0))

        # Bioavailability amplification from Yogavahi fermented carrier
        a_bio = calculate_abio(self.asava_carrier_ml, alpha=0.45, km=1.2)

        # 1. Antiplatelet Aggregation Inhibition (COX-1 & ADP block)
        # Low dose salicylate/clopidogrel yields saturation curve between 70% and 98%
        platelet_inhibition = round(
            min(98.5, 50.0 + (self.antiplatelet_dose_mg * 0.42 * a_bio)), 1
        )

        # 2. Endothelial Shear Resistance Index (Terminalia arjuna eNOS / NO preservation)
        # Arjuna shields vascular inner lining against high blood friction
        arjuna_factor = min(1.0, (self.arjuna_extract_mg / 400.0) * 0.95)
        endothelial_resistance = round(
            min(0.99, 0.65 + (arjuna_factor * 0.32)), 3
        )

        # 3. Arterial Plaque Remodeling & Reverse Lipid Transport (Guggulsterones E&Z)
        guggulu_factor = min(1.0, self.guggulu_purified_mg / 200.0)
        plaque_remodeling_score = round(
            min(95.0, 40.0 + (guggulu_factor * 42.0) + (a_bio * 5.0)), 1
        )

        # 4. Microvascular Cerebral Perfusion Velocity (cm/sec)
        microcirculation_velocity = round(
            4.2 + (endothelial_resistance * 2.2) - (prior_ischemic_events * 0.3), 1
        )

        # 5. Gastric Mucosal Shielding (Arjuna mucilage prevents salicylate erosions)
        mucosal_shield_index = round(
            1.0 + (self.arjuna_extract_mg * 0.0024), 2
        )

        # 6. Overall Stroke Risk Mitigation Score (0 - 100%)
        stroke_risk_mitigation_score = round(
            (platelet_inhibition * 0.40) +
            (endothelial_resistance * 100.0 * 0.35) +
            (plaque_remodeling_score * 0.25), 1
        )

        # Safety clearance status
        if platelet_inhibition > 96.0 and self.antiplatelet_dose_mg > 120:
            safety_status = "WARNING_HIGH_BLEEDING_RISK"
        elif platelet_inhibition < 50.0:
            safety_status = "INSUFFICIENT_PROTECTION"
        else:
            safety_status = "APPROVED"

        return {
            "formulation_codename": "CV-StrokeShield-01",
            "therapeutic_class": "Cardiovascular-Stroke Prophylaxis",
            "dosages": {
                "antiplatelet_acetylsalicylic_mg": self.antiplatelet_dose_mg,
                "terminalia_arjuna_extract_mg": self.arjuna_extract_mg,
                "purified_guggulu_mg": self.guggulu_purified_mg,
                "asava_carrier_ml": self.asava_carrier_ml,
            },
            "bioavailability_multiplier": a_bio,
            "platelet_aggregation_inhibition_pct": platelet_inhibition,
            "endothelial_shear_resistance_index": endothelial_resistance,
            "arterial_plaque_remodeling_score": plaque_remodeling_score,
            "microvascular_perfusion_velocity_cm_s": microcirculation_velocity,
            "gastric_mucosal_shielding_coefficient": mucosal_shield_index,
            "stroke_risk_mitigation_score_pct": stroke_risk_mitigation_score,
            "safety_status": safety_status,
            "clinical_notes": (
                "Dual-chamber synchronized release: Fast antiplatelet core thins microvascular thrombi, "
                "while sustained Arjuna glycosides protect arterial walls from shear stress and Guggulsterones "
                "accelerate reverse cholesterol clearing."
            ),
        }

class HybridOncologyMedicine:
    """
    Formulation Class: Computational Oncology Pathways (ONCO-PathCheck-01)
    
    Target Objective: Model tumor suppression kinetics, track angiogenesis inhibition,
    and map cellular safety metrics across healthy tissues during active chemotherapy cycles.
    
    Multi-Track Treatment Mechanism:
      - Allopathic Track (Targeted Cytotoxic Delivery): Paclitaxel / Tyrosine Kinase Inhibitor
        Disrupts tumor microtubule stability and angiogenesis signaling pathways.
      - Ayurvedic Track (Apoptosis Induction & Cytoprotection): Tulsi (Ocimum sanctum) + Shatavari (Asparagus racemosus)
        Induces p53-dependent tumor cell apoptosis while protecting healthy bone marrow and non-tumor parenchymal cells.
    """
    def __init__(
        self,
        allopathic_chemo_intensity: float = 45.0,
        apoptosis_herbal_intensity: float = 300.0,
        cytoprotective_factor: float = 120.0,
        asava_carrier_ml: float = 2.0,
    ):
        self.allopathic_chemo_intensity = allopathic_chemo_intensity
        self.apoptosis_herbal_intensity = apoptosis_herbal_intensity
        self.cytoprotective_factor = cytoprotective_factor
        self.asava_carrier_ml = asava_carrier_ml

    def calculate_oncology_metrics(self) -> Dict[str, Any]:
        """Calculates tumor angiogenesis inhibition and non-tumor cytoprotective integrity."""
        a_bio = calculate_abio(self.asava_carrier_ml, alpha=0.55, km=1.4)
        
        # 1. Tumor Angiogenesis & Proliferation Suppression Velocity
        tumor_suppression = calculate_tumor_suppression(
            self.allopathic_chemo_intensity * a_bio * 0.9,
            self.apoptosis_herbal_intensity
        )
        
        # 2. Non-Tumor Cellular Integrity Score
        healthy_cell_survival = calculate_healthy_cell_survival(
            self.allopathic_chemo_intensity,
            self.cytoprotective_factor
        )
        
        # Safety clearance status
        status = evaluate_oncology_safety_status(tumor_suppression, healthy_cell_survival)

        return {
            "formulation_codename": "ONCO-PathCheck-01",
            "therapeutic_class": "Computational Oncology & Cytoprotective Matrix",
            "vessel": "Targeted Nanoparticle & Botanical Liposome",
            "dosages": {
                "chemotherapy_payload_intensity": self.allopathic_chemo_intensity,
                "tulsi_apoptosis_herbal_intensity": self.apoptosis_herbal_intensity,
                "shatavari_cytoprotective_factor": self.cytoprotective_factor,
                "bioactive_carrier_ml": self.asava_carrier_ml,
            },
            "bioavailability_multiplier": a_bio,
            "simulation_pathways": {
                "oncology_tumor_kinetics": {
                    "tumor_angiogenesis_inhibition_velocity": round(tumor_suppression, 2),
                    "cellular_apoptosis_induction_rate": round(self.apoptosis_herbal_intensity * 0.01, 2)
                },
                "healthy_tissue_cytoprotection": {
                    "non_tumor_cellular_integrity_score": round(healthy_cell_survival, 1),
                    "free_radical_scavenging_reserve": round(self.cytoprotective_factor * 0.08, 1)
                }
            },
            "cross_interaction_validator": {
                "cytoprotective_shield_engaged": True if self.cytoprotective_factor > 50.0 else False,
                "safety_clearance_status": status
            },
            "clinical_notes": (
                "Synergistic oncotherapy: Targeted cytotoxic core disrupts mitotic spindles, "
                "while Tulsi eugenols induce apoptosis and Shatavari saponins protect healthy "
                "bone marrow and renal parenchyma against toxic radical leakage."
            )
        }

# Global aliases for convenience
CVStrokeShield01 = HybridCardiovascularMedicine
ONCOPathCheck01 = HybridOncologyMedicine

if __name__ == "__main__":
    import json
    stroke_engine = CVStrokeShield01(
        antiplatelet_dose_mg=75.0,
        arjuna_extract_mg=350.0,
        guggulu_purified_mg=150.0,
        asava_carrier_ml=1.8,
    )
    sample_patient_parameters = {
        "patient_id": "PT-7702-CEREBRO",
        "age": 62,
        "baseline_bp_systolic": 142.0,
        "arterial_shear_stress_dynes": 22.4,
        "prior_ischemic_events": 1,
    }
    result = stroke_engine.calculate_cardio_metrics(sample_patient_parameters)
    print(json.dumps(result, indent=2))
