import React from 'react';
import { Story } from '../../types/graphicNovel';
import { BookOpen, Plus, Sparkles, Upload, ArrowRight } from 'lucide-react';
import { soundEngine } from '../../utils/audioSynthesizer';

interface StoryLibraryProps {
  stories: Story[];
  currentStoryId: string;
  onSelectStory: (storyId: string) => void;
  onCreateNewStory: () => void;
  onImportStory: (imported: Story) => void;
}

export const StoryLibrary: React.FC<StoryLibraryProps> = ({
  stories,
  currentStoryId,
  onSelectStory,
  onCreateNewStory,
  onImportStory,
}) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.id && parsed.nodes && parsed.title) {
          onImportStory(parsed);
          alert(`Imported story "${parsed.title}" successfully!`);
        } else {
          alert('Invalid story JSON format.');
        }
      } catch (err) {
        alert('Could not parse story JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full h-full overflow-y-auto p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
            Graphic Novel Library
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
            Select an interactive branching graphic novel or craft a new visual narrative.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Import JSON */}
          <label className="min-h-[40px] px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            <span>Import JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Create New */}
          <button
            onClick={() => {
              soundEngine.playChoiceSelect();
              onCreateNewStory();
            }}
            className="min-h-[40px] px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Story</span>
          </button>
        </div>
      </div>

      {/* Story Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {stories.map((story) => {
          const isCurrent = story.id === currentStoryId;
          const nodeCount = Object.keys(story.nodes).length;

          return (
            <div
              key={story.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between relative group ${
                isCurrent
                  ? 'bg-amber-950/20 border-amber-500/80 ring-1 ring-amber-500/50 shadow-xl'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Meta info unboxed */}
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono-code mb-2">
                  <span>{story.genre}</span>
                  <span aria-hidden="true">·</span>
                  <span>{nodeCount} Nodes</span>
                  <span aria-hidden="true">·</span>
                  <span>{story.author}</span>
                </div>

                <h3 className="text-lg font-bold text-white font-heading group-hover:text-amber-300 transition-colors mb-1 text-balance">
                  {story.title}
                </h3>

                <p className="text-xs text-amber-400/90 font-mono-code mb-2">
                  {story.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed line-clamp-3 mb-4">
                  {story.synopsis}
                </p>

                {/* Character List */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {story.characters.map((char) => (
                    <span
                      key={char.id}
                      className="text-[11px] font-mono-code text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800"
                    >
                      {char.name} ({char.title})
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono-code">
                  {isCurrent ? 'Active Reading Story' : 'Ready to Launch'}
                </span>

                <button
                  onClick={() => {
                    soundEngine.playPageFlip();
                    onSelectStory(story.id);
                  }}
                  className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-bold font-mono-code uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{isCurrent ? 'Continue Reading' : 'Select Story'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
