import React, { useState, useEffect, useCallback } from 'react';
import { Story, StoryNode, StoryChoice, Hotspot, ClinicalMetrics } from '../../types/graphicNovel';
import { ComicPanelArtwork } from '../Visuals/ComicPanelArtwork';
import { DialogueBubble, SFXDecalView } from './DialogueBubble';
import { HotspotModal } from './HotspotModal';
import { BranchChoiceModal } from './BranchChoiceModal';
import { StoryMapDrawer } from './StoryMapDrawer';
import { BioHud } from '../Simulation/BioHud';
import { soundEngine } from '../../utils/audioSynthesizer';
import { NarrationBar } from './NarrationBar';
import { AudioNarrator } from './AudioNarrator';
import { narrationEngine } from '../../utils/narrationVoiceover';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Compass,
  RotateCcw,
  Sparkles,
  Trophy,
  Activity,
  Layers,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

interface ComicReaderProps {
  story: Story;
  onOpenStudio?: () => void;
}

export const ComicReader: React.FC<ComicReaderProps> = ({ story, onOpenStudio }) => {
  const [currentNodeId, setCurrentNodeId] = useState<string>(story.startNodeId);
  const [currentPanelIndex, setCurrentPanelIndex] = useState<number>(0);
  const [visitedNodeIds, setVisitedNodeIds] = useState<string[]>([story.startNodeId]);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [showChoices, setShowChoices] = useState<boolean>(false);
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      narrationEngine.stop();
    };
  }, []);

  // Live clinical metrics simulation
  const [metrics, setMetrics] = useState<ClinicalMetrics>(
    story.initialMetrics || {
      dopamineStability: 20,
      rosSuppression: 25,
      bioavailabilityBoost: 0,
      clearanceSafety: 90,
      overallStability: 0.35,
    }
  );

  const currentNode: StoryNode = story.nodes[currentNodeId] || story.nodes[story.startNodeId];
  const currentPanel = currentNode.panels[currentPanelIndex] || currentNode.panels[0];

  // Compute text representation of active panel for voiceover narration
  const activePanelNarrationText = React.useMemo(() => {
    if (!currentPanel) return currentNode.title || '';
    const dialogueLines = currentPanel.dialogues
      .map((d) => `${d.speaker}: "${d.text}"`)
      .join('. ');
    const captionLine = currentNode.caption ? `${currentNode.caption}. ` : '';
    return `${captionLine}${dialogueLines || 'Observing real-time molecular synchronization.'}`;
  }, [currentPanel, currentNode]);

  // Play panel sound preset whenever panel changes
  useEffect(() => {
    if (currentPanel?.soundPreset) {
      soundEngine.playPreset(currentPanel.soundPreset);
    }
  }, [currentPanelIndex, currentNodeId]);

  // Handle choice selection and update bio-informatics metrics
  const handleSelectChoice = (choice: StoryChoice) => {
    setShowChoices(false);
    const targetNode = story.nodes[choice.targetNodeId];
    if (!targetNode) return;

    // Apply clinical metrics modifiers
    if (choice.metricsModifier) {
      setMetrics((prev) => {
        const newDopamine = Math.min(100, Math.max(0, prev.dopamineStability + (choice.metricsModifier?.dopamineDelta || 0)));
        const newRos = Math.min(100, Math.max(0, prev.rosSuppression + (choice.metricsModifier?.rosSuppressionDelta || 0)));
        const newBio = Math.min(60, Math.max(0, prev.bioavailabilityBoost + (choice.metricsModifier?.bioavailabilityDelta || 0)));
        const newClearance = Math.min(100, Math.max(0, prev.clearanceSafety + (choice.metricsModifier?.clearanceSafetyDelta || 0)));

        const overall = (newDopamine * 0.35 + newRos * 0.35 + newClearance * 0.2 + newBio * 0.5) / 100;
        return {
          dopamineStability: newDopamine,
          rosSuppression: newRos,
          bioavailabilityBoost: newBio,
          clearanceSafety: newClearance,
          overallStability: Math.min(1, Math.max(0.1, Number(overall.toFixed(2)))),
        };
      });
    }

    setCurrentNodeId(choice.targetNodeId);
    setCurrentPanelIndex(0);
    setVisitedNodeIds((prev) => (prev.includes(choice.targetNodeId) ? prev : [...prev, choice.targetNodeId]));
    soundEngine.playPageFlip();
  };

  // Step forward through panels or trigger choice dialog
  const advanceStory = useCallback(() => {
    if (currentPanelIndex < currentNode.panels.length - 1) {
      setCurrentPanelIndex((prev) => prev + 1);
      soundEngine.playPageFlip();
    } else {
      if (currentNode.choices && currentNode.choices.length > 0) {
        setShowChoices(true);
      }
    }
  }, [currentPanelIndex, currentNode]);

  const stepBack = () => {
    if (currentPanelIndex > 0) {
      setCurrentPanelIndex((prev) => prev - 1);
      soundEngine.playPageFlip();
    }
  };

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlay || showChoices || currentNode.isEnding) return;
    const timer = setTimeout(() => {
      advanceStory();
    }, 4500);
    return () => clearTimeout(timer);
  }, [isAutoPlay, currentPanelIndex, showChoices, currentNode.isEnding, advanceStory]);

  const toggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const resetStory = () => {
    setCurrentNodeId(story.startNodeId);
    setCurrentPanelIndex(0);
    setVisitedNodeIds([story.startNodeId]);
    setShowChoices(false);
    if (story.initialMetrics) {
      setMetrics(story.initialMetrics);
    }
  };

  return (
    <div className="relative flex flex-col h-full w-full bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* Top Mobile App Bar (Compact Ergonomic Zone) */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-3 py-2 bg-slate-950/95 border-b border-slate-800 backdrop-blur-md">
        {/* Left: Chapter / Title */}
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="truncate">
            <h1 className="text-xs font-bold text-white font-heading truncate">
              {currentNode.title}
            </h1>
            <p className="text-[10px] text-slate-400 font-mono-code">
              Panel {currentPanelIndex + 1} of {currentNode.panels.length}
            </p>
          </div>
        </div>

        {/* Right: Quick Touch Actions (≥44px touch hitbox) */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Studio button */}
          {onOpenStudio && (
            <button
              onClick={onOpenStudio}
              className="min-h-[44px] px-2.5 flex items-center gap-1.5 text-xs font-medium text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors"
              title="Open Storyline Creator Studio"
            >
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">Studio</span>
            </button>
          )}

          {/* Autoplay Toggle */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-colors ${
              isAutoPlay ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400 hover:text-white'
            }`}
            title={isAutoPlay ? 'Pause Autoplay' : 'Start Autoplay'}
          >
            {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Audio Toggle */}
          <button
            onClick={toggleSound}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-white rounded-lg transition-colors"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Story Map Drawer Trigger */}
          <button
            onClick={() => setIsMapOpen(true)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-amber-400 rounded-lg transition-colors"
            title="Open Branching Story Map"
          >
            <Compass className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Live Simulation BioHud (Sushruta-Trillion Hybrid Metrics) */}
      <BioHud metrics={metrics} />

      {/* Main Comic Panel Stage (Stretch Content Area) */}
      <main className="relative flex-1 w-full overflow-hidden flex flex-col justify-center items-center p-2 sm:p-4">
        <div className="relative w-full max-w-2xl h-full max-h-[75vh] sm:max-h-[82vh] rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-slate-900 shadow-2xl overflow-hidden bg-slate-950 flex flex-col">
          {/* Animated Graphic Novel Visual Canvas */}
          <div className="relative flex-1 w-full overflow-hidden">
            <ComicPanelArtwork
              sceneType={currentPanel.sceneType}
              motionEffect={currentPanel.motionEffect}
              shotType={currentPanel.shotType}
            />

            {/* SFX Decals */}
            {currentPanel.sfxDecals.map((decal) => (
              <SFXDecalView key={decal.id} decal={decal} />
            ))}

            {/* Interactive Panel Hotspots (Glowing Radar Pins) */}
            {currentPanel.interactiveHotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                onClick={(e) => {
                  e.stopPropagation();
                  soundEngine.playTechScan();
                  setActiveHotspot(hotspot);
                }}
                className="absolute z-25 min-h-[44px] min-w-[44px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group cursor-pointer"
                style={{
                  left: `${hotspot.position.x}%`,
                  top: `${hotspot.position.y}%`,
                }}
                title={`Inspect: ${hotspot.label}`}
              >
                {/* Ping wave */}
                <span className="absolute w-7 h-7 rounded-full bg-amber-400/40 animate-ping" />
                {/* Glowing Core */}
                <span className="relative w-4 h-4 rounded-full bg-amber-400 border-2 border-white shadow-lg shadow-amber-400/80 group-hover:scale-125 transition-transform flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                </span>
                {/* Floating Label */}
                <span className="absolute top-6 whitespace-nowrap bg-black/85 border border-amber-400/50 text-[10px] font-mono-code font-bold text-amber-300 px-2 py-0.5 rounded shadow pointer-events-none opacity-90 group-hover:opacity-100">
                  {hotspot.label}
                </span>
              </button>
            ))}

            {/* Caption Banner (Top-left comic text box) */}
            {currentNode.caption && (
              <div className="absolute top-2.5 left-2.5 max-w-[85%] z-20 bg-black/85 border-l-3 border-amber-400 px-3 py-1.5 rounded-r shadow-lg pointer-events-none">
                <p className="text-xs text-amber-200/90 font-sans italic leading-tight">
                  {currentNode.caption}
                </p>
              </div>
            )}

            {/* Touch Tap-Zones for Quick Forward / Backward Navigation */}
            <div
              className="absolute inset-y-0 left-0 w-1/4 z-20 cursor-w-resize"
              onClick={stepBack}
              title="Tap to go back"
            />
            <div
              className="absolute inset-y-0 right-0 w-3/4 z-20 cursor-e-resize"
              onClick={advanceStory}
              title="Tap to continue reading"
            />
          </div>

          {/* Dialogue Bubbles Lower Layer */}
          <div className="relative z-25 p-3 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent flex flex-col gap-2 max-h-[35%] overflow-y-auto pointer-events-auto">
            {currentPanel.dialogues.map((dialogue, idx) => (
              <DialogueBubble key={dialogue.id || idx} dialogue={dialogue} index={idx} />
            ))}
          </div>

          {/* Ending Epilogue Overlay (If node is marked isEnding) */}
          {currentNode.isEnding && (
            <div className="absolute inset-0 z-35 bg-black/90 backdrop-blur-md p-6 flex flex-col justify-center items-center text-center animate-fade-in">
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-400 mb-3">
                <Trophy className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono-code uppercase tracking-wider text-amber-400 mb-1">
                Storyline Concluded · {currentNode.endingType}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white font-heading mb-2">
                {currentNode.title}
              </h2>
              <p className="text-sm text-slate-300 max-w-md mb-5 leading-relaxed font-sans">
                {currentNode.endingSummary}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={resetStory}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Restart Narrative
                </button>
                <button
                  onClick={() => setIsMapOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-amber-400" />
                  Explore Alternate Branches
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Web Speech API Narration & Voiceover Control Bar with Persona Selectors */}
      <div className="w-full max-w-2xl mx-auto px-2 sm:px-4 pb-1">
        <AudioNarrator
          panelText={activePanelNarrationText}
          nodeTitle={`Panel ${currentPanelIndex + 1}: ${currentNode.title}`}
          nodeCaption={currentNode.caption}
        />
      </div>

      {/* Thumb-Zone Bottom Navigation Bar (≤15% Viewport) */}
      <footer className="sticky bottom-0 z-30 px-4 py-2.5 bg-slate-950/95 border-t border-slate-800 backdrop-blur-md">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          {/* Back Step Button */}
          <button
            onClick={stepBack}
            disabled={currentPanelIndex === 0}
            className={`min-h-[44px] px-3 rounded-xl flex items-center gap-1 text-xs font-medium transition-all ${
              currentPanelIndex === 0
                ? 'opacity-30 cursor-not-allowed text-slate-600'
                : 'text-slate-300 hover:text-white bg-slate-900 border border-slate-800 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>

          {/* Interactive Branch Crossroads Button (if choices exist) */}
          {currentNode.choices && currentNode.choices.length > 0 ? (
            <button
              onClick={() => {
                soundEngine.playChoiceSelect();
                setShowChoices(true);
              }}
              className="flex-1 min-h-[44px] px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs font-mono-code uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Activity className="w-4 h-4" />
              <span>Decide Strategy ({currentNode.choices.length} Paths)</span>
            </button>
          ) : (
            <div className="text-center">
              <span className="text-[11px] font-mono-code text-slate-500">
                End of narrative branch
              </span>
            </div>
          )}

          {/* Next Step Button */}
          <button
            onClick={advanceStory}
            disabled={currentPanelIndex >= currentNode.panels.length - 1}
            className={`min-h-[44px] px-3 rounded-xl flex items-center gap-1 text-xs font-medium transition-all ${
              currentPanelIndex >= currentNode.panels.length - 1
                ? 'opacity-30 cursor-not-allowed text-slate-600'
                : 'text-slate-300 hover:text-white bg-slate-900 border border-slate-800 active:scale-95'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* Hotspot Inspection Modal */}
      <HotspotModal hotspot={activeHotspot} onClose={() => setActiveHotspot(null)} />

      {/* Branch Choice Decision Dialog */}
      {showChoices && currentNode.choices && (
        <BranchChoiceModal
          choices={currentNode.choices}
          onSelectChoice={handleSelectChoice}
          nodeTitle={currentNode.title}
        />
      )}

      {/* Story Map Timeline Drawer */}
      <StoryMapDrawer
        story={story}
        currentNodeId={currentNodeId}
        visitedNodeIds={visitedNodeIds}
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onJumpToNode={(targetId) => {
          setCurrentNodeId(targetId);
          setCurrentPanelIndex(0);
        }}
        onResetStory={resetStory}
      />
    </div>
  );
};
