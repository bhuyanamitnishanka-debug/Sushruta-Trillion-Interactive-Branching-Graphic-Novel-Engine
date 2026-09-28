import React, { useState, useMemo } from 'react';
import {
  calculateAbio,
  calculateScyp,
  calculateTsnayu,
  calculateBpStability,
  evaluateSafetyStatus,
  runChemoInformaticsSimulation,
  run100BatchSimulation,
  exportBatchTrialsToCSV,
  BatchTestSummary,
  BatchTestTrial,
  DosageInputMatrix,
} from '../../utils/sushrutaBiochemEquations';
import { soundEngine } from '../../utils/audioSynthesizer';
import { narrationEngine, NarrationPersonaId, NARRATION_PERSONAS } from '../../utils/narrationVoiceover';
import {
  Activity,
  Sliders,
  Play,
  RotateCcw,
  Download,
  Copy,
  Check,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Terminal,
  FileCode,
  Flame,
  Zap,
  HeartPulse,
  Cpu,
  BookOpen,
  Volume2,
  Table,
  Search,
  Filter,
  BarChart3,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface BiochemFoundationsAndBatchViewProps {
  onApplyTrialToSimulation?: (trial: BatchTestTrial) => void;
}

export const BiochemFoundationsAndBatchView: React.FC<BiochemFoundationsAndBatchViewProps> = ({
  onApplyTrialToSimulation,
}) => {
  // Active tab within this view
  const [activeSection, setActiveSection] = useState<'equations' | 'batch-tester' | 'fastapi'>('equations');

  // Interactive Equation 1 ($A_bio$) state
  const [eqAsava, setEqAsava] = useState<number>(2.0);
  const [eqAlpha, setEqAlpha] = useState<number>(0.50);
  const [eqKm, setEqKm] = useState<number>(1.5);

  // Interactive Equation 2 ($S_cyp$) state
  const [eqHypnotic, setEqHypnotic] = useState<number>(10);
  const [eqAshwagandha, setEqAshwagandha] = useState<number>(250);
  const [eqBeta, setEqBeta] = useState<number>(4.5);
  const [eqGamma, setEqGamma] = useState<number>(12.0);

  // Interactive Equation 3 ($T_snayu$) state
  const [eqSnayu, setEqSnayu] = useState<number>(25);
  const [eqLambda, setEqLambda] = useState<number>(0.03);

  // Hemodynamic BP state
  const [eqBp, setEqBp] = useState<number>(50);

  // 100-Trial Batch-Tester State
  const [batchResults, setBatchResults] = useState<BatchTestSummary>(() => run100BatchSimulation(0));
  const [isGeneratingBatch, setIsGeneratingBatch] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'APPROVED' | 'WARNING_HIGH_ACCUMULATION' | 'CRITICAL_TOXICITY'>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTrial, setSelectedTrial] = useState<BatchTestTrial | null>(null);
  const [copiedCSV, setCopiedCSV] = useState<boolean>(false);
  const [copiedFastAPI, setCopiedFastAPI] = useState<boolean>(false);
  const [selectedPersona, setSelectedPersona] = useState<NarrationPersonaId>('clinical-ai');
  const [isNarratingBatch, setIsNarratingBatch] = useState<boolean>(false);

  // Computed values for interactive equations
  const currentAbio = useMemo(() => calculateAbio(eqAsava, eqAlpha, eqKm), [eqAsava, eqAlpha, eqKm]);
  const currentScyp = useMemo(
    () => calculateScyp(eqHypnotic, eqAshwagandha, currentAbio, eqBeta, eqGamma),
    [eqHypnotic, eqAshwagandha, currentAbio, eqBeta, eqGamma]
  );
  const currentTsnayu = useMemo(
    () => calculateTsnayu(eqSnayu, currentAbio, eqLambda),
    [eqSnayu, currentAbio, eqLambda]
  );
  const currentBp = useMemo(() => calculateBpStability(eqBp), [eqBp]);
  const currentSafety = useMemo(
    () => evaluateSafetyStatus(currentScyp, currentTsnayu, currentBp),
    [currentScyp, currentTsnayu, currentBp]
  );

  // Filtered batch trials
  const filteredTrials = useMemo(() => {
    return batchResults.trials.filter((t) => {
      const matchesStatus = statusFilter === 'ALL' || t.safety_status === statusFilter;
      const matchesSearch =
        searchTerm === '' ||
        t.trial_id.toString().includes(searchTerm) ||
        t.safety_status.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [batchResults.trials, statusFilter, searchTerm]);

  // Run new 100-trial simulation with new seed
  const handleRun100Batch = () => {
    setIsGeneratingBatch(true);
    soundEngine.playTechScan();
    setTimeout(() => {
      const newSeed = Math.floor(Math.random() * 9999);
      const res = run100BatchSimulation(newSeed);
      setBatchResults(res);
      setIsGeneratingBatch(false);
      soundEngine.playSuccess();
    }, 400);
  };

  // Download CSV
  const handleDownloadCSV = () => {
    const csvData = exportBatchTrialsToCSV(batchResults.trials);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sushruta_trillion_100_batch_trials_baseline.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Download JSON
  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(batchResults, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sushruta_trillion_100_batch_trials_baseline.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Copy CSV to Clipboard
  const handleCopyCSV = () => {
    const csvData = exportBatchTrialsToCSV(batchResults.trials);
    navigator.clipboard.writeText(csvData);
    setCopiedCSV(true);
    setTimeout(() => setCopiedCSV(false), 2000);
  };

  // Narration of Batch Results via Web Speech API
  const handleNarrateBatchResults = () => {
    if (isNarratingBatch) {
      narrationEngine.stop();
      setIsNarratingBatch(false);
    } else {
      const script = `Batch analysis report for Sushruta-Trillion simulation framework. One hundred randomized clinical dosage combinations analyzed. Safety outcome baseline: ${batchResults.approved_percentage} percent approved, ${batchResults.warning_percentage} percent warning accumulation, and ${batchResults.critical_percentage} percent critical toxicity. Mean bioavailability multiplier achieved is ${batchResults.mean_bioavailability} times. Mean neuromuscular Snayu reflex tone is ${batchResults.mean_snayu_tone} out of 1.0. Mean hepatic cytochrome P 450 stress is ${batchResults.mean_cyp450_stress} out of 100. Hemodynamic blood pressure stability averaged ${batchResults.mean_bp_stability} percent.`;
      narrationEngine.speak(script, selectedPersona);
      setIsNarratingBatch(true);
      setTimeout(() => setIsNarratingBatch(false), 12000);
    }
  };

  // FastAPI clean backend script as requested in Part 2
  const fastApiCode = `#!/usr/bin/env python3
"""
Sushruta-Trillion: Clean Production Backend API Route Script (FastAPI)
Architecture: Hybrid Allopathy & Ayur-Chemo-Informatics Simulation Core
Mathematical Foundations:
  1. Bioavailability Amplification Curve: A_bio(V_asava) = 1.0 + (alpha * V) / (V + Km)
  2. Hepatic Cytochrome P450 Matrix: S_cyp = max(0, min(100, beta * D_hypnotic * A_bio - gamma * ln(1 + D_ashwa)))
  3. Snayu Active Stage Reflex Tone: T_snayu = 1.0 - exp(-(lambda * D_snayu * A_bio))
  4. Hemodynamic BP Stability Index: BP_stability = max(0, min(100, 100 - |120 - (D_bp * 2.4)|))
"""

import math
import random
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, Field

app = FastAPI(
    title="Sushruta-Trillion Chemo-Informatics Core",
    description="Mathematical API Engine for Hybrid Allopathy + Ayurveda Simulation",
    version="2.0.0"
)

# ---------------------------------------------------------
# Request & Response Schemas
# ---------------------------------------------------------
class DosageInput(BaseModel):
    allopathic_hypnotic_mg: float = Field(..., ge=0, le=50, description="D_allopathic in mg")
    asava_carrier_ml: float = Field(..., ge=0, le=10, description="V_asava carrier volume in mL")
    ashwagandha_mg: float = Field(..., ge=0, le=500, description="D_ashwagandha adaptogen in mg")
    snayu_stimulants_mg: float = Field(..., ge=0, le=120, description="D_snayu nerve stimulants in mg")
    bp_modulators_mg: float = Field(..., ge=0, le=120, description="D_bp vascular alkaloids in mg")

class SimulationResponse(BaseModel):
    dosages: DosageInput
    bioavailability_multiplier_Abio: float
    cytochrome_p450_stress_Scyp: float
    snayu_reflex_tone_Tsnayu: float
    bp_stability_index: float
    safety_clearance_status: str
    herb_drug_interference: bool
    predicted_liver_clearance_half_life_hrs: float
    gastric_disintegration_velocity_sec: float
    mucosal_shielding_coefficient: float
    nocturnal_glucose_stability_score: float

class BatchSummaryResponse(BaseModel):
    total_trials: int
    approved_count: int
    warning_count: int
    critical_count: int
    approved_percentage: float
    mean_bioavailability: float
    mean_cyp450_stress: float
    mean_snayu_tone: float
    mean_bp_stability: float
    trials: List[dict]

# ---------------------------------------------------------
# Core Mathematical Modeling Functions
# ---------------------------------------------------------
def calculate_a_bio(v_asava: float, alpha: float = 0.50, km: float = 1.5) -> float:
    """Non-linear Michaelis-Menten membrane saturation curve."""
    return round(1.0 + (alpha * v_asava) / (v_asava + km), 3)

def calculate_s_cyp(d_allopathic: float, d_ashwa: float, a_bio: float, beta: float = 4.5, gamma: float = 12.0) -> float:
    """Linear toxic loading minus logarithmic Withanolide cytoprotective shield."""
    toxic_load = beta * d_allopathic * a_bio
    herbal_shield = gamma * math.log(1.0 + d_ashwa)
    stress = toxic_load - herbal_shield
    return round(max(0.0, min(100.0, stress)), 2)

def calculate_t_snayu(d_snayu: float, a_bio: float, lambda_sens: float = 0.03) -> float:
    """Asymptotic neuromuscular reflex tone bound strictly between 0.0 and 1.0."""
    tone = 1.0 - math.exp(-(lambda_sens * d_snayu * a_bio))
    return round(max(0.0, min(1.0, tone)), 3)

def calculate_bp_stability(d_bp: float) -> float:
    """Vascular resistance stabilization around 120 mmHg equivalence."""
    deviation = abs(120.0 - (d_bp * 2.4))
    return round(max(0.0, min(100.0, 100.0 - deviation)), 1)

def evaluate_safety(s_cyp: float, t_snayu: float, bp_stability: float) -> str:
    if s_cyp > 85.0 or t_snayu > 0.95 or bp_stability < 35.0:
        return "CRITICAL_TOXICITY"
    elif s_cyp > 60.0 or t_snayu > 0.88 or bp_stability < 65.0:
        return "WARNING_HIGH_ACCUMULATION"
    return "APPROVED"

# ---------------------------------------------------------
# API Endpoints
# ---------------------------------------------------------
@app.post("/api/simulation/sushruta-trillion/simulate", response_model=SimulationResponse)
def simulate_single_pill(payload: DosageInput):
    """Executes single dosage combination chemo-informatics evaluation."""
    a_bio = calculate_a_bio(payload.asava_carrier_ml)
    s_cyp = calculate_s_cyp(payload.allopathic_hypnotic_mg, payload.ashwagandha_mg, a_bio)
    t_snayu = calculate_t_snayu(payload.snayu_stimulants_mg, a_bio)
    bp_stab = calculate_bp_stability(payload.bp_modulators_mg)
    safety = evaluate_safety(s_cyp, t_snayu, bp_stab)

    return SimulationResponse(
        dosages=payload,
        bioavailability_multiplier_Abio=a_bio,
        cytochrome_p450_stress_Scyp=s_cyp,
        snayu_reflex_tone_Tsnayu=t_snayu,
        bp_stability_index=bp_stab,
        safety_clearance_status=safety,
        herb_drug_interference=s_cyp > 70.0,
        predicted_liver_clearance_half_life_hrs=round(3.5 + (s_cyp / 100.0) * 7.5, 1),
        gastric_disintegration_velocity_sec=round(220.0 / a_bio, 1),
        mucosal_shielding_coefficient=round(1.0 + (payload.ashwagandha_mg * 0.0022), 2),
        nocturnal_glucose_stability_score=round(min(99.5, 88.0 + payload.ashwagandha_mg * 0.025), 1)
    )

@app.get("/api/simulation/sushruta-trillion/batch-test-100", response_model=BatchSummaryResponse)
def run_batch_test(seed: Optional[int] = Query(None, description="Optional random seed")):
    """
    Automated Batch-Tester Function:
    Loops through 100 randomized clinical dosage combinations to generate
    a comprehensive baseline safety dataset and parameter envelope.
    """
    if seed is not None:
        random.seed(seed)

    trials = []
    app_cnt, warn_cnt, crit_cnt = 0, 0, 0
    sum_bio, sum_cyp, sum_tone, sum_bp = 0.0, 0.0, 0.0, 0.0

    for i in range(1, 101):
        # Sample across full pharmacological parameter space
        hyp = round(random.uniform(2.0, 38.0), 1)
        asava = round(random.uniform(0.2, 4.8), 1)
        ashwa = round(random.uniform(20.0, 380.0), 1)
        snayu = round(random.uniform(5.0, 90.0), 1)
        bp = round(random.uniform(10.0, 90.0), 1)

        a_bio = calculate_a_bio(asava)
        s_cyp = calculate_s_cyp(hyp, ashwa, a_bio)
        t_snayu = calculate_t_snayu(snayu, a_bio)
        bp_stab = calculate_bp_stability(bp)
        safety = evaluate_safety(s_cyp, t_snayu, bp_stab)

        if safety == "APPROVED":
            app_cnt += 1
        elif safety == "WARNING_HIGH_ACCUMULATION":
            warn_cnt += 1
        else:
            crit_cnt += 1

        sum_bio += a_bio
        sum_cyp += s_cyp
        sum_tone += t_snayu
        sum_bp += bp_stab

        trials.append({
            "trial_id": i,
            "allopathic_hypnotic_mg": hyp,
            "asava_carrier_ml": asava,
            "ashwagandha_mg": ashwa,
            "snayu_stimulants_mg": snayu,
            "bp_modulators_mg": bp,
            "Abio": a_bio,
            "Scyp": s_cyp,
            "Tsnayu": t_snayu,
            "bp_stability": bp_stab,
            "safety_status": safety,
        })

    return BatchSummaryResponse(
        total_trials=100,
        approved_count=app_cnt,
        warning_count=warn_cnt,
        critical_count=crit_cnt,
        approved_percentage=float(app_cnt),
        mean_bioavailability=round(sum_bio / 100.0, 3),
        mean_cyp450_stress=round(sum_cyp / 100.0, 1),
        mean_snayu_tone=round(sum_tone / 100.0, 3),
        mean_bp_stability=round(sum_bp / 100.0, 1),
        trials=trials
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("fastapi_sushruta_server:app", host="0.0.0.0", port=8000, reload=True)
`;

  const handleCopyFastAPI = () => {
    navigator.clipboard.writeText(fastApiCode);
    setCopiedFastAPI(true);
    setTimeout(() => setCopiedFastAPI(false), 2000);
  };

  const handleDownloadFastAPI = () => {
    const blob = new Blob([fastApiCode], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fastapi_sushruta_server.py`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="p-4 sm:p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono-code font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Mathematical Foundations & Automated 100-Trial Batch-Tester</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
            Academic Biochemical Equations & 100-Run Safety Baseline Dataset
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5 max-w-2xl">
            Strict non-linear saturation kinetics for $A_\text&#123;bio&#125;$, logarithmic Withanolide cytoprotection for $S_\text&#123;cyp&#125;$, asymptotic Snayu reflex tone $T_\text&#123;snayu&#125;$, and automated 100-trial Monte Carlo batch sampling.
          </p>
        </div>

        {/* Action Buttons & Persona Narrator */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedPersona}
            onChange={(e) => setSelectedPersona(e.target.value as NarrationPersonaId)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono-code text-slate-300 hover:text-white cursor-pointer"
            title="Narration Voiceover Persona"
          >
            {Object.values(NARRATION_PERSONAS).map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleNarrateBatchResults}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono-code flex items-center gap-1.5 transition-all cursor-pointer ${
              isNarratingBatch
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Narrate 100-Trial Batch Analysis via Web Speech API"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isNarratingBatch ? 'animate-pulse' : ''}`} />
            <span>{isNarratingBatch ? 'Stop Voiceover' : 'Voiceover Batch Telemetry'}</span>
          </button>
        </div>
      </div>

      {/* Sub-Section Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs font-mono-code">
        <button
          onClick={() => setActiveSection('equations')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
            activeSection === 'equations'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Part 1: Mathematical Foundations</span>
        </button>

        <button
          onClick={() => setActiveSection('batch-tester')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
            activeSection === 'batch-tester'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Automated 100-Trial Batch-Tester</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-900 border border-slate-700 text-[10px] text-amber-300">
            100 Runs
          </span>
        </button>

        <button
          onClick={() => setActiveSection('fastapi')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
            activeSection === 'fastapi'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <FileCode className="w-4 h-4" />
          <span>Part 2: Clean FastAPI Backend Route Script</span>
        </button>
      </div>

      {/* SECTION 1: Mathematical Foundations & Interactive Equation Lab */}
      {activeSection === 'equations' && (
        <div className="space-y-6">
          {/* Quick Summary Pill & Dynamic Safety Evaluator Status */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono-code text-xs">
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-xl border ${
                  currentSafety === 'APPROVED'
                    ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-400'
                    : currentSafety === 'WARNING_HIGH_ACCUMULATION'
                    ? 'bg-amber-950/80 border-amber-500/60 text-amber-400'
                    : 'bg-rose-950/90 border-rose-500/80 text-rose-400 animate-pulse'
                }`}
              >
                {currentSafety === 'APPROVED' ? (
                  <ShieldCheck className="w-5 h-5" />
                ) : currentSafety === 'WARNING_HIGH_ACCUMULATION' ? (
                  <AlertTriangle className="w-5 h-5" />
                ) : (
                  <ShieldAlert className="w-5 h-5" />
                )}
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                  Simulated Safety Status
                </div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{currentSafety}</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Badges */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Bioavailability (A_bio)</span>
                <span className="text-xs font-bold text-cyan-400">{currentAbio}x</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Hepatic Stress (S_cyp)</span>
                <span
                  className={`text-xs font-bold ${
                    currentScyp > 85
                      ? 'text-rose-400'
                      : currentScyp > 60
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {currentScyp} / 100
                </span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Snayu Tone (T_snayu)</span>
                <span className="text-xs font-bold text-purple-400">{currentTsnayu} / 1.0</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">BP Stability</span>
                <span className="text-xs font-bold text-rose-400">{currentBp}%</span>
              </div>
            </div>
          </div>

          {/* Three Mathematical Equations Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Equation 1: Bioavailability Saturation Curve */}
            <div className="p-4 sm:p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold">
                    Equation 1
                  </span>
                  <span className="text-slate-400">Membrane Saturation</span>
                </div>

                <h4 className="text-sm font-bold text-white font-heading">
                  Bioavailability Amplification Function ($A_\text&#123;bio&#125;$)
                </h4>

                {/* LaTeX-styled mathematical formula box */}
                <div className="p-3 bg-slate-950 rounded-xl border border-cyan-500/30 font-mono-code text-cyan-300 text-center text-xs leading-relaxed shadow-inner">
                  <div className="font-bold text-sm tracking-wide">
                    A<sub>bio</sub>(V<sub>asava</sub>) = 1.0 + [ &alpha; &middot; V<sub>asava</sub> / (V<sub>asava</sub> + K<sub>m</sub>) ]
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    &alpha; = {eqAlpha} (50% max boost) | K<sub>m</sub> = {eqKm} mL
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  Systemic absorption modeled as a non-linear saturation curve (Michaelis-Menten equivalent). The fermented carrier lowers liquid surface tension safely plateauing to prevent unpredictable dosage spikes.
                </p>
              </div>

              {/* Slider for V_asava */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-2 font-mono-code text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-bold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    <span>V_asava (Carrier Volume)</span>
                  </span>
                  <span className="text-cyan-300 font-bold text-sm">{eqAsava.toFixed(1)} mL</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5.0"
                  step="0.1"
                  value={eqAsava}
                  onChange={(e) => setEqAsava(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1 border-t border-slate-900">
                  <span>Calculated A_bio:</span>
                  <span className="text-cyan-300 font-bold text-xs">{currentAbio}x (+{((currentAbio - 1) * 100).toFixed(1)}%)</span>
                </div>
              </div>
            </div>

            {/* Equation 2: Hepatic CYP450 Functional Stress Matrix */}
            <div className="p-4 sm:p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
                    Equation 2
                  </span>
                  <span className="text-slate-400">Hepato-Biliary Axis</span>
                </div>

                <h4 className="text-sm font-bold text-white font-heading">
                  Hepatic CYP450 Functional Stress Matrix ($S_\text&#123;cyp&#125;$)
                </h4>

                {/* LaTeX-styled mathematical formula box */}
                <div className="p-3 bg-slate-950 rounded-xl border border-amber-500/30 font-mono-code text-amber-300 text-center text-xs leading-relaxed shadow-inner">
                  <div className="font-bold text-xs tracking-wide">
                    S<sub>cyp</sub> = max(0, min(100, &beta; &middot; D<sub>hypnotic</sub> &middot; A<sub>bio</sub> - &gamma; &middot; ln(1 + D<sub>ashwa</sub>)))
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    &beta; = {eqBeta} (linear toxic load) | &gamma; = {eqGamma} (logarithmic shield)
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  Evaluates synthetic chemical burden versus logarithmic hepatoprotection driven by Ashwagandha Withanolides. Prevents toxic accumulation and drug-induced enzyme exhaustion.
                </p>
              </div>

              {/* Sliders for Hypnotic & Ashwagandha */}
              <div className="space-y-3 font-mono-code text-xs">
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1.5">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-[11px] font-bold">D_allopathic (Hypnotic)</span>
                    <span className="text-sky-300 font-bold">{eqHypnotic} mg</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    step="1"
                    value={eqHypnotic}
                    onChange={(e) => setEqHypnotic(Number(e.target.value))}
                    className="w-full accent-sky-400 cursor-pointer"
                  />
                </div>

                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1.5">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-[11px] font-bold">D_ashwagandha (Cytoprotective)</span>
                    <span className="text-amber-300 font-bold">{eqAshwagandha} mg</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="400"
                    step="10"
                    value={eqAshwagandha}
                    onChange={(e) => setEqAshwagandha(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-400 px-1">
                  <span>Calculated S_cyp:</span>
                  <span
                    className={`font-bold text-xs ${
                      currentScyp > 85
                        ? 'text-rose-400'
                        : currentScyp > 60
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {currentScyp} / 100
                  </span>
                </div>
              </div>
            </div>

            {/* Equation 3: Snayu Reflex Tone Function */}
            <div className="p-4 sm:p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold">
                    Equation 3
                  </span>
                  <span className="text-slate-400">Neuromuscular Vector</span>
                </div>

                <h4 className="text-sm font-bold text-white font-heading">
                  Snayu Active Stage Reflex Tone ($T_\text&#123;snayu&#125;$)
                </h4>

                {/* LaTeX-styled mathematical formula box */}
                <div className="p-3 bg-slate-950 rounded-xl border border-purple-500/30 font-mono-code text-purple-300 text-center text-xs leading-relaxed shadow-inner">
                  <div className="font-bold text-xs tracking-wide">
                    T<sub>snayu</sub> = 1.0 - e<sup>-(&lambda; &middot; D<sub>snayu</sub> &middot; A<sub>bio</sub>)</sup>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    &lambda; = {eqLambda} (receptor binding sensitivity) | Range: [0.0 - 1.0]
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  Peripheral nerve and tendon activation function. Models micro-doses of Jyotishmati and purified Kupilu to prevent sleep-induced physical limpness without awakening the patient.
                </p>
              </div>

              {/* Slider for D_snayu */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-2 font-mono-code text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-bold flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-purple-400" />
                    <span>D_snayu (Neuro-Stimulants)</span>
                  </span>
                  <span className="text-purple-300 font-bold text-sm">{eqSnayu} mg</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={eqSnayu}
                  onChange={(e) => setEqSnayu(Number(e.target.value))}
                  className="w-full accent-purple-400 cursor-pointer"
                />
                <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1 border-t border-slate-900">
                  <span>Calculated T_snayu:</span>
                  <span
                    className={`font-bold text-xs ${
                      currentTsnayu > 0.95
                        ? 'text-rose-400'
                        : currentTsnayu >= 0.5
                        ? 'text-emerald-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {currentTsnayu} / 1.0 ({currentTsnayu > 0.95 ? 'Hyper-reflexia' : currentTsnayu >= 0.5 ? 'Tone Preserved' : 'Limpness Risk'})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: Automated 100-Trial Batch-Tester Engine */}
      {activeSection === 'batch-tester' && (
        <div className="space-y-6">
          {/* Batch Tester Controls & Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1: Approved Ratio */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
                <span>Approved Clearances</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold font-heading text-emerald-400">
                {batchResults.approved_percentage}%
              </div>
              <div className="text-[11px] text-slate-500 font-mono-code">
                {batchResults.approved_count} of 100 permutations safe
              </div>
            </div>

            {/* Metric 2: Mean Bioavailability */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
                <span>Mean A_bio Multiplier</span>
                <Activity className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold font-heading text-cyan-400">
                {batchResults.mean_bioavailability}x
              </div>
              <div className="text-[11px] text-slate-500 font-mono-code">
                Fermented Asava membrane boost
              </div>
            </div>

            {/* Metric 3: Mean Snayu Tone */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
                <span>Mean Snayu Tone</span>
                <Cpu className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-bold font-heading text-purple-400">
                {batchResults.mean_snayu_tone} / 1.0
              </div>
              <div className="text-[11px] text-slate-500 font-mono-code">
                Target locomotor tone envelope [0.55 - 0.75]
              </div>
            </div>

            {/* Metric 4: Mean Hepatic Stress */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
                <span>Mean CYP450 Stress</span>
                <Flame className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold font-heading text-amber-400">
                {batchResults.mean_cyp450_stress} / 100
              </div>
              <div className="text-[11px] text-slate-500 font-mono-code">
                Withanolide hepatic clearance
              </div>
            </div>
          </div>

          {/* Action Row: Re-run 100 Trials, Filter, Search, Download CSV/JSON */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code">
            {/* Left: Re-run button & Filter buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleRun100Batch}
                disabled={isGeneratingBatch}
                className="min-h-[38px] px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider flex items-center gap-2 shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isGeneratingBatch ? 'Running 100 Trials...' : 'Run 100-Trial Batch Test'}</span>
              </button>

              {/* Status Filter */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setStatusFilter('ALL')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    statusFilter === 'ALL'
                      ? 'bg-slate-800 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All (100)
                </button>
                <button
                  onClick={() => setStatusFilter('APPROVED')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    statusFilter === 'APPROVED'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50 font-bold'
                      : 'text-emerald-400/80 hover:text-emerald-300'
                  }`}
                >
                  Approved ({batchResults.approved_count})
                </button>
                <button
                  onClick={() => setStatusFilter('WARNING_HIGH_ACCUMULATION')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    statusFilter === 'WARNING_HIGH_ACCUMULATION'
                      ? 'bg-amber-950 text-amber-300 border border-amber-500/50 font-bold'
                      : 'text-amber-400/80 hover:text-amber-300'
                  }`}
                >
                  Warning ({batchResults.warning_count})
                </button>
                <button
                  onClick={() => setStatusFilter('CRITICAL_TOXICITY')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    statusFilter === 'CRITICAL_TOXICITY'
                      ? 'bg-rose-950 text-rose-300 border border-rose-500/50 font-bold'
                      : 'text-rose-400/80 hover:text-rose-300'
                  }`}
                >
                  Critical ({batchResults.critical_count})
                </button>
              </div>
            </div>

            {/* Right: Search + Export Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search Trial ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs w-36 focus:w-44 transition-all focus:border-amber-400 outline-none"
                />
              </div>

              <button
                onClick={handleCopyCSV}
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Copy dataset as CSV"
              >
                {copiedCSV ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCSV ? 'Copied CSV!' : 'Copy CSV'}</span>
              </button>

              <button
                onClick={handleDownloadCSV}
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Download CSV file"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>

              <button
                onClick={handleDownloadJSON}
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Download JSON dataset"
              >
                <Download className="w-3.5 h-3.5" />
                <span>JSON</span>
              </button>
            </div>
          </div>

          {/* 100-Trial Dataset Table */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden text-xs font-mono-code">
            <div className="overflow-x-auto max-h-[480px]">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-950 sticky top-0 z-10 text-[10px] text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Trial ID</th>
                    <th className="py-2.5 px-3">Hypnotic</th>
                    <th className="py-2.5 px-3">Asava</th>
                    <th className="py-2.5 px-3">Ashwa</th>
                    <th className="py-2.5 px-3">Snayu</th>
                    <th className="py-2.5 px-3">BP Alk.</th>
                    <th className="py-2.5 px-3">A_bio</th>
                    <th className="py-2.5 px-3">S_cyp</th>
                    <th className="py-2.5 px-3">T_snayu</th>
                    <th className="py-2.5 px-3">BP Score</th>
                    <th className="py-2.5 px-3">Safety Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredTrials.map((t) => (
                    <tr
                      key={t.trial_id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        selectedTrial?.trial_id === t.trial_id ? 'bg-amber-500/10' : ''
                      }`}
                    >
                      <td className="py-2 px-3 font-bold text-slate-300">
                        #{t.trial_id.toString().padStart(3, '0')}
                      </td>
                      <td className="py-2 px-3 text-sky-300">
                        {t.dosages.allopathic_hypnotic_mg} mg
                      </td>
                      <td className="py-2 px-3 text-purple-300">
                        {t.dosages.asava_carrier_ml} mL
                      </td>
                      <td className="py-2 px-3 text-amber-300">
                        {t.dosages.ashwagandha_mg} mg
                      </td>
                      <td className="py-2 px-3 text-emerald-300">
                        {t.dosages.snayu_stimulants_mg} mg
                      </td>
                      <td className="py-2 px-3 text-rose-300">
                        {t.dosages.bp_modulators_mg} mg
                      </td>
                      <td className="py-2 px-3 text-cyan-300 font-bold">
                        {t.bioavailability_multiplier}x
                      </td>
                      <td className="py-2 px-3">
                        <span
                          className={`font-bold ${
                            t.cytochrome_p450_stress > 85
                              ? 'text-rose-400'
                              : t.cytochrome_p450_stress > 60
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {t.cytochrome_p450_stress}
                        </span>
                      </td>
                      <td className="py-2 px-3 font-bold text-purple-300">
                        {t.snayu_reflex_tone}
                      </td>
                      <td className="py-2 px-3 font-bold text-rose-300">
                        {t.bp_stability_index}%
                      </td>
                      <td className="py-2 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            t.safety_status === 'APPROVED'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                              : t.safety_status === 'WARNING_HIGH_ACCUMULATION'
                              ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                              : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                          }`}
                        >
                          {t.safety_status === 'APPROVED'
                            ? 'Approved'
                            : t.safety_status === 'WARNING_HIGH_ACCUMULATION'
                            ? 'Warning'
                            : 'Critical'}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right">
                        <button
                          onClick={() => setSelectedTrial(t)}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] cursor-pointer"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Trial Detail Drawer (When clicked) */}
          {selectedTrial && (
            <div className="p-4 sm:p-5 bg-slate-950 rounded-2xl border border-amber-500/40 space-y-4 animate-fade-in font-mono-code text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">
                    Trial #{selectedTrial.trial_id} Detailed Bio-Informatics Packet
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      selectedTrial.safety_status === 'APPROVED'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                        : selectedTrial.safety_status === 'WARNING_HIGH_ACCUMULATION'
                        ? 'bg-amber-950 text-amber-300 border border-amber-500/50'
                        : 'bg-rose-950 text-rose-300 border border-rose-500/50'
                    }`}
                  >
                    {selectedTrial.safety_status}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedTrial(null)}
                  className="text-slate-500 hover:text-white cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300">
                <div className="p-3 bg-slate-900 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">Liver Clearance Half-Life</span>
                  <span className="text-sm font-bold text-white">
                    {selectedTrial.predicted_liver_clearance_half_life_hrs} hrs
                  </span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">Gastric Disintegration</span>
                  <span className="text-sm font-bold text-white">
                    {selectedTrial.gastric_disintegration_velocity_sec} sec
                  </span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">Mucosal Shielding</span>
                  <span className="text-sm font-bold text-white">
                    {selectedTrial.mucosal_shielding_coefficient}
                  </span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">Nocturnal Glucose Stability</span>
                  <span className="text-sm font-bold text-emerald-400">
                    {selectedTrial.nocturnal_glucose_stability_score}%
                  </span>
                </div>
              </div>

              {onApplyTrialToSimulation && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      onApplyTrialToSimulation(selectedTrial);
                      soundEngine.playSuccess();
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Load Trial into Graphic Novel Pill Simulation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: Part 2 FastAPI Clean Backend Route Script */}
      {activeSection === 'fastapi' && (
        <div className="space-y-4 font-mono-code text-xs">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-bold">
                <FileCode className="w-4 h-4 text-amber-400" />
                <span>FastAPI Clean Backend API Route Script (Part 2 Specification)</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyFastAPI}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedFastAPI ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedFastAPI ? 'Copied FastAPI Script!' : 'Copy Script'}</span>
                </button>

                <button
                  onClick={handleDownloadFastAPI}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .py</span>
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Provides production-ready Pydantic payload validation, strict schema types, mathematical evaluation endpoints, and the automated 100-run batch-tester function. Run directly with <code className="text-amber-300">uvicorn fastapi_sushruta_server:app --reload</code>.
            </p>
          </div>

          <pre className="text-[11px] text-slate-300 overflow-x-auto p-4 bg-slate-950 rounded-xl border border-slate-800/80 max-h-[500px] leading-relaxed select-text">
            {fastApiCode}
          </pre>
        </div>
      )}
    </div>
  );
};
