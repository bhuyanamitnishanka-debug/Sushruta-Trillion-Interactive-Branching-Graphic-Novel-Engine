import React, { useState, useEffect } from 'react';
import {
  narrationEngine,
  NARRATION_PERSONAS,
  NarrationPersonaId,
  NarrationStatus,
} from '../../utils/narrationVoiceover';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Cpu,
  BookOpen,
  ShieldAlert,
  ChevronDown,
  Gauge,
  Radio,
} from 'lucide-react';

interface NarrationBarProps {
  panelText: string;
  nodeTitle?: string;
  className?: string;
}

export const NarrationBar: React.FC<NarrationBarProps> = ({
  panelText,
  nodeTitle,
  className = '',
}) => {
  const [status, setStatus] = useState<NarrationStatus>(narrationEngine.getStatus());
  const [isPersonaMenuOpen, setIsPersonaMenuOpen] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(narrationEngine.getRateModifier());
  const [autoNarrate, setAutoNarrate] = useState<boolean>(narrationEngine.isAutoNarrate());

  useEffect(() => {
    const unsubscribe = narrationEngine.subscribe((newStatus) => {
      setStatus(newStatus);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // When panel changes and auto-narrate is enabled, speak automatically
  useEffect(() => {
    if (autoNarrate && panelText) {
      const fullTextToRead = nodeTitle ? `${nodeTitle}. ${panelText}` : panelText;
      narrationEngine.speak(fullTextToRead);
    }
  }, [panelText, autoNarrate, nodeTitle]);

  const handleTogglePlay = () => {
    if (status.isSpeaking && !status.isPaused) {
      narrationEngine.pause();
    } else if (status.isPaused) {
      narrationEngine.resume();
    } else {
      const fullTextToRead = nodeTitle ? `${nodeTitle}. ${panelText}` : panelText;
      narrationEngine.speak(fullTextToRead);
    }
  };

  const handleReplay = () => {
    const fullTextToRead = nodeTitle ? `${nodeTitle}. ${panelText}` : panelText;
    narrationEngine.speak(fullTextToRead);
  };

  const handleStop = () => {
    narrationEngine.stop();
  };

  const handleSelectPersona = (id: NarrationPersonaId) => {
    narrationEngine.setPersona(id);
    setIsPersonaMenuOpen(false);
  };

  const handleToggleAutoNarrate = () => {
    const newVal = narrationEngine.toggleAutoNarrate();
    setAutoNarrate(newVal);
  };

  const cycleSpeed = () => {
    const speeds = [0.85, 1.0, 1.2];
    const currentIndex = speeds.indexOf(speedMultiplier);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setSpeedMultiplier(nextSpeed);
    narrationEngine.setRateModifier(nextSpeed);
  };

  const activePersonaObj = NARRATION_PERSONAS[status.currentPersona] || NARRATION_PERSONAS['clinical-ai'];

  const getPersonaIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-3.5 h-3.5 text-cyan-400" />;
      case 'BookOpen':
        return <BookOpen className="w-3.5 h-3.5 text-amber-400" />;
      case 'Sparkles':
        return <Sparkles className="w-3.5 h-3.5 text-purple-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <Volume2 className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  if (!status.supported) {
    return (
      <div className="text-[10px] text-slate-500 font-mono-code px-2 py-1 bg-slate-900/60 rounded border border-slate-800">
        Speech synthesis not supported in this browser
      </div>
    );
  }

  return (
    <div
      className={`relative z-20 flex items-center justify-between gap-2 px-3 py-1.5 bg-slate-900/90 border border-slate-800 rounded-xl backdrop-blur-md shadow-md text-xs font-mono-code select-none ${className}`}
    >
      {/* Left: Narration Status & Audio Wave indicator */}
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={handleTogglePlay}
          className={`min-h-[36px] min-w-[36px] px-2.5 rounded-lg flex items-center justify-center transition-all cursor-pointer font-bold ${
            status.isSpeaking && !status.isPaused
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
              : 'bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700'
          }`}
          title={status.isSpeaking && !status.isPaused ? 'Pause Voiceover' : 'Play Narration Voiceover'}
        >
          {status.isSpeaking && !status.isPaused ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          )}
        </button>

        {/* Audio Waveform Animation when speaking */}
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="flex items-end gap-0.5 h-4 w-5 shrink-0 px-0.5">
            <span
              className={`w-1 bg-amber-400 rounded-full transition-all duration-150 ${
                status.isSpeaking && !status.isPaused
                  ? 'h-3.5 animate-bounce'
                  : 'h-1.5 opacity-40'
              }`}
            />
            <span
              className={`w-1 bg-amber-400 rounded-full transition-all duration-150 ${
                status.isSpeaking && !status.isPaused
                  ? 'h-4 animate-bounce delay-75'
                  : 'h-2 opacity-40'
              }`}
            />
            <span
              className={`w-1 bg-amber-400 rounded-full transition-all duration-150 ${
                status.isSpeaking && !status.isPaused
                  ? 'h-2.5 animate-bounce delay-150'
                  : 'h-1 opacity-40'
              }`}
            />
          </div>

          <div className="truncate hidden sm:block">
            <span className="text-[11px] font-bold text-white block truncate">
              {status.isSpeaking
                ? status.isPaused
                  ? 'Narration Paused'
                  : 'Narrating...'
                : 'Narrator Ready'}
            </span>
            <span className="text-[9px] text-slate-400 block truncate">
              Voice: {activePersonaObj.name}
            </span>
          </div>
        </div>
      </div>

      {/* Middle & Right: Persona Tone Selector & Controls */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Persona Selector Dropdown Trigger */}
        <div className="relative">
          <button
            onClick={() => setIsPersonaMenuOpen(!isPersonaMenuOpen)}
            className="min-h-[34px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500/50 flex items-center gap-1.5 text-[11px] text-slate-200 hover:text-white transition-all cursor-pointer"
            title="Switch Voice Persona Tone"
          >
            {getPersonaIcon(activePersonaObj.iconName)}
            <span className="font-bold hidden md:inline">{activePersonaObj.name}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Persona Menu Popup */}
          {isPersonaMenuOpen && (
            <div className="absolute right-0 bottom-full mb-2 w-64 p-2 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl z-50 space-y-1 animate-fade-in backdrop-blur-lg">
              <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 mb-1">
                Voiceover Persona Tones
              </div>
              {Object.values(NARRATION_PERSONAS).map((persona) => (
                <button
                  key={persona.id}
                  onClick={() => handleSelectPersona(persona.id)}
                  className={`w-full text-left p-2 rounded-lg transition-colors flex items-start gap-2 cursor-pointer ${
                    status.currentPersona === persona.id
                      ? 'bg-amber-500/20 border border-amber-500/40 text-amber-200'
                      : 'hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">{getPersonaIcon(persona.iconName)}</div>
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-white leading-tight flex items-center justify-between">
                      <span>{persona.name}</span>
                      {status.currentPersona === persona.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 leading-tight mt-0.5">
                      {persona.subtitle}
                    </div>
                    <div className="text-[9px] text-slate-500 leading-tight mt-0.5 line-clamp-1">
                      {persona.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Speed Multiplier Button */}
        <button
          onClick={cycleSpeed}
          className="min-h-[34px] px-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-[11px] flex items-center gap-1 cursor-pointer"
          title={`Speech Pace: ${speedMultiplier}x (Click to cycle)`}
        >
          <Gauge className="w-3 h-3 text-amber-400" />
          <span>{speedMultiplier}x</span>
        </button>

        {/* Replay active panel voice */}
        <button
          onClick={handleReplay}
          className="min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Re-read Active Panel Text"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Auto-narrate on panel transition toggle */}
        <button
          onClick={handleToggleAutoNarrate}
          className={`min-h-[34px] px-2.5 rounded-lg border text-[11px] flex items-center gap-1 transition-all cursor-pointer font-bold ${
            autoNarrate
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
              : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
          }`}
          title={autoNarrate ? 'Auto-narrate on panel flip is ON' : 'Turn Auto-narrate on panel flip ON'}
        >
          <Radio className={`w-3 h-3 ${autoNarrate ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
          <span className="hidden sm:inline">Auto</span>
        </button>

        {/* Stop button (if speaking) */}
        {status.isSpeaking && (
          <button
            onClick={handleStop}
            className="min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg bg-rose-950/60 border border-rose-800/80 text-rose-300 hover:bg-rose-900 transition-colors cursor-pointer"
            title="Stop Narration"
          >
            <VolumeX className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
