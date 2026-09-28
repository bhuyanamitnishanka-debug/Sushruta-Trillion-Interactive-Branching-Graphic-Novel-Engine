import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface TopNavbarProps {
  activeTab: 'reader' | 'studio' | 'stories' | 'pill-sim' | 'simulation' | 'about';
  onChangeTab: (tab: 'reader' | 'studio' | 'stories' | 'pill-sim' | 'simulation' | 'about') => void;
  isMobileDeviceFrame: boolean;
  onToggleDeviceFrame: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  activeTab,
  onChangeTab,
  isMobileDeviceFrame,
  onToggleDeviceFrame,
}) => {
  return (
    <header className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md select-none shrink-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#reader"
        onClick={(e) => {
          e.preventDefault();
          onChangeTab('reader');
        }}
        className="text-sm sm:text-base font-bold tracking-tight text-white font-display whitespace-nowrap"
      >
        Sushruta-Trillion
      </a>

      {/* Zone 2: Clean single-line text navigation links */}
      <nav className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm font-medium text-slate-400 overflow-x-auto py-1">
        <button
          onClick={() => onChangeTab('reader')}
          className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'reader' ? 'text-amber-400 font-bold' : ''
          }`}
        >
          Reader
        </button>

        <button
          onClick={() => onChangeTab('pill-sim')}
          className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 ${
            activeTab === 'pill-sim' ? 'text-amber-400 font-bold' : ''
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>Hybrid Pill Sim</span>
        </button>

        <button
          onClick={() => onChangeTab('studio')}
          className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'studio' ? 'text-amber-400 font-bold' : ''
          }`}
        >
          Studio
        </button>

        <button
          onClick={() => onChangeTab('stories')}
          className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'stories' ? 'text-amber-400 font-bold' : ''
          }`}
        >
          Stories
        </button>

        <button
          onClick={() => onChangeTab('simulation')}
          className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer hidden md:inline ${
            activeTab === 'simulation' ? 'text-amber-400 font-bold' : ''
          }`}
        >
          Molecular Matrix
        </button>

        <button
          onClick={() => onChangeTab('about')}
          className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer hidden lg:inline ${
            activeTab === 'about' ? 'text-amber-400 font-bold' : ''
          }`}
        >
          Docs
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-2">
        {/* Device Frame Viewport Toggle */}
        <button
          onClick={onToggleDeviceFrame}
          className="min-h-[36px] px-2.5 py-1 text-xs font-mono-code text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors hidden sm:flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          title={isMobileDeviceFrame ? 'Switch to Full Screen' : 'Simulate Mobile Phone View'}
        >
          {isMobileDeviceFrame ? (
            <>
              <Monitor className="w-3.5 h-3.5 text-amber-400" />
              <span>Full Screen</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span>Mobile Frame</span>
            </>
          )}
        </button>

        {/* Primary CTA */}
        {activeTab !== 'studio' ? (
          <button
            onClick={() => onChangeTab('studio')}
            className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors whitespace-nowrap shadow-md cursor-pointer"
          >
            Open Studio
          </button>
        ) : (
          <button
            onClick={() => onChangeTab('reader')}
            className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors whitespace-nowrap shadow-md cursor-pointer"
          >
            Read Story
          </button>
        )}
      </div>
    </header>
  );
};
