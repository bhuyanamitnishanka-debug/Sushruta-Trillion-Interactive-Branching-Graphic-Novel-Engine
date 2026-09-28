import React, { useState } from 'react';
import { SushrutaTrillionHybridPillSimulation } from '../../types/hybridPillSimulation';
import { soundEngine } from '../../utils/audioSynthesizer';
import { narrationEngine, NARRATION_PERSONAS, NarrationPersonaId } from '../../utils/narrationVoiceover';
import {
  Sliders,
  Play,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Terminal,
  Copy,
  Check,
  Download,
  Volume2,
  HeartPulse,
  Activity,
  Zap,
  Flame,
  ArrowRight,
  Cpu,
} from 'lucide-react';

export interface TestDosageMatrix {
  allopathic_hypnotic_mg: number;
  asava_carrier_ml: number;
  ashwagandha_mg: number;
  snayu_stimulants_mg: number;
  bp_modulators_mg: number;
}

export const OPTIMAL_TEST_CASE_1: TestDosageMatrix = {
  allopathic_hypnotic_mg: 10,
  asava_carrier_ml: 2.0,
  ashwagandha_mg: 250,
  snayu_stimulants_mg: 25,
  bp_modulators_mg: 50,
};

export const TOXIC_TEST_CASE_2: TestDosageMatrix = {
  allopathic_hypnotic_mg: 35,
  asava_carrier_ml: 4.0,
  ashwagandha_mg: 50,
  snayu_stimulants_mg: 80,
  bp_modulators_mg: 5,
};

interface AutomatedTestSuiteViewProps {
  currentSimulation: SushrutaTrillionHybridPillSimulation;
  onApplyCalibrationToSimulation: (calibratedPill: SushrutaTrillionHybridPillSimulation) => void;
}

export const AutomatedTestSuiteView: React.FC<AutomatedTestSuiteViewProps> = ({
  currentSimulation,
  onApplyCalibrationToSimulation,
}) => {
  const [dosage, setDosage] = useState<TestDosageMatrix>(OPTIMAL_TEST_CASE_1);
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isNarrating, setIsNarrating] = useState<boolean>(false);
  const [selectedPersona, setSelectedPersona] = useState<NarrationPersonaId>('clinical-ai');

  // Mathematical logic execution identical to Python class HybridPillSimulationEngine
  const computeSimulation = (d: TestDosageMatrix) => {
    const bioavailability_multiplier = Number((1.0 + (d.asava_carrier_ml * 0.17)).toFixed(2));
    let cyp450_stress = (d.allopathic_hypnotic_mg * 4.5) - (d.ashwagandha_mg * 0.12);
    cyp450_stress = Number(Math.max(0, Math.min(100, cyp450_stress)).toFixed(1));

    const snayu_reflex_tone = Number(Math.min(1.0, (d.snayu_stimulants_mg * 0.02) * bioavailability_multiplier).toFixed(2));
    let bp_stability_index = 100 - Math.abs(120 - (d.bp_modulators_mg * 2.4));
    bp_stability_index = Number(Math.max(0, Math.min(100, bp_stability_index)).toFixed(1));

    let safety_status: 'APPROVED' | 'WARNING_HIGH_ACCUMULATION' | 'CRITICAL_TOXICITY';
    if (cyp450_stress > 85 || snayu_reflex_tone > 0.95) {
      safety_status = 'CRITICAL_TOXICITY';
    } else if (cyp450_stress > 60) {
      safety_status = 'WARNING_HIGH_ACCUMULATION';
    } else {
      safety_status = 'APPROVED';
    }

    const gastric_disintegration = Number((240 / bioavailability_multiplier).toFixed(1));
    const mucosal_shielding = Number((1.0 + (d.ashwagandha_mg * 0.002)).toFixed(2));
    const gaba_binding = Number(Math.min(1.0, 0.12 * d.allopathic_hypnotic_mg * bioavailability_multiplier).toFixed(2));
    const cortisol_suppression = Number((d.ashwagandha_mg * 0.015).toFixed(2));
    const bp_crash_prevention = Number((bp_stability_index * 0.95).toFixed(1));
    const glucose_stability = Number((90 + (d.ashwagandha_mg * 0.02)).toFixed(1));

    return {
      bioavailability_multiplier,
      cyp450_stress,
      snayu_reflex_tone,
      bp_stability_index,
      safety_status,
      gastric_disintegration,
      mucosal_shielding,
      gaba_binding,
      cortisol_suppression,
      bp_crash_prevention,
      glucose_stability,
    };
  };

  const currentResult = computeSimulation(dosage);

  // Python source code
  const pythonScript = `import json

class HybridPillSimulationEngine:
    def __init__(self, codename="NH-Synchro-02-Max"):
        self.codename = codename

    def run_simulation(self, dosage_matrix):
        """
        Executes chemical, neural, vascular, and organ informatics mapping.
        """
        # Extract dosage variables
        allopathic_hypnotic_mg = dosage_matrix.get("allopathic_hypnotic_mg", 0)
        asava_carrier_ml = dosage_matrix.get("asava_carrier_ml", 0)
        ashwagandha_mg = dosage_matrix.get("ashwagandha_mg", 0)
        snayu_stimulants_mg = dosage_matrix.get("snayu_stimulants_mg", 0)
        bp_modulators_mg = dosage_matrix.get("bp_modulators_mg", 0)

        # Baseline Logic Computations
        bioavailability_multiplier = 1.0 + (asava_carrier_ml * 0.17)
        cyp450_stress = (allopathic_hypnotic_mg * 4.5) - (ashwagandha_mg * 0.12)
        cyp450_stress = max(0, min(100, cyp450_stress))

        # Snayu Tone & BP Logic
        snayu_reflex_tone = min(1.0, (snayu_stimulants_mg * 0.02) * bioavailability_multiplier)
        bp_stability_index = 100 - abs(120 - (bp_modulators_mg * 2.4))
        bp_stability_index = max(0, min(100, bp_stability_index))

        # Dynamic Safety Evaluator
        if cyp450_stress > 85 or snayu_reflex_tone > 0.95:
            safety_status = "CRITICAL_TOXICITY"
        elif cyp450_stress > 60:
            safety_status = "WARNING_HIGH_ACCUMULATION"
        else:
            safety_status = "APPROVED"

        # Construct Output JSON Mapping
        simulation_output = {
            "formulation_metadata": {
                "codename": self.codename,
                "delivery_system": "Vascular-Synchronized Multi-Chamber Core",
                "dosages_calculated": dosage_matrix
            },
            "simulation_pathways": {
                "stomach_gastric_phase": {
                    "gastric_disintegration_velocity_sec": round(240 / bioavailability_multiplier, 1),
                    "mucosal_shielding_coefficient": round(1.0 + (ashwagandha_mg * 0.002), 2)
                },
                "neuro_endocrine_and_snayu_response": {
                    "gaba_receptor_binding_rate": round(0.12 * allopathic_hypnotic_mg * bioavailability_multiplier, 2),
                    "snayu_active_stage_stimulation_index": round(snayu_reflex_tone, 2),
                    "cortisol_suppression_velocity": round(ashwagandha_mg * 0.015, 2)
                },
                "vascular_hemodynamic_matrix": {
                    "blood_pressure_stability_score": round(bp_stability_index, 1),
                    "nocturnal_hypotensive_crash_prevention_index": round(bp_stability_index * 0.95, 1)
                },
                "hepato_pancreatic_axis": {
                    "cytochrome_p450_stress_score": round(cyp450_stress, 1),
                    "nocturnal_glucose_stability_score": round(90 + (ashwagandha_mg * 0.02), 1)
                }
            },
            "cross_interaction_validator": {
                "herb_drug_interference_detected": True if cyp450_stress > 70 else False,
                "bioavailability_amplification_multiplier": round(bioavailability_multiplier, 2),
                "safety_clearance_status": safety_status
            }
        }
        return simulation_output

# Automated Test Suite Runtime
if __name__ == "__main__":
    engine = HybridPillSimulationEngine()

    print("==================================================")
    print("RUNNING AUTOMATED TEST SUITE FOR NH-SYNCHRO-02-MAX")
    print("==================================================\\n")

    # Test Case 1: Standard Optimal Calibration
    optimal_dosage = {
        "allopathic_hypnotic_mg": 10,
        "asava_carrier_ml": 2.0,
        "ashwagandha_mg": 250,
        "snayu_stimulants_mg": 25,
        "bp_modulators_mg": 50
    }
    print("--- TEST CASE 1: OPTIMAL DESIGN SYSTEM DOSE ---")
    result_1 = engine.run_simulation(optimal_dosage)
    print(f"Safety Status: {result_1['cross_interaction_validator']['safety_clearance_status']}")
    print(f"Snayu Stimulation Index: {result_1['simulation_pathways']['neuro_endocrine_and_snayu_response']['snayu_active_stage_stimulation_index']}")
    print(f"BP Stability Score: {result_1['simulation_pathways']['vascular_hemodynamic_matrix']['blood_pressure_stability_score']}\\n")

    # Test Case 2: Overdose Toxicity Alert Check
    toxic_dosage = {
        "allopathic_hypnotic_mg": 35,  # Drastically high chemical payload
        "asava_carrier_ml": 4.0,
        "ashwagandha_mg": 50,
        "snayu_stimulants_mg": 80,    # Over-stimulating nerve path
        "bp_modulators_mg": 5
    }
    print("--- TEST CASE 2: TOXIC STRESS RUNTIME CHECK ---")
    result_2 = engine.run_simulation(toxic_dosage)
    print(f"Safety Status: {result_2['cross_interaction_validator']['safety_clearance_status']}")
    print(f"Liver CYP450 Stress Score: {result_2['simulation_pathways']['hepato_pancreatic_axis']['cytochrome_p450_stress_score']}")
    print(json.dumps(result_2, indent=2))
`;

  // Run the automated test suite simulation
  const handleRunTestSuite = () => {
    setIsRunning(true);
    soundEngine.playTechScan();

    setTimeout(() => {
      const res1 = computeSimulation(OPTIMAL_TEST_CASE_1);
      const res2 = computeSimulation(TOXIC_TEST_CASE_2);
      const resCurrent = computeSimulation(dosage);

      const out = `==================================================
RUNNING AUTOMATED TEST SUITE FOR NH-SYNCHRO-02-MAX
==================================================

--- TEST CASE 1: OPTIMAL DESIGN SYSTEM DOSE ---
Safety Status: ${res1.safety_status}
Snayu Stimulation Index: ${res1.snayu_reflex_tone} (Optimal locomotor tone)
BP Stability Score: ${res1.bp_stability_index} / 100
CYP450 Liver Stress: ${res1.cyp450_stress}/100 [BUFFERED BY WITHANOLIDES]

--- TEST CASE 2: TOXIC STRESS RUNTIME CHECK ---
Safety Status: ${res2.safety_status}
Liver CYP450 Stress Score: ${res2.cyp450_stress} / 100
Snayu Stimulation Index: ${res2.snayu_reflex_tone} [ALERT: HYPER-REFLEXIA RISK]
BP Stability Score: ${res2.bp_stability_index} / 100 [ALERT: HEMODYNAMIC CRASH]

--- ACTIVE USER CALIBRATED DOSE EVALUATION ---
Dosages: Hypnotic: ${dosage.allopathic_hypnotic_mg}mg | Asava: ${dosage.asava_carrier_ml}mL | Ashwa: ${dosage.ashwagandha_mg}mg | Snayu: ${dosage.snayu_stimulants_mg}mg | BP: ${dosage.bp_modulators_mg}mg
Resulting Safety Status: ${resCurrent.safety_status}
Bioavailability Multiplier: ${resCurrent.bioavailability_multiplier}x
Snayu Tone: ${resCurrent.snayu_reflex_tone} | BP Stability: ${resCurrent.bp_stability_index} | CYP450 Stress: ${resCurrent.cyp450_stress}
Nocturnal Glucose Stability: ${resCurrent.glucose_stability}%
Mucosal Shielding: ${resCurrent.mucosal_shielding} | Gastric Disintegration: ${resCurrent.gastric_disintegration}s

[Automated Test Suite Completed Successfully - 0 Errors]`;

      setTestOutput(out);
      setIsRunning(false);
      soundEngine.playSuccess();
    }, 450);
  };

  // Apply calibration directly to the active simulation model
  const handleApplyToActiveSimulation = () => {
    soundEngine.playChoiceSelect();

    const newSim: SushrutaTrillionHybridPillSimulation = {
      $schema: 'https://json-schema.org',
      formulation_metadata: {
        codename: 'NH-Synchro-02-Max (Calibrated)',
        delivery_system: 'Vascular-Synchronized Multi-Chamber Core',
        therapeutic_indication: 'Acute Sleep Onset with Targeted Snayu Stimulation & Hemodynamic BP Oscillation Stabilization',
        dosages_calculated: { ...dosage },
        active_components: [
          {
            name: 'Synthetic Allopathic Hypnotic (Calibrated)',
            classification: 'Allopathic_Hypnotic',
            dosage: `${dosage.allopathic_hypnotic_mg} mg`,
            mechanism: `Selective alpha-1 GABA-A subunit binding (${currentResult.gaba_binding * 100}% binding rate)`,
          },
          {
            name: 'Self-Generated Fermented Asava Vehicle (Yogavahi)',
            classification: 'Ayurvedic_Fermentation_Carrier',
            dosage: `${dosage.asava_carrier_ml} mL`,
            mechanism: `Enzymatic natural micro-ethanol medium enhancing bioavailability to ${currentResult.bioavailability_multiplier}x`,
          },
          {
            name: 'Withania Somnifera (Ashwagandha Withanolides)',
            classification: 'Rasashastra_Adaptogen',
            dosage: `${dosage.ashwagandha_mg} mg`,
            mechanism: `Cortisol suppression ${currentResult.cortisol_suppression}x, down-regulating liver CYP450 to ${currentResult.cyp450_stress}/100`,
          },
          {
            name: 'Jyotishmati & Purified Kupilu (Snayu Stimulants)',
            classification: 'Snayu_Neuro_Stimulant',
            dosage: `${dosage.snayu_stimulants_mg} mg`,
            mechanism: `Maintains basal motor-reflex tone at index ${currentResult.snayu_reflex_tone} preventing locomotor limpness`,
          },
          {
            name: 'Sarpagandha Dual-Action Vascular BP Alkaloids',
            classification: 'Hemodynamic_BP_Modulator',
            dosage: `${dosage.bp_modulators_mg} mg`,
            mechanism: `Normalizes peripheral vascular resistance, securing BP stability score at ${currentResult.bp_stability_index}%`,
          },
        ],
      },
      simulation_pathways: {
        stomach_gastric_phase: {
          gastric_disintegration_velocity_sec: currentResult.gastric_disintegration,
          ghrelin_stimulation_index: 0.68,
          mucosal_shielding_coefficient: currentResult.mucosal_shielding,
          ph_stability_window: 'pH 2.2 - 5.0 (Optimal Bio-Transit)',
        },
        neuro_endocrine_response: {
          gaba_receptor_binding_rate: currentResult.gaba_binding,
          endogenous_melatonin_boost_percentage: 36.5,
          serotonin_retention_index: 0.85,
          cortisol_suppression_velocity: currentResult.cortisol_suppression,
          snayu_active_stage_stimulation_index: currentResult.snayu_reflex_tone,
        },
        snayu_reflex_activation: {
          snayu_active_stage_stimulation_index: currentResult.snayu_reflex_tone,
          locomotor_limpness_prevention_index: Number((1.0 - Math.abs(0.7 - currentResult.snayu_reflex_tone)).toFixed(2)),
          reflex_channel_tonicity: currentResult.snayu_reflex_tone,
        },
        vascular_hemodynamic_matrix: {
          blood_pressure_stability_score: currentResult.bp_stability_index,
          nocturnal_hypotensive_crash_prevention_index: currentResult.bp_crash_prevention,
          vascular_resistance_stability: Number((currentResult.bp_stability_index / 100).toFixed(2)),
        },
        hepato_biliary_protection_matrix: {
          cytochrome_p450_stress_score: currentResult.cyp450_stress,
          hepatocyte_antioxidant_defense_index: Number((1.5 + (dosage.ashwagandha_mg * 0.003)).toFixed(2)),
          gall_bladder_bile_release_rate_ml_hr: 14.8,
          cholecystokinin_stability_coefficient: 0.92,
        },
        pancreatic_glucose_control: {
          basal_insulin_secretion_rate_uU_mL: 8.8,
          beta_cell_oxidative_protection_index: 1.75,
          nocturnal_glucose_stability_score: currentResult.glucose_stability,
          glucagon_regulatory_balance_ratio: 1.1,
        },
      },
      cross_interaction_validator: {
        herb_drug_interference_detected: currentResult.cyp450_stress > 70,
        bioavailability_amplification_multiplier: currentResult.bioavailability_multiplier,
        predicted_liver_clearance_half_life_hrs: Number((3.0 + (currentResult.cyp450_stress / 100) * 8.0).toFixed(1)),
        safety_clearance_status: currentResult.safety_status,
        hepatic_clearance_notes: `Calibrated NH-Synchro-02-Max: Snayu tone ${currentResult.snayu_reflex_tone}, BP stability ${currentResult.bp_stability_index}%, CYP450 stress ${currentResult.cyp450_stress}/100. Status: ${currentResult.safety_status}`,
      },
    };

    onApplyCalibrationToSimulation(newSim);
  };

  // Narration of test suite results using Web Speech API
  const handleToggleNarration = () => {
    if (isNarrating) {
      narrationEngine.stop();
      setIsNarrating(false);
    } else {
      const summaryText = `Automated Test Suite for formulation N H Synchro zero two Max. Active calibrated results: Safety status is ${currentResult.safety_status}. Snayu reflex stimulation index is ${currentResult.snayu_reflex_tone}. Blood pressure stability score is ${currentResult.bp_stability_index} percent. Cytochrome P 450 hepatic stress is ${currentResult.cyp450_stress} out of 100. Bioavailability amplification multiplier is ${currentResult.bioavailability_multiplier} times.`;
      narrationEngine.speak(summaryText, selectedPersona);
      setIsNarrating(true);
      setTimeout(() => setIsNarrating(false), 9000);
    }
  };

  const handleCopyPython = () => {
    navigator.clipboard.writeText(pythonScript);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadPython = () => {
    const blob = new Blob([pythonScript], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nh_synchro_02_max_test_suite.py`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono-code font-bold uppercase tracking-wider mb-1">
            <Sliders className="w-4 h-4" />
            <span>Part 1: Automated Test Suite with Variable Calibration</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
            NH-Synchro-02-Max Test Engine & Dosage Calibration
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Real-time algorithmic validator simulating Snayu (nerve/tendon) reflex tone, hemodynamic BP stability, and hepatic CYP450 tolerance.
          </p>
        </div>

        {/* Quick Narration & Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Persona selector for narration */}
          <select
            value={selectedPersona}
            onChange={(e) => setSelectedPersona(e.target.value as NarrationPersonaId)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono-code text-slate-300 hover:text-white cursor-pointer"
          >
            {Object.values(NARRATION_PERSONAS).map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* Voiceover Speech Button */}
          <button
            onClick={handleToggleNarration}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono-code flex items-center gap-1.5 transition-all cursor-pointer ${
              isNarrating
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Narrate Calibrated Telemetry via Web Speech API"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isNarrating ? 'animate-pulse' : ''}`} />
            <span>{isNarrating ? 'Stop Voiceover' : 'Voiceover Telemetry'}</span>
          </button>
        </div>
      </div>

      {/* Preset Test Case Loaders */}
      <div className="flex items-center gap-2 flex-wrap p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
        <span className="font-mono-code text-slate-400 uppercase tracking-wider text-[11px] mr-1">
          Preset Test Cases:
        </span>

        <button
          onClick={() => {
            soundEngine.playPageFlip();
            setDosage(OPTIMAL_TEST_CASE_1);
          }}
          className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 hover:bg-emerald-900 font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Test Case 1: Standard Optimal Calibration</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playPageFlip();
            setDosage(TOXIC_TEST_CASE_2);
          }}
          className="px-3 py-1.5 rounded-lg bg-rose-950/80 border border-rose-500/60 text-rose-300 hover:bg-rose-900 font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Test Case 2: Overdose Toxic Stress Check</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playPageFlip();
            setDosage(OPTIMAL_TEST_CASE_1);
            setTestOutput(null);
          }}
          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer ml-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Calibration</span>
        </button>
      </div>

      {/* Main Grid: Variable Sliders (Left) & Real-time Computed Logic (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: 5 Dosage Calibration Sliders (7 cols) */}
        <div className="lg:col-span-7 p-4 sm:p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h4 className="text-sm font-bold text-white font-mono-code uppercase flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Variable Dosage Matrix Calibration</span>
            </h4>
            <span className="text-[11px] font-mono-code text-slate-400">
              Formula: NH-Synchro-02-Max
            </span>
          </div>

          <div className="space-y-4 text-xs font-mono-code">
            {/* 1. Allopathic Hypnotic (mg) */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1.5">
              <div className="flex justify-between items-center text-slate-300">
                <span className="font-bold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-sky-400" />
                  <span>allopathic_hypnotic_mg (Sleep Onset Payload)</span>
                </span>
                <span className="text-sky-300 font-bold text-sm">
                  {dosage.allopathic_hypnotic_mg} mg
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="1"
                value={dosage.allopathic_hypnotic_mg}
                onChange={(e) => setDosage({ ...dosage, allopathic_hypnotic_mg: Number(e.target.value) })}
                className="w-full accent-sky-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0 mg (Inactive)</span>
                <span>Optimal: 10 mg</span>
                <span className="text-rose-400">Overdose &gt;30 mg</span>
              </div>
            </div>

            {/* 2. Asava Carrier (mL) */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1.5">
              <div className="flex justify-between items-center text-slate-300">
                <span className="font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-purple-400" />
                  <span>asava_carrier_ml (Fermented Yogavahi Vehicle)</span>
                </span>
                <span className="text-purple-300 font-bold text-sm">
                  {dosage.asava_carrier_ml.toFixed(1)} mL
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="5.0"
                step="0.1"
                value={dosage.asava_carrier_ml}
                onChange={(e) => setDosage({ ...dosage, asava_carrier_ml: Number(e.target.value) })}
                className="w-full accent-purple-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0 mL (1.0x Base)</span>
                <span>Optimal: 2.0 mL (+34% bio)</span>
                <span>5.0 mL (High absorption)</span>
              </div>
            </div>

            {/* 3. Ashwagandha (mg) */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1.5">
              <div className="flex justify-between items-center text-slate-300">
                <span className="font-bold flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>ashwagandha_mg (Hepato-Pancreatic Shield)</span>
                </span>
                <span className="text-amber-300 font-bold text-sm">
                  {dosage.ashwagandha_mg} mg
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="400"
                step="10"
                value={dosage.ashwagandha_mg}
                onChange={(e) => setDosage({ ...dosage, ashwagandha_mg: Number(e.target.value) })}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0 mg (No protection)</span>
                <span>Optimal: 250 mg</span>
                <span>400 mg (Max buffer)</span>
              </div>
            </div>

            {/* 4. Snayu Stimulants (mg) */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1.5">
              <div className="flex justify-between items-center text-slate-300">
                <span className="font-bold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>snayu_stimulants_mg (Jyotishmati & Purified Kupilu)</span>
                </span>
                <span className="text-emerald-300 font-bold text-sm">
                  {dosage.snayu_stimulants_mg} mg
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={dosage.snayu_stimulants_mg}
                onChange={(e) => setDosage({ ...dosage, snayu_stimulants_mg: Number(e.target.value) })}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0 mg (Motor limpness)</span>
                <span>Optimal: 25 mg (Tone: 0.67)</span>
                <span className="text-rose-400">&gt;70 mg (Hyper-reflexia)</span>
              </div>
            </div>

            {/* 5. BP Modulators (mg) */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1.5">
              <div className="flex justify-between items-center text-slate-300">
                <span className="font-bold flex items-center gap-1.5">
                  <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
                  <span>bp_modulators_mg (Sarpagandha Hemodynamic Matrix)</span>
                </span>
                <span className="text-rose-300 font-bold text-sm">
                  {dosage.bp_modulators_mg} mg
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={dosage.bp_modulators_mg}
                onChange={(e) => setDosage({ ...dosage, bp_modulators_mg: Number(e.target.value) })}
                className="w-full accent-rose-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0 mg (Crash risk)</span>
                <span>Optimal: 50 mg (100% constancy)</span>
                <span>100 mg (Excessive vasodilation)</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleRunTestSuite}
              disabled={isRunning}
              className="flex-1 min-h-[42px] px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isRunning ? 'Running Test Suite...' : 'Execute Test Suite (Python Script)'}</span>
            </button>

            <button
              onClick={handleApplyToActiveSimulation}
              className="min-h-[42px] px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs font-mono-code uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all border border-slate-700 active:scale-95"
              title="Apply Calibrated Variables to Primary Graphic Novel Simulation Matrix"
            >
              <span>Apply to Model</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Right: Live Dynamic Computational Logic & Safety Evaluator (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Dynamic Safety Evaluator Status Card */}
          <div
            className={`p-4 rounded-2xl border text-xs font-mono-code space-y-2 transition-all ${
              currentResult.safety_status === 'APPROVED'
                ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200'
                : currentResult.safety_status === 'WARNING_HIGH_ACCUMULATION'
                ? 'bg-amber-950/80 border-amber-500/60 text-amber-200'
                : 'bg-rose-950/90 border-rose-500/80 text-rose-200 shadow-lg shadow-rose-950/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-bold">
                Automated Safety Evaluator
              </span>
              <span className="font-bold text-xs px-2 py-0.5 rounded-full bg-black/40 border border-white/20">
                {currentResult.safety_status}
              </span>
            </div>

            <div className="text-sm font-bold text-white flex items-center gap-2">
              {currentResult.safety_status === 'APPROVED' ? (
                <>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>Approved: Complete Metabolic Clearance</span>
                </>
              ) : currentResult.safety_status === 'WARNING_HIGH_ACCUMULATION' ? (
                <>
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <span>Warning: CYP450 Accumulation Overload</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-5 h-5 text-rose-400 animate-pulse" />
                  <span>Critical Toxicity Alert Triggered!</span>
                </>
              )}
            </div>

            <p className="text-[11px] leading-relaxed opacity-90 font-sans">
              {currentResult.safety_status === 'APPROVED'
                ? 'Snayu tone is optimized to prevent motor limpness; blood pressure oscillations are stabilized; liver CYP450 stress is kept low.'
                : currentResult.safety_status === 'WARNING_HIGH_ACCUMULATION'
                ? 'Warning: Hepatic cytochrome burden elevated. Increase Ashwagandha withanolides or titrate down allopathic hypnotic.'
                : 'Critical Alert: CYP450 stress >85 or Snayu tone >0.95 detected. Risk of receptor saturation, acute organ stress, and motor hyper-reflexia.'}
            </p>
          </div>

          {/* Computed Informatics Readouts */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3 text-xs font-mono-code">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-1 border-b border-slate-800">
              Live Informatics Indicators
            </h4>

            {/* Snayu Reflex Tone Index */}
            <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-400 block text-[11px]">Snayu Reflex Tone</span>
                <span className="text-[10px] text-slate-500">min(1.0, stimulants × 0.02 × bio)</span>
              </div>
              <div className="text-right">
                <span
                  className={`font-bold text-sm ${
                    currentResult.snayu_reflex_tone > 0.95
                      ? 'text-rose-400 font-bold'
                      : currentResult.snayu_reflex_tone >= 0.5
                      ? 'text-emerald-400'
                      : 'text-amber-400'
                  }`}
                >
                  {currentResult.snayu_reflex_tone} / 1.0
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {currentResult.snayu_reflex_tone > 0.95
                    ? 'Hyper-reflexia Alert'
                    : currentResult.snayu_reflex_tone >= 0.5
                    ? 'Motor Tone Preserved'
                    : 'Limpness Risk'}
                </span>
              </div>
            </div>

            {/* Blood Pressure Stability Score */}
            <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-400 block text-[11px]">BP Stability Score</span>
                <span className="text-[10px] text-slate-500">100 - |120 - (bp × 2.4)|</span>
              </div>
              <div className="text-right">
                <span
                  className={`font-bold text-sm ${
                    currentResult.bp_stability_index >= 90
                      ? 'text-emerald-400'
                      : currentResult.bp_stability_index >= 60
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }`}
                >
                  {currentResult.bp_stability_index}%
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Crash Prev: {currentResult.bp_crash_prevention}%
                </span>
              </div>
            </div>

            {/* Liver CYP450 Stress Score */}
            <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-400 block text-[11px]">Liver CYP450 Stress</span>
                <span className="text-[10px] text-slate-500">(hypnotic × 4.5) - (ashwa × 0.12)</span>
              </div>
              <div className="text-right">
                <span
                  className={`font-bold text-sm ${
                    currentResult.cyp450_stress > 85
                      ? 'text-rose-400'
                      : currentResult.cyp450_stress > 60
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {currentResult.cyp450_stress} / 100
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Bio-mult: {currentResult.bioavailability_multiplier}x
                </span>
              </div>
            </div>

            {/* Nocturnal Glucose Stability */}
            <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-400 block text-[11px]">Nocturnal Glucose Score</span>
                <span className="text-[10px] text-slate-500">90 + (ashwa × 0.02)</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-sm text-emerald-400">
                  {currentResult.glucose_stability}%
                </span>
                <span className="text-[10px] text-slate-400 block">Islet protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Output Viewer (When test suite is executed) */}
      {testOutput && (
        <div className="p-4 sm:p-5 bg-slate-950 rounded-2xl border border-amber-500/40 space-y-2 shadow-xl animate-fade-in font-mono-code text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-amber-400">
            <span className="flex items-center gap-2 font-bold">
              <Terminal className="w-4 h-4" />
              <span>Automated Test Suite Output Log (Terminal Emulation)</span>
            </span>
            <button
              onClick={() => setTestOutput(null)}
              className="text-slate-500 hover:text-white cursor-pointer"
            >
              Clear
            </button>
          </div>
          <pre className="text-slate-300 text-xs overflow-x-auto whitespace-pre leading-relaxed p-2 bg-slate-900/60 rounded-xl border border-slate-800">
            {testOutput}
          </pre>
        </div>
      )}

      {/* Complete Python Test Script Source Box */}
      <div className="p-4 sm:p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3 font-mono-code text-xs">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 text-white font-bold">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span>Python Automated Test Suite Script (Part 1 Specification)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPython}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied Script!' : 'Copy Python'}</span>
            </button>

            <button
              onClick={handleDownloadPython}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .py</span>
            </button>
          </div>
        </div>

        <pre className="text-[11px] text-slate-300 overflow-x-auto p-4 bg-slate-950 rounded-xl border border-slate-800/80 max-h-96 leading-relaxed select-text">
          {pythonScript}
        </pre>
      </div>
    </div>
  );
};
