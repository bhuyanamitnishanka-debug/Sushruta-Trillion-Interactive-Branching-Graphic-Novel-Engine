import React, { useState } from 'react';
import {
  SushrutaTrillionHybridPillSimulation,
  ActiveComponent,
  ActiveComponentClassification,
  PancreaticGlucoseControl,
} from '../../types/hybridPillSimulation';
import { PRESET_PILL_SIMULATIONS } from '../../data/presetPillSimulations';
import { Story, StoryNode } from '../../types/graphicNovel';
import { soundEngine } from '../../utils/audioSynthesizer';
import { narrationEngine, NARRATION_PERSONAS, NarrationPersonaId } from '../../utils/narrationVoiceover';
import { AutomatedTestSuiteView } from './AutomatedTestSuiteView';
import { BiochemFoundationsAndBatchView } from './BiochemFoundationsAndBatchView';
import { PatentSpecificationView } from './PatentSpecificationView';
import { DevOpsEnterpriseHub } from './DevOpsEnterpriseHub';
import {
  Pill,
  Activity,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Flame,
  Layers,
  Sparkles,
  Download,
  Copy,
  Check,
  BookOpen,
  FileCode,
  FileText,
  HeartPulse,
  Scale,
  RefreshCw,
  Play,
  Terminal,
  ShieldAlert,
  ArrowRight,
  Sliders,
  Volume2,
  Award,
  Cpu,
  BarChart3,
} from 'lucide-react';

interface HybridPillSimulationViewProps {
  currentStory: Story;
  onAddStoryNodeAndPlay: (node: StoryNode) => void;
}

export const HybridPillSimulationView: React.FC<HybridPillSimulationViewProps> = ({
  currentStory,
  onAddStoryNodeAndPlay,
}) => {
  const [simulation, setSimulation] = useState<SushrutaTrillionHybridPillSimulation>(
    PRESET_PILL_SIMULATIONS[0]
  );
  const [activeSubTab, setActiveSubTab] = useState<'visual' | 'testsuite' | 'batch-tester' | 'python' | 'patent' | 'toxicity' | 'json' | 'repo-layout'>('visual');
  const [copied, setCopied] = useState<boolean>(false);
  const [pythonCopied, setPythonCopied] = useState<boolean>(false);
  const [patentCopied, setPatentCopied] = useState<boolean>(false);
  const [isGeneratingStory, setIsGeneratingStory] = useState<boolean>(false);
  const [pyRunOutput, setPyRunOutput] = useState<string | null>(null);
  const [isRunningPy, setIsRunningPy] = useState<boolean>(false);
  const [isNarratingOverview, setIsNarratingOverview] = useState<boolean>(false);
  const [selectedPersona, setSelectedPersona] = useState<NarrationPersonaId>('clinical-ai');

  // Quick preset selector
  const handleSelectPreset = (index: number) => {
    soundEngine.playPageFlip();
    setSimulation(JSON.parse(JSON.stringify(PRESET_PILL_SIMULATIONS[index])));
    setPyRunOutput(null);
  };

  // Copy JSON Schema
  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(simulation, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download JSON file
  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(simulation, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${simulation.formulation_metadata.codename.toLowerCase().replace(/[^a-z0-9]/g, '_')}_simulation.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Executable Python Simulation Script text
  const pythonScriptCode = `#!/usr/bin/env python3
"""
Sushruta-Trillion: Hybrid Allopathy & Ayur-Chemo-Informatics Simulation Engine
Script: nh_synchro_sim.py
Models: Brain + Liver + Stomach + Pancreatic Glycemic Synchronization Dynamics
Target Formulation: ${simulation.formulation_metadata.codename}
"""

import json
import math

def run_hybrid_pill_simulation():
    # Extended JSON object modeling Brain + Liver + Stomach + Pancreas dynamics
    simulation_output = {
        "formulation_metadata": {
            "codename": "${simulation.formulation_metadata.codename}",
            "delivery_system": "${simulation.formulation_metadata.delivery_system}",
            "active_components": ${JSON.stringify(simulation.formulation_metadata.active_components, null, 12)}
        },
        "simulation_pathways": {
            "stomach_gastric_phase": {
                "gastric_disintegration_velocity_sec": ${simulation.simulation_pathways.stomach_gastric_phase.gastric_disintegration_velocity_sec},
                "ghrelin_stimulation_index": ${simulation.simulation_pathways.stomach_gastric_phase.ghrelin_stimulation_index},
                "mucosal_shielding_coefficient": ${simulation.simulation_pathways.stomach_gastric_phase.mucosal_shielding_coefficient}
            },
            "neuro_endocrine_response": {
                "gaba_receptor_binding_rate": ${simulation.simulation_pathways.neuro_endocrine_response.gaba_receptor_binding_rate},
                "endogenous_melatonin_boost_percentage": ${simulation.simulation_pathways.neuro_endocrine_response.endogenous_melatonin_boost_percentage},
                "serotonin_retention_index": ${simulation.simulation_pathways.neuro_endocrine_response.serotonin_retention_index},
                "cortisol_suppression_velocity": ${simulation.simulation_pathways.neuro_endocrine_response.cortisol_suppression_velocity}
            },
            "hepato_biliary_protection_matrix": {
                "cytochrome_p450_stress_score": ${simulation.simulation_pathways.hepato_biliary_protection_matrix.cytochrome_p450_stress_score},
                "hepatocyte_antioxidant_defense_index": ${simulation.simulation_pathways.hepato_biliary_protection_matrix.hepatocyte_antioxidant_defense_index},
                "gall_bladder_bile_release_rate_ml_hr": ${simulation.simulation_pathways.hepato_biliary_protection_matrix.gall_bladder_bile_release_rate_ml_hr},
                "cholecystokinin_stability_coefficient": ${simulation.simulation_pathways.hepato_biliary_protection_matrix.cholecystokinin_stability_coefficient}
            },
            "pancreatic_glucose_control": {
                "basal_insulin_secretion_rate_uU_mL": ${simulation.simulation_pathways.pancreatic_glucose_control?.basal_insulin_secretion_rate_uU_mL ?? 8.5},
                "beta_cell_oxidative_protection_index": ${simulation.simulation_pathways.pancreatic_glucose_control?.beta_cell_oxidative_protection_index ?? 1.62},
                "nocturnal_glucose_stability_score": ${simulation.simulation_pathways.pancreatic_glucose_control?.nocturnal_glucose_stability_score ?? 94.5},
                "glucagon_regulatory_balance_ratio": ${simulation.simulation_pathways.pancreatic_glucose_control?.glucagon_regulatory_balance_ratio ?? 1.12}
            }
        },
        "cross_interaction_validator": {
            "herb_drug_interference_detected": ${simulation.cross_interaction_validator.herb_drug_interference_detected ? 'True' : 'False'},
            "bioavailability_amplification_multiplier": ${simulation.cross_interaction_validator.bioavailability_amplification_multiplier},
            "predicted_liver_clearance_half_life_hrs": ${simulation.cross_interaction_validator.predicted_liver_clearance_half_life_hrs},
            "safety_clearance_status": "${simulation.cross_interaction_validator.safety_clearance_status}"
        }
    }
    
    # Mathematical Validation Diagnostics
    cyp_stress = simulation_output["simulation_pathways"]["hepato_biliary_protection_matrix"]["cytochrome_p450_stress_score"]
    pancreas_score = simulation_output["simulation_pathways"]["pancreatic_glucose_control"]["nocturnal_glucose_stability_score"]
    gaba_rate = simulation_output["simulation_pathways"]["neuro_endocrine_response"]["gaba_receptor_binding_rate"]
    
    print("=" * 70)
    print("SUSHRUTA-TRILLION: HYBRID PHARMACOLOGICAL SIMULATION RESULTS")
    print(f"Formulation: {simulation_output['formulation_metadata']['codename']}")
    print(f"Safety Status: {simulation_output['cross_interaction_validator']['safety_clearance_status']}")
    print("-" * 70)
    print(f" [BRAIN VECTOR]      GABA Binding Velocity: {gaba_rate * 100:.1f}%")
    print(f" [HEPATIC VECTOR]    CYP450 Stress Index:   {cyp_stress}/100")
    print(f" [PANCREAS VECTOR]   Glucose Stability:     {pancreas_score}%")
    print(f" [CLEARANCE VECTOR]  Half-Life:             {simulation_output['cross_interaction_validator']['predicted_liver_clearance_half_life_hrs']} hrs")
    print("=" * 70)
    
    return simulation_output

if __name__ == "__main__":
    result = run_hybrid_pill_simulation()
    print(json.dumps(result, indent=2))
`;

  // Run Python emulation in browser
  const handleRunPython = () => {
    setIsRunningPy(true);
    soundEngine.playTechScan();
    setTimeout(() => {
      const cyp = simulation.simulation_pathways.hepato_biliary_protection_matrix.cytochrome_p450_stress_score;
      const gaba = simulation.simulation_pathways.neuro_endocrine_response.gaba_receptor_binding_rate;
      const glucose = simulation.simulation_pathways.pancreatic_glucose_control?.nocturnal_glucose_stability_score ?? 94.5;
      const halfLife = simulation.cross_interaction_validator.predicted_liver_clearance_half_life_hrs;
      const safety = simulation.cross_interaction_validator.safety_clearance_status;

      const output = `======================================================================
SUSHRUTA-TRILLION: HYBRID PHARMACOLOGICAL SIMULATION RESULTS
Formulation: ${simulation.formulation_metadata.codename}
Delivery System: ${simulation.formulation_metadata.delivery_system}
Safety Status: ${safety}
----------------------------------------------------------------------
 [STOMACH VECTOR]   Disintegration: ${simulation.simulation_pathways.stomach_gastric_phase.gastric_disintegration_velocity_sec}s | Mucosal Shield: ${simulation.simulation_pathways.stomach_gastric_phase.mucosal_shielding_coefficient.toFixed(2)}
 [BRAIN VECTOR]     GABA-A Binding: ${(gaba * 100).toFixed(1)}% | Cortisol Suppression: ${simulation.simulation_pathways.neuro_endocrine_response.cortisol_suppression_velocity.toFixed(2)}x
 [HEPATIC VECTOR]   CYP450 Stress:  ${cyp}/100 | Hepatocyte Defense: ${simulation.simulation_pathways.hepato_biliary_protection_matrix.hepatocyte_antioxidant_defense_index.toFixed(2)}
 [PANCREAS VECTOR]  Glucose Stability: ${glucose}% | Basal Insulin: ${simulation.simulation_pathways.pancreatic_glucose_control?.basal_insulin_secretion_rate_uU_mL ?? 8.5} uU/mL
 [BIO-ENHANCEMENT]  Bioavailability Multiplier: ${simulation.cross_interaction_validator.bioavailability_amplification_multiplier}x
 [CLEARANCE]        Predicted Liver Half-Life: ${halfLife} hrs
======================================================================
CLINICAL VERDICT: ${
        safety === 'APPROVED'
          ? '✓ OPTIMAL SYNERGY: Dual-chamber matrix shields hepatic microsomal enzymes and sustains nocturnal basal insulin.'
          : safety === 'WARNING_HIGH_ACCUMULATION'
          ? '⚠ WARNING: Elevation in CYP450 microsomal burden detected. Consider titrating fermented Asava ratio upward.'
          : '🚨 CRITICAL TOXICITY INTERFERENCE: High metabolic stagnation detected. Immediate antidotal bio-buffering required.'
      }

[Process completed with exit code 0]`;

      setPyRunOutput(output);
      setIsRunningPy(false);
    }, 600);
  };

  const handleCopyPython = () => {
    navigator.clipboard.writeText(pythonScriptCode);
    setPythonCopied(true);
    setTimeout(() => setPythonCopied(false), 2000);
  };

  const handleDownloadPython = () => {
    const blob = new Blob([pythonScriptCode], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nh_synchro_01_sim.py`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Convert simulated pill into a graphic novel episode
  const handleConvertSimulationToStoryNode = async () => {
    setIsGeneratingStory(true);
    soundEngine.playTechScan();

    try {
      const response = await fetch('/api/simulation/generate-story-from-pill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ simulation }),
      });

      const data = await response.json();
      if (data.success && data.node) {
        const rawNode = data.node;
        const newNodeId = `node-pill-trial-${Date.now()}`;

        const formattedNode: StoryNode = {
          id: newNodeId,
          title: rawNode.title || `Trial: ${simulation.formulation_metadata.codename}`,
          caption: rawNode.caption || 'Simulated hybrid pharmacological response underway.',
          panels: (rawNode.panels || []).map((p: any, idx: number) => ({
            id: `p-${Date.now()}-${idx}`,
            sceneType: (p.sceneType as any) || (idx === 0 ? 'molecular-dock' : idx === 1 ? 'cellular-mitochondria' : 'pancreatic-islet'),
            shotType: p.shotType || 'dynamic-close',
            motionEffect: (idx % 2 === 0 ? 'zoom-in' : 'pan-left') as any,
            dialogues: (p.dialogue || []).map((d: any, dIdx: number) => ({
              id: `d-${Date.now()}-${idx}-${dIdx}`,
              speaker: d.speaker || (dIdx === 0 ? 'Dr. Kavi' : 'Vaidya Ananya'),
              type: d.type || 'speech',
              text: d.text || 'Pathways are stabilizing within expected parameters.',
            })),
            sfxDecals: p.sfx
              ? [
                  {
                    id: `sfx-${Date.now()}-${idx}`,
                    text: p.sfx,
                    x: 50,
                    y: 35,
                    rotation: -4,
                    color: '#fbbf24',
                    size: 'lg',
                  },
                ]
              : [],
            interactiveHotspots: (p.interactiveHotspots || []).map((h: any, hIdx: number) => ({
              id: `h-${Date.now()}-${idx}-${hIdx}`,
              label: h.label || 'Clinical Vector',
              type: 'biomarker',
              info: h.info || 'Telemetry validated by Sushruta Core.',
              position: h.position || { x: 50, y: 50 },
            })),
            soundPreset: idx === 0 ? 'laser-scan' : 'pulse-heartbeat',
          })),
          choices: (rawNode.choices || []).map((c: any, cIdx: number) => ({
            id: `c-${Date.now()}-${cIdx}`,
            text: c.text,
            outcomePreview: c.outcomePreview,
            consequenceTag: c.consequenceTag || 'Hybrid Strategy',
            targetNodeId: currentStory.startNodeId,
            ethicalAlignment: 'hybrid-equilibrium',
            metricsModifier: {
              dopamineDelta: Math.round(simulation.simulation_pathways.neuro_endocrine_response.gaba_receptor_binding_rate * 40),
              rosSuppressionDelta: Math.round(simulation.simulation_pathways.hepato_biliary_protection_matrix.hepatocyte_antioxidant_defense_index * 50),
              bioavailabilityDelta: Math.round((simulation.cross_interaction_validator.bioavailability_amplification_multiplier - 1) * 60),
              clearanceSafetyDelta: Math.round((100 - simulation.simulation_pathways.hepato_biliary_protection_matrix.cytochrome_p450_stress_score) * 0.3),
            },
          })),
        };

        onAddStoryNodeAndPlay(formattedNode);
      }
    } catch (err) {
      console.error(err);
      alert('Could not generate graphic novel chapter from simulation.');
    } finally {
      setIsGeneratingStory(false);
    }
  };

  // Re-calculate simulation on parameter change
  const handleUpdateParameter = (
    section:
      | 'stomach_gastric_phase'
      | 'neuro_endocrine_response'
      | 'hepato_biliary_protection_matrix'
      | 'pancreatic_glucose_control'
      | 'snayu_reflex_activation'
      | 'vascular_hemodynamic_matrix'
      | 'cardiovascular_stroke_matrix'
      | 'computational_oncology_matrix',
    key: string,
    val: number
  ) => {
    setSimulation((prev) => {
      const currentSection = (prev.simulation_pathways as any)[section] || {};
      const updated = {
        ...prev,
        simulation_pathways: {
          ...prev.simulation_pathways,
          [section]: {
            ...currentSection,
            [key]: val,
          },
        },
      };

      // Recalculate Cross-Interaction Validator parameters reactively
      const cypStress = updated.simulation_pathways.hepato_biliary_protection_matrix.cytochrome_p450_stress_score;
      const mucosal = updated.simulation_pathways.stomach_gastric_phase.mucosal_shielding_coefficient;
      const pancreaticBeta = updated.simulation_pathways.pancreatic_glucose_control?.beta_cell_oxidative_protection_index ?? 1.5;
      const nocturnalGlucose = updated.simulation_pathways.pancreatic_glucose_control?.nocturnal_glucose_stability_score ?? 90;
      const snayuTone = updated.simulation_pathways.snayu_reflex_activation?.snayu_active_stage_stimulation_index ?? 0.67;

      // Interference occurs if CYP450 is overloaded, mucosal lining is compromised, or beta-cells are stressed, or hyper-reflexia
      const interference = cypStress > 70 || mucosal < 0.4 || pancreaticBeta < 0.6 || nocturnalGlucose < 50 || snayuTone > 0.95;

      const safety =
        cypStress < 40 && mucosal > 0.6 && pancreaticBeta > 1.0 && nocturnalGlucose > 75 && snayuTone <= 0.9
          ? 'APPROVED'
          : cypStress < 75 && mucosal > 0.3 && snayuTone <= 0.95
          ? 'WARNING_HIGH_ACCUMULATION'
          : 'CRITICAL_TOXICITY';

      const halfLife = Number((2.0 + (cypStress / 100) * 8.0).toFixed(1));
      const bioMultiplier = Number((0.9 + (mucosal * 0.7)).toFixed(2));

      updated.cross_interaction_validator = {
        herb_drug_interference_detected: interference,
        safety_clearance_status: safety,
        predicted_liver_clearance_half_life_hrs: halfLife,
        bioavailability_amplification_multiplier: bioMultiplier,
        hepatic_clearance_notes:
          safety === 'APPROVED'
            ? 'Optimal metabolic synchronization: Snayu reflex tone secured without motor limpness; Asava carrier bypasses hepatic bottleneck; Ashwagandha preserves pancreatic beta-cell insulin secretion.'
            : safety === 'WARNING_HIGH_ACCUMULATION'
            ? 'Warning: Hepatic cytochrome P450 overload detected. Moderate risk of delayed drug clearance and nocturnal insulin fluctuation.'
            : 'CRITICAL TOXICITY: CYP450 saturated (over 75/100) or Snayu hyper-reflexia (>0.95). Emergency antidotal buffering mandatory.',
      };

      return updated;
    });
  };

  // One-click antidote remediation when in CRITICAL_TOXICITY
  const handleApplyAntidoteRemediation = () => {
    soundEngine.playSuccess();
    setSimulation((prev) => {
      const restored = JSON.parse(JSON.stringify(PRESET_PILL_SIMULATIONS[0]));
      restored.formulation_metadata.codename = `${prev.formulation_metadata.codename} (Sushruta Antidote Stabilized)`;
      return restored;
    });
  };

  const getSafetyBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return {
          bg: 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300',
          dot: 'bg-emerald-400',
          label: 'APPROVED: COMPLETE CLEARANCE',
        };
      case 'WARNING_HIGH_ACCUMULATION':
        return {
          bg: 'bg-amber-950/80 border-amber-500/60 text-amber-300',
          dot: 'bg-amber-400',
          label: 'WARNING: CYP450 ACCUMULATION',
        };
      case 'CRITICAL_TOXICITY':
      default:
        return {
          bg: 'bg-rose-950/80 border-rose-500/60 text-rose-300',
          dot: 'bg-rose-400',
          label: 'CRITICAL TOXICITY WARNING',
        };
    }
  };

  const safetyInfo = getSafetyBadge(simulation.cross_interaction_validator.safety_clearance_status);
  const isCriticalToxicity = simulation.cross_interaction_validator.safety_clearance_status === 'CRITICAL_TOXICITY';

  return (
    <div className="w-full h-full overflow-y-auto p-4 sm:p-7 max-w-6xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono-code uppercase tracking-wider font-bold mb-1">
            <Pill className="w-4 h-4" />
            <span>Sushruta-Trillion Hybrid Chemo-Informatics Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
            {simulation.formulation_metadata.codename}: Chemo-Informatics Simulation
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-0.5">
            Synchronized Allopathic Hypnotic + Fermented Asava + Ashwagandha + Snayu Nerve Stimulation + Hemodynamic BP Balance across 6 Vital Vectors.
          </p>
        </div>

        {/* Action Controls & Sub-Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Sub-Tabs Selector */}
          <div className="p-1 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-1 text-xs">
            <button
              onClick={() => setActiveSubTab('visual')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-mono-code flex items-center gap-1.5 ${
                activeSubTab === 'visual'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Multi-Vector Dashboard</span>
            </button>

            <button
              onClick={() => setActiveSubTab('testsuite')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-mono-code flex items-center gap-1.5 ${
                activeSubTab === 'testsuite'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Automated Test Suite</span>
            </button>

            <button
              onClick={() => setActiveSubTab('batch-tester')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-mono-code flex items-center gap-1.5 ${
                activeSubTab === 'batch-tester'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Math & 100-Batch</span>
            </button>

            <button
              onClick={() => setActiveSubTab('python')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-mono-code flex items-center gap-1.5 ${
                activeSubTab === 'python'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Python Script</span>
            </button>

            <button
              onClick={() => setActiveSubTab('patent')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-mono-code flex items-center gap-1.5 ${
                activeSubTab === 'patent'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Patent Summary</span>
            </button>

            <button
              onClick={() => setActiveSubTab('toxicity')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-mono-code flex items-center gap-1.5 ${
                activeSubTab === 'toxicity'
                  ? 'bg-rose-500 text-slate-950 font-bold'
                  : isCriticalToxicity
                  ? 'text-rose-400 animate-pulse font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Toxicity Protocol</span>
            </button>

            <button
              onClick={() => setActiveSubTab('repo-layout')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-mono-code flex items-center gap-1.5 ${
                activeSubTab === 'repo-layout'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>DevOps & Enterprise Repo</span>
            </button>

            <button
              onClick={() => setActiveSubTab('json')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-mono-code flex items-center gap-1.5 ${
                activeSubTab === 'json'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>JSON Schema</span>
            </button>
          </div>

          {/* Voiceover Speech Button for Formulation Overview */}
          <button
            onClick={() => {
              if (isNarratingOverview) {
                narrationEngine.stop();
                setIsNarratingOverview(false);
              } else {
                const text = `Formulation report for ${simulation.formulation_metadata.codename}. Delivery system: ${simulation.formulation_metadata.delivery_system}. Therapeutic indication: ${simulation.formulation_metadata.therapeutic_indication || 'Hybrid nocturnal stabilization'}. Safety clearance verdict: ${simulation.cross_interaction_validator.safety_clearance_status}. Predicted clearance half life: ${simulation.cross_interaction_validator.predicted_liver_clearance_half_life_hrs} hours. ${simulation.cross_interaction_validator.hepatic_clearance_notes || ''}`;
                narrationEngine.speak(text, selectedPersona);
                setIsNarratingOverview(true);
                setTimeout(() => setIsNarratingOverview(false), 12000);
              }
            }}
            className={`min-h-[40px] px-3 rounded-xl border text-xs font-mono-code flex items-center gap-1.5 cursor-pointer transition-all ${
              isNarratingOverview
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Narrate Active Formulation Telemetry via Web Speech API"
          >
            <Volume2 className={`w-4 h-4 ${isNarratingOverview ? 'animate-pulse' : ''}`} />
            <span className="hidden sm:inline">{isNarratingOverview ? 'Stop' : 'Voiceover'}</span>
          </button>

          {/* Graphic Novel Episode Generation CTA */}
          <button
            onClick={handleConvertSimulationToStoryNode}
            disabled={isGeneratingStory}
            className="min-h-[40px] px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>{isGeneratingStory ? 'Weaving Comic Node...' : 'Simulate in Comic Reader'}</span>
          </button>
        </div>
      </div>

      {/* Preset Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-mono-code text-slate-500 uppercase tracking-wider shrink-0 mr-1">
          Formulation Presets:
        </span>
        {PRESET_PILL_SIMULATIONS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectPreset(idx)}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-mono-code transition-all whitespace-nowrap cursor-pointer border ${
              simulation.formulation_metadata.codename === preset.formulation_metadata.codename
                ? preset.cross_interaction_validator.safety_clearance_status === 'CRITICAL_TOXICITY'
                  ? 'bg-rose-950/80 border-rose-500 text-rose-300 font-bold shadow-md'
                  : 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            {preset.formulation_metadata.codename}
          </button>
        ))}
      </div>

      {/* EMERGENCY BANNER FOR CRITICAL TOXICITY */}
      {isCriticalToxicity && (
        <div className="p-4 bg-rose-950/90 border border-rose-600/80 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 animate-pulse shadow-xl shadow-rose-950/40">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white font-mono-code uppercase tracking-wider">
                CRITICAL_TOXICITY WARNING DETECTED
              </h4>
              <p className="text-xs text-rose-200 mt-0.5 leading-relaxed font-sans">
                Active component ratios flag acute CYP450 microsomal saturation ({simulation.simulation_pathways.hepato_biliary_protection_matrix.cytochrome_p450_stress_score}/100) and nocturnal beta-cell suppression. Immediate metabolic intervention indicated.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveSubTab('toxicity')}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-rose-700 text-rose-300 hover:text-white text-xs font-mono-code font-bold cursor-pointer"
            >
              Inspect Diagnostic
            </button>
            <button
              onClick={handleApplyAntidoteRemediation}
              className="px-3.5 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 text-xs font-mono-code font-bold uppercase tracking-wider cursor-pointer shadow-md transition-all active:scale-95"
            >
              Apply Antidote Buffer
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: LIVE VISUAL MULTI-VECTOR DASHBOARD */}
      {activeSubTab === 'visual' && (
        <div className="space-y-6">
          {/* Formulation Overview Banner */}
          <div className="p-4 sm:p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-mono-code text-amber-400 uppercase tracking-wider font-bold">
                  Target Formulation Metadata
                </span>
                <h3 className="text-lg font-bold text-white font-heading">
                  {simulation.formulation_metadata.codename}
                </h3>
              </div>

              {/* Safety Badge */}
              <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-mono-code font-bold ${safetyInfo.bg}`}>
                <span className={`w-2 h-2 rounded-full ${safetyInfo.dot} animate-pulse`} />
                <span>{safetyInfo.label}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              <strong className="text-slate-400">Delivery System: </strong>
              {simulation.formulation_metadata.delivery_system}
            </p>

            {simulation.formulation_metadata.therapeutic_indication && (
              <p className="text-xs text-amber-300/80 font-mono-code bg-amber-950/30 p-2 rounded-lg border border-amber-900/40">
                <strong>Indication: </strong>{simulation.formulation_metadata.therapeutic_indication}
              </p>
            )}

            {/* Active Components Badges */}
            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-[11px] font-mono-code text-slate-400 block mb-2">
                Active Hybrid Ingredients:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {simulation.formulation_metadata.active_components.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-white truncate">{comp.name}</span>
                      {comp.dosage && (
                        <span className="text-[10px] font-mono-code text-slate-400 shrink-0">
                          {comp.dosage}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-mono-code px-1.5 py-0.5 rounded inline-block ${
                        comp.classification === 'Allopathic_Hypnotic'
                          ? 'bg-sky-950 border border-sky-800 text-sky-300'
                          : comp.classification === 'Ayurvedic_Fermentation_Carrier'
                          ? 'bg-purple-950 border border-purple-800 text-purple-300'
                          : 'bg-amber-950 border border-amber-800 text-amber-300'
                      }`}
                    >
                      {comp.classification.replace(/_/g, ' ')}
                    </span>
                    {comp.mechanism && (
                      <p className="text-[11px] text-slate-400 leading-tight pt-1">
                        {comp.mechanism}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Six-Vector Organ Simulation Pathways Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Vector 1: Stomach Gastric Phase */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-rose-950/80 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-rose-400 text-xs font-mono-code font-bold uppercase mb-2">
                  <Activity className="w-4 h-4" />
                  <span>1. Stomach Gastric Phase</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                      <span>Disintegration Velocity:</span>
                      <span className="text-white font-bold">
                        {simulation.simulation_pathways.stomach_gastric_phase.gastric_disintegration_velocity_sec}s
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      value={simulation.simulation_pathways.stomach_gastric_phase.gastric_disintegration_velocity_sec}
                      onChange={(e) =>
                        handleUpdateParameter(
                          'stomach_gastric_phase',
                          'gastric_disintegration_velocity_sec',
                          Number(e.target.value)
                        )
                      }
                      className="w-full accent-rose-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                      <span>Ghrelin Stimulation:</span>
                      <span className="text-white font-bold">
                        {simulation.simulation_pathways.stomach_gastric_phase.ghrelin_stimulation_index.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={simulation.simulation_pathways.stomach_gastric_phase.ghrelin_stimulation_index}
                      onChange={(e) =>
                        handleUpdateParameter(
                          'stomach_gastric_phase',
                          'ghrelin_stimulation_index',
                          Number(e.target.value)
                        )
                      }
                      className="w-full accent-rose-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                      <span>Mucosal Shielding Coeff:</span>
                      <span className={`font-bold ${simulation.simulation_pathways.stomach_gastric_phase.mucosal_shielding_coefficient > 0.7 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {simulation.simulation_pathways.stomach_gastric_phase.mucosal_shielding_coefficient.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="2.0"
                      step="0.05"
                      value={simulation.simulation_pathways.stomach_gastric_phase.mucosal_shielding_coefficient}
                      onChange={(e) =>
                        handleUpdateParameter(
                          'stomach_gastric_phase',
                          'mucosal_shielding_coefficient',
                          Number(e.target.value)
                        )
                      }
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono-code">
                {simulation.simulation_pathways.stomach_gastric_phase.mucosal_shielding_coefficient > 0.7
                  ? '✓ Mucosa buffered against acidity'
                  : '⚠ Acidic irritation risk detected'}
              </div>
            </div>

            {/* Vector 2: Neuro-Endocrine Response */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-sky-950/80 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-sky-400 text-xs font-mono-code font-bold uppercase mb-2">
                  <Zap className="w-4 h-4" />
                  <span>2. Neuro-Endocrine Response</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                      <span>GABA Binding Rate:</span>
                      <span className="text-sky-300 font-bold">
                        {(simulation.simulation_pathways.neuro_endocrine_response.gaba_receptor_binding_rate * 100).toFixed(0)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="1"
                      step="0.02"
                      value={simulation.simulation_pathways.neuro_endocrine_response.gaba_receptor_binding_rate}
                      onChange={(e) =>
                        handleUpdateParameter(
                          'neuro_endocrine_response',
                          'gaba_receptor_binding_rate',
                          Number(e.target.value)
                        )
                      }
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                      <span>Melatonin Boost:</span>
                      <span className="text-amber-300 font-bold">
                        +{simulation.simulation_pathways.neuro_endocrine_response.endogenous_melatonin_boost_percentage}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="80"
                      step="1"
                      value={simulation.simulation_pathways.neuro_endocrine_response.endogenous_melatonin_boost_percentage}
                      onChange={(e) =>
                        handleUpdateParameter(
                          'neuro_endocrine_response',
                          'endogenous_melatonin_boost_percentage',
                          Number(e.target.value)
                        )
                      }
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                      <span>Cortisol Suppression:</span>
                      <span className="text-emerald-300 font-bold">
                        {simulation.simulation_pathways.neuro_endocrine_response.cortisol_suppression_velocity.toFixed(2)}x
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="3.0"
                      step="0.1"
                      value={simulation.simulation_pathways.neuro_endocrine_response.cortisol_suppression_velocity}
                      onChange={(e) =>
                        handleUpdateParameter(
                          'neuro_endocrine_response',
                          'cortisol_suppression_velocity',
                          Number(e.target.value)
                        )
                      }
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono-code">
                Serotonin Index: {simulation.simulation_pathways.neuro_endocrine_response.serotonin_retention_index} · REM sleep safe
              </div>
            </div>

            {/* Vector 3: Hepato-Biliary Protection Matrix */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-amber-950/80 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono-code font-bold uppercase mb-2">
                  <Flame className="w-4 h-4" />
                  <span>3. Hepato-Biliary Matrix</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                      <span>CYP450 Stress Score:</span>
                      <span
                        className={`font-bold ${
                          simulation.simulation_pathways.hepato_biliary_protection_matrix.cytochrome_p450_stress_score < 40
                            ? 'text-emerald-400'
                            : simulation.simulation_pathways.hepato_biliary_protection_matrix.cytochrome_p450_stress_score < 75
                            ? 'text-amber-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {simulation.simulation_pathways.hepato_biliary_protection_matrix.cytochrome_p450_stress_score} / 100
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="98"
                      step="1"
                      value={simulation.simulation_pathways.hepato_biliary_protection_matrix.cytochrome_p450_stress_score}
                      onChange={(e) =>
                        handleUpdateParameter(
                          'hepato_biliary_protection_matrix',
                          'cytochrome_p450_stress_score',
                          Number(e.target.value)
                        )
                      }
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                      <span>Hepatocyte Antioxidant:</span>
                      <span className="text-emerald-300 font-bold">
                        {simulation.simulation_pathways.hepato_biliary_protection_matrix.hepatocyte_antioxidant_defense_index.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="2.5"
                      step="0.05"
                      value={simulation.simulation_pathways.hepato_biliary_protection_matrix.hepatocyte_antioxidant_defense_index}
                      onChange={(e) =>
                        handleUpdateParameter(
                          'hepato_biliary_protection_matrix',
                          'hepatocyte_antioxidant_defense_index',
                          Number(e.target.value)
                        )
                      }
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                      <span>Bile Release Rate:</span>
                      <span className="text-white font-bold">
                        {simulation.simulation_pathways.hepato_biliary_protection_matrix.gall_bladder_bile_release_rate_ml_hr} mL/hr
                      </span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="40"
                      step="0.5"
                      value={simulation.simulation_pathways.hepato_biliary_protection_matrix.gall_bladder_bile_release_rate_ml_hr}
                      onChange={(e) =>
                        handleUpdateParameter(
                          'hepato_biliary_protection_matrix',
                          'gall_bladder_bile_release_rate_ml_hr',
                          Number(e.target.value)
                        )
                      }
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono-code">
                CCK Stability Coeff: {simulation.simulation_pathways.hepato_biliary_protection_matrix.cholecystokinin_stability_coefficient}
              </div>
            </div>

            {/* Vector 4: Pancreatic Glucose Control (NEW UPGRADE) */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-emerald-950/80 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono-code font-bold uppercase mb-2">
                  <HeartPulse className="w-4 h-4" />
                  <span>4. Pancreatic Glucose Vector</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                      <span>Basal Insulin Rate:</span>
                      <span className="text-emerald-300 font-bold">
                        {simulation.simulation_pathways.pancreatic_glucose_control?.basal_insulin_secretion_rate_uU_mL ?? 8.5} uU/mL
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1.0"
                      max="15.0"
                      step="0.5"
                      value={simulation.simulation_pathways.pancreatic_glucose_control?.basal_insulin_secretion_rate_uU_mL ?? 8.5}
                      onChange={(e) =>
                        handleUpdateParameter(
                          'pancreatic_glucose_control',
                          'basal_insulin_secretion_rate_uU_mL',
                          Number(e.target.value)
                        )
                      }
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                      <span>Beta-Cell Protection:</span>
                      <span className="text-emerald-300 font-bold">
                        {(simulation.simulation_pathways.pancreatic_glucose_control?.beta_cell_oxidative_protection_index ?? 1.62).toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="2.5"
                      step="0.05"
                      value={simulation.simulation_pathways.pancreatic_glucose_control?.beta_cell_oxidative_protection_index ?? 1.62}
                      onChange={(e) =>
                        handleUpdateParameter(
                          'pancreatic_glucose_control',
                          'beta_cell_oxidative_protection_index',
                          Number(e.target.value)
                        )
                      }
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                      <span>Nocturnal Glucose Stability:</span>
                      <span className="text-white font-bold">
                        {simulation.simulation_pathways.pancreatic_glucose_control?.nocturnal_glucose_stability_score ?? 94.5}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      step="1"
                      value={simulation.simulation_pathways.pancreatic_glucose_control?.nocturnal_glucose_stability_score ?? 94.5}
                      onChange={(e) =>
                        handleUpdateParameter(
                          'pancreatic_glucose_control',
                          'nocturnal_glucose_stability_score',
                          Number(e.target.value)
                        )
                      }
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono-code">
                Glucagon Ratio: {simulation.simulation_pathways.pancreatic_glucose_control?.glucagon_regulatory_balance_ratio ?? 1.12} · Morning grogginess eliminated
              </div>
            </div>

            {/* Vector 5: Snayu Reflex Activation (Nerve/Tendon/Reflex Tone) */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-teal-950/80 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-teal-400 text-xs font-mono-code font-bold uppercase mb-2">
                  <Cpu className="w-4 h-4" />
                  <span>5. Snayu Reflex Activation</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                      <span>Reflex Stimulation Index:</span>
                      <span
                        className={`font-bold ${
                          (simulation.simulation_pathways.snayu_reflex_activation?.snayu_active_stage_stimulation_index ?? 0.67) > 0.95
                            ? 'text-rose-400'
                            : 'text-teal-300'
                        }`}
                      >
                        {(simulation.simulation_pathways.snayu_reflex_activation?.snayu_active_stage_stimulation_index ?? 0.67).toFixed(2)} / 1.0
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.02"
                      value={simulation.simulation_pathways.snayu_reflex_activation?.snayu_active_stage_stimulation_index ?? 0.67}
                      onChange={(e) =>
                        handleUpdateParameter(
                          'snayu_reflex_activation',
                          'snayu_active_stage_stimulation_index',
                          Number(e.target.value)
                        )
                      }
                      className="w-full accent-teal-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                      <span>Limpness Prevention:</span>
                      <span className="text-emerald-300 font-bold">
                        {(simulation.simulation_pathways.snayu_reflex_activation?.locomotor_limpness_prevention_index ?? 0.92).toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={simulation.simulation_pathways.snayu_reflex_activation?.locomotor_limpness_prevention_index ?? 0.92}
                      onChange={(e) =>
                        handleUpdateParameter(
                          'snayu_reflex_activation',
                          'locomotor_limpness_prevention_index',
                          Number(e.target.value)
                        )
                      }
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                      <span>Channel Tonicity:</span>
                      <span className="text-white font-bold">
                        {(simulation.simulation_pathways.snayu_reflex_activation?.reflex_channel_tonicity ?? 0.85).toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={simulation.simulation_pathways.snayu_reflex_activation?.reflex_channel_tonicity ?? 0.85}
                      onChange={(e) =>
                        handleUpdateParameter(
                          'snayu_reflex_activation',
                          'reflex_channel_tonicity',
                          Number(e.target.value)
                        )
                      }
                      className="w-full accent-teal-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono-code">
                Jyotishmati + Purified Kupilu · Motor limpness eliminated
              </div>
            </div>

            {/* Vector 6: Vascular Hemodynamic Stability (BP Modulator) */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-indigo-950/80 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono-code font-bold uppercase mb-2">
                  <HeartPulse className="w-4 h-4" />
                  <span>6. Vascular Hemodynamics</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                      <span>BP Stability Score:</span>
                      <span className="text-indigo-300 font-bold">
                        {(simulation.simulation_pathways.vascular_hemodynamic_matrix?.blood_pressure_stability_score ?? 100.0).toFixed(1)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      step="1"
                      value={simulation.simulation_pathways.vascular_hemodynamic_matrix?.blood_pressure_stability_score ?? 100.0}
                      onChange={(e) =>
                        handleUpdateParameter(
                          'vascular_hemodynamic_matrix',
                          'blood_pressure_stability_score',
                          Number(e.target.value)
                        )
                      }
                      className="w-full accent-indigo-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                      <span>Crash Prevention Index:</span>
                      <span className="text-emerald-300 font-bold">
                        {(simulation.simulation_pathways.vascular_hemodynamic_matrix?.nocturnal_hypotensive_crash_prevention_index ?? 95.0).toFixed(1)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      step="1"
                      value={simulation.simulation_pathways.vascular_hemodynamic_matrix?.nocturnal_hypotensive_crash_prevention_index ?? 95.0}
                      onChange={(e) =>
                        handleUpdateParameter(
                          'vascular_hemodynamic_matrix',
                          'nocturnal_hypotensive_crash_prevention_index',
                          Number(e.target.value)
                        )
                      }
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                      <span>Resistance Stability:</span>
                      <span className="text-white font-bold">
                        {((simulation.simulation_pathways.vascular_hemodynamic_matrix?.vascular_resistance_stability ?? 0.96) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="1.0"
                      step="0.02"
                      value={simulation.simulation_pathways.vascular_hemodynamic_matrix?.vascular_resistance_stability ?? 0.96}
                      onChange={(e) =>
                        handleUpdateParameter(
                          'vascular_hemodynamic_matrix',
                          'vascular_resistance_stability',
                          Number(e.target.value)
                        )
                      }
                      className="w-full accent-indigo-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono-code">
                Sarpagandha alkaloids · Nocturnal BP crashes prevented
              </div>
            </div>

            {/* Vector 7: Cardiovascular Stroke Prophylaxis Grid (CV-StrokeShield-01) */}
            {simulation.simulation_pathways.cardiovascular_stroke_matrix && (
              <div className="p-4 bg-slate-900 rounded-2xl border border-rose-950/80 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-mono-code font-bold uppercase mb-2">
                    <HeartPulse className="w-4 h-4" />
                    <span>7. Cardio-Stroke Prophylaxis</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                        <span>Platelet Inhibition:</span>
                        <span className="text-rose-300 font-bold">
                          {simulation.simulation_pathways.cardiovascular_stroke_matrix.antiplatelet_inhibition_percentage.toFixed(1)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="99"
                        step="0.5"
                        value={simulation.simulation_pathways.cardiovascular_stroke_matrix.antiplatelet_inhibition_percentage}
                        onChange={(e) =>
                          handleUpdateParameter(
                            'cardiovascular_stroke_matrix',
                            'antiplatelet_inhibition_percentage',
                            Number(e.target.value)
                          )
                        }
                        className="w-full accent-rose-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                        <span>Endothelial Shear Resistance:</span>
                        <span className="text-emerald-300 font-bold">
                          {simulation.simulation_pathways.cardiovascular_stroke_matrix.endothelial_shear_resistance_index.toFixed(3)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="0.99"
                        step="0.01"
                        value={simulation.simulation_pathways.cardiovascular_stroke_matrix.endothelial_shear_resistance_index}
                        onChange={(e) =>
                          handleUpdateParameter(
                            'cardiovascular_stroke_matrix',
                            'endothelial_shear_resistance_index',
                            Number(e.target.value)
                          )
                        }
                        className="w-full accent-emerald-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                        <span>Plaque Remodeling Score:</span>
                        <span className="text-amber-300 font-bold">
                          {simulation.simulation_pathways.cardiovascular_stroke_matrix.arterial_plaque_remodeling_score.toFixed(1)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="30"
                        max="98"
                        step="1"
                        value={simulation.simulation_pathways.cardiovascular_stroke_matrix.arterial_plaque_remodeling_score}
                        onChange={(e) =>
                          handleUpdateParameter(
                            'cardiovascular_stroke_matrix',
                            'arterial_plaque_remodeling_score',
                            Number(e.target.value)
                          )
                        }
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                        <span>Cerebral Microcirculation:</span>
                        <span className="text-white font-bold">
                          {simulation.simulation_pathways.cardiovascular_stroke_matrix.microcirculation_velocity_cm_s.toFixed(1)} cm/s
                        </span>
                      </div>
                      <input
                        type="range"
                        min="2.0"
                        max="10.0"
                        step="0.2"
                        value={simulation.simulation_pathways.cardiovascular_stroke_matrix.microcirculation_velocity_cm_s}
                        onChange={(e) =>
                          handleUpdateParameter(
                            'cardiovascular_stroke_matrix',
                            'microcirculation_velocity_cm_s',
                            Number(e.target.value)
                          )
                        }
                        className="w-full accent-sky-400 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono-code">
                  Dual-chamber: Fast antiplatelet block + sustained Arjuna/Guggulu arterial remodeling
                </div>
              </div>
            )}

            {/* Vector 8: Computational Oncology & Cytoprotective Matrix */}
            {simulation.simulation_pathways.computational_oncology_matrix && (
              <div className="p-4 bg-slate-900 rounded-2xl border border-rose-900/40 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-mono-code font-bold uppercase">
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                    <span>Vector 8: Computational Oncology & Cytoprotective Matrix</span>
                  </div>
                  <span className="text-[11px] font-mono-code text-rose-300 bg-rose-950/70 border border-rose-800/60 px-2 py-0.5 rounded-full">
                    ONCO-PathCheck-01
                  </span>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-rose-950">
                      <div className="text-[10px] text-slate-400 font-mono-code">Tumor Angiogenesis Inhibition</div>
                      <div className="text-base font-bold text-rose-400 font-mono-code">
                        {(simulation.simulation_pathways.computational_oncology_matrix.tumor_angiogenesis_inhibition_velocity * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-emerald-950">
                      <div className="text-[10px] text-slate-400 font-mono-code">Healthy Cell Survival</div>
                      <div className="text-base font-bold text-emerald-400 font-mono-code">
                        {simulation.simulation_pathways.computational_oncology_matrix.non_tumor_cellular_integrity_score.toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                        <span>Angiogenesis Inhibition Velocity:</span>
                        <span className="text-rose-300 font-bold">
                          {(simulation.simulation_pathways.computational_oncology_matrix.tumor_angiogenesis_inhibition_velocity * 100).toFixed(1)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.20"
                        max="0.99"
                        step="0.01"
                        value={simulation.simulation_pathways.computational_oncology_matrix.tumor_angiogenesis_inhibition_velocity}
                        onChange={(e) =>
                          handleUpdateParameter(
                            'computational_oncology_matrix',
                            'tumor_angiogenesis_inhibition_velocity',
                            Number(e.target.value)
                          )
                        }
                        className="w-full accent-rose-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                        <span>Apoptosis Induction Rate:</span>
                        <span className="text-purple-300 font-bold">
                          {simulation.simulation_pathways.computational_oncology_matrix.cellular_apoptosis_induction_rate.toFixed(1)} / hr
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="6.0"
                        step="0.1"
                        value={simulation.simulation_pathways.computational_oncology_matrix.cellular_apoptosis_induction_rate}
                        onChange={(e) =>
                          handleUpdateParameter(
                            'computational_oncology_matrix',
                            'cellular_apoptosis_induction_rate',
                            Number(e.target.value)
                          )
                        }
                        className="w-full accent-purple-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                        <span>Non-Tumor Cellular Integrity Score:</span>
                        <span className="text-emerald-300 font-bold">
                          {simulation.simulation_pathways.computational_oncology_matrix.non_tumor_cellular_integrity_score.toFixed(1)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        step="1"
                        value={simulation.simulation_pathways.computational_oncology_matrix.non_tumor_cellular_integrity_score}
                        onChange={(e) =>
                          handleUpdateParameter(
                            'computational_oncology_matrix',
                            'non_tumor_cellular_integrity_score',
                            Number(e.target.value)
                          )
                        }
                        className="w-full accent-emerald-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 font-mono-code mb-1">
                        <span>Free Radical Scavenging Reserve:</span>
                        <span className="text-sky-300 font-bold">
                          {simulation.simulation_pathways.computational_oncology_matrix.free_radical_scavenging_reserve.toFixed(1)} mmol/L
                        </span>
                      </div>
                      <input
                        type="range"
                        min="2.0"
                        max="24.0"
                        step="0.4"
                        value={simulation.simulation_pathways.computational_oncology_matrix.free_radical_scavenging_reserve}
                        onChange={(e) =>
                          handleUpdateParameter(
                            'computational_oncology_matrix',
                            'free_radical_scavenging_reserve',
                            Number(e.target.value)
                          )
                        }
                        className="w-full accent-sky-400 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono-code flex items-center justify-between">
                  <span>Paclitaxel cytotoxic core + Tulsi/Shatavari apoptosis & cytoprotection</span>
                  <span className="text-emerald-400 font-bold">🛡️ Active Shield</span>
                </div>
              </div>
            )}
          </div>

          {/* Cross-Interaction & Toxicity Validator Panel */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono-code font-bold uppercase">
                <ShieldCheck className="w-5 h-5" />
                <span>Cross-Interaction & Toxicity Validator Array</span>
              </div>
              <span className="text-xs font-mono-code text-slate-400">
                Predicted Half-Life: {simulation.cross_interaction_validator.predicted_liver_clearance_half_life_hrs} hrs
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 font-mono-code uppercase block">
                  Herb-Drug Interference
                </span>
                <span className="font-bold text-sm text-white">
                  {simulation.cross_interaction_validator.herb_drug_interference_detected ? (
                    <span className="text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Detected
                    </span>
                  ) : (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Zero Interference
                    </span>
                  )}
                </span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 font-mono-code uppercase block">
                  Bioavailability Amplification
                </span>
                <span className="font-bold text-sm text-amber-300">
                  {simulation.cross_interaction_validator.bioavailability_amplification_multiplier}x
                </span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 font-mono-code uppercase block">
                  Safety Clearance Verdict
                </span>
                <span className={`font-bold text-sm ${safetyInfo.bg.split(' ')[2]}`}>
                  {simulation.cross_interaction_validator.safety_clearance_status}
                </span>
              </div>
            </div>

            {simulation.cross_interaction_validator.hepatic_clearance_notes && (
              <p className="text-xs text-slate-300 font-sans leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                <strong className="text-slate-400 font-mono-code">Pharmacokinetic Assessment: </strong>
                {simulation.cross_interaction_validator.hepatic_clearance_notes}
              </p>
            )}
          </div>
        </div>
      )}

      {/* TAB: AUTOMATED TEST SUITE WITH VARIABLE CALIBRATION */}
      {activeSubTab === 'testsuite' && (
        <AutomatedTestSuiteView
          currentSimulation={simulation}
          onApplyCalibrationToSimulation={(newSim) => {
            setSimulation(newSim);
            setActiveSubTab('visual');
          }}
        />
      )}

      {/* TAB: MATHEMATICAL FOUNDATIONS & 100-TRIAL BATCH-TESTER */}
      {activeSubTab === 'batch-tester' && (
        <BiochemFoundationsAndBatchView
          onApplyTrialToSimulation={(trial) => {
            const calibrated: SushrutaTrillionHybridPillSimulation = {
              ...simulation,
              formulation_metadata: {
                ...simulation.formulation_metadata,
                codename: `NH-Batch-Trial-${trial.trial_id} (Calibrated)`,
                dosages_calculated: { ...trial.dosages } as Record<string, number>,
              },
              simulation_pathways: {
                ...simulation.simulation_pathways,
                stomach_gastric_phase: {
                  ...simulation.simulation_pathways.stomach_gastric_phase,
                  gastric_disintegration_velocity_sec: trial.gastric_disintegration_velocity_sec,
                  mucosal_shielding_coefficient: trial.mucosal_shielding_coefficient,
                },
                neuro_endocrine_response: {
                  ...simulation.simulation_pathways.neuro_endocrine_response,
                  gaba_receptor_binding_rate: trial.gaba_receptor_binding_rate,
                  cortisol_suppression_velocity: trial.cortisol_suppression_velocity,
                  snayu_active_stage_stimulation_index: trial.snayu_reflex_tone,
                },
                hepato_biliary_protection_matrix: {
                  ...simulation.simulation_pathways.hepato_biliary_protection_matrix,
                  cytochrome_p450_stress_score: trial.cytochrome_p450_stress,
                },
                pancreatic_glucose_control: {
                  basal_insulin_secretion_rate_uU_mL: trial.basal_insulin_secretion_rate || 8.5,
                  beta_cell_oxidative_protection_index: 1.62,
                  nocturnal_glucose_stability_score: trial.nocturnal_glucose_stability_score,
                  glucagon_regulatory_balance_ratio: 1.1,
                },
              },
              cross_interaction_validator: {
                ...simulation.cross_interaction_validator,
                safety_clearance_status: trial.safety_status,
                bioavailability_amplification_multiplier: trial.bioavailability_multiplier,
                predicted_liver_clearance_half_life_hrs: trial.predicted_liver_clearance_half_life_hrs,
              },
            };
            setSimulation(calibrated);
            setActiveSubTab('visual');
          }}
        />
      )}

      {/* TAB: EXECUTABLE PYTHON SCRIPT RUNNER */}
      {activeSubTab === 'python' && (
        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-sky-400 text-xs font-mono-code font-bold uppercase">
                <FileCode className="w-4 h-4" />
                <span>Executable Python Simulation Script (nh_synchro_sim.py)</span>
              </div>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Populates JSON schema and mathematically models Brain, Liver, Stomach, and Pancreas dynamics.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleRunPython}
                disabled={isRunningPy}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-mono-code font-bold flex items-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95 disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunningPy ? 'Running...' : 'Run Emulation'}</span>
              </button>

              <button
                onClick={handleCopyPython}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors flex items-center gap-1 cursor-pointer font-mono-code"
              >
                {pythonCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{pythonCopied ? 'Copied!' : 'Copy Code'}</span>
              </button>

              <button
                onClick={handleDownloadPython}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors flex items-center gap-1 cursor-pointer font-mono-code"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Download .py</span>
              </button>
            </div>
          </div>

          {/* Interactive Run Output Console */}
          {pyRunOutput && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono-code text-emerald-400">
                <Terminal className="w-3.5 h-3.5" />
                <span>Python Standard Output (stdout):</span>
              </div>
              <pre className="p-4 bg-slate-950 rounded-xl border border-emerald-900/60 font-mono-code text-xs text-emerald-300 overflow-x-auto leading-relaxed whitespace-pre-wrap select-text">
                {pyRunOutput}
              </pre>
            </div>
          )}

          {/* Source Code Viewer */}
          <div className="space-y-1.5">
            <span className="text-xs font-mono-code text-slate-400 uppercase tracking-wider">
              Source Code:
            </span>
            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono-code text-xs text-slate-300 overflow-x-auto max-h-[60vh] select-text leading-relaxed">
              {pythonScriptCode}
            </pre>
          </div>
        </div>
      )}

      {/* TAB: COMPLETE PATENT SUMMARY DOCUMENTATION (PART 2) */}
      {activeSubTab === 'patent' && (
        <PatentSpecificationView />
      )}

      {/* TAB 4: CRITICAL_TOXICITY PROTOCOL & SAFEGUARDS */}
      {activeSubTab === 'toxicity' && (
        <div className="p-5 sm:p-7 bg-slate-900 rounded-2xl border border-rose-950/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-rose-400 text-xs font-mono-code font-bold uppercase">
                <ShieldAlert className="w-5 h-5" />
                <span>Cross-Interaction Validator: CRITICAL_TOXICITY Diagnostic</span>
              </div>
              <h3 className="text-lg font-bold text-white font-heading mt-1">
                Etiology, Cascade Hazards, and Sushruta Antidote Protocols
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                Detailed clinical analysis for when active component ratios violate bio-compatibility thresholds.
              </p>
            </div>

            <button
              onClick={handleApplyAntidoteRemediation}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 text-xs font-mono-code font-bold uppercase tracking-wider cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95 transition-all self-start"
            >
              Apply Sushruta Antidote Protocol
            </button>
          </div>

          {/* Diagnostic Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-rose-900/60 space-y-2">
              <span className="text-[11px] font-mono-code text-rose-400 font-bold uppercase block">
                1. Biochemical Trigger Conditions
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                A <code className="text-rose-300 font-mono-code">CRITICAL_TOXICITY</code> flag is triggered when:
              </p>
              <ul className="text-[11px] text-slate-400 space-y-1 list-disc pl-4 font-mono-code">
                <li>CYP450 stress score exceeds <strong>75.0 / 100</strong></li>
                <li>Mucosal shielding index drops below <strong>0.40</strong></li>
                <li>Pancreatic beta-cell protection index drops below <strong>0.60</strong></li>
                <li>Untreated heavy minerals (uncalcined Bhasma slag) lack Maarana nano-milling</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-amber-900/60 space-y-2">
              <span className="text-[11px] font-mono-code text-amber-400 font-bold uppercase block">
                2. Cascade Clinical Consequences
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Failure to buffer the synthetic molecule produces severe organ pathology:
              </p>
              <ul className="text-[11px] text-slate-400 space-y-1 list-disc pl-4">
                <li><strong className="text-white">Hepatic Microsomal Stagnation:</strong> Prolonged half-life (up to 18.6 hrs) with drug bio-accumulation.</li>
                <li><strong className="text-white">Reactive Nocturnal Hypoglycemia:</strong> Beta-cell oxidative burst halts basal insulin, causing blood sugar collapse.</li>
                <li><strong className="text-white">Morning Hangover:</strong> Heavy grogginess, brain fog, and motor incoordination.</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-900/60 space-y-2">
              <span className="text-[11px] font-mono-code text-emerald-400 font-bold uppercase block">
                3. 4-Stage Antidote Remediation
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                The Sushruta engine immediately initiates restorative bio-chelation:
              </p>
              <ol className="text-[11px] text-slate-400 space-y-1 list-decimal pl-4">
                <li>Escalate Drakshasava bio-carrier to clear Phase-I microsomal bottleneck.</li>
                <li>Infuse Withanolide-A to restore pancreatic Nrf2 antioxidant enzymes.</li>
                <li>Deploy Godanti Bhasma alkaline matrix to buffer gastric mucosal pH.</li>
                <li>Chelate reactive free radicals via Triphala polyphenols.</li>
              </ol>
            </div>
          </div>

          {/* Interactive Comparison Table */}
          <div className="space-y-2">
            <span className="text-xs font-mono-code text-slate-400 uppercase tracking-wider block">
              Formulation Safety Comparison Matrix:
            </span>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs font-mono-code">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Biomarker / Metric</th>
                    <th className="p-3 text-emerald-400">NH-Synchro-01 (Approved)</th>
                    <th className="p-3 text-rose-400">Unbuffered Mega-Dose (Critical)</th>
                    <th className="p-3 text-amber-400">Remediation Delta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-950/60">
                  <tr>
                    <td className="p-3 text-white">Cytochrome P450 Stress Score</td>
                    <td className="p-3 text-emerald-300">32.4 / 100</td>
                    <td className="p-3 text-rose-300">94.2 / 100</td>
                    <td className="p-3 text-amber-300">-61.8 (Hepatic Relief)</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white">Nocturnal Glucose Stability</td>
                    <td className="p-3 text-emerald-300">94.5%</td>
                    <td className="p-3 text-rose-300">28.5%</td>
                    <td className="p-3 text-amber-300">+66.0% (Pancreatic Shield)</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white">Basal Insulin Secretion</td>
                    <td className="p-3 text-emerald-300">8.5 uU/mL</td>
                    <td className="p-3 text-rose-300">1.8 uU/mL</td>
                    <td className="p-3 text-amber-300">+6.7 uU/mL (Anti-Spike)</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white">Gastric Mucosal Shielding Coeff</td>
                    <td className="p-3 text-emerald-300">1.45 (Optimal)</td>
                    <td className="p-3 text-rose-300">0.18 (Erosive)</td>
                    <td className="p-3 text-amber-300">+1.27 (Acid Protection)</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white">Liver Clearance Half-Life</td>
                    <td className="p-3 text-emerald-300">6.2 hrs</td>
                    <td className="p-3 text-rose-300">18.6 hrs</td>
                    <td className="p-3 text-amber-300">-12.4 hrs (Zero Hangover)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: RAW JSON SCHEMA INSPECTOR */}
      {activeSubTab === 'json' && (
        <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code text-slate-400 uppercase tracking-wider">
              JSON Data Packet (Conforming to SushrutaTrillionHybridPillSimulation)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyJSON}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
              </button>
              <button
                onClick={handleDownloadJSON}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Export JSON</span>
              </button>
            </div>
          </div>

          <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono-code text-xs text-amber-300/90 overflow-x-auto max-h-[60vh] select-text">
            {JSON.stringify(simulation, null, 2)}
          </pre>
        </div>
      )}

      {/* TAB 6: STANDALONE REPO STRUCTURE, DOCKER & CI/CD PIPELINES */}
      {activeSubTab === 'repo-layout' && (
        <DevOpsEnterpriseHub
          onLoadPreset={(codename) => {
            const idx = PRESET_PILL_SIMULATIONS.findIndex(p => p.formulation_metadata.codename === codename);
            if (idx >= 0) {
              handleSelectPreset(idx);
              setActiveSubTab('visual');
            }
          }}
        />
      )}
    </div>
  );
};
