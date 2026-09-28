import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI client with User-Agent header as required
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API endpoint to generate or extend a branching graphic-novel story
app.post('/api/story/ai-branch', async (req: Request, res: Response) => {
  try {
    const { prompt, currentContext, tone, genre, existingCharacters } = req.body;

    if (!apiKey) {
      // Graceful fallback with rich procedural content if no API key is injected
      return res.status(200).json({
        success: true,
        generatedViaFallback: true,
        node: {
          title: `Branch: Protocol Shift`,
          caption: "A sudden flux in bio-rhythmic equilibrium demands an unforeseen clinical gamble.",
          panels: [
            {
              sceneType: "bio-scan",
              shotType: "dynamic-close",
              dialogue: [
                {
                  speaker: "Dr. Kavi",
                  type: "speech",
                  text: "The synaptic gap is closing, but hepatic clearance is dropping fast! We need a catalyst.",
                },
              ],
              sfx: "WARNING",
              visualDescription: "Holographic bio-monitors flash amber, showing complex nano-particle chelation pathways.",
              interactiveHotspots: [
                {
                  label: "Inspect Hepatic Filter",
                  info: "Serum transaminase stable. Nanoscale Shodhana compounds actively scavenging reactive oxygen species.",
                  position: { x: 50, y: 40 },
                },
              ],
            },
            {
              sceneType: "crucible-fire",
              shotType: "wide-dramatic",
              dialogue: [
                {
                  speaker: "Vaidya Ananya",
                  type: "speech",
                  text: "Engage the Kosthi thermal resonance! The Shodhana Maarana nanoparticles will stabilize cellular sod-3 decay!",
                },
              ],
              sfx: "IGNITE",
              visualDescription: "Ancient ceramic crucible heated by precision plasma flames, transmuting herbo-mineral compounds.",
              interactiveHotspots: [
                {
                  label: "Thermal Matrix",
                  info: "Temperature: 450°C. Multi-stage calcination yields 18nm bio-chelated nanoparticles.",
                  position: { x: 45, y: 55 },
                },
              ],
            },
          ],
          choices: [
            {
              text: "Synthesize immediate Levodopa infusion with lipid-carrier bhavana",
              outcomePreview: "Rapid motor restoration; risks transient oxidative spike",
              consequenceTag: "Targeted Allopathic Speed",
            },
            {
              text: "Deploy Jyotishmati & Giloy nano-complex first for cellular shielding",
              outcomePreview: "Long-term cellular longevity; gradual symptom stabilization",
              consequenceTag: "Ayurvedic Cytoprotection",
            },
          ],
        },
      });
    }

    const systemPrompt = `You are the narrative and visual director for 'Sushruta-Trillion: Hybrid Allopathy & Ayur-Chemo-Informatics Simulation Engine', an innovative branching animated graphic novel.
You specialize in gripping sci-fi medical thriller and cyber-vedic graphic novel scripts where emergency modern allopathy (targeted receptor blocking, pharmacokinetic half-lives, fast symptom rescue) collides and harmonizes with traditional Rasashastra / Ayurveda (bhasma nanoparticles, Kosthi thermal matrices, ROS suppression, cellular longevity).

Return structured JSON conforming to the requested schema. Provide dramatic visual descriptions suitable for comic book panels, dynamic dialogue, visceral comic sound effects (SFX like 'KLANG!', 'PULSE...', 'WHIRRR'), interactive inspectable hotspots, and 2-3 branching player choices that lead to different ethical, tactical, and clinical outcomes.`;

    const userPrompt = `Create an interactive graphic-novel branching chapter node based on:
Prompt: ${prompt || 'Continue the hybrid medical crisis'}
Context: ${currentContext || 'Patient suffering rapid neuro-motor block and mitochondrial decay'}
Tone: ${tone || 'Gripping, Cinematic, Bio-Informatics High-Stakes'}
Genre: ${genre || 'Cyber-Ayurvedic Sci-Fi Graphic Novel'}
Characters: ${existingCharacters ? JSON.stringify(existingCharacters) : 'Dr. Kavi (Allopathic Neuro-Specialist), Vaidya Ananya (Master of Rasashastra)'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            caption: { type: Type.STRING },
            panels: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sceneType: { type: Type.STRING, description: "e.g. bio-scan, crucible-fire, surgery-bay, molecular-docking, character-confrontation" },
                  shotType: { type: Type.STRING, description: "e.g. dynamic-close, wide-dramatic, bird-eye-grid, split-panel, over-shoulder" },
                  visualDescription: { type: Type.STRING },
                  dialogue: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        speaker: { type: Type.STRING },
                        type: { type: Type.STRING, description: "speech, thought, or narration" },
                        text: { type: Type.STRING },
                      },
                      required: ["speaker", "type", "text"],
                    },
                  },
                  sfx: { type: Type.STRING },
                  interactiveHotspots: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        label: { type: Type.STRING },
                        info: { type: Type.STRING },
                        position: {
                          type: Type.OBJECT,
                          properties: {
                            x: { type: Type.NUMBER },
                            y: { type: Type.NUMBER },
                          },
                          required: ["x", "y"],
                        },
                      },
                      required: ["label", "info", "position"],
                    },
                  },
                },
                required: ["sceneType", "shotType", "visualDescription", "dialogue", "sfx"],
              },
            },
            choices: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  outcomePreview: { type: Type.STRING },
                  consequenceTag: { type: Type.STRING },
                },
                required: ["text", "outcomePreview", "consequenceTag"],
              },
            },
          },
          required: ["title", "caption", "panels", "choices"],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.status(200).json({ success: true, node: parsed });
  } catch (error: any) {
    console.error('Error generating AI branch:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to generate branch storyline',
    });
  }
});

// API endpoint to calculate or simulate SushrutaTrillionHybridPillSimulation
app.post('/api/simulation/calculate-pill', (req: Request, res: Response) => {
  try {
    const { formulation_metadata, custom_modifiers } = req.body;

    const components = formulation_metadata?.active_components || [];
    const hasFermentation = components.some(
      (c: any) => c.classification === 'Ayurvedic_Fermentation_Carrier'
    );
    const hasRasashastra = components.some(
      (c: any) => c.classification === 'Rasashastra_Adaptogen'
    );
    const hasAllopathic = components.some(
      (c: any) => c.classification === 'Allopathic_Hypnotic'
    );

    // Compute Stomach Gastric Phase
    const gastric_disintegration_velocity_sec = hasFermentation ? 38 + Math.round(Math.random() * 8) : 18;
    const ghrelin_stimulation_index = hasFermentation ? 0.16 : 0.68;
    const mucosal_shielding_coefficient = hasRasashastra ? (hasFermentation ? 0.94 : 0.82) : 0.32;

    // Compute Neuro-Endocrine Response
    const gaba_receptor_binding_rate = hasAllopathic ? 0.92 : 0.45;
    const endogenous_melatonin_boost_percentage = hasRasashastra ? (hasFermentation ? 74.0 : 52.0) : 15.0;
    const serotonin_retention_index = hasRasashastra ? 0.85 : 0.42;
    const cortisol_suppression_velocity = hasRasashastra ? 0.79 : 0.38;

    // Compute Hepato-Biliary Protection Matrix
    const cytochrome_p450_stress_score = hasFermentation && hasRasashastra ? 32.4 : (hasRasashastra ? 42.0 : 88.5);
    const hepatocyte_antioxidant_defense_index = hasRasashastra ? 1.88 : 0.28;
    const gall_bladder_bile_release_rate_ml_hr = hasFermentation ? 14.2 : 12.0;
    const cholecystokinin_stability_coefficient = hasRasashastra ? 0.91 : 0.38;

    // Compute Pancreatic Glucose Control
    const basal_insulin_secretion_rate_uU_mL = hasFermentation && hasRasashastra ? 8.5 : (hasRasashastra ? 6.2 : 3.2);
    const beta_cell_oxidative_protection_index = hasRasashastra ? 1.62 : 0.45;
    const nocturnal_glucose_stability_score = hasRasashastra ? 94.5 : 41.0;
    const glucagon_regulatory_balance_ratio = hasRasashastra ? 1.12 : 0.58;

    // Cross-Interaction Validator
    const herb_drug_interference_detected = !hasFermentation && hasAllopathic && !hasRasashastra;
    const bioavailability_amplification_multiplier = hasFermentation ? 1.34 : 0.85;
    const predicted_liver_clearance_half_life_hrs = hasFermentation && hasRasashastra ? 6.2 : 9.4;
    const safety_clearance_status =
      cytochrome_p450_stress_score < 35 && nocturnal_glucose_stability_score > 80
        ? 'APPROVED'
        : cytochrome_p450_stress_score < 75
        ? 'WARNING_HIGH_ACCUMULATION'
        : 'CRITICAL_TOXICITY';

    const result = {
      $schema: 'https://json-schema.org',
      formulation_metadata: {
        codename: formulation_metadata?.codename || 'NH-Synchro-01',
        delivery_system: formulation_metadata?.delivery_system || 'Dual-Chamber Multi-Layered Micro-Pill',
        active_components: components,
      },
      simulation_pathways: {
        stomach_gastric_phase: {
          gastric_disintegration_velocity_sec,
          ghrelin_stimulation_index,
          mucosal_shielding_coefficient,
        },
        neuro_endocrine_response: {
          gaba_receptor_binding_rate,
          endogenous_melatonin_boost_percentage,
          serotonin_retention_index,
          cortisol_suppression_velocity,
        },
        hepato_biliary_protection_matrix: {
          cytochrome_p450_stress_score,
          hepatocyte_antioxidant_defense_index,
          gall_bladder_bile_release_rate_ml_hr,
          cholecystokinin_stability_coefficient,
        },
        pancreatic_glucose_control: {
          basal_insulin_secretion_rate_uU_mL,
          beta_cell_oxidative_protection_index,
          nocturnal_glucose_stability_score,
          glucagon_regulatory_balance_ratio,
        },
      },
      cross_interaction_validator: {
        herb_drug_interference_detected,
        bioavailability_amplification_multiplier,
        predicted_liver_clearance_half_life_hrs,
        safety_clearance_status,
      },
    };

    return res.status(200).json({ success: true, simulation: result });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error?.message });
  }
});

// Academic Chemo-Informatics API: Evaluate single dosage combination
app.post('/api/simulation/sushruta-trillion/simulate', (req: Request, res: Response) => {
  try {
    const {
      allopathic_hypnotic_mg = 10,
      asava_carrier_ml = 2.0,
      ashwagandha_mg = 250,
      snayu_stimulants_mg = 25,
      bp_modulators_mg = 50,
    } = req.body;

    // 1. Non-linear saturation curve: A_bio
    const a_bio = Number((1.0 + (0.50 * asava_carrier_ml) / (asava_carrier_ml + 1.5)).toFixed(3));
    // 2. Hepatic CYP450 Stress: S_cyp
    const toxicLoad = 4.5 * allopathic_hypnotic_mg * a_bio;
    const herbalShield = 12.0 * Math.log(1.0 + ashwagandha_mg);
    const s_cyp = Number(Math.max(0, Math.min(100, toxicLoad - herbalShield)).toFixed(2));
    // 3. Snayu Reflex Tone: T_snayu
    const t_snayu = Number((1.0 - Math.exp(-(0.03 * snayu_stimulants_mg * a_bio))).toFixed(3));
    // 4. BP Stability: BP_stability
    const bp_stability = Number(Math.max(0, Math.min(100, 100 - Math.abs(120 - (bp_modulators_mg * 2.4)))).toFixed(1));

    let safety = 'APPROVED';
    if (s_cyp > 85.0 || t_snayu > 0.95 || bp_stability < 35.0) {
      safety = 'CRITICAL_TOXICITY';
    } else if (s_cyp > 60.0 || t_snayu > 0.88 || bp_stability < 65.0) {
      safety = 'WARNING_HIGH_ACCUMULATION';
    }

    return res.status(200).json({
      success: true,
      dosages: {
        allopathic_hypnotic_mg,
        asava_carrier_ml,
        ashwagandha_mg,
        snayu_stimulants_mg,
        bp_modulators_mg,
      },
      bioavailability_multiplier_Abio: a_bio,
      cytochrome_p450_stress_Scyp: s_cyp,
      snayu_reflex_tone_Tsnayu: t_snayu,
      bp_stability_index: bp_stability,
      safety_clearance_status: safety,
      herb_drug_interference: s_cyp > 70.0,
      predicted_liver_clearance_half_life_hrs: Number((3.5 + (s_cyp / 100) * 7.5).toFixed(1)),
      gastric_disintegration_velocity_sec: Number((220 / a_bio).toFixed(1)),
      mucosal_shielding_coefficient: Number((1.0 + (ashwagandha_mg * 0.0022)).toFixed(2)),
      nocturnal_glucose_stability_score: Number(Math.min(99.5, 88.0 + (ashwagandha_mg * 0.025)).toFixed(1)),
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error?.message });
  }
});

// Automated Batch-Tester Function: Loops through 100 randomized clinical dosage combinations
app.all('/api/simulation/sushruta-trillion/batch-test-100', (_req: Request, res: Response) => {
  try {
    const trials = [];
    let appCnt = 0, warnCnt = 0, critCnt = 0;
    let sumBio = 0, sumCyp = 0, sumTone = 0, sumBp = 0;

    let seed = 42;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 1; i <= 100; i++) {
      const hyp = Math.round(2 + rnd() * 36);
      const asava = Number((0.2 + rnd() * 4.6).toFixed(1));
      const ashwa = Math.round(20 + rnd() * 360);
      const snayu = Math.round(5 + rnd() * 85);
      const bp = Math.round(10 + rnd() * 80);

      const a_bio = Number((1.0 + (0.50 * asava) / (asava + 1.5)).toFixed(3));
      const s_cyp = Number(Math.max(0, Math.min(100, (4.5 * hyp * a_bio) - (12.0 * Math.log(1.0 + ashwa)))).toFixed(2));
      const t_snayu = Number((1.0 - Math.exp(-(0.03 * snayu * a_bio))).toFixed(3));
      const bp_stab = Number(Math.max(0, Math.min(100, 100 - Math.abs(120 - (bp * 2.4)))).toFixed(1));

      let safety = 'APPROVED';
      if (s_cyp > 85.0 || t_snayu > 0.95 || bp_stab < 35.0) {
        safety = 'CRITICAL_TOXICITY';
        critCnt++;
      } else if (s_cyp > 60.0 || t_snayu > 0.88 || bp_stab < 65.0) {
        safety = 'WARNING_HIGH_ACCUMULATION';
        warnCnt++;
      } else {
        appCnt++;
      }

      sumBio += a_bio;
      sumCyp += s_cyp;
      sumTone += t_snayu;
      sumBp += bp_stab;

      trials.push({
        trial_id: i,
        allopathic_hypnotic_mg: hyp,
        asava_carrier_ml: asava,
        ashwagandha_mg: ashwa,
        snayu_stimulants_mg: snayu,
        bp_modulators_mg: bp,
        Abio: a_bio,
        Scyp: s_cyp,
        Tsnayu: t_snayu,
        bp_stability: bp_stab,
        safety_status: safety,
      });
    }

    return res.status(200).json({
      success: true,
      total_trials: 100,
      approved_count: appCnt,
      warning_count: warnCnt,
      critical_count: critCnt,
      approved_percentage: appCnt,
      mean_bioavailability: Number((sumBio / 100).toFixed(3)),
      mean_cyp450_stress: Number((sumCyp / 100).toFixed(1)),
      mean_snayu_tone: Number((sumTone / 100).toFixed(3)),
      mean_bp_stability: Number((sumBp / 100).toFixed(1)),
      trials,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error?.message });
  }
});

// API endpoint to generate graphic-novel comic chapter from a SushrutaTrillionHybridPillSimulation
app.post('/api/simulation/generate-story-from-pill', async (req: Request, res: Response) => {
  try {
    const { simulation } = req.body;
    const codename = simulation?.formulation_metadata?.codename || 'NH-Synchro-01';
    const safety = simulation?.cross_interaction_validator?.safety_clearance_status || 'APPROVED';
    const halfLife = simulation?.cross_interaction_validator?.predicted_liver_clearance_half_life_hrs || 6.2;
    const gaba = simulation?.simulation_pathways?.neuro_endocrine_response?.gaba_receptor_binding_rate || 0.94;
    const cypStress = simulation?.simulation_pathways?.hepato_biliary_protection_matrix?.cytochrome_p450_stress_score || 32.4;
    const basalInsulin = simulation?.simulation_pathways?.pancreatic_glucose_control?.basal_insulin_secretion_rate_uU_mL || 8.5;
    const glucoseScore = simulation?.simulation_pathways?.pancreatic_glucose_control?.nocturnal_glucose_stability_score || 94.5;
    const betaCell = simulation?.simulation_pathways?.pancreatic_glucose_control?.beta_cell_oxidative_protection_index || 1.62;

    if (!apiKey) {
      // Procedural rich fallback matching the graphic novel engine specification
      return res.status(200).json({
        success: true,
        node: {
          title: `Simulation Trial: ${codename}`,
          caption: `Patient ingested ${codename}. Brain, Hepato-Gastric, and Pancreas vectors synchronized. Nocturnal Glucose Stability: ${glucoseScore}%. Safety Status: ${safety}.`,
          panels: [
            {
              sceneType: "molecular-dock",
              shotType: "dynamic-close",
              motionEffect: "zoom-in",
              dialogue: [
                {
                  speaker: "Dr. Kavi",
                  type: "speech",
                  text: `[BRAIN VECTOR] GABA-A binding velocity clocked at ${(gaba * 100).toFixed(0)}%! Sleep induction is instantaneous without receptor refractory crash.`,
                },
                {
                  speaker: "Vaidya Ananya",
                  type: "speech",
                  text: `Cortisol suppression is accelerating at -68%! The Withanolides from Ashwagandha are stabilizing endogenous melatonin.`,
                },
              ],
              sfx: "DOCK-IN!",
              visualDescription: "Macro visual of GABA-A receptors receiving the allopathic molecule shielded by golden Ayurvedic nano-clusters.",
              interactiveHotspots: [
                {
                  label: "GABA-A Binding Velocity",
                  info: `GABA Binding Rate: ${gaba}. Cortisol suppression index: -68%. Natural Melatonin: +${simulation?.simulation_pathways?.neuro_endocrine_response?.endogenous_melatonin_boost_percentage || 34.2}%.`,
                  position: { x: 50, y: 40 },
                },
              ],
            },
            {
              sceneType: "nanoparticle-flow",
              shotType: "wide-dramatic",
              motionEffect: "tilt",
              dialogue: [
                {
                  speaker: "Dr. Kavi",
                  type: "speech",
                  text: `[LIVER & STOMACH VECTOR] Cytochrome P450 stress index is only ${cypStress}/100! Liver clearance half-life is steady at ${halfLife} hours.`,
                },
                {
                  speaker: "Vaidya Ananya",
                  type: "thought",
                  text: `Gastric mucosal shielding coefficient is 1.45. The Asava bio-ethanol matrix is preventing synthetic chemical erosion.`,
                },
              ],
              sfx: "SHIELDED",
              visualDescription: "Stomach lining and hepatic enzymes protected as Asava carrier and Ashwagandha neutralize oxidative reactive species.",
              interactiveHotspots: [
                {
                  label: "Hepato-Gastric Shield",
                  info: `CYP450 Stress Score: ${cypStress}. Mucosal Shielding: 1.45. Biliary Clearing Flux: ${simulation?.simulation_pathways?.hepato_biliary_protection_matrix?.gall_bladder_bile_release_rate_ml_hr || 14.2} mL/hr.`,
                  position: { x: 45, y: 45 },
                },
              ],
            },
            {
              sceneType: "pancreatic-islet",
              shotType: "dynamic-close",
              motionEffect: "zoom-in",
              dialogue: [
                {
                  speaker: "Dr. Kavi",
                  type: "speech",
                  text: `[PANCREAS VECTOR] Nocturnal glucose stability score is ${glucoseScore}%! The nocturnal blood sugar crash is completely prevented.`,
                },
                {
                  speaker: "Vaidya Ananya",
                  type: "speech",
                  text: `Basal insulin secretion is sustained at ${basalInsulin} uU/mL. Beta-cell oxidative protection index is ${betaCell}!`,
                },
              ],
              sfx: "STABILIZE",
              visualDescription: "Pancreatic Islets of Langerhans illuminated with golden Ashwagandha aura, beta-cells releasing controlled pulsatile basal insulin.",
              interactiveHotspots: [
                {
                  label: "Pancreatic Beta-Cell Cluster",
                  info: `Basal Insulin: ${basalInsulin} uU/mL. Beta-Cell Protection: ${betaCell}. Nocturnal Glucose Stability: ${glucoseScore}%.`,
                  position: { x: 50, y: 50 },
                },
              ],
            },
          ],
          choices: [
            {
              text: `Maintain ${codename} nightly synchronization to safeguard both neuro-restoration and insulin sensitivity`,
              outcomePreview: "Zero morning grogginess; flawless pancreatic beta-cell preservation.",
              consequenceTag: "Pancreatic-Neuro Balance",
            },
            {
              text: `Wean synthetic hypnotic to half-dose while escalating fermented Asava and Ashwagandha`,
              outcomePreview: "Empowers endogenous sleep architecture without pharmaceutical dependency.",
              consequenceTag: "Endogenous Autonomy",
            },
          ],
        },
      });
    }

    const systemPrompt = `You are the narrative and visual director for 'Sushruta-Trillion: Hybrid Allopathy & Ayur-Chemo-Informatics Simulation Engine'.
Given a structured SushrutaTrillionHybridPillSimulation packet (such as NH-Synchro-01), create an intense, gripping comic chapter.
You must structurally segregate the biological narrative into the three core vectors:
- [BRAIN VECTOR: NEURO-SEDATION]: GABA-A, Melatonin, Cortisol, and Sleep Latency.
- [LIVER & STOMACH VECTOR: HEPATO-PROTECTION]: Cytochrome P450 stress, Mucosal defense, and Bile release.
- [PANCREAS VECTOR: GLUCOSE MANAGEMENT]: Basal insulin stability, Beta-cell protection, and Nocturnal glucose curves.

Respond in strict JSON with title, caption, panels (sceneType, shotType, dialogue, sfx, visualDescription, interactiveHotspots), and choices.
Allowed sceneTypes: molecular-dock, nanoparticle-flow, pancreatic-islet, bio-scan, cellular-mitochondria, rasashastra-crucible.`;

    const prompt = `Generate a graphic-novel node for this simulated pill:
${JSON.stringify(simulation, null, 2)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.status(200).json({ success: true, node: parsed });
  } catch (error: any) {
    console.error('Error generating story from pill:', error);
    return res.status(500).json({ success: false, error: error?.message });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Graphic Novel Engine running on http://localhost:${PORT}`);
  });
}

startServer();
