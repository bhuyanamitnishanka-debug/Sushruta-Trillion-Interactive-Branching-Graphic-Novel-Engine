export type ActiveComponentClassification =
  | 'Allopathic_Hypnotic'
  | 'Ayurvedic_Fermentation_Carrier'
  | 'Rasashastra_Adaptogen'
  | 'Snayu_Neuro_Stimulant'
  | 'Hemodynamic_BP_Modulator'
  | 'Allopathic_Antiplatelet'
  | 'Cardioprotective_Endothelial'
  | 'Lipid_Remodeling_Ayurvedic'
  | 'Allopathic_Cytotoxic'
  | 'Botanical_Cytoprotective'
  | 'Apoptosis_Inducer';

export type SafetyClearanceStatus =
  | 'APPROVED'
  | 'WARNING_HIGH_ACCUMULATION'
  | 'WARNING_VASCULAR_FRAGILITY'
  | 'WARNING_SYSTEMIC_TOXICITY'
  | 'CRITICAL_TOXICITY'
  | 'CRITICAL_HEMORRHAGE_RISK'
  | 'CRITICAL_BONE_MARROW_SUPPRESSION'
  | string;

export interface ActiveComponent {
  name: string;
  classification: ActiveComponentClassification;
  dosage?: string;
  mechanism?: string;
}

export interface FormulationMetadata {
  codename: string;
  delivery_system: string;
  active_components: ActiveComponent[];
  therapeutic_indication?: string;
  dosages_calculated?: Record<string, number>;
}

export interface StomachGastricPhase {
  gastric_disintegration_velocity_sec: number;
  ghrelin_stimulation_index: number; // 0 to 1
  mucosal_shielding_coefficient: number;
  ph_stability_window?: string;
}

export interface NeuroEndocrineResponse {
  gaba_receptor_binding_rate: number;
  endogenous_melatonin_boost_percentage: number;
  serotonin_retention_index: number;
  cortisol_suppression_velocity: number;
  snayu_active_stage_stimulation_index?: number; // 0 to 1 Snayu tone
}

export interface SnayuReflexActivation {
  snayu_active_stage_stimulation_index: number; // Tone of reflex nerve channels
  locomotor_limpness_prevention_index: number;  // Resistance to motor collapse
  reflex_channel_tonicity: number;
}

export interface VascularHemodynamicMatrix {
  blood_pressure_stability_score: number; // 0 to 100
  nocturnal_hypotensive_crash_prevention_index: number;
  vascular_resistance_stability?: number;
}

export interface CardiovascularStrokeMatrix {
  antiplatelet_inhibition_percentage: number; // e.g. 84.5%
  endothelial_shear_resistance_index: number; // 0 to 1
  arterial_plaque_remodeling_score: number; // 0 - 100
  microcirculation_velocity_cm_s: number; // e.g. 5.8 cm/s
  myocardial_cellular_tonicity_score: number; // 0 - 100
}

export interface ComputationalOncologyMatrix {
  tumor_angiogenesis_inhibition_velocity: number; // e.g. 0.83 (83%)
  cellular_apoptosis_induction_rate: number; // e.g. 3.0 / hr
  non_tumor_cellular_integrity_score: number; // 0 to 100%
  free_radical_scavenging_reserve: number; // mmol/L
  cytoprotective_shield_engaged: boolean;
}

export interface HepatoBiliaryProtectionMatrix {
  cytochrome_p450_stress_score: number; // 0 to 100
  hepatocyte_antioxidant_defense_index: number;
  gall_bladder_bile_release_rate_ml_hr: number;
  cholecystokinin_stability_coefficient: number;
}

export interface PancreaticGlucoseControl {
  basal_insulin_secretion_rate_uU_mL: number; // e.g. 8.5 uU/mL prevents metabolic crash
  beta_cell_oxidative_protection_index: number; // e.g. 1.62 shields beta-cells
  nocturnal_glucose_stability_score: number; // 0 - 100% constancy
  glucagon_regulatory_balance_ratio: number; // e.g. 1.12
}

export interface SimulationPathways {
  stomach_gastric_phase: StomachGastricPhase;
  neuro_endocrine_response: NeuroEndocrineResponse;
  hepato_biliary_protection_matrix: HepatoBiliaryProtectionMatrix;
  pancreatic_glucose_control?: PancreaticGlucoseControl;
  snayu_reflex_activation?: SnayuReflexActivation;
  vascular_hemodynamic_matrix?: VascularHemodynamicMatrix;
  cardiovascular_stroke_matrix?: CardiovascularStrokeMatrix;
  computational_oncology_matrix?: ComputationalOncologyMatrix;
}

export interface CrossInteractionValidator {
  herb_drug_interference_detected: boolean;
  bioavailability_amplification_multiplier: number;
  predicted_liver_clearance_half_life_hrs: number;
  safety_clearance_status: SafetyClearanceStatus;
  hepatic_clearance_notes?: string;
}

export interface SushrutaTrillionHybridPillSimulation {
  $schema?: string;
  formulation_metadata: FormulationMetadata;
  simulation_pathways: SimulationPathways;
  cross_interaction_validator: CrossInteractionValidator;
}
