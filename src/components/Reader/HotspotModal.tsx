import React from 'react';
import { Hotspot } from '../../types/graphicNovel';
import { X, Activity, FlaskConical, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';

interface HotspotModalProps {
  hotspot: Hotspot | null;
  onClose: () => void;
}

export const HotspotModal: React.FC<HotspotModalProps> = ({ hotspot, onClose }) => {
  if (!hotspot) return null;

  const getIcon = () => {
    switch (hotspot.type) {
      case 'biomarker':
        return <Activity className="w-5 h-5 text-sky-400" />;
      case 'chemical-pathway':
        return <FlaskConical className="w-5 h-5 text-amber-400" />;
      case 'evidence':
        return <AlertTriangle className="w-5 h-5 text-rose-400" />;
      case 'lore':
      case 'character-thought':
      default:
        return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full sm:max-w-md bg-slate-900 border border-slate-700 rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl relative animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="sm:hidden w-10 h-1 bg-slate-700 rounded-full mx-auto mb-4" />

        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-slate-800 rounded-xl border border-slate-700">
              {getIcon()}
            </div>
            <div>
              <span className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400">
                {hotspot.type.replace('-', ' ')}
              </span>
              <h3 className="text-base font-bold text-white font-heading">
                {hotspot.label}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            aria-label="Close inspection"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/80 text-sm text-slate-200 leading-relaxed font-sans mb-4">
          {hotspot.info}
        </div>

        {/* Bio-Informatics Status Badge */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Cross-Validation Safe</span>
          </div>
          <span className="font-mono-code text-[11px] text-slate-500">Sushruta-Trillion Core</span>
        </div>
      </div>
    </div>
  );
};
