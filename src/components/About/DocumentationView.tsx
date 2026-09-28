import React from 'react';
import { BookOpen, Sparkles, GitFork, Cpu, ShieldCheck } from 'lucide-react';

export const DocumentationView: React.FC = () => {
  return (
    <div className="w-full h-full overflow-y-auto p-4 sm:p-8 max-w-4xl mx-auto space-y-8 font-sans text-slate-200">
      {/* Title */}
      <div className="pb-4 border-b border-slate-800">
        <h2 className="text-xl sm:text-3xl font-bold text-white font-display">
          Sushruta-Trillion Engine Architecture & Guide
        </h2>
        <p className="text-xs sm:text-sm text-amber-400 font-mono-code mt-1">
          Hybrid Allopathy & Ayur-Chemo-Informatics Simulation in Branching Graphic-Novel Form
        </p>
      </div>

      {/* Section 1: Overview */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          The Hybrid Medical Vision
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Modern Western allopathy offers unmatched, aggressive speed for acute crisis management (e.g. dopamine agonist infusion for Parkinsonian motor blockades, rapid insulin signaling, thrombolysis). However, aggressive single-target interventions can provoke secondary oxidative damage and metabolic burnout.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          Traditional Indian Rasashastra and herbo-mineral preparations (Bhasmas and lipid Bhavanas) operate through multi-targeted sub-cellular nano-complexes, down-regulating SOD-3 decay, suppressing reactive oxygen species (ROS), and enhancing bio-availability across tissue barriers.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          <strong>Sushruta-Trillion</strong> bridges both paradigms into an interactive animated graphic novel simulation, where the reader makes high-stakes decisions that directly impact both immediate clinical stabilization and long-term cellular survival.
        </p>
      </section>

      {/* Section 2: Graphic Novel App Features */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          Graphic Novel Mobile Engine Features
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
            <h4 className="font-bold text-amber-300 mb-1">Animated Motion Comic Panels</h4>
            <p className="text-slate-400">
              Ken Burns pan and zoom transitions, screen shake impact effects, procedural scanlines, and authentic halftone shading.
            </p>
          </div>
          <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
            <h4 className="font-bold text-amber-300 mb-1">Interactive Hotspot Telemetry</h4>
            <p className="text-slate-400">
              Tap glowing pins directly inside visual panels to inspect biochemical markers, receptor binding kinetics, and herbal formulas.
            </p>
          </div>
          <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
            <h4 className="font-bold text-amber-300 mb-1">Branching Crossroads</h4>
            <p className="text-slate-400">
              Choose between allopathic speed, Ayurvedic cellular cytoprotection, or hybrid equilibrium, unlocking divergent endings.
            </p>
          </div>
          <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
            <h4 className="font-bold text-amber-300 mb-1">Web Audio Synthesizer</h4>
            <p className="text-slate-400">
              Procedurally synthesized page flips, tension drones, cardiac pulses, laser scans, and comic action thuds without audio file dependencies.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Creator Studio & AI Weaver */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
          <GitFork className="w-5 h-5 text-amber-400" />
          Branching Creator Studio & Gemini AI
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Open the <strong>Studio</strong> tab to view the complete visual node tree of your storyline. You can edit existing panels, write custom dialogues, configure camera motions, and add interactive hotspots.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          Using the <strong>AI Branch Weaver</strong>, you can prompt the Gemini model to automatically craft an unforeseen plot twist or medical emergency, complete with realistic scientific parameters, dialogues, and branching choice gates!
        </p>
      </section>

      {/* Section 4: Three Core Modules */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          The 3 Simulation Modules
        </h3>
        <div className="space-y-2 text-xs">
          <div className="p-3 bg-slate-900 rounded-xl border border-sky-900/50">
            <span className="font-mono-code font-bold text-sky-400 block mb-0.5">
              Module 1: Allopathy Emergency Targeted Protocol
            </span>
            <span className="text-slate-300">
              Calculates recombinant molecular binding affinities, target receptor blocking speeds (Kd = 2.4 nM), and pharmacokinetic clearance half-lives.
            </span>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-amber-900/50">
            <span className="font-mono-code font-bold text-amber-400 block mb-0.5">
              Module 2: Rasashastra Nanoparticle Solver
            </span>
            <span className="text-slate-300">
              Models multi-stage calcination (Maarana) yielding 18nm Bhasma particles, Kosthi furnace heat matrices (450°C), and SOD-3 ROS suppression (+78%).
            </span>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-emerald-900/50">
            <span className="font-mono-code font-bold text-emerald-400 block mb-0.5">
              Module 3: Cross-Interaction & Toxicity Validator
            </span>
            <span className="text-slate-300">
              Validates hepatic CYP3A4 degradation, kidney glomerular filtration safety, and ensures complete clearance of heavy-metal catalysts.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
