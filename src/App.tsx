import React, { useState, useEffect } from 'react';
import { Story, StoryNode } from './types/graphicNovel';
import { PRESET_STORIES } from './data/presetStories';
import { ComicReader } from './components/Reader/ComicReader';
import { StoryEditor } from './components/Editor/StoryEditor';
import { StoryLibrary } from './components/Library/StoryLibrary';
import { SimulationMatrixView } from './components/Simulation/SimulationMatrixView';
import { HybridPillSimulationView } from './components/Simulation/HybridPillSimulationView';
import { DocumentationView } from './components/About/DocumentationView';
import { TopNavbar } from './components/Navigation/TopNavbar';

export default function App() {
  const [stories, setStories] = useState<Story[]>(() => {
    try {
      const saved = localStorage.getItem('sushruta_stories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}
    return PRESET_STORIES;
  });

  const [currentStoryId, setCurrentStoryId] = useState<string>(
    stories[0]?.id || 'sushruta-trillion-flagship'
  );
  const [activeTab, setActiveTab] = useState<'reader' | 'studio' | 'stories' | 'pill-sim' | 'simulation' | 'about'>('reader');
  const [isMobileDeviceFrame, setIsMobileDeviceFrame] = useState<boolean>(false);

  // Persist stories in local storage
  useEffect(() => {
    try {
      localStorage.setItem('sushruta_stories', JSON.stringify(stories));
    } catch {}
  }, [stories]);

  const currentStory =
    stories.find((s) => s.id === currentStoryId) || stories[0] || PRESET_STORIES[0];

  const handleUpdateStory = (updated: Story) => {
    setStories((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
  };

  const handleAddStoryNodeAndPlay = (newNode: StoryNode) => {
    const updatedStory: Story = {
      ...currentStory,
      nodes: {
        ...currentStory.nodes,
        [newNode.id]: newNode,
      },
      startNodeId: newNode.id, // Launch directly into this simulated episode
    };
    handleUpdateStory(updatedStory);
    setActiveTab('reader');
  };

  const handleCreateNewStory = () => {
    const newStoryId = `story-${Date.now()}`;
    const newStory: Story = {
      id: newStoryId,
      title: 'New Branching Graphic Novel',
      subtitle: 'An Interactive Narrative Canvas',
      genre: 'Interactive Fiction',
      author: 'Story Creator',
      synopsis: 'A blank narrative canvas awaiting your dramatic branching decisions.',
      characters: [
        {
          id: 'char-1',
          name: 'Hero',
          title: 'Protagonist',
          avatarColor: '#38bdf8',
          tagline: 'Ready for the journey.',
        },
      ],
      startNodeId: 'node-start',
      nodes: {
        'node-start': {
          id: 'node-start',
          title: 'Act I: The Beginning',
          caption: 'The journey starts with a fateful choice.',
          panels: [
            {
              id: `p-${Date.now()}`,
              sceneType: 'bio-scan',
              shotType: 'dynamic-close',
              motionEffect: 'zoom-in',
              dialogues: [
                {
                  id: `d-${Date.now()}`,
                  speaker: 'Narrator',
                  type: 'narration',
                  text: 'The stage is set. Every decision will carve an alternate path.',
                },
              ],
              sfxDecals: [],
              interactiveHotspots: [
                {
                  id: `h-${Date.now()}`,
                  label: 'Inspect Environment',
                  type: 'lore',
                  info: 'Initial sensor reading nominal.',
                  position: { x: 50, y: 50 },
                },
              ],
              soundPreset: 'tension-drone',
            },
          ],
          choices: [
            {
              id: `c-${Date.now()}`,
              text: 'Take the path of aggressive action',
              outcomePreview: 'Immediate high-velocity response',
              consequenceTag: 'Direct Confrontation',
              targetNodeId: 'node-start',
              ethicalAlignment: 'allopathy-targeted',
            },
          ],
        },
      },
    };

    setStories((prev) => [newStory, ...prev]);
    setCurrentStoryId(newStoryId);
    setActiveTab('studio');
  };

  const handleImportStory = (imported: Story) => {
    setStories((prev) => [imported, ...prev]);
    setCurrentStoryId(imported.id);
    setActiveTab('reader');
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans antialiased">
      {/* Top 3-Zone Navigation Bar */}
      <TopNavbar
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        isMobileDeviceFrame={isMobileDeviceFrame}
        onToggleDeviceFrame={() => setIsMobileDeviceFrame(!isMobileDeviceFrame)}
      />

      {/* Main View Area */}
      <div className="flex-1 overflow-hidden relative flex justify-center items-center">
        {/* If Mobile Device Frame is active and on wide screen, render inside realistic mobile phone wrapper */}
        {isMobileDeviceFrame ? (
          <div className="relative w-[390px] h-[820px] max-h-[96vh] rounded-[44px] border-[10px] border-slate-900 bg-slate-950 shadow-[0_25px_60px_rgba(0,0,0,0.9)] ring-1 ring-slate-800 flex flex-col overflow-hidden my-auto">
            {/* Dynamic Island / Mobile Notch */}
            <div className="absolute top-2 inset-x-0 mx-auto w-28 h-5 bg-black rounded-full z-40 flex items-center justify-center pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 mr-2" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
            </div>

            {/* Mobile View Content */}
            <div className="flex-1 w-full h-full overflow-hidden flex flex-col pt-3">
              {activeTab === 'reader' && (
                <ComicReader
                  story={currentStory}
                  onOpenStudio={() => setActiveTab('studio')}
                />
              )}
              {activeTab === 'studio' && (
                <StoryEditor
                  story={currentStory}
                  onUpdateStory={handleUpdateStory}
                  onPlayStory={() => setActiveTab('reader')}
                />
              )}
              {activeTab === 'stories' && (
                <StoryLibrary
                  stories={stories}
                  currentStoryId={currentStoryId}
                  onSelectStory={(id) => {
                    setCurrentStoryId(id);
                    setActiveTab('reader');
                  }}
                  onCreateNewStory={handleCreateNewStory}
                  onImportStory={handleImportStory}
                />
              )}
              {activeTab === 'pill-sim' && (
                <HybridPillSimulationView
                  currentStory={currentStory}
                  onAddStoryNodeAndPlay={handleAddStoryNodeAndPlay}
                />
              )}
              {activeTab === 'simulation' && <SimulationMatrixView />}
              {activeTab === 'about' && <DocumentationView />}
            </div>

            {/* Mobile Home Indicator bar */}
            <div className="absolute bottom-1 inset-x-0 mx-auto w-32 h-1 bg-slate-600 rounded-full z-40 pointer-events-none" />
          </div>
        ) : (
          /* Full Viewport / Native Mobile Responsive Mode */
          <div className="w-full h-full overflow-hidden flex flex-col">
            {activeTab === 'reader' && (
              <ComicReader
                story={currentStory}
                onOpenStudio={() => setActiveTab('studio')}
              />
            )}
            {activeTab === 'studio' && (
              <StoryEditor
                story={currentStory}
                onUpdateStory={handleUpdateStory}
                onPlayStory={() => setActiveTab('reader')}
              />
            )}
            {activeTab === 'stories' && (
              <StoryLibrary
                stories={stories}
                currentStoryId={currentStoryId}
                onSelectStory={(id) => {
                  setCurrentStoryId(id);
                  setActiveTab('reader');
                }}
                onCreateNewStory={handleCreateNewStory}
                onImportStory={handleImportStory}
              />
            )}
            {activeTab === 'pill-sim' && (
              <HybridPillSimulationView
                currentStory={currentStory}
                onAddStoryNodeAndPlay={handleAddStoryNodeAndPlay}
              />
            )}
            {activeTab === 'simulation' && <SimulationMatrixView />}
            {activeTab === 'about' && <DocumentationView />}
          </div>
        )}
      </div>
    </div>
  );
}
