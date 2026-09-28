import React, { useState } from 'react';
import { Story, StoryNode, ComicPanel, StoryChoice } from '../../types/graphicNovel';
import { NodeGraphView } from './NodeGraphView';
import { PanelEditorModal } from './PanelEditorModal';
import { AiBranchGeneratorModal } from './AiBranchGeneratorModal';
import { ComicPanelArtwork } from '../Visuals/ComicPanelArtwork';
import {
  Play,
  Plus,
  Trash2,
  Edit,
  Sparkles,
  GitFork,
  ArrowLeft,
  Download,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { soundEngine } from '../../utils/audioSynthesizer';

interface StoryEditorProps {
  story: Story;
  onUpdateStory: (updatedStory: Story) => void;
  onPlayStory: () => void;
}

export const StoryEditor: React.FC<StoryEditorProps> = ({
  story,
  onUpdateStory,
  onPlayStory,
}) => {
  const [activeView, setActiveView] = useState<'graph' | 'node-detail'>('graph');
  const [selectedNodeId, setSelectedNodeId] = useState<string>(story.startNodeId);
  const [editingPanelIndex, setEditingPanelIndex] = useState<number | null>(null);
  const [aiModalSourceId, setAiModalSourceId] = useState<string | null>(null);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const currentNode: StoryNode = story.nodes[selectedNodeId] || story.nodes[story.startNodeId];

  const triggerToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Node editing helpers
  const updateCurrentNode = (updates: Partial<StoryNode>) => {
    const updatedNodes = {
      ...story.nodes,
      [selectedNodeId]: { ...currentNode, ...updates },
    };
    onUpdateStory({ ...story, nodes: updatedNodes });
    triggerToast('Node saved');
  };

  const handleAddNode = () => {
    const newId = `node-branch-${Date.now()}`;
    const newNode: StoryNode = {
      id: newId,
      title: `Branch: Decision ${Object.keys(story.nodes).length + 1}`,
      caption: 'A new turning point in the patient strategy.',
      panels: [
        {
          id: `p-${Date.now()}`,
          sceneType: 'bio-scan',
          shotType: 'dynamic-close',
          motionEffect: 'zoom-in',
          dialogues: [
            {
              id: `d-${Date.now()}`,
              speaker: 'Dr. Kavi',
              type: 'speech',
              text: 'The bio-parameters are shifting in response to our intervention.',
              tailDirection: 'bottom-left',
            },
          ],
          sfxDecals: [],
          interactiveHotspots: [],
          soundPreset: 'tension-drone',
        },
      ],
      choices: [],
    };

    onUpdateStory({
      ...story,
      nodes: { ...story.nodes, [newId]: newNode },
    });
    setSelectedNodeId(newId);
    setActiveView('node-detail');
    soundEngine.playPageFlip();
    triggerToast('New node created');
  };

  // Panel helpers
  const handleAddPanel = () => {
    const newPanel: ComicPanel = {
      id: `p-${Date.now()}`,
      sceneType: 'molecular-dock',
      shotType: 'dynamic-close',
      motionEffect: 'tilt',
      dialogues: [
        {
          id: `d-${Date.now()}`,
          speaker: 'Vaidya Ananya',
          type: 'speech',
          text: 'Notice how the lipid carrier shields the active alkaloid.',
          tailDirection: 'bottom-right',
        },
      ],
      sfxDecals: [],
      interactiveHotspots: [],
      soundPreset: 'laser-scan',
    };

    updateCurrentNode({
      panels: [...currentNode.panels, newPanel],
    });
  };

  const handleSavePanel = (updatedPanel: ComicPanel) => {
    if (editingPanelIndex === null) return;
    const newPanels = [...currentNode.panels];
    newPanels[editingPanelIndex] = updatedPanel;
    updateCurrentNode({ panels: newPanels });
    setEditingPanelIndex(null);
  };

  const handleDeletePanel = (index: number) => {
    if (currentNode.panels.length <= 1) {
      alert('A storyline node must have at least one panel.');
      return;
    }
    const newPanels = currentNode.panels.filter((_, idx) => idx !== index);
    updateCurrentNode({ panels: newPanels });
  };

  // Choice helpers
  const handleAddChoice = () => {
    const newChoice: StoryChoice = {
      id: `c-${Date.now()}`,
      text: 'New tactical decision path',
      outcomePreview: 'Immediate physiological response',
      consequenceTag: 'Tactical Choice',
      targetNodeId: Object.keys(story.nodes)[0] || story.startNodeId,
      ethicalAlignment: 'hybrid-equilibrium',
    };

    updateCurrentNode({
      choices: [...(currentNode.choices || []), newChoice],
    });
  };

  const handleUpdateChoice = (index: number, updates: Partial<StoryChoice>) => {
    const newChoices = [...(currentNode.choices || [])];
    newChoices[index] = { ...newChoices[index], ...updates };
    updateCurrentNode({ choices: newChoices });
  };

  const handleDeleteChoice = (index: number) => {
    const newChoices = (currentNode.choices || []).filter((_, idx) => idx !== index);
    updateCurrentNode({ choices: newChoices });
  };

  // Handle AI branch extension addition
  const handleAddAiBranch = (newNode: StoryNode, sourceId: string) => {
    const source = story.nodes[sourceId];
    const newChoice: StoryChoice = {
      id: `c-ai-${Date.now()}`,
      text: `Pursue: ${newNode.title}`,
      outcomePreview: newNode.caption,
      consequenceTag: 'AI Generated Twist',
      targetNodeId: newNode.id,
      ethicalAlignment: 'hybrid-equilibrium',
    };

    const updatedNodes = {
      ...story.nodes,
      [newNode.id]: newNode,
      [sourceId]: {
        ...source,
        choices: [...(source.choices || []), newChoice],
      },
    };

    onUpdateStory({ ...story, nodes: updatedNodes });
    setSelectedNodeId(newNode.id);
    setActiveView('node-detail');
    triggerToast('AI branch added & linked!');
  };

  // Export story JSON
  const exportStoryJSON = () => {
    const blob = new Blob([JSON.stringify(story, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${story.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_story.json`;
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('Story exported to JSON');
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-950 text-slate-100 select-none overflow-hidden">
      {/* Studio Top Action Bar */}
      <header className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 z-30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveView('graph')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeView === 'graph'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GitFork className="w-3.5 h-3.5 inline mr-1" />
              Node Architecture
            </button>
            <button
              onClick={() => setActiveView('node-detail')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeView === 'node-detail'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Edit className="w-3.5 h-3.5 inline mr-1" />
              Panel Editor
            </button>
          </div>
        </div>

        {/* Playtest and Export Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={exportStoryJSON}
            className="min-h-[40px] px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Download storyline JSON"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export JSON</span>
          </button>

          <button
            onClick={onPlayStory}
            className="min-h-[40px] px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Playtest Reader</span>
          </button>
        </div>
      </header>

      {/* Main Studio View Area */}
      <div className="flex-1 overflow-hidden relative">
        {activeView === 'graph' ? (
          <NodeGraphView
            story={story}
            selectedNodeId={selectedNodeId}
            onSelectNode={(nodeId) => {
              setSelectedNodeId(nodeId);
              setActiveView('node-detail');
            }}
            onAddNode={handleAddNode}
            onQuickAiExtend={(nodeId) => setAiModalSourceId(nodeId)}
          />
        ) : (
          <div className="h-full overflow-y-auto p-4 max-w-4xl mx-auto space-y-6">
            {/* Back to graph breadcrumb */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setActiveView('graph')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 py-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Story Architecture
              </button>

              <button
                onClick={() => setAiModalSourceId(selectedNodeId)}
                className="py-1.5 px-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Generate AI Branch
              </button>
            </div>

            {/* Node Metadata Card */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-amber-400">
                  Node Configuration
                </span>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!currentNode.isEnding}
                    onChange={(e) => updateCurrentNode({ isEnding: e.target.checked })}
                    className="rounded bg-slate-950 border-slate-700 text-amber-500"
                  />
                  <span>Mark as Storyline Ending</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-mono-code text-slate-400 mb-1">
                  Node Title
                </label>
                <input
                  type="text"
                  value={currentNode.title}
                  onChange={(e) => updateCurrentNode({ title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white font-heading font-bold focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code text-slate-400 mb-1">
                  Scene Caption (Comic Narrative Box)
                </label>
                <textarea
                  value={currentNode.caption}
                  onChange={(e) => updateCurrentNode({ caption: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:border-amber-400 focus:outline-none resize-none h-16 font-sans"
                />
              </div>

              {currentNode.isEnding && (
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <label className="block text-xs font-mono-code text-purple-400">
                    Ending Epilogue Summary
                  </label>
                  <textarea
                    value={currentNode.endingSummary || ''}
                    onChange={(e) => updateCurrentNode({ endingSummary: e.target.value })}
                    className="w-full bg-slate-950 border border-purple-500/40 rounded-lg p-2.5 text-xs text-purple-200 focus:border-purple-400 focus:outline-none resize-none h-18"
                    placeholder="Describe the final clinical and narrative outcome..."
                  />
                </div>
              )}
            </div>

            {/* Panels Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white font-heading">
                    Animated Comic Panels ({currentNode.panels.length})
                  </h3>
                  <p className="text-xs text-slate-400">
                    Panels are viewed in sequence before presenting choices.
                  </p>
                </div>
                <button
                  onClick={handleAddPanel}
                  className="py-1.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Panel</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {currentNode.panels.map((p, idx) => (
                  <div
                    key={p.id || idx}
                    className="p-3 bg-slate-900 rounded-xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-mono-code font-bold text-amber-400">
                          Panel #{idx + 1} · {p.sceneType}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditingPanelIndex(idx)}
                            className="p-1 text-slate-400 hover:text-white"
                            title="Edit panel visual & dialogue"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePanel(idx)}
                            className="p-1 text-slate-400 hover:text-rose-400"
                            title="Delete panel"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Mini Preview Box */}
                      <div className="w-full aspect-16/9 rounded-lg overflow-hidden border border-slate-800 relative mb-2">
                        <ComicPanelArtwork
                          sceneType={p.sceneType}
                          motionEffect="none"
                          shotType={p.shotType}
                        />
                      </div>

                      {/* Dialogue line preview */}
                      <div className="text-xs text-slate-400 space-y-1">
                        {p.dialogues.map((d, dIdx) => (
                          <div key={dIdx} className="truncate">
                            <span className="text-slate-300 font-bold">{d.speaker}:</span> {d.text}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setEditingPanelIndex(idx)}
                      className="mt-3 w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors flex items-center justify-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Configure Scene & Dialogue
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Branching Choices Section */}
            {!currentNode.isEnding && (
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white font-heading">
                      Branching Decisions ({currentNode.choices?.length || 0})
                    </h3>
                    <p className="text-xs text-slate-400">
                      Decisions determine which narrative node the reader advances to next.
                    </p>
                  </div>
                  <button
                    onClick={handleAddChoice}
                    className="py-1.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Choice</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(currentNode.choices || []).map((choice, cIdx) => (
                    <div
                      key={choice.id || cIdx}
                      className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono-code font-bold text-amber-400">
                          Choice Path #{cIdx + 1}
                        </span>
                        <button
                          onClick={() => handleDeleteChoice(cIdx)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono-code text-slate-400">Choice Text</label>
                        <input
                          type="text"
                          value={choice.text}
                          onChange={(e) => handleUpdateChoice(cIdx, { text: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div>
                          <label className="text-[10px] font-mono-code text-slate-400">
                            Outcome Hint
                          </label>
                          <input
                            type="text"
                            value={choice.outcomePreview}
                            onChange={(e) => handleUpdateChoice(cIdx, { outcomePreview: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-mono-code text-slate-400">
                            Target Node Destination
                          </label>
                          <select
                            value={choice.targetNodeId}
                            onChange={(e) => handleUpdateChoice(cIdx, { targetNodeId: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs text-amber-300 font-mono-code focus:outline-none"
                          >
                            {Object.entries(story.nodes).map(([nId, n]) => (
                              <option key={nId} value={nId}>
                                {n.title}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-4 right-4 z-50 bg-emerald-950 border border-emerald-500 text-emerald-200 px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-2xl animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Panel Editor Modal */}
      {editingPanelIndex !== null && (
        <PanelEditorModal
          panel={currentNode.panels[editingPanelIndex]}
          onSave={handleSavePanel}
          onClose={() => setEditingPanelIndex(null)}
        />
      )}

      {/* AI Branch Generator Modal */}
      {aiModalSourceId && (
        <AiBranchGeneratorModal
          sourceNodeId={aiModalSourceId}
          sourceNodeTitle={story.nodes[aiModalSourceId]?.title || 'Current Node'}
          onAddBranchNode={handleAddAiBranch}
          onClose={() => setAiModalSourceId(null)}
        />
      )}
    </div>
  );
};
