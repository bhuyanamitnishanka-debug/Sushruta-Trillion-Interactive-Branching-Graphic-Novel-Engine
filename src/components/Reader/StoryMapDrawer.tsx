import React from 'react';
import { Story, StoryNode } from '../../types/graphicNovel';
import { X, GitCommit, CheckCircle2, RotateCcw, Compass } from 'lucide-react';
import { soundEngine } from '../../utils/audioSynthesizer';

interface StoryMapDrawerProps {
  story: Story;
  currentNodeId: string;
  visitedNodeIds: string[];
  isOpen: boolean;
  onClose: () => void;
  onJumpToNode: (nodeId: string) => void;
  onResetStory: () => void;
}

export const StoryMapDrawer: React.FC<StoryMapDrawerProps> = ({
  story,
  currentNodeId,
  visitedNodeIds,
  isOpen,
  onClose,
  onJumpToNode,
  onResetStory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full sm:max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col p-5 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Storyline Node Map
              </h3>
              <p className="text-xs text-slate-400">
                {visitedNodeIds.length} of {Object.keys(story.nodes).length} narrative nodes visited
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Node Path List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {Object.entries(story.nodes).map(([nodeId, node]: [string, StoryNode]) => {
            const isCurrent = nodeId === currentNodeId;
            const isVisited = visitedNodeIds.includes(nodeId);

            return (
              <div
                key={nodeId}
                className={`p-3.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-amber-950/40 border-amber-500/80 shadow-lg shadow-amber-950/30'
                    : isVisited
                    ? 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-950/30 border-dashed border-slate-800/60 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    {isCurrent ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                    ) : isVisited ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <GitCommit className="w-4 h-4 text-slate-600" />
                    )}
                    <span className="text-xs font-mono-code font-bold uppercase text-slate-300">
                      {node.title}
                    </span>
                  </div>

                  {node.isEnding && (
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/50 text-purple-300">
                      Ending: {node.endingType}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                  {node.caption}
                </p>

                {/* Rewind / Explore button */}
                {isVisited && !isCurrent && (
                  <button
                    onClick={() => {
                      soundEngine.playPageFlip();
                      onJumpToNode(nodeId);
                      onClose();
                    }}
                    className="w-full py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Jump to this Timeline Branch
                  </button>
                )}

                {isCurrent && (
                  <div className="text-[11px] text-amber-400 font-mono-code font-semibold flex items-center gap-1">
                    <span>Active Reading Point</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              if (window.confirm('Restart story from prologue?')) {
                onResetStory();
                onClose();
              }
            }}
            className="text-xs text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1 py-2 px-3"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restart Story
          </button>
        </div>
      </div>
    </div>
  );
};
