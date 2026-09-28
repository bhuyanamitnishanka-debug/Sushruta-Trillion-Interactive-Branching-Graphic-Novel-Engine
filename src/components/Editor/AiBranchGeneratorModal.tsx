import React, { useState } from 'react';
import { StoryNode } from '../../types/graphicNovel';
import { Sparkles, X, Loader2, Wand2, ArrowRight } from 'lucide-react';

interface AiBranchGeneratorModalProps {
  sourceNodeTitle: string;
  sourceNodeId: string;
  onAddBranchNode: (newNode: StoryNode, sourceNodeId: string) => void;
  onClose: () => void;
}

export const AiBranchGeneratorModal: React.FC<AiBranchGeneratorModalProps> = ({
  sourceNodeTitle,
  sourceNodeId,
  onAddBranchNode,
  onClose,
}) => {
  const [prompt, setPrompt] = useState('');
  const [genre, setGenre] = useState('Cyber-Ayurvedic Bio-Informatics Thriller');
  const [tone, setTone] = useState('High-Stakes Clinical Urgency');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const quickPrompts = [
    'Hepatic clearance drops: Vaidya Ananya must deploy rare Punarnava and Giloy chelation.',
    'Receptor binding saturation: Dopamine infusion risks paradoxical hyper-kinetic seizure.',
    'Sacred crucible anomaly: Thermal resonance spikes, transmuting bhasma into 10nm quantum carriers.',
    'Mitochondrial emergency: Patient enters acute bio-energetic arrest requiring dual convergence.',
  ];

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/story/ai-branch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt || 'Continue the hybrid allopathic and rasashastra clinical crisis with a dramatic twist',
          currentContext: `Branching from: ${sourceNodeTitle}`,
          genre,
          tone,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to communicate with AI story generator endpoint');
      }

      const data = await response.json();
      if (!data.success || !data.node) {
        throw new Error(data.error || 'Invalid story structure generated');
      }

      const generated = data.node;
      const newNodeId = `node-ai-${Date.now()}`;

      // Format panels to ensure valid structure
      const formattedPanels = (generated.panels || []).map((p: any, idx: number) => ({
        id: `p-${Date.now()}-${idx}`,
        sceneType: p.sceneType || 'bio-scan',
        shotType: p.shotType || 'dynamic-close',
        motionEffect: (idx % 2 === 0 ? 'zoom-in' : 'pan-left') as any,
        dialogue: (p.dialogue || []).map((d: any, dIdx: number) => ({
          id: `d-${Date.now()}-${idx}-${dIdx}`,
          speaker: d.speaker || 'Physician',
          type: d.type || 'speech',
          text: d.text || 'Biochemical markers are shifting...',
          tailDirection: dIdx % 2 === 0 ? 'bottom-left' : 'bottom-right',
        })),
        sfxDecals: p.sfx ? [
          {
            id: `sfx-${Date.now()}-${idx}`,
            text: p.sfx,
            x: 50,
            y: 35,
            rotation: -5,
            color: '#fbbf24',
            size: 'lg' as any,
          },
        ] : [],
        interactiveHotspots: (p.interactiveHotspots || []).map((h: any, hIdx: number) => ({
          id: `h-${Date.now()}-${idx}-${hIdx}`,
          label: h.label || 'Clinical Parameter',
          type: 'biomarker' as any,
          info: h.info || 'Telemetry reading verified.',
          position: h.position || { x: 50, y: 50 },
        })),
        soundPreset: 'tension-drone' as any,
      }));

      // Format choices
      const formattedChoices = (generated.choices || []).map((c: any, cIdx: number) => ({
        id: `c-${Date.now()}-${cIdx}`,
        text: c.text,
        outcomePreview: c.outcomePreview,
        consequenceTag: c.consequenceTag || 'Tactical Risk',
        targetNodeId: sourceNodeId, // Default link back or leaf
        ethicalAlignment: 'hybrid-equilibrium' as any,
        metricsModifier: {
          dopamineDelta: 15,
          rosSuppressionDelta: 20,
          bioavailabilityDelta: 10,
          clearanceSafetyDelta: 5,
        },
      }));

      const fullNode: StoryNode = {
        id: newNodeId,
        title: generated.title || 'Branch: AI Unforeseen Crisis',
        caption: generated.caption || 'A sudden disturbance in the bio-informatics array.',
        panels: formattedPanels.length > 0 ? formattedPanels : [
          {
            id: `p-fallback-${Date.now()}`,
            sceneType: 'cellular-mitochondria',
            shotType: 'dynamic-close',
            motionEffect: 'zoom-in',
            dialogue: [
              {
                id: 'd-fb-1',
                speaker: 'Dr. Kavi',
                type: 'speech',
                text: 'The hybrid balance is holding, but we must act immediately!',
              },
            ],
            sfxDecals: [],
            interactiveHotspots: [],
            soundPreset: 'laser-scan',
          },
        ],
        choices: formattedChoices,
      };

      onAddBranchNode(fullNode, sourceNodeId);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to generate branch');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-amber-400">
            <Wand2 className="w-5 h-5" />
            <h3 className="text-base font-bold text-white font-heading">
              AI Story Branch Weaver
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-3.5">
          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
            <span className="font-mono-code text-slate-400">Branching From: </span>
            <span className="font-bold text-amber-300">{sourceNodeTitle}</span>
          </div>

          <div>
            <label className="block text-xs font-mono-code text-slate-300 mb-1.5">
              Enter Story Prompt or Crisis Premise:
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A sudden spike in liver enzymes threatens heavy-metal clearance; Dr. Kavi and Vaidya Ananya must improvise..."
              className="w-full h-24 bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none resize-none"
            />
          </div>

          {/* Quick suggestions */}
          <div>
            <span className="block text-[11px] font-mono-code text-slate-400 mb-1.5">
              Suggested Narrative Twists:
            </span>
            <div className="space-y-1.5">
              {quickPrompts.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(q)}
                  className="w-full text-left p-2 rounded-lg bg-slate-950/50 hover:bg-slate-800 text-[11px] text-slate-300 transition-colors border border-slate-800/80 flex items-center justify-between group"
                >
                  <span className="truncate">{q}</span>
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Error notice */}
          {error && (
            <div className="p-2.5 bg-rose-950/60 border border-rose-500/50 rounded-lg text-xs text-rose-200">
              {error}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs text-slate-400 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading}
            className="min-h-[44px] px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs font-mono-code uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Weaving Branch...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Branch Node</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
