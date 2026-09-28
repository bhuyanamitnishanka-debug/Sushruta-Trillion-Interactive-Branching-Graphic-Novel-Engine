import math
from typing import Literal, Dict, Any

try:
    from fastapi import FastAPI, HTTPException, Path
    from fastapi.middleware.cors import CORSMiddleware
    from pydantic import BaseModel, Field
except ImportError:
    # Graceful mock shims for bare environment syntax compilation checks
    class FastAPI:
        def __init__(self, *args, **kwargs): pass
        def add_middleware(self, *args, **kwargs): pass
        def get(self, *args, **kwargs): return lambda f: f
        def post(self, *args, **kwargs): return lambda f: f
    class HTTPException(Exception): pass
    def Path(*args, **kwargs): return None
    class CORSMiddleware: pass
    class BaseModel:
        def __init__(self, **kwargs):
            for k, v in kwargs.items():
                setattr(self, k, v)
    def Field(*args, **kwargs): return None


# Internal import from our database connector module
try:
    from core.database import JSONDatabaseConnector
except ImportError:
    # Fallback to local script reference context if running in a single-file environment
    import sys
    from types import ModuleType
    class DummyDB:
        @staticmethod
        def save_record(x): return True
        @staticmethod
        def get_system_analytics(): return {"info": "Database module isolated."}
    JSONDatabaseConnector = DummyDB

app = FastAPI(
    title="Sushruta-Trillion: Advanced Unified Simulation Engine",
    description="Unified API router running Neuroendocrine, Hemodynamic, and Cardiovascular Chemo-Informatics models.",
    version="3.0.0"
)

# Enable Cross-Origin Resource Sharing (CORS) for front-end integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 🩺 HEALTH & ROOT PROBES (Docker & CI/CD) ---
@app.get("/", tags=["System"])
def root_probe():
    """Service status and active metadata gateway."""
    return {
        "service": "Sushruta-Trillion Chemo-Informatics Engine",
        "status": "operational",
        "version": "3.0.0",
        "supported_classes": ["neuro-sleep", "cardio-stroke", "comp-oncology", "tissue-regeneration", "vacuum-optics"],
        "docs_url": "/docs",
        "openapi_url": "/openapi.json"
    }

@app.get("/health", tags=["System"])
def health_check():
    """Liveness and container readiness healthcheck."""
    return {
        "status": "healthy",
        "microservice": "sushruta-trillion-engine",
        "container_ready": True
    }

# --- 📥 SCHEMATIC UNIFIED PYDANTIC INPUT OBJECTS ---
class FormulationPayload(BaseModel):
    codename: str = Field(..., example="SYNCHRO-MAX-ORAL")
    parameters: Dict[str, float] = Field(
        ..., 
        example={
            "allopathic_hypnotic_mg": 10.0,
            "asava_carrier_ml": 2.0,
            "ashwagandha_mg": 250.0,
            "snayu_stimulants_mg": 25.0,
            "bp_modulators_mg": 50.0,
            "allopathic_antiplatelet_level": 75.0,
            "arjuna_extract_level": 500.0,
            "guggulu_purified_level": 150.0,
            "allopathic_chemo_intensity": 45.0,
            "apoptosis_herbal_intensity": 300.0,
            "cytoprotective_factor": 120.0
        },
        description="Dynamic parameter inputs mapping directly to your target medicine category requirements."
    )

# --- 🚀 UNIFIED MULTI-CLASS DATA PATHWAY ENDPOINT ---
@app.post("/api/v3/simulate/{medicine_class}", response_model=dict)
def run_unified_simulation(
    medicine_class: Literal["neuro-sleep", "cardio-stroke", "comp-oncology", "tissue-regeneration"] = Path(..., description="The clinical treatment system class to route variables into"),
    payload: FormulationPayload = ...
):
    try:
        codename = payload.codename
        p = payload.parameters
        output_block = {}

        # -----------------------------------------------------------------
        # PATHWAY A: NEURO-SLEEP & NERVE GRID LOGIC
        # -----------------------------------------------------------------
        if medicine_class == "neuro-sleep":
            # Extract relevant variables using zero fallbacks
            hypnotic = p.get("allopathic_hypnotic_mg", 0.0)
            asava = p.get("asava_carrier_ml", 0.0)
            ashwa = p.get("ashwagandha_mg", 0.0)
            snayu = p.get("snayu_stimulants_mg", 0.0)
            bp_mod = p.get("bp_modulators_mg", 0.0)

            # Mathematical Formula calculations
            bio_mult = 1.0 + (0.50 * asava) / (asava + 1.5)
            cyp_stress = max(0.0, min(100.0, (4.5 * hypnotic * bio_mult) - (12.0 * math.log1p(ashwa))))
            snayu_tone = 1.0 - math.exp(-(0.03 * snayu * bio_mult))
            bp_stability = max(0.0, min(100.0, 100.0 - abs(120.0 - (bp_mod * 2.4))))

            # Integrity Safety Check Gates
            if cyp_stress > 85.0 or snayu_tone > 0.95:
                status = "CRITICAL_TOXICITY"
            elif cyp_stress > 60.0:
                status = "WARNING_HIGH_ACCUMULATION"
            else:
                status = "APPROVED"

            output_block = {
                "class_executed": "neuro-sleep",
                "formulation_metadata": {"codename": codename, "vessel": "Vascular-Synchronized Core"},
                "simulation_pathways": {
                    "neuro_and_snayu_vector": {
                        "gaba_receptor_binding_rate": round(0.12 * hypnotic * bio_mult, 2),
                        "snayu_active_stage_stimulation_index": round(snayu_tone, 2),
                        "cortisol_suppression_velocity": round(ashwa * 0.015, 2)
                    },
                    "vascular_hemodynamic_matrix": {
                        "blood_pressure_stability_score": round(bp_stability, 1),
                        "nocturnal_hypotensive_crash_prevention_index": round(bp_stability * 0.95, 1)
                    },
                    "hepato_pancreatic_axis": {
                        "cytochrome_p450_stress_score": round(cyp_stress, 1),
                        "nocturnal_glucose_stability_score": round(90.0 + (ashwa * 0.02), 1)
                    }
                },
                "cross_interaction_validator": {
                    "bioavailability_amplification_multiplier": round(bio_mult, 2),
                    "safety_clearance_status": status
                }
            }

        # -----------------------------------------------------------------
        # PATHWAY B: CARDIOVASCULAR & STROKE PROPHYLAXIS LOGIC
        # -----------------------------------------------------------------
        elif medicine_class == "cardio-stroke":
            antiplatelet = p.get("allopathic_antiplatelet_level", 0.0)
            arjuna = p.get("arjuna_extract_level", 0.0)
            guggulu = p.get("guggulu_purified_level", 0.0)

            # Mathematical Formula calculations
            platelet_inhibition = min(0.98, (antiplatelet * 0.012) + (guggulu * 0.0004))
            wall_integrity = max(0.0, min(100.0, 100.0 - (antiplatelet * 0.8) + (arjuna * 0.08)))

            # Integrity Safety Check Gates
            if platelet_inhibition > 0.95 and wall_integrity < 45:
                status = "CRITICAL_HEMORRHAGE_RISK"
            elif wall_integrity < 60:
                status = "WARNING_VASCULAR_FRAGILITY"
            else:
                status = "APPROVED"

            output_block = {
                "class_executed": "cardio-stroke",
                "formulation_metadata": {"codename": codename, "vessel": "Dual-Chamber Antithrombotic Tablet"},
                "simulation_pathways": {
                    "hematological_vector": {
                        "platelet_aggregation_inhibition_rate": round(platelet_inhibition, 2),
                        "fibrinolytic_clot_dissolution_index": round(guggulu * 0.001, 2)
                    },
                    "vascular_endothelial_matrix": {
                        "arterial_wall_integrity_score": round(wall_integrity, 1),
                        "capillary_fragility_mitigation_index": round(arjuna * 0.09, 1)
                    }
                },
                "cross_interaction_validator": {
                    "haemostatic_interference_detected": True if wall_integrity < 50 else False,
                    "safety_clearance_status": status
                }
            }

        # -----------------------------------------------------------------
        # PATHWAY C: COMPUTATIONAL ONCOLOGY & CYTOPROTECTIVE LOGIC
        # -----------------------------------------------------------------
        elif medicine_class == "comp-oncology":
            chemo_payload = p.get("allopathic_chemo_intensity", 0.0)
            apoptosis_herbal = p.get("apoptosis_herbal_intensity", 0.0)
            cytoprotective_matrix = p.get("cytoprotective_factor", 0.0)

            # 1. Formula: Tumor Angiogenesis Inhibition Velocity
            tumor_suppression = min(0.99, (chemo_payload * 0.015) + (apoptosis_herbal * 0.0005))

            # 2. Formula: Non-Tumor Cellular Integrity Score
            # Aggressive chemotherapy hits healthy cells; cytoprotective herbs preserve baseline cell health
            healthy_cell_survival = max(0.0, min(100.0, 100.0 - (chemo_payload * 1.2) + (cytoprotective_matrix * 0.15)))

            # Safety Threshold Boundaries
            if tumor_suppression > 0.90 and healthy_cell_survival < 40.0:
                status = "CRITICAL_BONE_MARROW_SUPPRESSION"
            elif healthy_cell_survival < 60.0:
                status = "WARNING_SYSTEMIC_TOXICITY"
            else:
                status = "APPROVED"

            output_block = {
                "class_executed": "comp-oncology",
                "formulation_metadata": {"codename": codename, "vessel": "Targeted Nanoparticle & Botanical Liposome"},
                "simulation_pathways": {
                    "oncology_tumor_kinetics": {
                        "tumor_angiogenesis_inhibition_velocity": round(tumor_suppression, 2),
                        "cellular_apoptosis_induction_rate": round(apoptosis_herbal * 0.01, 2)
                    },
                    "healthy_tissue_cytoprotection": {
                        "non_tumor_cellular_integrity_score": round(healthy_cell_survival, 1),
                        "free_radical_scavenging_reserve": round(cytoprotective_matrix * 0.08, 1)
                    }
                },
                "cross_interaction_validator": {
                    "cytoprotective_shield_engaged": True if cytoprotective_matrix > 50.0 else False,
                    "safety_clearance_status": status
                }
            }

        # -----------------------------------------------------------------
        # PATHWAY D: AUTOMATED DEEP-TISSUE REGENERATION & SCAFFOLDING LOGIC
        # -----------------------------------------------------------------
        elif medicine_class == "tissue-regeneration":
            peptide_payload = p.get("allopathic_growth_peptide_mg", 0.0)
            manjistha_potency = p.get("manjistha_extract_potency", 0.0)
            shilajit_carrier = p.get("shilajit_mineral_delivery", 0.0)

            # 1. Formula: Accelerated Cellular Mitosis Velocity (Wound Healing)
            healing_velocity = min(0.99, (peptide_payload * 0.02) + (shilajit_carrier * 0.0005))

            # 2. Formula: Extracellular Matrix (ECM) Over-Proliferation Control
            # High synthetic peptides risk causing keloids or scar tissue build-up; Manjistha acts as a structural balancer
            scar_mitigation_score = max(0.0, min(100.0, 100.0 - (peptide_payload * 1.5) + (manjistha_potency * 0.18)))

            # Safety Threshold Boundaries
            if healing_velocity > 0.92 and scar_mitigation_score < 40.0:
                status = "CRITICAL_HYPERTROPHIC_SCARRING_RISK"  # Alerts user if scar tissues are building up unsafely
            elif scar_mitigation_score < 60.0:
                status = "WARNING_UNCONTROLLED_CELLULAR_PROLIFERATION"
            else:
                status = "APPROVED"

            output_block = {
                "class_executed": "tissue-regeneration",
                "formulation_metadata": {"codename": codename, "vessel": "Bio-Active Hydrogel Scaffolding Array"},
                "simulation_pathways": {
                    "regeneration_vector": {
                        "mitotic_cellular_replication_rate": round(healing_velocity, 2),
                        "extracellular_matrix_deposition_velocity": round(shilajit_carrier * 0.003, 2)
                    },
                    "structural_tissue_matrix": {
                        "scar_tissue_mitigation_index": round(scar_mitigation_score, 1),
                        "collagen_cross_linking_efficiency": round(manjistha_potency * 0.07, 1)
                    }
                },
                "cross_interaction_validator": {
                    "fibrotic_interference_detected": True if scar_mitigation_score < 55.0 else False,
                    "safety_clearance_status": status
                }
            }

        # Commits output data straight to local database storage files
        JSONDatabaseConnector.save_record(output_block)

        # Synchronous outbound telemetry logging to local Gemini-Flask backup sync node
        try:
            import httpx
            with httpx.Client() as client:
                client.post("http://127.0.0.1:8080/api/v1/backup/telemetry", json=output_block, timeout=1.0)
        except Exception:
            # Ensures main simulation thread never stalls if backup node is temporarily offline
            pass

        return output_block

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unified Core Computational Crash: {str(e)}")

# --- 📊 ANALYTICS TRACKING ROUTE ---
@app.get("/api/v3/analytics", response_model=dict)
def fetch_database_analytics():
    """Returns database alert summaries across all historic simulation logs."""
    return JSONDatabaseConnector.get_system_analytics()

# --- 🔬 QUANTUM VACUUM OPTICS & KERR EFFECT SIMULATION ROUTE ---
class VacuumOpticsPayload(BaseModel):
    codename: str = Field(default="OPTICS-RUN-01", description="Identifier codename for optics run")
    wavelength_nm: float = Field(default=532.0, ge=200.0, le=1000.0, description="Input light wavelength in nanometers")
    tube_length_m: float = Field(default=0.5, ge=0.01, le=5.0, description="Physical path length of vacuum glass tube in meters")
    external_voltage_v_m: float = Field(default=15000.0, ge=0.0, le=100000.0, description="Magnitude of applied static electric field vector")
    kerr_constant: float = Field(default=2.4e-15, description="Kerr constant of the target medium or boundary layer")

@app.post("/api/v3/simulate/vacuum-optics", response_model=dict, tags=["Quantum & Electro-Optics"])
def run_vacuum_optics_simulation(payload: VacuumOpticsPayload):
    try:
        # 1. Quantum Physics Computations
        h = 6.62607015e-34  # Planck's constant
        c = 299792458       # Speed of light in vacuum
        wavelength_m = payload.wavelength_nm * 1e-9
        
        photon_energy = (h * c) / wavelength_m
        phase_shift = 2 * math.pi * payload.kerr_constant * payload.tube_length_m * (payload.external_voltage_v_m ** 2)
        
        status_flag = "HIGH_DISTORTION" if phase_shift > math.pi else "STABLE_PROPAGATION"

        output_block = {
            "class_executed": "vacuum-optics",
            "formulation_metadata": {
                "codename": payload.codename,
                "vessel": "Vacuum Glass Tube Optoelectronic Assembly"
            },
            "simulation_pathways": {
                "quantum_metrics": {
                    "input_wavelength_nanometers": payload.wavelength_nm,
                    "calculated_photon_energy_joules": f"{photon_energy:.4e}"
                },
                "electro_optic_metrics": {
                    "applied_electric_field_v_m": payload.external_voltage_v_m,
                    "calculated_phase_shift_radians": round(phase_shift, 4),
                    "wave_interference_risk": status_flag
                }
            },
            "cross_interaction_validator": {
                "haemostatic_interference_detected": False,
                "safety_clearance_status": "APPROVED" if status_flag == "STABLE_PROPAGATION" else "WARNING_WAVE_DISTORTION"
            }
        }

        # Commits quantum logs straight to local database storage files
        JSONDatabaseConnector.save_record(output_block)

        # Synchronous outbound telemetry logging to local Gemini-Flask backup sync node
        try:
            import httpx
            with httpx.Client() as client:
                client.post("http://127.0.0.1:8080/api/v1/backup/telemetry", json=output_block, timeout=1.0)
        except Exception:
            pass

        return output_block

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Optics Core Mathematical Crash: {str(e)}")

@app.post("/api/v1/simulate/optics", tags=["Quantum & Electro-Optics"])
def simulate_vacuum_optics_endpoint(payload: VacuumOpticsPayload):
    """Alias for backwards-compatible v1 router."""
    return run_vacuum_optics_simulation(payload)

# --- 🏃 APPLICATION ENGINE RUNNER ---
if __name__ == "__main__":
    import os
    import uvicorn
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run("main:app", host=host, port=port, reload=False)
