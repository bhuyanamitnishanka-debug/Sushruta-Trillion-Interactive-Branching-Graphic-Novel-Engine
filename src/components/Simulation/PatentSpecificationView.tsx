import React, { useState } from 'react';
import { soundEngine } from '../../utils/audioSynthesizer';
import { narrationEngine, NARRATION_PERSONAS, NarrationPersonaId } from '../../utils/narrationVoiceover';
import {
  FileText,
  Copy,
  Check,
  Download,
  Volume2,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
  Zap,
  Activity,
  HeartPulse,
} from 'lucide-react';

export const PatentSpecificationView: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isNarrating, setIsNarrating] = useState<boolean>(false);
  const [selectedPersona, setSelectedPersona] = useState<NarrationPersonaId>('clinical-ai');

  const patentTextFull = `PATENT SPECIFICATION & INVENTIVE SUMMARY PROTOCOL

TITLE OF THE INVENTION:
A Multi-Layered Synchronized Bio-Informatic Hybrid Oral Composition for Neurological Sedation, Snayu Nerve Optimization, and Hemodynamic Balance.

INVENTOR DESIGNATE:
Amit Nishanka Bhuyan

1. FIELD OF THE INVENTION
This invention belongs to the field of multi-targeted advanced chemo-informatics, pharmaceutical co-crystallization, and traditional Ayurvedic Rasashastra engineering. It specifically outlines an oral delivery vehicle that merges immediate synthetic sedation pathways with long-term adaptive botanical neural maintenance networks.

2. PRIOR ART & PROBLEM STATEMENT
Existing allopathic hypnotic agents and sleep medicines aggressively up-regulate central nervous system depression. This mechanical overdrive regularly yields adverse secondary profiles, including:
a) Nocturnal locomotor/muscle limpness due to excessive down-regulation of nerve-tendon pathways.
b) Hazardous overnight cardiovascular fluctuations (sudden high or low blood pressure spikes/crashes).
c) Hepatic stress marked by heavy cytochrome P450 overload during drug clearance operations.
d) Pancreatic metabolic instability causing irregular midnight blood-sugar fluctuations.

3. SUMMARY OF THE SPECIFIC INVENTIVE STEP
The current invention resolves these problems via a multi-chambered, timed-release structural matrix (Codename: NH-Synchro-02-Max):
a) Immediate Release Layer (Allopathic Core): Delivers precise synthetic hypnotic compounds targeting central GABA receptors to reduce initial sleep latency.
b) Bio-Enhancement Catalyst Framework: Embeds a self-generated fermented Asava medium that operates as an organic cellular key (Yogavahi), lowering local surface tension and magnifying membrane permeability by up to 34%.
c) Snayu Stimulation Grid: Deploys calculated botanical micro-doses of Jyotishmati and purified Kupilu to maintain basal neural-reflex tone, protecting structural motor channels from completely collapsing during sleep.
d) Vascular Fluid Balance Matrix: Deploys specialized herbo-mineral compounds to normalize systemic peripheral vascular resistance, acting as an internal regulator that dynamically stabilizes both hypertensive and hypotensive ranges.
e) Organ Protection Complex: Infuses Withanolides to shield liver cells from drug debris, while preserving pancreatic cell lines to enforce uniform insulin synthesis throughout the night.

4. PATENT CLAIMS (CORE ARCHITECTURE)
What is claimed is:
1. A synchronized hybrid composition combining a synthetic sleep-induction core with a bio-fermented delivery vector.
2. The delivery vector of claim 1, wherein the fermented medium serves to lower cellular surface tension, boosting overall drug absorption kinetics.
3. The hybrid composition of claim 1, further comprising an embedded micro-dose neural framework that stabilizes sensory-motor 'Snayu' reflexes and prevents overnight blood pressure crashes or spikes during sleep.
4. The hybrid composition of claim 1, wherein the biochemical balance down-regulates liver enzyme stress and ensures steady insulin release from the pancreas.
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(patentTextFull);
    setCopied(true);
    soundEngine.playPageFlip();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([patentTextFull], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NH_Synchro_02_Max_Patent_Specification.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleToggleNarration = () => {
    if (isNarrating) {
      narrationEngine.stop();
      setIsNarrating(false);
    } else {
      const readingText = `Patent Specification for NH-Synchro-02-Max. Title of the invention: A Multi-Layered Synchronized Bio-Informatic Hybrid Oral Composition for Neurological Sedation, Snayu Nerve Optimization, and Hemodynamic Balance. Inventor designate: Amit Nishanka Bhuyan. Field of the invention: Multi-targeted chemo-informatics and Ayurvedic Rasashastra engineering. The invention resolves prior art locomotor limpness and nocturnal blood pressure oscillations through a multi-chambered matrix. Claim 1: A synchronized hybrid composition combining a synthetic sleep-induction core with a bio-fermented delivery vector. Claim 3: An embedded micro-dose neural framework that stabilizes sensory-motor Snayu reflexes and prevents overnight blood pressure crashes or spikes.`;
      narrationEngine.speak(readingText, selectedPersona);
      setIsNarrating(true);
      setTimeout(() => setIsNarrating(false), 14000);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono-code font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Part 2: Complete Patent Summary Documentation</span>
          </div>
          <h3 className="text-xl font-bold text-white font-heading">
            PATENT SPECIFICATION & INVENTIVE SUMMARY PROTOCOL
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            System Formulation Codename: <strong className="text-amber-300">NH-Synchro-02-Max</strong> · Official Registry Filing Document
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Persona selector for patent reading */}
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
            title="Narrate Patent Claims via Web Speech API"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isNarrating ? 'animate-pulse' : ''}`} />
            <span>{isNarrating ? 'Stop Reading' : 'Narrate Claims'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer font-mono-code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer font-mono-code"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .md</span>
          </button>
        </div>
      </div>

      {/* Patent Specification Content */}
      <div className="space-y-6 text-xs text-slate-300 font-sans leading-relaxed">
        {/* Title & Inventor Metadata */}
        <section className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <span className="text-[10px] font-mono-code text-amber-400 uppercase tracking-wider font-bold block">
            Filing Metadata
          </span>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white font-mono-code">
              TITLE OF THE INVENTION:
            </h4>
            <p className="text-slate-200 font-medium font-heading text-sm">
              A Multi-Layered Synchronized Bio-Informatic Hybrid Oral Composition for Neurological Sedation, Snayu Nerve Optimization, and Hemodynamic Balance.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-900 flex items-center gap-2">
            <span className="text-slate-400 font-mono-code">INVENTOR DESIGNATE:</span>
            <span className="text-amber-300 font-bold font-mono-code text-sm">
              Amit Nishanka Bhuyan
            </span>
          </div>
        </section>

        {/* Section 1: Field of Invention */}
        <section className="space-y-2">
          <h4 className="text-sm font-bold text-amber-300 font-mono-code uppercase flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>1. FIELD OF THE INVENTION</span>
          </h4>
          <p className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800/80 leading-relaxed">
            This invention belongs to the field of multi-targeted advanced chemo-informatics, pharmaceutical co-crystallization, and traditional Ayurvedic Rasashastra engineering. It specifically outlines an oral delivery vehicle that merges immediate synthetic sedation pathways with long-term adaptive botanical neural maintenance networks.
          </p>
        </section>

        {/* Section 2: Prior Art & Problem Statement */}
        <section className="space-y-2">
          <h4 className="text-sm font-bold text-rose-300 font-mono-code uppercase flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-rose-400" />
            <span>2. PRIOR ART & PROBLEM STATEMENT</span>
          </h4>
          <p className="text-slate-400">
            Existing allopathic hypnotic agents and sleep medicines aggressively up-regulate central nervous system depression. This mechanical overdrive regularly yields adverse secondary profiles, including:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <strong className="text-rose-300 font-mono-code text-[11px] block">
                a) Nocturnal Motor Limpness
              </strong>
              <p className="text-[11px] text-slate-400">
                Locomotor and muscle flaccidity due to excessive mechanical down-regulation of nerve-tendon (Snayu) reflex channels.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <strong className="text-rose-300 font-mono-code text-[11px] block">
                b) Hazardous Hemodynamic Swings
              </strong>
              <p className="text-[11px] text-slate-400">
                Overnight cardiovascular instability causing sudden hypotensive crashes during deep sleep or hyper-arousal hypertensive spikes.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <strong className="text-rose-300 font-mono-code text-[11px] block">
                c) Hepatic Microsomal CYP450 Stress
              </strong>
              <p className="text-[11px] text-slate-400">
                High liver burden during synthetic drug clearance yielding next-day grogginess and metabolic accumulation.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <strong className="text-rose-300 font-mono-code text-[11px] block">
                d) Pancreatic Glucose Instability
              </strong>
              <p className="text-[11px] text-slate-400">
                Oxidative stress on beta-cells causing erratic nocturnal insulin drops and compensatory morning dysglycemia.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Summary of the Specific Inventive Step */}
        <section className="space-y-2">
          <h4 className="text-sm font-bold text-emerald-300 font-mono-code uppercase flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>3. SUMMARY OF THE SPECIFIC INVENTIVE STEP</span>
          </h4>
          <p className="text-slate-400">
            The current invention resolves these problems via a multi-chambered, timed-release structural matrix (Codename: <strong className="text-white">NH-Synchro-02-Max</strong>):
          </p>

          <div className="space-y-2">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <strong className="text-sky-300 font-mono-code text-[11px] block mb-0.5">
                a) Immediate Release Layer (Allopathic Core)
              </strong>
              <p className="text-[11px] text-slate-400">
                Delivers precise synthetic hypnotic compounds targeting central GABA receptors to reduce initial sleep latency within 180 seconds.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <strong className="text-purple-300 font-mono-code text-[11px] block mb-0.5">
                b) Bio-Enhancement Catalyst Framework
              </strong>
              <p className="text-[11px] text-slate-400">
                Embeds a self-generated fermented Asava medium operating as an organic cellular key (Yogavahi), lowering local surface tension and magnifying membrane permeability by up to 34%.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <strong className="text-emerald-300 font-mono-code text-[11px] block mb-0.5">
                c) Snayu Stimulation Grid (Nerve-Tendon Reflex Tone)
              </strong>
              <p className="text-[11px] text-slate-400">
                Deploys calculated botanical micro-doses of Jyotishmati and purified Kupilu to maintain basal neural-reflex tone, protecting structural motor channels from completely collapsing during sleep.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <strong className="text-rose-300 font-mono-code text-[11px] block mb-0.5">
                d) Vascular Fluid Balance Matrix
              </strong>
              <p className="text-[11px] text-slate-400">
                Deploys specialized herbo-mineral compounds (Sarpagandha alkaloids) to normalize systemic peripheral vascular resistance, dynamically stabilizing both hypertensive and hypotensive ranges.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <strong className="text-amber-300 font-mono-code text-[11px] block mb-0.5">
                e) Organ Protection Complex
              </strong>
              <p className="text-[11px] text-slate-400">
                Infuses Withanolides to shield liver cells from drug debris (CYP450 stress &le; 15.0/100), while preserving pancreatic cell lines to enforce uniform insulin synthesis throughout the night.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Patent Claims (Core Architecture) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
            <h4 className="text-sm font-bold text-amber-300 font-mono-code uppercase flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>4. PATENT CLAIMS (CORE ARCHITECTURE)</span>
            </h4>
            <span className="text-[11px] font-mono-code text-slate-500">
              4 Enforceable Claims
            </span>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/90 font-mono-code text-xs space-y-3">
            <p className="text-amber-300 font-bold">What is claimed is:</p>

            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-slate-300">
              <strong className="text-white block mb-1">Claim 1 (Core Hybrid Composition):</strong>
              A synchronized hybrid composition combining a synthetic sleep-induction core with a bio-fermented delivery vector.
            </div>

            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-slate-300">
              <strong className="text-white block mb-1">Claim 2 (Yogavahi Bio-Permeability Catalyst):</strong>
              The delivery vector of claim 1, wherein the fermented medium serves to lower cellular surface tension, boosting overall drug absorption kinetics.
            </div>

            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-slate-300">
              <strong className="text-white block mb-1">Claim 3 (Snayu Reflex & Hemodynamic Stability):</strong>
              The hybrid composition of claim 1, further comprising an embedded micro-dose neural framework that stabilizes sensory-motor &apos;Snayu&apos; reflexes and prevents overnight blood pressure crashes or spikes during sleep.
            </div>

            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-slate-300">
              <strong className="text-white block mb-1">Claim 4 (Organ-Protection & Pancreatic Insulin Steadiness):</strong>
              The hybrid composition of claim 1, wherein the biochemical balance down-regulates liver enzyme stress and ensures steady insulin release from the pancreas.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
