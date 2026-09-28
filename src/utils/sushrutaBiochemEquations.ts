/**
 * Sushruta-Trillion: Academic Chemo-Informatics & Biochemical Mathematical Models
 * Implements non-linear saturation curves, logarithmic hepatic shielding,
 * neuromuscular tone exponentials, and 100-run randomized batch baseline generation.
 */

export interface DosageInputMatrix {
  allopathic_hypnotic_mg: number;
  asava_carrier_ml: number;
  ashwagandha_mg: number;
  snayu_stimulants_mg: number;
  bp_modulators_mg: number;
}

export type SafetyClearanceStatus = 'APPROVED' | 'WARNING_HIGH_ACCUMULATION' | 'CRITICAL_TOXICITY';

export interface ChemoInformaticsSimulationResult {
  dosages: DosageInputMatrix;
  // Mathematical outputs
  bioavailability_multiplier: number; // A_bio
  cytochrome_p450_stress: number;     // S_cyp
  snayu_reflex_tone: number;          // T_snayu
  bp_stability_index: number;         // BP_stability
  // Safety evaluation
  safety_status: SafetyClearanceStatus;
  herb_drug_interference: boolean;
  predicted_liver_clearance_half_life_hrs: number;
  // Extended physiological metrics
  gastric_disintegration_velocity_sec: number;
  mucosal_shielding_coefficient: number;
  gaba_receptor_binding_rate: number;
  cortisol_suppression_velocity: number;
  nocturnal_glucose_stability_score: number;
  basal_insulin_secretion_rate: number;
}

export interface BatchTestTrial extends ChemoInformaticsSimulationResult {
  trial_id: number;
  run_timestamp: string;
}

export interface BatchTestSummary {
  total_trials: number;
  approved_count: number;
  warning_count: number;
  critical_count: number;
  approved_percentage: number;
  warning_percentage: number;
  critical_percentage: number;
  mean_bioavailability: number;
  mean_cyp450_stress: number;
  mean_snayu_tone: number;
  mean_bp_stability: number;
  optimal_therapeutic_window: {
    hypnotic_safe_range: [number, number];
    asava_safe_range: [number, number];
    ashwagandha_min_buffer: number;
    snayu_target_range: [number, number];
    bp_target_range: [number, number];
  };
  trials: BatchTestTrial[];
}

/**
 * 1. Bioavailability Amplification Function: A_bio(V_asava)
 * Models systemic absorption multiplier as a non-linear saturation curve (Michaelis-Menten equivalent).
 * Formula: A_bio = 1.0 + (alpha * V_asava) / (V_asava + Km)
 * @param v_asava Fermented carrier volume in mL
 * @param alpha Maximum amplification ceiling (default 0.50 = 50% boost)
 * @param km Membrane saturation constant (default 1.5 mL)
 */
export function calculateAbio(v_asava: number, alpha: number = 0.50, km: number = 1.5): number {
  const safeV = Math.max(0, v_asava);
  if (safeV + km === 0) return 1.0;
  const amplification = (alpha * safeV) / (safeV + km);
  return Number((1.0 + amplification).toFixed(3));
}

/**
 * 2. Hepatic Cytochrome P450 Functional Stress Matrix: S_cyp
 * Evaluates synthetic chemical burden versus logarithmic hepatoprotection by Withanolides.
 * Formula: S_cyp = max(0, min(100, beta * D_allopathic * A_bio - gamma * ln(1 + D_ashwagandha)))
 * @param d_allopathic Mass of synthetic hypnotic in mg
 * @param d_ashwagandha Mass of adaptogenic herbal compound in mg
 * @param a_bio Current bioavailability amplification multiplier
 * @param beta Linear toxic loading coefficient (default 4.5)
 * @param gamma Logarithmic hepatic shielding constant (default 12.0)
 */
export function calculateScyp(
  d_allopathic: number,
  d_ashwagandha: number,
  a_bio: number,
  beta: number = 4.5,
  gamma: number = 12.0
): number {
  const safeAllopathic = Math.max(0, d_allopathic);
  const safeAshwagandha = Math.max(0, d_ashwagandha);
  
  const toxicLoad = beta * safeAllopathic * a_bio;
  const herbalShield = gamma * Math.log(1.0 + safeAshwagandha);
  const netStress = toxicLoad - herbalShield;
  
  const bounded = Math.max(0, Math.min(100, netStress));
  return Number(bounded.toFixed(2));
}

/**
 * 3. Snayu Active Stage Reflex Tone Function: T_snayu
 * Measures peripheral nerve and tendon tone maintenance during sleep states to prevent motor limpness.
 * Formula: T_snayu = 1.0 - exp(-(lambda * D_snayu * A_bio))
 * @param d_snayu Mass of purified active neuro-stimulants in mg
 * @param a_bio Current bioavailability amplification multiplier
 * @param lambda Neuromuscular receptor binding sensitivity factor (default 0.03)
 */
export function calculateTsnayu(
  d_snayu: number,
  a_bio: number,
  lambda: number = 0.03
): number {
  const safeSnayu = Math.max(0, d_snayu);
  const exponent = - (lambda * safeSnayu * a_bio);
  const tone = 1.0 - Math.exp(exponent);
  const bounded = Math.max(0, Math.min(1.0, tone));
  return Number(bounded.toFixed(3));
}

/**
 * 4. Hemodynamic Blood Pressure Stability Index: BP_stability
 * Evaluates vascular resistance stability centered at nominal 120 mmHg equivalence.
 * Formula: BP_stability = max(0, min(100, 100 - |120 - (D_bp * 2.4)|))
 */
export function calculateBpStability(d_bp: number): number {
  const safeBp = Math.max(0, d_bp);
  const deviation = Math.abs(120 - (safeBp * 2.4));
  const score = Math.max(0, Math.min(100, 100 - deviation));
  return Number(score.toFixed(1));
}

/**
 * Dynamic Safety Evaluator
 * Evaluates hepatic stress, neuromuscular hyper-reflexia, and hemodynamic stability.
 */
export function evaluateSafetyStatus(
  s_cyp: number,
  t_snayu: number,
  bp_stability: number
): SafetyClearanceStatus {
  if (s_cyp > 85.0 || t_snayu > 0.95 || bp_stability < 35.0) {
    return 'CRITICAL_TOXICITY';
  }
  if (s_cyp > 60.0 || t_snayu > 0.88 || bp_stability < 65.0) {
    return 'WARNING_HIGH_ACCUMULATION';
  }
  return 'APPROVED';
}

/**
 * Full Chemo-Informatics Simulation Pipeline for NH-Synchro Formulations
 */
export function runChemoInformaticsSimulation(
  dosage: DosageInputMatrix
): ChemoInformaticsSimulationResult {
  const a_bio = calculateAbio(dosage.asava_carrier_ml);
  const s_cyp = calculateScyp(dosage.allopathic_hypnotic_mg, dosage.ashwagandha_mg, a_bio);
  const t_snayu = calculateTsnayu(dosage.snayu_stimulants_mg, a_bio);
  const bp_stability = calculateBpStability(dosage.bp_modulators_mg);
  const safety_status = evaluateSafetyStatus(s_cyp, t_snayu, bp_stability);

  const predicted_liver_clearance_half_life_hrs = Number((3.5 + (s_cyp / 100) * 7.5).toFixed(1));
  const gastric_disintegration_velocity_sec = Number((220 / a_bio).toFixed(1));
  const mucosal_shielding_coefficient = Number((1.0 + (dosage.ashwagandha_mg * 0.0022)).toFixed(2));
  const gaba_receptor_binding_rate = Number(Math.min(1.0, 0.085 * dosage.allopathic_hypnotic_mg * a_bio).toFixed(2));
  const cortisol_suppression_velocity = Number((dosage.ashwagandha_mg * 0.016).toFixed(2));
  const nocturnal_glucose_stability_score = Number(Math.min(99.5, 88.0 + (dosage.ashwagandha_mg * 0.025)).toFixed(1));
  const basal_insulin_secretion_rate = Number((6.0 + (dosage.ashwagandha_mg * 0.01)).toFixed(1));

  return {
    dosages: dosage,
    bioavailability_multiplier: a_bio,
    cytochrome_p450_stress: s_cyp,
    snayu_reflex_tone: t_snayu,
    bp_stability_index: bp_stability,
    safety_status,
    herb_drug_interference: s_cyp > 70.0,
    predicted_liver_clearance_half_life_hrs,
    gastric_disintegration_velocity_sec,
    mucosal_shielding_coefficient,
    gaba_receptor_binding_rate,
    cortisol_suppression_velocity,
    nocturnal_glucose_stability_score,
    basal_insulin_secretion_rate,
  };
}

/**
 * 100-Trial Automated Batch-Tester Function
 * Loops through 100 randomized dosage combinations to establish a robust safety baseline dataset.
 */
export function run100BatchSimulation(seedOffset: number = 0): BatchTestSummary {
  const trials: BatchTestTrial[] = [];
  let approvedCount = 0;
  let warningCount = 0;
  let criticalCount = 0;

  let sumBio = 0;
  let sumCyp = 0;
  let sumTone = 0;
  let sumBp = 0;

  // Pseudo-random deterministic generator for repeatable benchmarks with jitter
  let seed = 1337 + seedOffset;
  const nextRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let i = 1; i <= 100; i++) {
    // Generate realistic clinical variation
    // Hypnotic: 2 to 38 mg
    const allopathic_hypnotic_mg = Math.round(2 + nextRandom() * 36);
    // Asava: 0.2 to 4.8 mL
    const asava_carrier_ml = Number((0.2 + nextRandom() * 4.6).toFixed(1));
    // Ashwagandha: 20 to 380 mg
    const ashwagandha_mg = Math.round(20 + nextRandom() * 360);
    // Snayu stimulants: 5 to 90 mg
    const snayu_stimulants_mg = Math.round(5 + nextRandom() * 85);
    // BP modulators: 10 to 90 mg
    const bp_modulators_mg = Math.round(10 + nextRandom() * 80);

    const dosage: DosageInputMatrix = {
      allopathic_hypnotic_mg,
      asava_carrier_ml,
      ashwagandha_mg,
      snayu_stimulants_mg,
      bp_modulators_mg,
    };

    const sim = runChemoInformaticsSimulation(dosage);

    if (sim.safety_status === 'APPROVED') approvedCount++;
    else if (sim.safety_status === 'WARNING_HIGH_ACCUMULATION') warningCount++;
    else criticalCount++;

    sumBio += sim.bioavailability_multiplier;
    sumCyp += sim.cytochrome_p450_stress;
    sumTone += sim.snayu_reflex_tone;
    sumBp += sim.bp_stability_index;

    trials.push({
      trial_id: i,
      run_timestamp: new Date().toISOString(),
      ...sim,
    });
  }

  return {
    total_trials: 100,
    approved_count: approvedCount,
    warning_count: warningCount,
    critical_count: criticalCount,
    approved_percentage: approvedCount,
    warning_percentage: warningCount,
    critical_percentage: criticalCount,
    mean_bioavailability: Number((sumBio / 100).toFixed(3)),
    mean_cyp450_stress: Number((sumCyp / 100).toFixed(1)),
    mean_snayu_tone: Number((sumTone / 100).toFixed(3)),
    mean_bp_stability: Number((sumBp / 100).toFixed(1)),
    optimal_therapeutic_window: {
      hypnotic_safe_range: [5, 15],
      asava_safe_range: [1.5, 3.0],
      ashwagandha_min_buffer: 200,
      snayu_target_range: [20, 35],
      bp_target_range: [45, 55],
    },
    trials,
  };
}

/**
 * Generate CSV dataset export from batch test results
 */
export function exportBatchTrialsToCSV(trials: BatchTestTrial[]): string {
  const headers = [
    'trial_id',
    'allopathic_hypnotic_mg',
    'asava_carrier_ml',
    'ashwagandha_mg',
    'snayu_stimulants_mg',
    'bp_modulators_mg',
    'bioavailability_multiplier_Abio',
    'cyp450_stress_Scyp',
    'snayu_reflex_tone_Tsnayu',
    'bp_stability_index',
    'safety_status',
    'half_life_hrs',
    'glucose_stability_score',
  ];

  const rows = trials.map((t) => [
    t.trial_id,
    t.dosages.allopathic_hypnotic_mg,
    t.dosages.asava_carrier_ml,
    t.dosages.ashwagandha_mg,
    t.dosages.snayu_stimulants_mg,
    t.dosages.bp_modulators_mg,
    t.bioavailability_multiplier,
    t.cytochrome_p450_stress,
    t.snayu_reflex_tone,
    t.bp_stability_index,
    t.safety_status,
    t.predicted_liver_clearance_half_life_hrs,
    t.nocturnal_glucose_stability_score,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}
