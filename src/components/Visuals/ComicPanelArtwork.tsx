import React from 'react';
import { SceneType, MotionEffect } from '../../types/graphicNovel';

interface ComicPanelArtworkProps {
  sceneType: SceneType;
  motionEffect: MotionEffect;
  shotType?: string;
  customColorTheme?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const ComicPanelArtwork: React.FC<ComicPanelArtworkProps> = ({
  sceneType,
  motionEffect,
  shotType = 'wide-dramatic',
}) => {
  // Motion class selector
  const getMotionClass = () => {
    switch (motionEffect) {
      case 'pan-left':
        return 'anim-pan-left';
      case 'zoom-in':
        return 'anim-zoom-in';
      case 'tilt':
        return 'anim-tilt';
      case 'shake':
        return 'anim-shake';
      case 'pulse':
        return 'animate-pulse';
      default:
        return '';
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-slate-950">
      {/* Halftone texture overlay */}
      <div className="absolute inset-0 comic-halftone pointer-events-none opacity-40 z-10" />

      {/* Dynamic Animated Scene Container */}
      <div className={`w-full h-full transition-transform duration-700 ${getMotionClass()}`}>
        {renderSceneSVG(sceneType, shotType)}
      </div>

      {/* Cybernetic Scanline beam */}
      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent pointer-events-none anim-scan z-20" />

      {/* Vignette border & comic ink shading */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/75 pointer-events-none z-15" />
    </div>
  );
};

function renderSceneSVG(sceneType: SceneType, _shotType: string) {
  switch (sceneType) {
    case 'triage-er':
      return (
        <svg viewBox="0 0 800 600" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="triageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0b0f19" />
              <stop offset="60%" stopColor="#1e1427" />
              <stop offset="100%" stopColor="#2b0a1a" />
            </linearGradient>
            <linearGradient id="beamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
            </linearGradient>
            <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(244, 63, 94, 0.15)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Deep cyber ER background */}
          <rect width="800" height="600" fill="url(#triageGrad)" />
          <rect width="800" height="600" fill="url(#gridPattern)" />

          {/* Emergency Alert Lighting Rays */}
          <polygon points="100,0 220,0 350,600 0,600" fill="url(#beamGrad)" opacity="0.3" />
          <polygon points="580,0 700,0 800,600 450,600" fill="url(#beamGrad)" opacity="0.3" />

          {/* Stasis Pod Chamber */}
          <ellipse cx="400" cy="460" rx="220" ry="80" fill="#0f172a" stroke="#f43f5e" strokeWidth="4" />
          <ellipse cx="400" cy="450" rx="190" ry="65" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" />

          {/* Holographic Patient Silhouette in stasis */}
          <path
            d="M 360 440 Q 400 410 440 440 Q 430 470 370 470 Z"
            fill="#38bdf8"
            opacity="0.35"
            filter="blur(1px)"
          />
          {/* Neural Tremor Lightning Spikes */}
          <path
            d="M 340 430 L 370 415 L 390 435 L 420 405 L 435 425 L 460 410"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Robotic Injector Arms */}
          <path d="M 120 180 L 260 280 L 320 380" fill="none" stroke="#475569" strokeWidth="12" strokeLinecap="round" />
          <circle cx="260" cy="280" r="14" fill="#0f172a" stroke="#f43f5e" strokeWidth="3" />
          <path d="M 680 180 L 540 280 L 480 380" fill="none" stroke="#475569" strokeWidth="12" strokeLinecap="round" />
          <circle cx="540" cy="280" r="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />

          {/* Holographic Vital Telemetry Screens */}
          <rect x="80" y="80" width="220" height="130" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#f43f5e" strokeWidth="2" />
          <text x="96" y="110" fill="#f43f5e" fontSize="13" fontFamily="var(--font-mono)" fontWeight="bold">SYNAPTIC DOPAMINE</text>
          <text x="96" y="145" fill="#ffffff" fontSize="28" fontFamily="var(--font-heading)" fontWeight="bold">12.4% CRITICAL</text>
          <path d="M 96 175 L 140 175 L 155 155 L 170 190 L 190 170 L 260 175" fill="none" stroke="#f43f5e" strokeWidth="3" />

          <rect x="500" y="80" width="220" height="130" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#38bdf8" strokeWidth="2" />
          <text x="516" y="110" fill="#38bdf8" fontSize="13" fontFamily="var(--font-mono)" fontWeight="bold">MITOCHONDRIAL ROS</text>
          <text x="516" y="145" fill="#f59e0b" fontSize="28" fontFamily="var(--font-heading)" fontWeight="bold">88.9% OVERLOAD</text>
          <path d="M 516 175 L 560 175 L 580 160 L 600 185 L 630 165 L 690 175" fill="none" stroke="#f59e0b" strokeWidth="3" />

          {/* Speed / Alert Lines */}
          <line x1="50" y1="50" x2="150" y2="70" stroke="#f43f5e" strokeWidth="2" strokeDasharray="10 5" opacity="0.6" />
          <line x1="650" y1="50" x2="750" y2="70" stroke="#f43f5e" strokeWidth="2" strokeDasharray="10 5" opacity="0.6" />
        </svg>
      );

    case 'rasashastra-crucible':
      return (
        <svg viewBox="0 0 800 600" className="w-full h-full object-cover">
          <defs>
            <radialGradient id="crucibleCore" cx="50%" cy="60%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="35%" stopColor="#f59e0b" />
              <stop offset="70%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#451a03" />
            </radialGradient>
            <radialGradient id="sacredAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Deep mystical dark forge backdrop */}
          <rect width="800" height="600" fill="#090a10" />

          {/* Sacred geometry mandala in background */}
          <circle cx="400" cy="300" r="260" fill="none" stroke="rgba(245, 158, 11, 0.15)" strokeWidth="2" strokeDasharray="8 8" />
          <circle cx="400" cy="300" r="180" fill="none" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1.5" />
          <polygon points="400,120 556,390 244,390" fill="none" stroke="rgba(245, 158, 11, 0.15)" strokeWidth="2" />
          <polygon points="400,480 244,210 556,210" fill="none" stroke="rgba(245, 158, 11, 0.15)" strokeWidth="2" />

          {/* Intense heat aura */}
          <circle cx="400" cy="350" r="220" fill="url(#sacredAura)" />

          {/* Sacred Crucible Kiln (Kosthi Heat Matrix) */}
          <path
            d="M 280 500 Q 250 360 300 280 Q 400 250 500 280 Q 550 360 520 500 Z"
            fill="#1e1e24"
            stroke="#d97706"
            strokeWidth="6"
          />

          {/* Molten Bhasma Core */}
          <ellipse cx="400" cy="350" rx="140" ry="70" fill="url(#crucibleCore)" stroke="#fde047" strokeWidth="3" />

          {/* Alchemical fire flames */}
          <path
            d="M 330 350 Q 360 210 390 270 Q 400 160 420 250 Q 440 180 470 350 Z"
            fill="#fbbf24"
            opacity="0.85"
          />
          <path
            d="M 360 350 Q 380 230 400 280 Q 420 210 440 350 Z"
            fill="#ffffff"
            opacity="0.9"
          />

          {/* Swarna-Bhasma Nanoparticles ascending like golden stardust */}
          <g fill="#fde047">
            <circle cx="370" cy="200" r="6" filter="drop-shadow(0 0 8px #f59e0b)" />
            <circle cx="430" cy="170" r="4.5" />
            <circle cx="400" cy="130" r="7" filter="drop-shadow(0 0 10px #fde047)" />
            <circle cx="450" cy="110" r="3.5" />
            <circle cx="340" cy="140" r="5" />
            <circle cx="390" cy="80" r="6" />
            <circle cx="420" cy="60" r="4" />
          </g>

          {/* Ancient Sanskrit / Metric Calibration Ring */}
          <text x="400" y="555" fill="#f59e0b" fontSize="13" fontFamily="var(--font-mono)" textAnchor="middle" letterSpacing="4">
            MAARANA CALCINATION MATRIX // 18nm BIO-CHELATION
          </text>
        </svg>
      );

    case 'molecular-dock':
      return (
        <svg viewBox="0 0 800 600" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="dockBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#030712" />
              <stop offset="50%" stopColor="#0c1929" />
              <stop offset="100%" stopColor="#082f49" />
            </linearGradient>
            <radialGradient id="bindingGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="800" height="600" fill="url(#dockBg)" />

          {/* Synaptic Receptor Pocket */}
          <path
            d="M 150 480 C 220 480 260 380 340 380 C 420 380 440 460 520 460 C 600 460 620 360 700 360 L 750 600 L 100 600 Z"
            fill="#1e293b"
            stroke="#0ea5e9"
            strokeWidth="5"
          />

          {/* Allopathic Molecule Lock (Levodopa / Ligand Structure) */}
          <g transform="translate(350, 180)">
            <circle cx="50" cy="50" r="90" fill="url(#bindingGlow)" opacity="0.6" />
            {/* Chemical Benzene Ring */}
            <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="rgba(14, 165, 233, 0.4)" stroke="#38bdf8" strokeWidth="4" />
            <line x1="85" y1="50" x2="135" y2="50" stroke="#f43f5e" strokeWidth="5" />
            <circle cx="140" cy="50" r="10" fill="#f43f5e" />
            <line x1="50" y1="90" x2="50" y2="130" stroke="#fbbf24" strokeWidth="5" />
            <circle cx="50" cy="135" r="12" fill="#fbbf24" />
          </g>

          {/* Targeted Lock-On Target HUD */}
          <circle cx="400" cy="360" r="45" fill="none" stroke="#f43f5e" strokeWidth="3" strokeDasharray="8 6" />
          <line x1="330" y1="360" x2="470" y2="360" stroke="#f43f5e" strokeWidth="2" />
          <line x1="400" y1="290" x2="400" y2="430" stroke="#f43f5e" strokeWidth="2" />

          {/* Molecular Kinetic Vectors */}
          <path d="M 400 240 L 400 320" stroke="#38bdf8" strokeWidth="4" markerEnd="url(#arrow)" strokeDasharray="6 4" />
          <text x="400" y="540" fill="#38bdf8" fontSize="14" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">
            RECEPTOR AFFINITY: Kd = 2.4 nM // RAPID FAST-TRACK CLEARANCE
          </text>
        </svg>
      );

    case 'cellular-mitochondria':
      return (
        <svg viewBox="0 0 800 600" className="w-full h-full object-cover">
          <defs>
            <radialGradient id="mitoBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="70%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#030712" />
            </radialGradient>
            <linearGradient id="dnaGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          <rect width="800" height="600" fill="url(#mitoBg)" />

          {/* Mitochondria Cristae Curvature */}
          <path
            d="M 120 300 Q 150 140 380 140 Q 640 140 680 300 Q 650 480 390 480 Q 140 480 120 300 Z"
            fill="#172554"
            stroke="#3b82f6"
            strokeWidth="6"
            opacity="0.8"
          />

          {/* Inner Folding Matrix */}
          <path
            d="M 220 220 C 300 220 300 320 400 320 C 500 320 500 220 580 220"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 200 360 C 300 360 300 420 420 420 C 520 420 530 360 600 360"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Double-Helix Hybrid Repair Lattice (Gold Ayurveda + Blue Allopathy) */}
          <path
            d="M 100 280 Q 200 200 300 280 T 500 280 T 700 280"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="4"
          />
          <path
            d="M 100 280 Q 200 360 300 280 T 500 280 T 700 280"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="4"
          />

          {/* ROS Free Radical Burst Scavenging */}
          <g>
            <circle cx="280" cy="240" r="16" fill="rgba(244, 63, 94, 0.3)" stroke="#f43f5e" strokeWidth="2" />
            <text x="280" y="244" fill="#f43f5e" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">ROS</text>
            <line x1="260" y1="220" x2="300" y2="260" stroke="#f43f5e" strokeWidth="3" />

            {/* Jyotishmati & Giloy Shield Shielding */}
            <circle cx="500" cy="260" r="28" fill="rgba(245, 158, 11, 0.3)" stroke="#fbbf24" strokeWidth="3" strokeDasharray="4 3" />
            <text x="500" y="264" fill="#fde047" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">SOD-3</text>
          </g>

          <text x="400" y="540" fill="#fbbf24" fontSize="13" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">
            CELLULAR OXIDATIVE SUPPRESSION // ROS INHIBITION: 78%
          </text>
        </svg>
      );

    case 'character-confrontation':
      return (
        <svg viewBox="0 0 800 600" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="splitLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#082f49" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="splitRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>

          {/* Split Background (Allopathy Cyber Blue vs Ayurveda Gold Amber) */}
          <polygon points="0,0 420,0 360,600 0,600" fill="url(#splitLeft)" />
          <polygon points="420,0 800,0 800,600 360,600" fill="url(#splitRight)" />

          {/* Jagged Lightning Divider Line */}
          <polyline points="420,0 390,180 430,340 370,490 390,600" fill="none" stroke="#ffffff" strokeWidth="5" />

          {/* Dr. Kavi Silhouette (Left, Cyber-Vaidya Neuro-Specialist) */}
          <g transform="translate(60, 100)">
            <ellipse cx="140" cy="150" rx="60" ry="75" fill="#0f172a" stroke="#38bdf8" strokeWidth="4" />
            {/* Cyber Visor */}
            <rect x="95" y="130" width="90" height="25" rx="6" fill="#38bdf8" filter="drop-shadow(0 0 10px #0284c7)" />
            <path d="M 60 260 C 60 210 100 200 140 200 C 180 200 220 210 220 260 L 220 400 L 60 400 Z" fill="#090d16" stroke="#0284c7" strokeWidth="3" />
            <text x="140" y="320" fill="#38bdf8" fontSize="16" fontFamily="var(--font-heading)" fontWeight="bold" textAnchor="middle">DR. KAVI</text>
            <text x="140" y="340" fill="#94a3b8" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">ALLOPATHIC NEURO-TECH</text>
          </g>

          {/* Vaidya Ananya Silhouette (Right, Rasashastra Master) */}
          <g transform="translate(480, 100)">
            <ellipse cx="140" cy="150" rx="60" ry="75" fill="#1c1917" stroke="#fbbf24" strokeWidth="4" />
            {/* Glowing Golden Bindi / Neural Third Eye */}
            <circle cx="140" cy="120" r="7" fill="#fde047" filter="drop-shadow(0 0 12px #f59e0b)" />
            <path d="M 60 260 C 60 210 100 200 140 200 C 180 200 220 210 220 260 L 220 400 L 60 400 Z" fill="#292524" stroke="#d97706" strokeWidth="3" />
            <text x="140" y="320" fill="#fbbf24" fontSize="16" fontFamily="var(--font-heading)" fontWeight="bold" textAnchor="middle">VAIDYA ANANYA</text>
            <text x="140" y="340" fill="#fed7aa" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">MASTER OF RASASHASTRA</text>
          </g>
        </svg>
      );

    case 'nanoparticle-flow':
      return (
        <svg viewBox="0 0 800 600" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="gastricBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e0b1e" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
            <radialGradient id="pillCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="800" height="600" fill="url(#gastricBg)" />

          {/* Gastric Mucosal Wall Contour */}
          <path
            d="M 50 100 Q 150 180 250 120 T 450 150 T 650 110 T 780 180 L 780 0 L 50 0 Z"
            fill="#3f1424"
            opacity="0.6"
          />
          <path
            d="M 50 500 Q 200 440 350 490 T 550 450 T 750 520 L 750 600 L 50 600 Z"
            fill="#14532d"
            opacity="0.5"
          />

          {/* Biphasic Hybrid Micro-Capsule in disintegration */}
          <g transform="translate(320, 220)">
            <ellipse cx="80" cy="80" rx="90" ry="50" fill="url(#pillCoreGlow)" />
            {/* Outer Allopathic Shell dissolving */}
            <path
              d="M 10 80 C 10 50 45 40 80 40 C 115 40 150 50 150 80 C 150 110 115 120 80 120 C 45 120 10 110 10 80 Z"
              fill="rgba(56, 189, 248, 0.35)"
              stroke="#38bdf8"
              strokeWidth="4"
              strokeDasharray="10 5"
            />
            {/* Inner Rasashastra Nano-Core */}
            <ellipse cx="80" cy="80" rx="45" ry="25" fill="#f59e0b" stroke="#fde047" strokeWidth="3" />
          </g>

          {/* Swarming 18nm Bhasma Nanoparticles dispersing through lipid carriers */}
          <g fill="#fde047">
            {[
              { cx: 240, cy: 260, r: 5 },
              { cx: 200, cy: 300, r: 6 },
              { cx: 280, cy: 350, r: 4 },
              { cx: 480, cy: 200, r: 7 },
              { cx: 540, cy: 240, r: 5 },
              { cx: 510, cy: 320, r: 6 },
              { cx: 460, cy: 380, r: 5 },
              { cx: 380, cy: 390, r: 4 },
              { cx: 160, cy: 380, r: 4 },
              { cx: 620, cy: 300, r: 5 },
            ].map((p, i) => (
              <circle key={i} cx={p.cx} cy={p.cy} r={p.r} filter="drop-shadow(0 0 8px #f59e0b)" />
            ))}
          </g>

          {/* Disintegration Velocity HUD readout */}
          <rect x="70" y="70" width="230" height="85" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#f43f5e" strokeWidth="1.5" />
          <text x="86" y="98" fill="#94a3b8" fontSize="11" fontFamily="var(--font-mono)">GASTRIC DISINTEGRATION</text>
          <text x="86" y="128" fill="#f43f5e" fontSize="22" fontFamily="var(--font-heading)" fontWeight="bold">42s VELOCITY</text>

          <rect x="500" y="70" width="230" height="85" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#10b981" strokeWidth="1.5" />
          <text x="516" y="98" fill="#94a3b8" fontSize="11" fontFamily="var(--font-mono)">MUCOSAL SHIELDING</text>
          <text x="516" y="128" fill="#10b981" fontSize="22" fontFamily="var(--font-heading)" fontWeight="bold">0.94 COEFFICIENT</text>

          <text x="400" y="555" fill="#fde047" fontSize="12" fontFamily="var(--font-mono)" textAnchor="middle" letterSpacing="3">
            BHAVANA ASAVA-LIPID CARRIER // 18nm SWARNA-BHASMA PASSAGE
          </text>
        </svg>
      );

    case 'pancreatic-islet':
      return (
        <svg viewBox="0 0 800 600" className="w-full h-full object-cover">
          <defs>
            <radialGradient id="pancreasBg" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#1e1026" />
              <stop offset="50%" stopColor="#090d16" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
            <radialGradient id="isletCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#f59e0b" />
              <stop offset="80%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#451a03" />
            </radialGradient>
            <radialGradient id="betaGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="80%" stopColor="#059669" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#022c22" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Deep dark bio-metabolic canvas */}
          <rect width="800" height="600" fill="url(#pancreasBg)" />

          {/* Golden Ashwagandha Cytoprotective Matrix Shield */}
          <circle cx="400" cy="300" r="230" fill="none" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="2" strokeDasharray="10 8" />
          <circle cx="400" cy="300" r="170" fill="none" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="3" />
          <circle cx="400" cy="300" r="110" fill="none" stroke="rgba(52, 211, 153, 0.35)" strokeWidth="2.5" />

          {/* Pancreatic Islet of Langerhans Lobular Tissue */}
          <path
            d="M 280 230 Q 340 160 440 180 Q 530 200 550 290 Q 570 380 480 430 Q 380 460 300 400 Q 240 330 280 230 Z"
            fill="#181329"
            stroke="#d97706"
            strokeWidth="5"
          />

          {/* Beta-Cell Nuclei Cluster with Withanolide Antioxidant Shielding */}
          <g>
            {/* Central Beta-Cell Core */}
            <circle cx="400" cy="300" r="55" fill="url(#isletCore)" stroke="#fde047" strokeWidth="3" />
            <text x="400" y="305" fill="#020617" fontSize="11" fontFamily="var(--font-heading)" fontWeight="bold" textAnchor="middle">
              BETA-CELL CORE
            </text>

            {/* Satellite Endocrine Cells */}
            {[
              { cx: 330, cy: 250, r: 24, label: 'β' },
              { cx: 470, cy: 240, r: 26, label: 'β' },
              { cx: 340, cy: 360, r: 22, label: 'α' },
              { cx: 460, cy: 370, r: 25, label: 'β' },
              { cx: 400, cy: 200, r: 20, label: 'δ' },
              { cx: 400, cy: 400, r: 22, label: 'β' },
            ].map((cell, i) => (
              <g key={i}>
                <circle cx={cell.cx} cy={cell.cy} r={cell.r} fill="url(#betaGlow)" stroke="#34d399" strokeWidth="2" />
                <circle cx={cell.cx} cy={cell.cy} r={cell.r + 5} fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
                <text x={cell.cx} y={cell.cy + 4} fill="#ffffff" fontSize="12" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">
                  {cell.label}
                </text>
              </g>
            ))}
          </g>

          {/* Pulsatile Basal Insulin Secretory Vesicles (Emerald Green Droplets) */}
          <g fill="#34d399">
            {[
              { cx: 210, cy: 220, r: 5 },
              { cx: 240, cy: 160, r: 6 },
              { cx: 580, cy: 220, r: 5 },
              { cx: 620, cy: 270, r: 6 },
              { cx: 560, cy: 410, r: 5 },
              { cx: 220, cy: 420, r: 6 },
            ].map((v, i) => (
              <circle key={i} cx={v.cx} cy={v.cy} r={v.r} filter="drop-shadow(0 0 6px #10b981)" />
            ))}
          </g>

          {/* Nocturnal Blood Sugar Stability Waveform */}
          <g>
            {/* Steady Stable Glycemic Curve (Golden & Emerald) */}
            <path
              d="M 80 490 Q 200 485 300 490 T 500 490 T 720 490"
              fill="none"
              stroke="#34d399"
              strokeWidth="4"
            />
            {/* Erratic Unbuffered Spike (Faint red dotted baseline showing avoided crash) */}
            <path
              d="M 80 520 Q 200 450 300 550 T 500 440 T 720 530"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.4"
            />
          </g>

          {/* Telemetry HUD 1: Nocturnal Glucose Stability */}
          <rect x="70" y="60" width="240" height="90" rx="8" fill="rgba(15, 23, 42, 0.9)" stroke="#34d399" strokeWidth="1.5" />
          <text x="86" y="88" fill="#94a3b8" fontSize="11" fontFamily="var(--font-mono)">NOCTURNAL GLUCOSE STABILITY</text>
          <text x="86" y="120" fill="#34d399" fontSize="24" fontFamily="var(--font-heading)" fontWeight="bold">94.5% CONSTANCY</text>
          <text x="86" y="138" fill="#6ee7b7" fontSize="10" fontFamily="var(--font-mono)">ZERO NOCTURNAL GLYCEMIC CRASH</text>

          {/* Telemetry HUD 2: Basal Insulin Balance */}
          <rect x="490" y="60" width="240" height="90" rx="8" fill="rgba(15, 23, 42, 0.9)" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="506" y="88" fill="#94a3b8" fontSize="11" fontFamily="var(--font-mono)">BASAL INSULIN SECRETION</text>
          <text x="506" y="120" fill="#f59e0b" fontSize="24" fontFamily="var(--font-heading)" fontWeight="bold">8.5 uU/mL</text>
          <text x="506" y="138" fill="#fde047" fontSize="10" fontFamily="var(--font-mono)">BETA-CELL SHIELD: 1.62 INDEX</text>

          {/* Bottom Annotation */}
          <text x="400" y="560" fill="#6ee7b7" fontSize="12" fontFamily="var(--font-mono)" textAnchor="middle" letterSpacing="3">
            PANCREATIC ISLET PRESERVATION // ASHWAGANDHA METABOLIC SHIELD
          </text>
        </svg>
      );

    case 'bio-scan':
    default:
      return (
        <svg viewBox="0 0 800 600" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="bioGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#020617" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#bioGrad)" />

          {/* Concentric Bio-Sonar Rings */}
          <circle cx="400" cy="300" r="240" fill="none" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="2" />
          <circle cx="400" cy="300" r="180" fill="none" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="2" strokeDasharray="12 6" />
          <circle cx="400" cy="300" r="120" fill="none" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="2" />
          <circle cx="400" cy="300" r="60" fill="none" stroke="rgba(244, 63, 94, 0.4)" strokeWidth="3" />

          {/* Crosshairs */}
          <line x1="100" y1="300" x2="700" y2="300" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1.5" />
          <line x1="400" y1="50" x2="400" y2="550" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1.5" />

          {/* Dynamic Waveform Graph */}
          <path
            d="M 100 450 Q 200 420 280 450 T 400 350 T 520 480 T 700 450"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="4"
          />
          <path
            d="M 100 470 Q 220 490 320 440 T 460 410 T 600 460 T 700 470"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="3"
            strokeDasharray="6 4"
          />

          {/* Telemetry Annotations */}
          <rect x="520" y="80" width="220" height="90" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="536" y="110" fill="#94a3b8" fontSize="12" fontFamily="var(--font-mono)">HEPATIC CLEARANCE</text>
          <text x="536" y="140" fill="#38bdf8" fontSize="22" fontFamily="var(--font-heading)" fontWeight="bold">94.2 mL/min</text>

          <rect x="60" y="80" width="220" height="90" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="76" y="110" fill="#94a3b8" fontSize="12" fontFamily="var(--font-mono)">BHAVANA LIPID TRANSIT</text>
          <text x="76" y="140" fill="#fbbf24" fontSize="22" fontFamily="var(--font-heading)" fontWeight="bold">+34% BOOST</text>
        </svg>
      );
  }
}
