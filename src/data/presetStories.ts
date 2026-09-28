import { Story } from '../types/graphicNovel';

export const PRESET_STORIES: Story[] = [
  {
    id: 'sushruta-trillion-flagship',
    title: 'Sushruta-Trillion: The Hybrid Alchemist',
    subtitle: 'Where Allopathic Molecular Speed Harmonizes with Vedic Rasashastra',
    genre: 'Cyber-Vedic Bio-Thriller',
    author: 'Sushruta-Trillion Simulation Core',
    synopsis:
      'In Neo-Pataliputra, 2099, Commander Vikram arrives in acute neuro-motor arrest. Standard allopathy risks liver toxicity; ancient bhasma nanoparticles require precise thermal catalysts. As Chief Bio-Vaidya, you hold the fate of his cellular survival in your hands.',
    characters: [
      {
        id: 'dr-kavi',
        name: 'Dr. Kavi',
        title: 'Chief Allopathic Neuro-Surgeon',
        avatarColor: '#38bdf8',
        tagline: 'Precision pharmacology and instantaneous receptor rescue.',
      },
      {
        id: 'vaidya-ananya',
        name: 'Vaidya Ananya',
        title: 'Grandmaster of Rasashastra',
        avatarColor: '#f59e0b',
        tagline: 'Keeper of the 18nm Bhasma calcination matrices.',
      },
    ],
    initialMetrics: {
      dopamineStability: 18,
      rosSuppression: 24,
      bioavailabilityBoost: 0,
      clearanceSafety: 92,
      overallStability: 0.32,
    },
    startNodeId: 'node-prologue',
    nodes: {
      'node-prologue': {
        id: 'node-prologue',
        title: 'Act I: Neuro-Motor Blockade',
        caption: 'The ICU bio-pod sirens wail. Commander Vikram’s synaptic dopamine has plunged below 20%.',
        panels: [
          {
            id: 'p1',
            sceneType: 'triage-er',
            shotType: 'dynamic-close',
            motionEffect: 'shake',
            dialogues: [
              {
                id: 'd1',
                speaker: 'Dr. Kavi',
                type: 'shout',
                text: 'Synaptic dopamine is cratering! If we do not restore striatal signaling in 45 minutes, motor neurons will decay permanently!',
              },
              {
                id: 'd2',
                speaker: 'Vaidya Ananya',
                type: 'speech',
                text: 'Patience, Kavi. A brute-force chemical blast will shatter his mitochondrial cristae with oxidative stress.',
              },
            ],
            sfxDecals: [
              {
                id: 'sfx1',
                text: 'BEEP! BEEP!',
                x: 80,
                y: 25,
                rotation: -8,
                color: '#f43f5e',
                size: 'lg',
              },
            ],
            interactiveHotspots: [
              {
                id: 'h1',
                label: 'Inspect Synaptic Dopamine Levels',
                type: 'biomarker',
                info: 'Current Dopamine: 18% of baseline. Striatal receptors entering refractory depression. Prompt intervention required.',
                position: { x: 25, y: 35 },
              },
              {
                id: 'h2',
                label: 'ROS Oxidative Marker (SOD-3)',
                type: 'biomarker',
                info: 'Mitochondrial superoxides surging. Endogenous SOD-3 expression is down-regulated. High risk of neuro-necrosis.',
                position: { x: 75, y: 35 },
              },
            ],
            soundPreset: 'pulse-heartbeat',
          },
          {
            id: 'p2',
            sceneType: 'character-confrontation',
            shotType: 'split-panel',
            motionEffect: 'zoom-in',
            dialogues: [
              {
                id: 'd3',
                speaker: 'Dr. Kavi',
                type: 'speech',
                text: 'Look at the data! Levodopa-Carbidopa infusion will hit the synaptic receptors in 45 minutes flat.',
              },
              {
                id: 'd4',
                speaker: 'Vaidya Ananya',
                type: 'speech',
                text: 'And burn him from the inside out! My Swarna-Bhasma crucible nanoparticles with Jyotishmati extract will shield the cellular core.',
              },
            ],
            sfxDecals: [
              {
                id: 'sfx2',
                text: 'CLASH!',
                x: 50,
                y: 50,
                rotation: 4,
                color: '#fbbf24',
                size: 'xl',
              },
            ],
            interactiveHotspots: [
              {
                id: 'h3',
                label: 'Cross-Interaction Array',
                type: 'chemical-pathway',
                info: 'Simulation engine validates zero heavy-metal accumulation if Kosthi crucible heat exceeds 450°C and Maarana cycles reach 18 stages.',
                position: { x: 50, y: 25 },
              },
            ],
            soundPreset: 'tension-drone',
          },
        ],
        choices: [
          {
            id: 'c1',
            text: 'Track 1: Immediate Allopathic High-Dose Levodopa Infusion',
            outcomePreview: 'Rapid dopamine restoration within 45 mins, but severe ROS spike.',
            consequenceTag: 'Allopathy Aggressive',
            targetNodeId: 'node-allopathy-rush',
            ethicalAlignment: 'allopathy-targeted',
            metricsModifier: {
              dopamineDelta: 55,
              rosSuppressionDelta: -15,
              bioavailabilityDelta: 0,
              clearanceSafetyDelta: -20,
            },
          },
          {
            id: 'c2',
            text: 'Track 2: Ignite the Rasashastra Crucible (Swarna-Bhasma Nanoparticles)',
            outcomePreview: 'Pre-emptively shields cellular DNA and suppresses ROS by 78%; slower initial dopamine climb.',
            consequenceTag: 'Ayurvedic Nanotech',
            targetNodeId: 'node-ayurveda-crucible',
            ethicalAlignment: 'ayurveda-protective',
            metricsModifier: {
              dopamineDelta: 15,
              rosSuppressionDelta: 60,
              bioavailabilityDelta: 34,
              clearanceSafetyDelta: 5,
            },
          },
          {
            id: 'c3',
            text: 'Hybrid Track: Sushruta-Trillion Dual Convergence Protocol',
            outcomePreview: 'Micro-dose Levodopa delivered inside Bhavana lipid-carriers alongside Jyotishmati & Giloy extracts.',
            consequenceTag: 'Perfect Bio-Equilibrium',
            targetNodeId: 'node-hybrid-convergence',
            ethicalAlignment: 'hybrid-equilibrium',
            metricsModifier: {
              dopamineDelta: 45,
              rosSuppressionDelta: 50,
              bioavailabilityDelta: 34,
              clearanceSafetyDelta: 8,
            },
          },
        ],
      },

      // Branch A: Allopathy Aggressive
      'node-allopathy-rush': {
        id: 'node-allopathy-rush',
        title: 'Act II-A: The Receptor Surge',
        caption: 'The IV pumps hum at maximum rpm. Levodopa floods the patient’s synaptic channels.',
        panels: [
          {
            id: 'p3',
            sceneType: 'molecular-dock',
            shotType: 'dynamic-close',
            motionEffect: 'zoom-in',
            dialogues: [
              {
                id: 'd5',
                speaker: 'Dr. Kavi',
                type: 'speech',
                text: 'Receptors are locking in! Synaptic dopamine levels hit 73%. Motor tremors are dissipating!',
              },
              {
                id: 'd6',
                speaker: 'Vaidya Ananya',
                type: 'shout',
                text: 'Alarm! Mitochondrial ROS has breached 85%! Free radicals are tearing through his cell membranes!',
              },
            ],
            sfxDecals: [
              {
                id: 'sfx3',
                text: 'PULSE!',
                x: 50,
                y: 35,
                rotation: -6,
                color: '#38bdf8',
                size: 'xl',
              },
            ],
            interactiveHotspots: [
              {
                id: 'h4',
                label: 'Receptor Binding Affinity',
                type: 'chemical-pathway',
                info: 'Kd = 2.4 nM. Striatal D2 and D1 receptors saturated. Temporary motor control restored.',
                position: { x: 50, y: 50 },
              },
            ],
            soundPreset: 'laser-scan',
          },
        ],
        choices: [
          {
            id: 'c4',
            text: 'Emergency Rasashastra rescue: Administer Giloy nano-scavengers now!',
            outcomePreview: 'Rapidly cleanses free radicals before irreparable organ collapse.',
            consequenceTag: 'Cellular Lifesaver',
            targetNodeId: 'node-ending-equilibrium',
            ethicalAlignment: 'hybrid-equilibrium',
            metricsModifier: {
              dopamineDelta: 5,
              rosSuppressionDelta: 45,
              bioavailabilityDelta: 20,
              clearanceSafetyDelta: 15,
            },
          },
          {
            id: 'c5',
            text: 'Double down on synthetic beta-blockers and full sedation',
            outcomePreview: 'Stabilizes vitals temporarily, but triggers chronic cellular fatigue.',
            consequenceTag: 'Mechanical Overdrive',
            targetNodeId: 'node-ending-allopathic',
            ethicalAlignment: 'allopathy-targeted',
            metricsModifier: {
              dopamineDelta: 10,
              rosSuppressionDelta: -20,
              bioavailabilityDelta: -10,
              clearanceSafetyDelta: -30,
            },
          },
        ],
      },

      // Branch B: Rasashastra Nanoparticle Crucible
      'node-ayurveda-crucible': {
        id: 'node-ayurveda-crucible',
        title: 'Act II-B: The Sacred Kosthi Crucible',
        caption: 'Vaidya Ananya engages the high-heat calcination chamber. Herbo-mineral elements transmute into 18nm gold bhasma.',
        panels: [
          {
            id: 'p4',
            sceneType: 'rasashastra-crucible',
            shotType: 'wide-dramatic',
            motionEffect: 'tilt',
            dialogues: [
              {
                id: 'd7',
                speaker: 'Vaidya Ananya',
                type: 'speech',
                text: 'The Maarana process is complete! The gold lattice has yielded sub-cellular nanoparticles bound in lipid micelles.',
              },
              {
                id: 'd8',
                speaker: 'Dr. Kavi',
                type: 'speech',
                text: 'Incredible... ROS suppression jumped to 84%! But his synaptic dopamine is only trickling upward slowly.',
              },
            ],
            sfxDecals: [
              {
                id: 'sfx4',
                text: 'IGNITE!',
                x: 50,
                y: 35,
                rotation: 5,
                color: '#f59e0b',
                size: 'xl',
              },
            ],
            interactiveHotspots: [
              {
                id: 'h5',
                label: 'Kosthi Heat Calibration Matrix',
                type: 'chemical-pathway',
                info: 'Temperature sustained at 450°C. Heavy metals organically chelated and cleared by hepatic phase-II pathways.',
                position: { x: 50, y: 55 },
              },
            ],
            soundPreset: 'crucible-flame',
          },
        ],
        choices: [
          {
            id: 'c6',
            text: 'Introduce targeted micro-dose Levodopa through the Bhavana lipid matrix',
            outcomePreview: 'Combines the cytoprotective shield with swift receptor reactivation.',
            consequenceTag: 'Golden Synthesis',
            targetNodeId: 'node-ending-equilibrium',
            ethicalAlignment: 'hybrid-equilibrium',
            metricsModifier: {
              dopamineDelta: 50,
              rosSuppressionDelta: 15,
              bioavailabilityDelta: 34,
              clearanceSafetyDelta: 10,
            },
          },
          {
            id: 'c7',
            text: 'Rely solely on pure Rasashastra herbs for 72-hour natural recovery',
            outcomePreview: 'Zero chemical toxicity; patient takes days to walk again, but cellular health is flawless.',
            consequenceTag: 'Vedic Purest',
            targetNodeId: 'node-ending-vedic',
            ethicalAlignment: 'ayurveda-protective',
            metricsModifier: {
              dopamineDelta: 20,
              rosSuppressionDelta: 20,
              bioavailabilityDelta: 25,
              clearanceSafetyDelta: 15,
            },
          },
        ],
      },

      // Branch C: Hybrid Dual Convergence
      'node-hybrid-convergence': {
        id: 'node-hybrid-convergence',
        title: 'Act II-C: The Dual Alchemical Resonance',
        caption: 'Dr. Kavi and Vaidya Ananya synchronize their systems. Modern micro-infusion merges with ancient nano-bhasma.',
        panels: [
          {
            id: 'p5',
            sceneType: 'cellular-mitochondria',
            shotType: 'dynamic-close',
            motionEffect: 'zoom-in',
            dialogues: [
              {
                id: 'd9',
                speaker: 'Dr. Kavi',
                type: 'thought',
                text: 'The Bhavana lipid carriers are shielding the Levodopa! Bioavailability is up 34%—we only need a third of the standard dosage!',
              },
              {
                id: 'd10',
                speaker: 'Vaidya Ananya',
                type: 'speech',
                text: 'The Jyotishmati alkaloid is locking around the mitochondrial cristae. SOD-3 decay index is halted!',
              },
            ],
            sfxDecals: [
              {
                id: 'sfx5',
                text: 'HARMONY',
                x: 50,
                y: 25,
                rotation: 0,
                color: '#34d399',
                size: 'xl',
              },
            ],
            interactiveHotspots: [
              {
                id: 'h6',
                label: 'Mitochondrial Dual-Helix Repair',
                type: 'biomarker',
                info: 'Allopathic precision hits synaptic receptors within 45 min; Ayurvedic complexes provide sustained neuroprotection.',
                position: { x: 50, y: 50 },
              },
            ],
            soundPreset: 'laser-scan',
          },
        ],
        choices: [
          {
            id: 'c8',
            text: 'Complete the Sushruta-Trillion Stabilization Protocol',
            outcomePreview: 'Finalize the simulation and achieve true hybrid clinical equilibrium.',
            consequenceTag: 'Master Healer',
            targetNodeId: 'node-ending-equilibrium',
            ethicalAlignment: 'hybrid-equilibrium',
            metricsModifier: {
              dopamineDelta: 25,
              rosSuppressionDelta: 15,
              bioavailabilityDelta: 10,
              clearanceSafetyDelta: 5,
            },
          },
        ],
      },

      // Ending 1: Hybrid Master Equilibrium
      'node-ending-equilibrium': {
        id: 'node-ending-equilibrium',
        title: 'Epilogue: The Sushruta Equilibrium',
        caption: 'Commander Vikram sits up in the pod, his fingers steady, cognitive clarity pristine.',
        isEnding: true,
        endingType: 'equilibrium',
        endingSummary:
          'System Stability Index: 0.89. Immediate dopamine restored in 45 min without mitochondrial decay. ROS suppression achieved 78%, and bioavailability gained +34%. Modern allopathy and ancient Rasashastra have forged a medical revolution.',
        panels: [
          {
            id: 'p6',
            sceneType: 'cellular-mitochondria',
            shotType: 'wide-dramatic',
            motionEffect: 'tilt',
            dialogues: [
              {
                id: 'd11',
                speaker: 'Commander Vikram',
                type: 'speech',
                text: 'I can move my hands... the tremors are gone, and my thoughts feel sharper than they have in years.',
              },
              {
                id: 'd12',
                speaker: 'Dr. Kavi & Ananya',
                type: 'speech',
                text: 'Targeted allopathy broke the crisis. Rasashastra gave you tomorrow.',
              },
            ],
            sfxDecals: [
              {
                id: 'sfx6',
                text: 'TRIUMPH!',
                x: 50,
                y: 35,
                rotation: -3,
                color: '#facc15',
                size: 'xl',
              },
            ],
            interactiveHotspots: [
              {
                id: 'h7',
                label: 'Final Clinical Scorecard',
                type: 'biomarker',
                info: 'Full recovery index: 94%. Heavy metal clearance: Complete. Zero adverse drug interactions detected.',
                position: { x: 50, y: 40 },
              },
            ],
            soundPreset: 'impact',
          },
        ],
        choices: [],
      },

      // Ending 2: Allopathic Overdrive
      'node-ending-allopathic': {
        id: 'node-ending-allopathic',
        title: 'Epilogue: The Price of Speed',
        caption: 'Commander Vikram’s motor blockade lifted, but his cellular bio-markers reveal oxidative scarring.',
        isEnding: true,
        endingType: 'breakthrough',
        endingSummary:
          'Dopamine Restored: 90%. However, reactive oxygen species caused 42% mitochondrial strain. The immediate clinical emergency was resolved, but ongoing renal monitoring will be required.',
        panels: [
          {
            id: 'p7',
            sceneType: 'bio-scan',
            shotType: 'dynamic-close',
            motionEffect: 'shake',
            dialogues: [
              {
                id: 'd13',
                speaker: 'Dr. Kavi',
                type: 'thought',
                text: 'He survived... but without Ananya’s cytoprotective bhasma, his cells took a heavy blow.',
              },
            ],
            sfxDecals: [],
            interactiveHotspots: [],
            soundPreset: 'tension-drone',
          },
        ],
        choices: [],
      },

      // Ending 3: Vedic Purest
      'node-ending-vedic': {
        id: 'node-ending-vedic',
        title: 'Epilogue: The Gentle Rebirth',
        caption: 'Days later, Vikram regains strength at a natural pace, his cellular pathways fortified without a single synthetic toxin.',
        isEnding: true,
        endingType: 'victory',
        endingSummary:
          'Zero chemical toxicity achieved. ROS suppression capped at 88%. While immediate triage took longer, long-term cellular lifespan has been dramatically extended.',
        panels: [
          {
            id: 'p8',
            sceneType: 'rasashastra-crucible',
            shotType: 'wide-dramatic',
            motionEffect: 'pan-left',
            dialogues: [
              {
                id: 'd14',
                speaker: 'Vaidya Ananya',
                type: 'narration',
                text: 'True healing does not hurry the body. It rebuilds the temple from the atoms upward.',
              },
            ],
            sfxDecals: [],
            interactiveHotspots: [],
            soundPreset: 'crucible-flame',
          },
        ],
        choices: [],
      },
    },
  },
];
