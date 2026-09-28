import React, { useState } from 'react';
import { Zap, Flame, ShieldCheck, Activity, RefreshCw } from 'lucide-react';
import { soundEngine } from '../../utils/audioSynthesizer';

export const SimulationMatrixView: React.FC = () => {
  const [dopamineDose, setDopamineDose] = useState<number>(100); // mg/hr
  const [kosthiTemp, setKosthiTemp] = useState<number>(450); // Celsius
  const [maaranaCycles, setMaaranaCycles] = useState<number>(18); // Calcination stages
  const [lipidBhavanaRatio, setLipidBhavanaRatio] = useState<number>(34); // % Boost

  // Calculated simulation outputs
  const receptorBindingSpeedMin = Math.max(15, Math.round(55 - (dopamineDose * 0.15)));
  const rosSuppressionPct = Math.min(94, Math.round(20 + (kosthiTemp * 0.08) + (maaranaCycles * 1.5)));
  const nanoparticleSizeNm = Math.max(12, Math.round(120 - (maaranaCycles * 4.8) - (kosthiTemp * 0.08)));
  const heavyMetalClearanceSafety = Math.min(99, Math.round(60 + (maaranaCycles * 1.8) + (kosthiTemp * 0.04)));
  const systemicStabilityIndex = ((rosSuppressionPct * 0.4 + (100 - receptorBindingSpeedMin) * 0.3 + heavyMetalClearanceSafety * 0.3) / 100).toFixed(2);

  return (
    <div className="w-full h-full overflow-y-auto p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-amber-400 mb-1">
          <Activity className="w-4 h-4" />
          <span className="text-xs font-mono-code uppercase tracking-wider font-bold">
            Sushruta-Trillion Hybrid Engine
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
          Allopathy & Ayur-Chemo-Informatics Simulation Matrix
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
          Simulating real-time molecular docking kinetics alongside traditional Rasashastra calcination parameters.
        </p>
      </div>

      {/* Interactive Parameter Tuners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Module 1 Controls: Allopathy */}
        <div className="p-4 bg-slate-900 rounded-2xl border border-sky-900/60 space-y-3">
          <div className="flex items-center gap-2 text-sky-400 text-xs font-mono-code font-bold uppercase">
            <Zap className="w-4 h-4" />
            <span>Module 1: Allopathic Targeted Protocol</span>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-mono-code mb-1">
              <span className="text-slate-300">Levodopa Infusion Rate:</span>
              <span className="font-bold text-sky-300">{dopamineDose} mg/hr</span>
            </div>
            <input
              type="range"
              min="20"
              max="250"
              value={dopamineDose}
              onChange={(e) => {
                setDopamineDose(Number(e.target.value));
                soundEngine.playTechScan();
              }}
              className="w-full accent-sky-400 cursor-pointer"
            />
          </div>

          <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>Receptor Hit Velocity:</span>
              <span className="text-white font-bold">{receptorBindingSpeedMin} minutes</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Receptor Blocking Speed:</span>
              <span className="text-sky-300 font-mono-code">Kd = 2.4 nM (D1/D2 Active)</span>
            </div>
          </div>
        </div>

        {/* Module 2 Controls: Rasashastra */}
        <div className="p-4 bg-slate-900 rounded-2xl border border-amber-900/60 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono-code font-bold uppercase">
            <Flame className="w-4 h-4" />
            <span>Module 2: Rasashastra Nanoparticle Solver</span>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-mono-code mb-1">
              <span className="text-slate-300">Kosthi Thermal Calcination:</span>
              <span className="font-bold text-amber-300">{kosthiTemp} °C</span>
            </div>
            <input
              type="range"
              min="300"
              max="650"
              step="10"
              value={kosthiTemp}
              onChange={(e) => {
                setKosthiTemp(Number(e.target.value));
                soundEngine.playCrucibleFlame();
              }}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-mono-code mb-1">
              <span className="text-slate-300">Maarana Calcination Cycles:</span>
              <span className="font-bold text-amber-300">{maaranaCycles} stages</span>
            </div>
            <input
              type="range"
              min="3"
              max="24"
              value={maaranaCycles}
              onChange={(e) => {
                setMaaranaCycles(Number(e.target.value));
                soundEngine.playCrucibleFlame();
              }}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>Calculated Nanoparticle Size:</span>
              <span className="text-amber-300 font-bold">{nanoparticleSizeNm} nm (Bio-Chelated)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Cellular ROS Suppression Metric:</span>
              <span className="text-emerald-400 font-bold">{rosSuppressionPct}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Module 3: Cross-Interaction Validation Array */}
      <div className="p-5 bg-slate-900 rounded-2xl border border-emerald-900/60 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono-code font-bold uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Module 3: Cross-Interaction & Toxicity Validation Array</span>
          </div>
          <span className="text-xs font-mono-code text-emerald-400 font-bold">
            {heavyMetalClearanceSafety}% Safe Clearance
          </span>
        </div>

        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          Analyzes interference between active botanical alkaloids (Giloy, Jyotishmati) and synthetic allopathic molecules to prevent hepatic enzyme inhibition or renal accumulation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
          <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-500 font-mono-code block">Hepatic Degradation</span>
            <span className="font-bold text-white font-mono-code">CYP3A4 Synchronized</span>
          </div>
          <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-500 font-mono-code block">Kidney Filtration</span>
            <span className="font-bold text-white font-mono-code">GFR &gt; 90 mL/min Safe</span>
          </div>
          <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-500 font-mono-code block">Systemic Stability Index</span>
            <span className="font-bold text-emerald-400 font-mono-code">{systemicStabilityIndex} / 1.00</span>
          </div>
        </div>
      </div>

      {/* Comparative Simulation Output Mapping Table */}
      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto">
        <h3 className="text-xs font-mono-code uppercase font-bold text-slate-300 mb-3 tracking-wider">
          Hybrid Dual-Track Output Architecture
        </h3>
        <table className="w-full text-left text-xs font-sans">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-mono-code">
              <th className="py-2 pr-4">Target System Parameter</th>
              <th className="py-2 pr-4 text-sky-400">Track 1: Allopathic Action</th>
              <th className="py-2 pr-4 text-amber-400">Track 2: Ayurvedic Bio-Enhancement</th>
              <th className="py-2 text-emerald-400">Hybrid Simulation Outcome</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            <tr>
              <td className="py-2.5 font-bold text-white pr-4">Immediate Synaptic Dopamine</td>
              <td className="py-2.5 pr-4">Hits synaptic receptors in ~{receptorBindingSpeedMin} mins to restore motor signaling.</td>
              <td className="py-2.5 pr-4">Jyotishmati extracts stabilize endogenous receptors, sustaining signaling.</td>
              <td className="py-2.5 font-mono-code text-sky-300">System Stability: {systemicStabilityIndex}</td>
            </tr>
            <tr>
              <td className="py-2.5 font-bold text-white pr-4">Cellular Longevity & Oxidative Stress</td>
              <td className="py-2.5 pr-4">Standard synthetic vitamins provide baseline antioxidant scavenging.</td>
              <td className="py-2.5 pr-4">{nanoparticleSizeNm}nm Shodhana Bhasma down-regulates SOD-3 decay indices.</td>
              <td className="py-2.5 font-mono-code text-amber-300">ROS Suppression: {rosSuppressionPct}%</td>
            </tr>
            <tr>
              <td className="py-2.5 font-bold text-white pr-4">Structural Delivery Optimization</td>
              <td className="py-2.5 pr-4">Synthetic chemical emulsifiers manage targeted localized capsule disintegration.</td>
              <td className="py-2.5 pr-4">Bhavana lipid-binding networks maximize cellular membrane transit.</td>
              <td className="py-2.5 font-mono-code text-emerald-300">Bioavailability: +{lipidBhavanaRatio}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
