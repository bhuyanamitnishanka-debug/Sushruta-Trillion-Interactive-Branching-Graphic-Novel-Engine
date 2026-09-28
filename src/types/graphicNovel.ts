export type SpeechType = 'speech' | 'thought' | 'whisper' | 'shout' | 'narration';
export type TailDirection = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'center';
export type MotionEffect = 'pan-left' | 'zoom-in' | 'tilt' | 'shake' | 'pulse' | 'none';
export type SceneType =
  | 'bio-scan'
  | 'rasashastra-crucible'
  | 'triage-er'
  | 'molecular-dock'
  | 'neo-kashi'
  | 'nanoparticle-flow'
  | 'pancreatic-islet'
  | 'character-confrontation'
  | 'cellular-mitochondria'
  | 'custom';

export interface Hotspot {
  id: string;
  label: string;
  type: 'biomarker' | 'evidence' | 'character-thought' | 'chemical-pathway' | 'lore';
  info: string;
  position: { x: number; y: number }; // Percentage 0-100
}

export interface DialogueBubble {
  id: string;
  speaker: string;
  type: SpeechType;
  text: string;
  tailDirection?: TailDirection;
  position?: { x: number; y: number };
}

export interface SFXDecal {
  id: string;
  text: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  rotation: number; // Degrees
  color: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
}

export interface ComicPanel {
  id: string;
  sceneType: SceneType;
  shotType: 'dynamic-close' | 'wide-dramatic' | 'split-panel' | 'isometric' | 'over-shoulder';
  motionEffect: MotionEffect;
  caption?: string;
  visualDescription?: string;
  dialogues: DialogueBubble[];
  dialogue?: DialogueBubble[];
  sfxDecals: SFXDecal[];
  interactiveHotspots: Hotspot[];
  soundPreset?: 'tension-drone' | 'pulse-heartbeat' | 'laser-scan' | 'crucible-flame' | 'impact' | 'none';
  customColorTheme?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface StoryChoice {
  id: string;
  text: string;
  outcomePreview: string;
  consequenceTag: string;
  targetNodeId: string;
  ethicalAlignment?: 'allopathy-targeted' | 'ayurveda-protective' | 'hybrid-equilibrium' | 'tactical-risk';
  metricsModifier?: {
    dopamineDelta?: number;
    rosSuppressionDelta?: number;
    bioavailabilityDelta?: number;
    clearanceSafetyDelta?: number;
  };
}

export interface StoryNode {
  id: string;
  title: string;
  caption: string;
  panels: ComicPanel[];
  choices: StoryChoice[];
  isEnding?: boolean;
  endingType?: 'victory' | 'tragedy' | 'equilibrium' | 'breakthrough';
  endingSummary?: string;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  avatarColor: string;
  tagline: string;
}

export interface ClinicalMetrics {
  dopamineStability: number; // 0 - 100%
  rosSuppression: number; // 0 - 100%
  bioavailabilityBoost: number; // +0% - +60%
  clearanceSafety: number; // 0 - 100%
  overallStability: number; // 0.00 - 1.00
}

export interface Story {
  id: string;
  title: string;
  subtitle: string;
  genre: string;
  author: string;
  synopsis: string;
  characters: Character[];
  startNodeId: string;
  nodes: Record<string, StoryNode>;
  initialMetrics?: ClinicalMetrics;
}
