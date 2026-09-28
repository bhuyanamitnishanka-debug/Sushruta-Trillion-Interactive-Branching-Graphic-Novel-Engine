/**
 * Web Speech API Narration Engine for Graphic Novel and Chemo-Informatics Voiceovers
 * Supports persona tones: 'clinical-ai', 'graphic-novel', 'vaidya-sage', 'tactical-pilot'
 */

export type NarrationPersonaId = 'clinical-ai' | 'graphic-novel' | 'vaidya-sage' | 'tactical-pilot';

export interface NarrationPersona {
  id: NarrationPersonaId;
  name: string;
  subtitle: string;
  description: string;
  pitch: number; // 0 to 2
  rate: number;  // 0.1 to 2
  volume: number; // 0 to 1
  voiceFilter?: (voice: SpeechSynthesisVoice) => boolean;
  prefixIntro?: string;
  iconName: string;
}

export const NARRATION_PERSONAS: Record<NarrationPersonaId, NarrationPersona> = {
  'clinical-ai': {
    id: 'clinical-ai',
    name: 'Clinical AI',
    subtitle: 'Sushruta Telemetry Matrix',
    description: 'Crisp, algorithmic, high-precision bio-informatics delivery with analytical cadence.',
    pitch: 0.95,
    rate: 1.05,
    volume: 1.0,
    prefixIntro: 'Telemetry log: ',
    iconName: 'Cpu',
    voiceFilter: (voice) =>
      voice.lang.startsWith('en') &&
      (voice.name.includes('Google') || voice.name.includes('Samantha') || voice.name.includes('Zira') || voice.name.includes('Daniel') || voice.name.includes('Natural')),
  },
  'graphic-novel': {
    id: 'graphic-novel',
    name: 'Graphic Novel Narrator',
    subtitle: 'Cinematic Comic Persona',
    description: 'Dramatic, expressive storytelling with suspenseful inflections and heroic cadence.',
    pitch: 1.1,
    rate: 0.94,
    volume: 1.0,
    prefixIntro: '',
    iconName: 'BookOpen',
    voiceFilter: (voice) =>
      voice.lang.startsWith('en') &&
      (voice.name.includes('Alex') || voice.name.includes('David') || voice.name.includes('George') || voice.name.includes('Oliver') || voice.name.includes('Guy')),
  },
  'vaidya-sage': {
    id: 'vaidya-sage',
    name: 'Vaidya Sage',
    subtitle: 'Ayurvedic Rasashastra Scholar',
    description: 'Grounding, warm, philosophical timbre tuned to traditional botanical alchemy.',
    pitch: 0.85,
    rate: 0.88,
    volume: 1.0,
    prefixIntro: '',
    iconName: 'Sparkles',
    voiceFilter: (voice) =>
      voice.lang.startsWith('en') &&
      (voice.name.includes('India') || voice.name.includes('en-IN') || voice.name.includes('Rishi') || voice.name.includes('Serena')),
  },
  'tactical-pilot': {
    id: 'tactical-pilot',
    name: 'Tactical Operative',
    subtitle: 'High-Alert Intervention Voice',
    description: 'Urgent, direct, rapid-fire battlefield bio-hazard warning response.',
    pitch: 1.02,
    rate: 1.15,
    volume: 1.0,
    prefixIntro: 'Alert status: ',
    iconName: 'ShieldAlert',
  },
};

export interface NarrationStatus {
  isSpeaking: boolean;
  isPaused: boolean;
  currentText: string;
  currentPersona: NarrationPersonaId;
  supported: boolean;
  availableVoicesCount: number;
}

type NarrationListener = (status: NarrationStatus) => void;

class NarrationVoiceoverEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private activePersona: NarrationPersonaId = 'clinical-ai';
  private rateModifier: number = 1.0;
  private isAutoNarrateEnabled: boolean = false;
  private listeners: Set<NarrationListener> = new Set();
  private isSpeakingInternal: boolean = false;
  private isPausedInternal: boolean = false;
  private currentTextInternal: string = '';

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();

      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => {
          this.loadVoices();
        };
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    this.notify();
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  public getPersona(): NarrationPersonaId {
    return this.activePersona;
  }

  public setPersona(persona: NarrationPersonaId) {
    this.activePersona = persona;
    if (this.isSpeakingInternal && !this.isPausedInternal && this.currentTextInternal) {
      // Re-speak with new persona voice
      const resumeText = this.currentTextInternal;
      this.stop();
      this.speak(resumeText);
    } else {
      this.notify();
    }
  }

  public setRateModifier(mod: number) {
    this.rateModifier = Math.max(0.5, Math.min(2.0, mod));
  }

  public getRateModifier(): number {
    return this.rateModifier;
  }

  public toggleAutoNarrate(): boolean {
    this.isAutoNarrateEnabled = !this.isAutoNarrateEnabled;
    return this.isAutoNarrateEnabled;
  }

  public isAutoNarrate(): boolean {
    return this.isAutoNarrateEnabled;
  }

  public setAutoNarrate(val: boolean) {
    this.isAutoNarrateEnabled = val;
  }

  private selectVoiceForPersona(persona: NarrationPersona): SpeechSynthesisVoice | null {
    if (!this.voices || this.voices.length === 0) return null;

    if (persona.voiceFilter) {
      const match = this.voices.find(persona.voiceFilter);
      if (match) return match;
    }

    // Fallback: Pick English voice
    const engVoice = this.voices.find((v) => v.lang.startsWith('en'));
    return engVoice || this.voices[0] || null;
  }

  public speak(text: string, personaOverride?: NarrationPersonaId) {
    if (!this.synth || !this.isSupported()) {
      console.warn('Web Speech API is not supported in this browser environment.');
      return;
    }

    if (!text || text.trim().length === 0) return;

    // Cancel any ongoing speech
    this.synth.cancel();

    const personaKey = personaOverride || this.activePersona;
    const persona = NARRATION_PERSONAS[personaKey] || NARRATION_PERSONAS['clinical-ai'];

    // Clean text of markdown characters or raw symbols for clean vocalization
    const cleanedText = text
      .replace(/[*_#`~[\]]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const fullUtteranceText = persona.prefixIntro ? `${persona.prefixIntro} ${cleanedText}` : cleanedText;

    const utterance = new SpeechSynthesisUtterance(fullUtteranceText);
    const selectedVoice = this.selectVoiceForPersona(persona);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.pitch = persona.pitch;
    utterance.rate = persona.rate * this.rateModifier;
    utterance.volume = persona.volume;

    utterance.onstart = () => {
      this.isSpeakingInternal = true;
      this.isPausedInternal = false;
      this.currentTextInternal = cleanedText;
      this.notify();
    };

    utterance.onend = () => {
      this.isSpeakingInternal = false;
      this.isPausedInternal = false;
      this.currentTextInternal = '';
      this.notify();
    };

    utterance.onerror = (e) => {
      // If cancelled or interrupted, do not treat as fatal error
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        console.warn('Speech synthesis error:', e.error);
      }
      this.isSpeakingInternal = false;
      this.isPausedInternal = false;
      this.currentTextInternal = '';
      this.notify();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (!this.synth) return;
    if (this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.isPausedInternal = true;
      this.notify();
    }
  }

  public resume() {
    if (!this.synth) return;
    if (this.synth.paused) {
      this.synth.resume();
      this.isPausedInternal = false;
      this.notify();
    }
  }

  public togglePlayPause() {
    if (this.isSpeakingInternal && !this.isPausedInternal) {
      this.pause();
    } else if (this.isPausedInternal) {
      this.resume();
    }
  }

  public stop() {
    if (!this.synth) return;
    this.synth.cancel();
    this.isSpeakingInternal = false;
    this.isPausedInternal = false;
    this.currentTextInternal = '';
    this.currentUtterance = null;
    this.notify();
  }

  public getStatus(): NarrationStatus {
    return {
      isSpeaking: this.isSpeakingInternal,
      isPaused: this.isPausedInternal,
      currentText: this.currentTextInternal,
      currentPersona: this.activePersona,
      supported: this.isSupported(),
      availableVoicesCount: this.voices.length,
    };
  }

  public subscribe(listener: NarrationListener): () => void {
    this.listeners.add(listener);
    listener(this.getStatus());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const status = this.getStatus();
    this.listeners.forEach((l) => l(status));
  }
}

export const narrationEngine = new NarrationVoiceoverEngine();
