import React, { useState } from 'react';
import { ComicPanel, SceneType, MotionEffect, SpeechType, DialogueBubble, SFXDecal, Hotspot } from '../../types/graphicNovel';
import { ComicPanelArtwork } from '../Visuals/ComicPanelArtwork';
import { X, Plus, Trash2, Volume2, Sparkles, MessageSquare, Zap, Target } from 'lucide-react';
import { soundEngine } from '../../utils/audioSynthesizer';

interface PanelEditorModalProps {
  panel: ComicPanel;
  onSave: (updatedPanel: ComicPanel) => void;
  onClose: () => void;
}

export const PanelEditorModal: React.FC<PanelEditorModalProps> = ({ panel, onSave, onClose }) => {
  const [editedPanel, setEditedPanel] = useState<ComicPanel>({ ...panel });
  const [activeTab, setActiveTab] = useState<'visual' | 'dialogue' | 'hotspots' | 'sfx'>('visual');

  // Dialogue helper
  const addDialogue = () => {
    const newDialogue: DialogueBubble = {
      id: `d-${Date.now()}`,
      speaker: 'Speaker',
      type: 'speech',
      text: 'New dialogue line...',
      tailDirection: 'bottom-left',
    };
    setEditedPanel({
      ...editedPanel,
      dialogues: [...editedPanel.dialogues, newDialogue],
    });
  };

  const updateDialogue = (index: number, updates: Partial<DialogueBubble>) => {
    const dialogues = [...editedPanel.dialogues];
    dialogues[index] = { ...dialogues[index], ...updates };
    setEditedPanel({ ...editedPanel, dialogues });
  };

  const removeDialogue = (index: number) => {
    const dialogues = editedPanel.dialogues.filter((_, idx) => idx !== index);
    setEditedPanel({ ...editedPanel, dialogues });
  };

  // SFX helper
  const addSfx = () => {
    const newSfx: SFXDecal = {
      id: `sfx-${Date.now()}`,
      text: 'WHAM!',
      x: 50,
      y: 40,
      rotation: -5,
      color: '#fbbf24',
      size: 'lg',
    };
    setEditedPanel({
      ...editedPanel,
      sfxDecals: [...editedPanel.sfxDecals, newSfx],
    });
  };

  const removeSfx = (index: number) => {
    const sfxDecals = editedPanel.sfxDecals.filter((_, idx) => idx !== index);
    setEditedPanel({ ...editedPanel, sfxDecals });
  };

  // Hotspot helper
  const addHotspot = () => {
    const newHotspot: Hotspot = {
      id: `h-${Date.now()}`,
      label: 'Inspect Marker',
      type: 'biomarker',
      info: 'Clinical or narrative observation data.',
      position: { x: 50, y: 50 },
    };
    setEditedPanel({
      ...editedPanel,
      interactiveHotspots: [...editedPanel.interactiveHotspots, newHotspot],
    });
  };

  const updateHotspot = (index: number, updates: Partial<Hotspot>) => {
    const interactiveHotspots = [...editedPanel.interactiveHotspots];
    interactiveHotspots[index] = { ...interactiveHotspots[index], ...updates };
    setEditedPanel({ ...editedPanel, interactiveHotspots });
  };

  const removeHotspot = (index: number) => {
    const interactiveHotspots = editedPanel.interactiveHotspots.filter((_, idx) => idx !== index);
    setEditedPanel({ ...editedPanel, interactiveHotspots });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-white font-heading">
              Comic Panel Visual Studio
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Content Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
          {/* Left: Live Visual Preview */}
          <div className="p-4 bg-slate-950 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800">
            <span className="text-[11px] font-mono-code text-slate-400 mb-2 uppercase tracking-wider">
              Live Motion Comic Panel Preview
            </span>
            <div className="relative w-full aspect-4/3 max-w-md rounded-2xl border-2 border-slate-800 overflow-hidden shadow-2xl bg-black">
              <ComicPanelArtwork
                sceneType={editedPanel.sceneType}
                motionEffect={editedPanel.motionEffect}
                shotType={editedPanel.shotType}
              />
              {/* Preview Hotspots */}
              {editedPanel.interactiveHotspots.map((h) => (
                <div
                  key={h.id}
                  className="absolute w-3.5 h-3.5 rounded-full bg-amber-400 border border-white -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ left: `${h.position.x}%`, top: `${h.position.y}%` }}
                />
              ))}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => soundEngine.playPreset(editedPanel.soundPreset)}
                className="py-1 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                Test Audio Preset
              </button>
            </div>
          </div>

          {/* Right: Controls & Tabs */}
          <div className="flex flex-col h-full overflow-hidden bg-slate-900">
            {/* Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950/60 p-1 gap-1">
              {[
                { id: 'visual', label: 'Scene & Motion', icon: Sparkles },
                { id: 'dialogue', label: 'Dialogue', icon: MessageSquare },
                { id: 'hotspots', label: 'Hotspots', icon: Target },
                { id: 'sfx', label: 'SFX Decals', icon: Zap },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                      activeTab === tab.id
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeTab === 'visual' && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-mono-code text-slate-300 mb-1">
                      Scene Illustration Matrix
                    </label>
                    <select
                      value={editedPanel.sceneType}
                      onChange={(e) =>
                        setEditedPanel({ ...editedPanel, sceneType: e.target.value as SceneType })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white font-mono-code focus:border-amber-400 focus:outline-none"
                    >
                      <option value="triage-er">Triage ER / Emergency Pod (Allopathy)</option>
                      <option value="rasashastra-crucible">Rasashastra Crucible / Kosthi Heat Matrix</option>
                      <option value="molecular-dock">Molecular Receptor Lock (Pharmacology)</option>
                      <option value="nanoparticle-flow">Stomach Gastric Phase & Bhasma Dispersion</option>
                      <option value="cellular-mitochondria">Cellular Mitochondria & SOD-3 Radical Scavenging</option>
                      <option value="character-confrontation">Dual Face-Off (Dr. Kavi vs Vaidya Ananya)</option>
                      <option value="bio-scan">Bio-Informatics Radar Telemetry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-slate-300 mb-1">
                      Cinematic Motion Preset
                    </label>
                    <select
                      value={editedPanel.motionEffect}
                      onChange={(e) =>
                        setEditedPanel({ ...editedPanel, motionEffect: e.target.value as MotionEffect })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white font-mono-code focus:border-amber-400 focus:outline-none"
                    >
                      <option value="zoom-in">Ken Burns: Slow Dramatic Zoom In</option>
                      <option value="pan-left">Ken Burns: Cinematic Pan Left</option>
                      <option value="tilt">Atmospheric Float & Tilt</option>
                      <option value="shake">Comic Impact Screen Shake</option>
                      <option value="pulse">Bio-Rhythm Pulse</option>
                      <option value="none">Static Framing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-slate-300 mb-1">
                      Procedural Sound FX Preset
                    </label>
                    <select
                      value={editedPanel.soundPreset || 'none'}
                      onChange={(e) =>
                        setEditedPanel({ ...editedPanel, soundPreset: e.target.value as any })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white font-mono-code focus:border-amber-400 focus:outline-none"
                    >
                      <option value="pulse-heartbeat">Heartbeat / ICU Tense Medical Pulse</option>
                      <option value="laser-scan">Bio-Scan / Holographic Frequency Sweep</option>
                      <option value="crucible-flame">Kosthi Crucible / Sacred Calcination Crackle</option>
                      <option value="tension-drone">Deep Tension Sub-Bass</option>
                      <option value="impact">Comic Action Impact / Thud</option>
                      <option value="none">Muted / Ambient Only</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'dialogue' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono-code">
                      {editedPanel.dialogues.length} Bubbles
                    </span>
                    <button
                      type="button"
                      onClick={addDialogue}
                      className="py-1 px-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Bubble
                    </button>
                  </div>

                  {editedPanel.dialogues.map((d, idx) => (
                    <div key={d.id || idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={d.speaker}
                          onChange={(e) => updateDialogue(idx, { speaker: e.target.value })}
                          className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-amber-400 font-bold focus:outline-none"
                          placeholder="Speaker name"
                        />

                        <select
                          value={d.type}
                          onChange={(e) => updateDialogue(idx, { type: e.target.value as SpeechType })}
                          className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-300 font-mono-code focus:outline-none"
                        >
                          <option value="speech">Speech</option>
                          <option value="thought">Thought</option>
                          <option value="shout">Shout / Exclamation</option>
                          <option value="whisper">Whisper</option>
                          <option value="narration">Narration Box</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => removeDialogue(idx)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <textarea
                        value={d.text}
                        onChange={(e) => updateDialogue(idx, { text: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white resize-none h-16 focus:outline-none"
                        placeholder="Dialogue text..."
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'hotspots' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono-code">
                      Interactive Pins ({editedPanel.interactiveHotspots.length})
                    </span>
                    <button
                      type="button"
                      onClick={addHotspot}
                      className="py-1 px-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Hotspot
                    </button>
                  </div>

                  {editedPanel.interactiveHotspots.map((h, idx) => (
                    <div key={h.id || idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={h.label}
                          onChange={(e) => updateHotspot(idx, { label: e.target.value })}
                          className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-amber-300 font-bold focus:outline-none"
                          placeholder="Pin Label (e.g. Inspect Biomarker)"
                        />
                        <button
                          type="button"
                          onClick={() => removeHotspot(idx)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <label className="text-[10px] text-slate-400 font-mono-code">X Position %</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={h.position.x}
                            onChange={(e) =>
                              updateHotspot(idx, {
                                position: { ...h.position, x: Number(e.target.value) },
                              })
                            }
                            className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 font-mono-code">Y Position %</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={h.position.y}
                            onChange={(e) =>
                              updateHotspot(idx, {
                                position: { ...h.position, y: Number(e.target.value) },
                              })
                            }
                            className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                          />
                        </div>
                      </div>

                      <textarea
                        value={h.info}
                        onChange={(e) => updateHotspot(idx, { info: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 resize-none h-16 focus:outline-none"
                        placeholder="Detailed medical lore or clinical mechanism..."
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'sfx' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono-code">
                      Comic SFX Decals ({editedPanel.sfxDecals.length})
                    </span>
                    <button
                      type="button"
                      onClick={addSfx}
                      className="py-1 px-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add SFX
                    </button>
                  </div>

                  {editedPanel.sfxDecals.map((s, idx) => (
                    <div key={s.id || idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2">
                      <input
                        type="text"
                        value={s.text}
                        onChange={(e) => {
                          const decals = [...editedPanel.sfxDecals];
                          decals[idx] = { ...decals[idx], text: e.target.value };
                          setEditedPanel({ ...editedPanel, sfxDecals: decals });
                        }}
                        className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs font-comic text-amber-400 font-bold focus:outline-none w-28"
                        placeholder="SFX Word"
                      />
                      <input
                        type="color"
                        value={s.color}
                        onChange={(e) => {
                          const decals = [...editedPanel.sfxDecals];
                          decals[idx] = { ...decals[idx], color: e.target.value };
                          setEditedPanel({ ...editedPanel, sfxDecals: decals });
                        }}
                        className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => removeSfx(idx)}
                        className="text-slate-500 hover:text-rose-400 ml-auto p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Bottom Save Bar */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onSave(editedPanel);
                  onClose();
                }}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono-code uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                Save Panel Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
