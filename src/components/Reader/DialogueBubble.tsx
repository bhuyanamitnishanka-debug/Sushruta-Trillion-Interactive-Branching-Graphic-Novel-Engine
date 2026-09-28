import React from 'react';
import { DialogueBubble as DialogueBubbleType, SFXDecal } from '../../types/graphicNovel';

interface DialogueBubbleProps {
  dialogue: DialogueBubbleType;
  index: number;
}

export const DialogueBubble: React.FC<DialogueBubbleProps> = ({ dialogue, index }) => {
  const { speaker, type, text, tailDirection = 'bottom-left' } = dialogue;

  // Render different styles according to speech type
  const renderBubbleStyle = () => {
    switch (type) {
      case 'thought':
        return 'bg-slate-900/90 border-2 border-dashed border-sky-400 text-sky-100 rounded-3xl shadow-xl shadow-sky-950/40';
      case 'shout':
        return 'bg-amber-500 text-slate-950 font-bold border-4 border-slate-950 rounded-lg shadow-2xl scale-105 uppercase tracking-wide';
      case 'whisper':
        return 'bg-slate-900/80 border border-slate-500/50 text-slate-300 italic rounded-2xl text-xs';
      case 'narration':
        return 'bg-black/90 border-l-4 border-amber-500 text-amber-100 font-sans tracking-tight rounded-r-lg shadow-2xl';
      case 'speech':
      default:
        return 'bg-slate-950/95 border-2 border-slate-200 text-white rounded-2xl shadow-2xl';
    }
  };

  return (
    <div
      className={`relative max-w-[85%] md:max-w-md p-3.5 transition-all duration-300 transform ${renderBubbleStyle()} ${
        index % 2 === 0 ? 'self-start ml-2' : 'self-end mr-2'
      }`}
    >
      {/* Speaker Tag (except narration) */}
      {type !== 'narration' && (
        <div className="flex items-center gap-1.5 mb-1">
          <span className={`text-[11px] font-mono-code font-bold uppercase tracking-wider ${
            type === 'shout' ? 'text-slate-950' : 'text-amber-400'
          }`}>
            {speaker}
          </span>
          <span className="text-[10px] text-slate-400">· {type}</span>
        </div>
      )}

      {/* Bubble Text */}
      <p className={`text-sm md:text-base leading-snug ${
        type === 'shout' ? 'font-comic tracking-wider text-base md:text-lg' : 'font-sans'
      }`}>
        {text}
      </p>

      {/* Speech tail SVG for realistic comic look */}
      {type === 'speech' && (
        <div
          className={`absolute -bottom-3 ${
            tailDirection.includes('left') ? 'left-4' : 'right-4'
          } w-4 h-4 overflow-hidden pointer-events-none`}
        >
          <div className="w-3 h-3 bg-slate-950 border-r-2 border-b-2 border-slate-200 transform rotate-45 -translate-y-2 translate-x-1" />
        </div>
      )}

      {/* Thought cloud little bubbles */}
      {type === 'thought' && (
        <div className="absolute -bottom-3 left-6 flex gap-1 pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-sky-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-sky-400 translate-y-1.5" />
        </div>
      )}
    </div>
  );
};

export const SFXDecalView: React.FC<{ decal: SFXDecal }> = ({ decal }) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-7xl md:text-8xl',
  };

  return (
    <div
      className="absolute pointer-events-none select-none z-30 transform-gpu animate-bounce"
      style={{
        left: `${decal.x}%`,
        top: `${decal.y}%`,
        transform: `translate(-50%, -50%) rotate(${decal.rotation}deg)`,
      }}
    >
      <span
        className={`font-comic font-black tracking-widest drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] stroke-black ${sizeClasses[decal.size]}`}
        style={{
          color: decal.color,
          WebkitTextStroke: '2px #000000',
        }}
      >
        {decal.text}
      </span>
    </div>
  );
};
