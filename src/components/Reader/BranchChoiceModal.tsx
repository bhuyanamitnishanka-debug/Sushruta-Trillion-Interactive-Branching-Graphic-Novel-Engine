import React from 'react';
import { StoryChoice } from '../../types/graphicNovel';
import { GitFork, ArrowRight, Zap, Shield, Flame, Activity } from 'lucide-react';
import { soundEngine } from '../../utils/audioSynthesizer';

interface BranchChoiceModalProps {
  choices: StoryChoice[];
  onSelectChoice: (choice: StoryChoice) => void;
  nodeTitle: string;
}

export const BranchChoiceModal: React.FC<BranchChoiceModalProps> = ({
  choices,
  onSelectChoice,
  nodeTitle,
}) => {
  const getAlignmentBadge = (alignment?: string) => {
    switch (alignment) {
      case 'allopathy-targeted':
        return {
          icon: <Zap className="w-3.5 h-3.5 text-sky-400" />,
          label: 'Track 1: Allopathic Targeted Speed',
          color: 'border-sky-500/50 bg-sky-950/40 text-sky-300',
        };
      case 'ayurveda-protective':
        return {
          icon: <Flame className="w-3.5 h-3.5 text-amber-400" />,
          label: 'Track 2: Rasashastra Bio-Enhancement',
          color: 'border-amber-500/50 bg-amber-950/40 text-amber-300',
        };
      case 'hybrid-equilibrium':
        return {
          icon: <Shield className="w-3.5 h-3.5 text-emerald-400" />,
          label: 'Hybrid: Dual Convergence Protocol',
          color: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300',
        };
      default:
        return {
          icon: <Activity className="w-3.5 h-3.5 text-purple-400" />,
          label: 'Tactical Intervention',
          color: 'border-purple-500/50 bg-purple-950/40 text-purple-300',
        };
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="w-full sm:max-w-lg bg-slate-900 border-t sm:border border-slate-700/80 rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="sm:hidden w-12 h-1 bg-slate-700 rounded-full mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center gap-2 text-amber-400 mb-1">
          <GitFork className="w-4 h-4" />
          <span className="text-xs font-mono-code uppercase tracking-wider font-bold">
            Branching Narrative Crossroads
          </span>
        </div>

        <h3 className="text-lg md:text-xl font-bold text-white font-heading mb-1 text-balance">
          {nodeTitle}: Choose Patient Strategy
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Your medical decision alters the patient's bio-informatics stability and unlocks divergent story paths.
        </p>

        {/* Choice List */}
        <div className="space-y-3">
          {choices.map((choice, index) => {
            const badge = getAlignmentBadge(choice.ethicalAlignment);
            return (
              <button
                key={choice.id || index}
                onClick={() => {
                  soundEngine.playChoiceSelect();
                  onSelectChoice(choice);
                }}
                className="w-full text-left p-4 rounded-xl bg-slate-950/90 border border-slate-700/70 hover:border-amber-400/80 hover:bg-slate-800/80 transition-all duration-200 group active:scale-[0.98] cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono-code border ${badge.color}`}>
                    {badge.icon}
                    {badge.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </div>

                <div className="text-sm md:text-base font-semibold text-white group-hover:text-amber-300 transition-colors leading-snug mb-1.5">
                  {choice.text}
                </div>

                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="text-slate-500">Consequence:</span>
                  <span className="text-slate-300 font-sans">{choice.outcomePreview}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
