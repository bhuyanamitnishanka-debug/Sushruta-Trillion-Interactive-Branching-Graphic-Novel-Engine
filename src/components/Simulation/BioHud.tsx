import React, { useState } from 'react';
import { ClinicalMetrics } from '../../types/graphicNovel';
import { Activity, ShieldCheck, Zap, Flame, ChevronUp, ChevronDown } from 'lucide-react';

interface BioHudProps {
  metrics: ClinicalMetrics;
}

export const BioHud: React.FC<BioHudProps> = ({ metrics }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-slate-950/90 border-b border-slate-800/80 backdrop-blur-md px-3 py-1.5 z-30 transition-all select-none">
      {/* Compact Status Bar (Strictly < 15% Mobile Viewport) */}
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-left cursor-pointer group"
          aria-expanded={isExpanded}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-mono-code font-bold tracking-tight text-white uppercase group-hover:text-amber-400 transition-colors">
              Sushruta-Trillion HUD
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono-code text-slate-400">
            <span>Stability:</span>
            <span className="font-bold text-emerald-400 tabular-nums">
              {(metrics.overallStability * 100).toFixed(0)}%
            </span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            )}
          </div>
        </button>

        {/* Quick Micro Meters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1" title="Synaptic Dopamine (Allopathy)">
            <Zap className="w-3 h-3 text-sky-400" />
            <span className="text-[10px] font-mono-code text-sky-300 tabular-nums">
              {metrics.dopamineStability}%
            </span>
          </div>

          <div className="flex items-center gap-1" title="ROS Suppression (Ayurveda)">
            <Flame className="w-3 h-3 text-amber-400" />
            <span className="text-[10px] font-mono-code text-amber-300 tabular-nums">
              {metrics.rosSuppression}%
            </span>
          </div>
        </div>
      </div>

      {/* Expanded Diagnostic Matrix */}
      {isExpanded && (
        <div className="max-w-md mx-auto pt-2 pb-1 grid grid-cols-2 gap-2 text-xs border-t border-slate-800/80 mt-1.5 animate-fade-in">
          {/* Track 1: Allopathic Targeted Speed */}
          <div className="p-2 rounded-lg bg-slate-900/90 border border-sky-950">
            <div className="flex items-center justify-between text-[10px] font-mono-code text-sky-400 mb-1">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3" /> Allopathy Track
              </span>
              <span className="font-bold tabular-nums">{metrics.dopamineStability}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-sky-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, metrics.dopamineStability))}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Receptor Docking Speed: 45 min half-life</p>
          </div>

          {/* Track 2: Ayurvedic Bio-Enhancement */}
          <div className="p-2 rounded-lg bg-slate-900/90 border border-amber-950">
            <div className="flex items-center justify-between text-[10px] font-mono-code text-amber-400 mb-1">
              <span className="flex items-center gap-1">
                <Flame className="w-3 h-3" /> Rasashastra Track
              </span>
              <span className="font-bold tabular-nums">{metrics.rosSuppression}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, metrics.rosSuppression))}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">SOD-3 Cellular Decay Down-regulation</p>
          </div>

          {/* Bioavailability Boost */}
          <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between text-[10px] font-mono-code text-purple-400 mb-1">
              <span className="flex items-center gap-1">
                <Activity className="w-3 h-3" /> Bhavana Bioavailability
              </span>
              <span className="font-bold tabular-nums">+{metrics.bioavailabilityBoost}%</span>
            </div>
            <p className="text-[10px] text-slate-400">Natural lipid carrier membrane transit boost</p>
          </div>

          {/* Cross-Interaction & Toxicity Validator */}
          <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between text-[10px] font-mono-code text-emerald-400 mb-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Heavy-Metal Clearance
              </span>
              <span className="font-bold tabular-nums">{metrics.clearanceSafety}%</span>
            </div>
            <p className="text-[10px] text-slate-400">Hepatic enzyme & renal filtration safety index</p>
          </div>
        </div>
      )}
    </div>
  );
};
