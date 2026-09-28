import React from 'react';
import { Story, StoryNode } from '../../types/graphicNovel';
import { GitFork, Plus, CheckCircle, Flag, ChevronRight, Edit3 } from 'lucide-react';

interface NodeGraphViewProps {
  story: Story;
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
  onAddNode: () => void;
  onQuickAiExtend: (sourceNodeId: string) => void;
}

export const NodeGraphView: React.FC<NodeGraphViewProps> = ({
  story,
  selectedNodeId,
  onSelectNode,
  onAddNode,
  onQuickAiExtend,
}) => {
  const nodesList = Object.entries(story.nodes);

  return (
    <div className="w-full flex flex-col h-full bg-slate-950 p-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-white font-heading flex items-center gap-2">
            <GitFork className="w-4 h-4 text-amber-400" />
            Branching Storyline Architecture
          </h2>
          <p className="text-xs text-slate-400">
            {nodesList.length} narrative nodes in this graphic novel
          </p>
        </div>

        <button
          onClick={onAddNode}
          className="min-h-[40px] px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Node</span>
        </button>
      </div>

      {/* Visual Node Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {nodesList.map(([nodeId, node]: [string, StoryNode]) => {
          const isSelected = nodeId === selectedNodeId;
          const isStart = nodeId === story.startNodeId;

          return (
            <div
              key={nodeId}
              onClick={() => onSelectNode(nodeId)}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-950/30 border-amber-500 ring-2 ring-amber-500/20 shadow-xl'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    {isStart ? (
                      <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded bg-sky-950 border border-sky-500/50 text-sky-300">
                        START
                      </span>
                    ) : node.isEnding ? (
                      <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded bg-purple-950 border border-purple-500/50 text-purple-300 flex items-center gap-1">
                        <Flag className="w-3 h-3" /> ENDING
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono-code text-slate-400">
                        BRANCH
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-mono-code text-slate-500">
                    {node.panels.length} {node.panels.length === 1 ? 'panel' : 'panels'}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white font-heading group-hover:text-amber-300 transition-colors mb-1">
                  {node.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-3 font-sans">
                  {node.caption}
                </p>
              </div>

              {/* Branch Outgoing Links */}
              <div className="pt-2.5 border-t border-slate-800/80">
                <div className="text-[11px] text-slate-400 font-mono-code mb-1.5 flex items-center justify-between">
                  <span>Choice Targets:</span>
                  <span className="text-amber-400 font-bold">
                    {node.choices ? node.choices.length : 0} paths
                  </span>
                </div>

                {node.choices && node.choices.length > 0 && (
                  <div className="space-y-1">
                    {node.choices.map((c, idx) => (
                      <div
                        key={idx}
                        className="text-[10px] text-slate-300 flex items-center gap-1 truncate font-sans bg-slate-950/60 px-2 py-1 rounded"
                      >
                        <ChevronRight className="w-3 h-3 text-amber-500 shrink-0" />
                        <span className="truncate">{c.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick actions */}
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectNode(nodeId);
                    }}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-medium text-slate-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit Panels</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickAiExtend(nodeId);
                    }}
                    className="py-1.5 px-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[11px] font-medium transition-colors flex items-center gap-1"
                    title="Generate AI Branch extension from this node"
                  >
                    <GitFork className="w-3 h-3" />
                    <span>AI Branch</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
