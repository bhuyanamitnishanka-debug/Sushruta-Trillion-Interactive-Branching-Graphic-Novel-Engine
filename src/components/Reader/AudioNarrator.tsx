import React, { useState, useEffect, useRef } from 'react';
import {
  narrationEngine,
  NARRATION_PERSONAS,
  NarrationPersonaId,
  NarrationStatus,
} from '../../utils/narrationVoiceover';
import { soundEngine } from '../../utils/audioSynthesizer';
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
  Radio,
  Gauge,
  Sliders,
  ChevronDown,
  Activity,
  Headphones,
} from 'lucide-react';

export interface AudioNarratorProps {
  panelText: string;
  nodeTitle?: string;
  nodeCaption?: string;
  autoNarrateDefault?: boolean;
  className?: string;
}

/**
 * AudioNarrator: Automated Graphic Novel & Chemo-Informatics Voiceover Component
 * Built with Web Speech API (window.speechSynthesis)
 * Provides quick toggle between 'Clinical AI' and 'Graphic Novel Narrator'
 */
export const AudioNarrator: React.FC<AudioNarratorProps> = ({
  panelText,
  nodeTitle,
  nodeCaption,
  autoNarrateDefault = false,
  className = '',
}) => {
  const [status, setStatus] = useState<NarrationStatus>(narrationEngine.getStatus());
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(narrationEngine.getRateModifier());
  const [autoNarrate, setAutoNarrate] = useState<boolean>(
    autoNarrateDefault || narrationEngine.isAutoNarrate()
  );
  const [showFullControls, setShowFullControls] = useState<boolean>(false);
  const [lastReadText, setLastReadText] = useState<string>('');
  const lastSpokenPanelRef = useRef<string>('');

  // Subscribe to speech synthesis status updates
  useEffect(() => {
    const unsubscribe = narrationEngine.subscribe((newStatus) => {
      setStatus(newStatus);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Sync auto-narrate with engine
  useEffect(() => {
    narrationEngine.setAutoNarrate(autoNarrate);
  }, [autoNarrate]);

  // Combined narrative script for the active panel
  const fullNarrativeScript = React.useMemo(() => {
    const parts: string[] = [];
    if (nodeTitle) parts.push(nodeTitle);
    if (nodeCaption) parts.push(nodeCaption);
    if (panelText) parts.push(panelText);
    return parts.join('. ');
  }, [nodeTitle, nodeCaption, panelText]);

  // Automated narration trigger when story panel changes
  useEffect(() => {
    if (
      autoNarrate &&
      fullNarrativeScript &&
      fullNarrativeScript !== lastSpokenPanelRef.current
    ) {
      lastSpokenPanelRef.current = fullNarrativeScript;
      // Slight delay to allow panel artwork transition
      const timer = setTimeout(() => {
        narrationEngine.speak(fullNarrativeScript);
        setLastReadText(fullNarrativeScript);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [fullNarrativeScript, autoNarrate]);

  const handleTogglePlay = () => {
    soundEngine.playChoiceSelect();
    if (status.isSpeaking && !status.isPaused) {
      narrationEngine.pause();
    } else if (status.isPaused) {
      narrationEngine.resume();
    } else {
      narrationEngine.speak(fullNarrativeScript);
      setLastReadText(fullNarrativeScript);
    }
  };

  const handleStop = () => {
    soundEngine.playPageFlip();
    narrationEngine.stop();
  };

  const handleReplay = () => {
    soundEngine.playChoiceSelect();
    narrationEngine.speak(fullNarrativeScript);
    setLastReadText(fullNarrativeScript);
  };

  const handleSelectPersona = (personaId: NarrationPersonaId) => {
    soundEngine.playChoiceSelect();
    narrationEngine.setPersona(personaId);
  };

  const handleToggleAutoNarrate = () => {
    soundEngine.playChoiceSelect();
    const updated = !autoNarrate;
    setAutoNarrate(updated);
    narrationEngine.setAutoNarrate(updated);
    if (updated && !status.isSpeaking) {
      narrationEngine.speak(fullNarrativeScript);
    }
  };

  const handleCycleSpeed = () => {
    const speeds = [0.85, 1.0, 1.25, 1.5];
    const currentIndex = speeds.indexOf(speedMultiplier);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length] || 1.0;
    setSpeedMultiplier(nextSpeed);
    narrationEngine.setRateModifier(nextSpeed);
    soundEngine.playPageFlip();
  };

  const activePersona = status.currentPersona;
  const activePersonaConfig =
    NARRATION_PERSONAS[activePersona] || NARRATION_PERSONAS['clinical-ai'];

  if (!status.supported) {
    return (
      <div className="px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs font-mono-code text-slate-500 flex items-center gap-2">
        <VolumeX className="w-4 h-4 text-slate-600" />
        <span>Web Speech API not supported in this browser environment.</span>
      </div>
    );
  }

  return (
    <div
      className={`relative z-25 bg-slate-950/95 border border-slate-800/90 rounded-2xl shadow-xl backdrop-blur-md overflow-hidden text-xs font-mono-code transition-all ${className}`}
    >
      {/* Primary Bar: Quick Persona Toggles + Playback */}
      <div className="flex items-center justify-between gap-2 px-3 py-2 flex-wrap sm:flex-nowrap">
        {/* Left: Play/Pause/Replay and Waveform Activity Indicator */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={handleTogglePlay}
            className={`min-h-[40px] min-w-[40px] rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-md ${
              status.isSpeaking && !status.isPaused
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-100 hover:text-white'
            }`}
            title={
              status.isSpeaking && !status.isPaused
                ? 'Pause Voiceover'
                : 'Play Story Panel Voiceover'
            }
          >
            {status.isSpeaking && !status.isPaused ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          {/* Equalizer Frequency Bars */}
          <div className="flex items-end gap-1 h-5 w-6 px-0.5 shrink-0" title="Speech Synthesis Activity">
            <span
              className={`w-1 bg-amber-400 rounded-full transition-all duration-150 ${
                status.isSpeaking && !status.isPaused
                  ? 'h-4 animate-bounce'
                  : 'h-1.5 opacity-30'
              }`}
            />
            <span
              className={`w-1 bg-amber-400 rounded-full transition-all duration-150 ${
                status.isSpeaking && !status.isPaused
                  ? 'h-5 animate-bounce delay-75'
                  : 'h-2.5 opacity-30'
              }`}
            />
            <span
              className={`w-1 bg-amber-400 rounded-full transition-all duration-150 ${
                status.isSpeaking && !status.isPaused
                  ? 'h-3 animate-bounce delay-150'
                  : 'h-1 opacity-30'
              }`}
            />
          </div>

          {/* Persona Label & Voice State */}
          <div className="truncate hidden sm:block">
            <div className="text-[11px] font-bold text-white flex items-center gap-1.5 truncate">
              <span>{activePersonaConfig.name}</span>
              {status.isSpeaking && !status.isPaused && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              )}
            </div>
            <div className="text-[9px] text-slate-400 truncate">
              {status.isSpeaking
                ? status.isPaused
                  ? 'Voiceover Paused'
                  : 'Voiceover Active'
                : 'Ready for Narration'}
            </div>
          </div>
        </div>

        {/* Center: Explicit Persona Toggles ('Clinical AI' vs 'Graphic Novel Narrator') */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          {/* Persona 1: Clinical AI */}
          <button
            onClick={() => handleSelectPersona('clinical-ai')}
            className={`min-h-[34px] px-2.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer font-sans text-xs ${
              activePersona === 'clinical-ai'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
            title="Clinical AI: Crisp, algorithmic, high-precision bio-informatics delivery"
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="whitespace-nowrap">Clinical AI</span>
          </button>

          {/* Persona 2: Graphic Novel Narrator */}
          <button
            onClick={() => handleSelectPersona('graphic-novel')}
            className={`min-h-[34px] px-2.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer font-sans text-xs ${
              activePersona === 'graphic-novel'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
            title="Graphic Novel Narrator: Dramatic, expressive storytelling with cinematic inflections"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="whitespace-nowrap">Graphic Novel Narrator</span>
          </button>
        </div>

        {/* Right: Auto-Narrate, Speed, Replay, Expand Controls */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Auto-Narrate on panel flip toggle */}
          <button
            onClick={handleToggleAutoNarrate}
            className={`min-h-[36px] px-2.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer text-xs font-bold ${
              autoNarrate
                ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-sm'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title={
              autoNarrate
                ? 'Auto-Narration is ON: Will automatically speak new panel captions'
                : 'Auto-Narration is OFF: Click to automatically speak when panels flip'
            }
          >
            <Radio
              className={`w-3.5 h-3.5 ${
                autoNarrate ? 'text-amber-400 animate-pulse' : 'text-slate-500'
              }`}
            />
            <span>Auto</span>
          </button>

          {/* Speed Multiplier Button */}
          <button
            onClick={handleCycleSpeed}
            className="min-h-[36px] px-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs flex items-center gap-1 cursor-pointer transition-colors"
            title={`Speech Rate: ${speedMultiplier}x (Click to cycle)`}
          >
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            <span>{speedMultiplier}x</span>
          </button>

          {/* Re-read active panel */}
          <button
            onClick={handleReplay}
            className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white cursor-pointer transition-colors"
            title="Re-read Current Story Panel"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Stop Button */}
          {status.isSpeaking && (
            <button
              onClick={handleStop}
              className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-xl bg-rose-950/70 border border-rose-800/80 text-rose-300 hover:bg-rose-900 cursor-pointer transition-colors"
              title="Stop Speech Output"
            >
              <VolumeX className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Expand Advanced Personas Drawer */}
          <button
            onClick={() => setShowFullControls(!showFullControls)}
            className={`min-h-[36px] px-2 rounded-xl border flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer ${
              showFullControls
                ? 'bg-slate-800 border-slate-700 text-white'
                : 'bg-slate-900 border-slate-800'
            }`}
            title="Toggle Extended Voice Settings & Persona Library"
          >
            <Sliders className="w-3.5 h-3.5" />
            <ChevronDown
              className={`w-3 h-3 transition-transform ${
                showFullControls ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Spoken Teleprompter Subtitle Ticker (When speech is active) */}
      {status.isSpeaking && status.currentText && (
        <div className="px-3 py-1.5 bg-slate-900/70 border-t border-slate-800/60 flex items-center gap-2">
          <Headphones className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
          <p className="text-[11px] text-amber-200/90 italic truncate">
            &ldquo;{status.currentText}&rdquo;
          </p>
        </div>
      )}

      {/* Extended Controls Drawer (Advanced Personas & Configuration) */}
      {showFullControls && (
        <div className="p-3 bg-slate-950 border-t border-slate-800 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between pb-1 border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider font-bold">
            <span>All Persona Voiceover Profiles</span>
            <span>Web Speech API Synthesis</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {Object.values(NARRATION_PERSONAS).map((persona) => {
              const isSelected = activePersona === persona.id;
              return (
                <button
                  key={persona.id}
                  onClick={() => handleSelectPersona(persona.id)}
                  className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/60 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs flex items-center gap-1.5 text-white">
                      {persona.id === 'clinical-ai' && <Cpu className="w-3.5 h-3.5 text-cyan-400" />}
                      {persona.id === 'graphic-novel' && <BookOpen className="w-3.5 h-3.5 text-amber-400" />}
                      {persona.id === 'vaidya-sage' && <Sparkles className="w-3.5 h-3.5 text-purple-400" />}
                      {persona.id === 'tactical-pilot' && <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />}
                      <span>{persona.name}</span>
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400">{persona.subtitle}</div>
                  <div className="text-[9px] text-slate-500 mt-1 line-clamp-2">
                    {persona.description}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Voiceover Test Trigger */}
          <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 flex-wrap gap-2">
            <span>
              Selected Profile: <strong className="text-white">{activePersonaConfig.name}</strong> (Pitch: {activePersonaConfig.pitch}, Base Rate: {activePersonaConfig.rate})
            </span>
            <button
              onClick={() => {
                narrationEngine.speak(
                  `Voice persona test: ${activePersonaConfig.name}. Web Speech API online and calibrated.`
                );
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Test Voice Tone</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
