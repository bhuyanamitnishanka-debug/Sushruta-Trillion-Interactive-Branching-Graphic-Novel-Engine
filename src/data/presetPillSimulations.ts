import { SushrutaTrillionHybridPillSimulation } from '../types/hybridPillSimulation';

export const PRESET_PILL_SIMULATIONS: SushrutaTrillionHybridPillSimulation[] = [
  {
    $schema: 'https://json-schema.org',
    formulation_metadata: {
      codename: 'CV-StrokeShield-01',
      delivery_system: 'Synchronized Dual-Chamber Enteric Micro-Pellet (Antiplatelet + Endothelial Remodeling Core)',
      therapeutic_indication: 'Cerebrovascular Stroke Prophylaxis, Rapid Antiplatelet Clot Suppression & Endothelial Shear Stabilization',
      dosages_calculated: {
        allopathic_antiplatelet_mg: 75,
        asava_carrier_ml: 1.8,
        terminalia_arjuna_mg: 350,
        guggulu_purified_mg: 150,
        bp_modulators_mg: 45,
      },
      active_components: [
        {
          name: 'Low-Dose Acetylsalicylic Acid / Clopidogrel Core',
          classification: 'Allopathic_Antiplatelet',
          dosage: '75.0 mg',
          mechanism: 'Irreversible COX-1 / ADP P2Y12 platelet aggregation inhibition preventing acute microvascular thrombus occlusion',
        },
        {
          name: 'Terminalia Arjuna Standardized Bark Glycosides (Arjunolic Acid)',
          classification: 'Cardioprotective_Endothelial',
          dosage: '350 mg',
          mechanism: 'Inotropic myocardial tonification, coronary dilation, and nitric oxide synthase (eNOS) upregulation protecting vascular endothelium',
        },
        {
          name: 'Purified Shodhita Guggulu (Commiphora mukul, E&Z Guggulsterones)',
          classification: 'Lipid_Remodeling_Ayurvedic',
          dosage: '150 mg',
          mechanism: 'Farnesoid X receptor antagonism accelerating reverse cholesterol transport and reducing arterial intima-media plaque thickness',
        },
        {
          name: 'Drakshasava Bio-Fermented Micro-Carrier (Yogavahi)',
          classification: 'Ayurvedic_Fermentation_Carrier',
          dosage: '1.8 mL',
          mechanism: 'Organic micro-fermentation vehicle enhancing trans-epithelial transport and bioavailability of polyphenols by +38%',
        },
      ],
    },
    simulation_pathways: {
      stomach_gastric_phase: {
        gastric_disintegration_velocity_sec: 145.0,
        ghrelin_stimulation_index: 0.22,
        mucosal_shielding_coefficient: 1.85,
        ph_stability_window: 'pH 3.0 - 5.8 (Enteric Mucosal Protection)',
      },
      neuro_endocrine_response: {
        gaba_receptor_binding_rate: 0.45,
        endogenous_melatonin_boost_percentage: 18.0,
        serotonin_retention_index: 0.72,
        cortisol_suppression_velocity: 0.81,
      },
      cardiovascular_stroke_matrix: {
        antiplatelet_inhibition_percentage: 86.4,
        endothelial_shear_resistance_index: 0.94,
        arterial_plaque_remodeling_score: 82.5,
        microcirculation_velocity_cm_s: 6.4,
        myocardial_cellular_tonicity_score: 91.0,
      },
      vascular_hemodynamic_matrix: {
        blood_pressure_stability_score: 96.5,
        nocturnal_hypotensive_crash_prevention_index: 0.92,
        vascular_resistance_stability: 94.0,
      },
      hepato_biliary_protection_matrix: {
        cytochrome_p450_stress_score: 18.2,
        hepatocyte_antioxidant_defense_index: 0.94,
        gall_bladder_bile_release_rate_ml_hr: 26.0,
        cholecystokinin_stability_coefficient: 0.89,
      },
      pancreatic_glucose_control: {
        basal_insulin_secretion_rate_uU_mL: 8.8,
        beta_cell_oxidative_protection_index: 1.48,
        nocturnal_glucose_stability_score: 94.2,
        glucagon_regulatory_balance_ratio: 1.05,
      },
    },
    cross_interaction_validator: {
      herb_drug_interference_detected: false,
      bioavailability_amplification_multiplier: 1.38,
      predicted_liver_clearance_half_life_hrs: 4.6,
      safety_clearance_status: 'APPROVED',
      hepatic_clearance_notes: 'Terminalia arjuna polyphenols shield gastric epithelium against salicylic irritation; Guggulsterones enhance reverse lipid transport without hepatic CYP3A4 bottleneck.',
    },
  },
  {
    $schema: 'https://json-schema.org',
    formulation_metadata: {
      codename: 'NH-Synchro-02-Max',
      delivery_system: 'Vascular-Synchronized Multi-Chamber Core',
      therapeutic_indication: 'Acute Sleep Onset with Targeted Snayu (Nerve/Tendon) Stimulation & Hemodynamic BP Oscillation Stabilization',
      dosages_calculated: {
        allopathic_hypnotic_mg: 10,
        asava_carrier_ml: 2.0,
        ashwagandha_mg: 250,
        snayu_stimulants_mg: 25,
        bp_modulators_mg: 50,
      },
      active_components: [
        {
          name: 'Synthetic Allopathic Hypnotic Core (Zolpidem Complex)',
          classification: 'Allopathic_Hypnotic',
          dosage: '10.0 mg',
          mechanism: 'Selective alpha-1 GABA-A subunit binding to reduce initial sleep onset latency',
        },
        {
          name: 'Self-Generated Fermented Asava Vehicle (Yogavahi)',
          classification: 'Ayurvedic_Fermentation_Carrier',
          dosage: '2.0 mL',
          mechanism: 'Natural bio-ethanol medium lowering cellular surface tension and boosting bioavailability up to +34%',
        },
        {
          name: 'Withania Somnifera (Ashwagandha) Root Extract',
          classification: 'Rasashastra_Adaptogen',
          dosage: '250 mg',
          mechanism: 'Withanolides shielding hepatocytes, buffering CYP450 stress to 15.0, and preserving pancreatic beta-cell insulin lines',
        },
        {
          name: 'Jyotishmati & Purified Shodhita Kupilu Complex',
          classification: 'Snayu_Neuro_Stimulant',
          dosage: '25 mg',
          mechanism: 'Calibrated micro-dose botanical reflex stimulants maintaining basal Snayu nerve-tendon tone and preventing locomotor limpness',
        },
        {
          name: 'Sarpagandha Dual-Action Vascular BP Alkaloids',
          classification: 'Hemodynamic_BP_Modulator',
          dosage: '50 mg',
          mechanism: 'Modulates systemic peripheral vascular resistance, dynamically stabilizing nocturnal BP at 100% constancy',
        },
      ],
    },
    simulation_pathways: {
      stomach_gastric_phase: {
        gastric_disintegration_velocity_sec: 179.1,
        ghrelin_stimulation_index: 0.68,
        mucosal_shielding_coefficient: 1.5,
        ph_stability_window: 'pH 2.2 - 5.0 (Optimal Bio-Transit)',
      },
      neuro_endocrine_response: {
        gaba_receptor_binding_rate: 0.94,
        endogenous_melatonin_boost_percentage: 38.5,
        serotonin_retention_index: 0.88,
        cortisol_suppression_velocity: 3.75,
        snayu_active_stage_stimulation_index: 0.67,
      },
      snayu_reflex_activation: {
        snayu_active_stage_stimulation_index: 0.67,
        locomotor_limpness_prevention_index: 0.92,
        reflex_channel_tonicity: 0.85,
      },
      vascular_hemodynamic_matrix: {
        blood_pressure_stability_score: 100.0,
        nocturnal_hypotensive_crash_prevention_index: 95.0,
        vascular_resistance_stability: 0.96,
      },
      hepato_biliary_protection_matrix: {
        cytochrome_p450_stress_score: 15.0,
        hepatocyte_antioxidant_defense_index: 2.15,
        gall_bladder_bile_release_rate_ml_hr: 15.6,
        cholecystokinin_stability_coefficient: 0.94,
      },
      pancreatic_glucose_control: {
        basal_insulin_secretion_rate_uU_mL: 9.2,
        beta_cell_oxidative_protection_index: 1.85,
        nocturnal_glucose_stability_score: 95.0,
        glucagon_regulatory_balance_ratio: 1.08,
      },
    },
    cross_interaction_validator: {
      herb_drug_interference_detected: false,
      bioavailability_amplification_multiplier: 1.34,
      predicted_liver_clearance_half_life_hrs: 5.8,
      safety_clearance_status: 'APPROVED',
      hepatic_clearance_notes: 'NH-Synchro-02-Max optimal synergy verified: Snayu nerve tone secured at 0.67 without motor limpness; BP stability score at 100.0; CYP450 stress buffered down to 15.0/100.',
    },
  },

  {
    $schema: 'https://json-schema.org',
    formulation_metadata: {
      codename: 'NH-Synchro-01',
      delivery_system: 'Dual-Chamber Multi-Layered Micro-Pill',
      therapeutic_indication: 'Nocturnal Metabolic-Sedative Synchronization (Organ-Shielding Deep Sleep)',
      active_components: [
        {
          name: 'Synthetic Allopathic Hypnotic',
          classification: 'Allopathic_Hypnotic',
          dosage: '5.0 mg',
          mechanism: 'Selective alpha-1 GABA-A subunit binding for immediate sleep induction',
        },
        {
          name: 'Self-Generated Fermented Asava Matrix',
          classification: 'Ayurvedic_Fermentation_Carrier',
          dosage: '180 mg',
          mechanism: 'Natural enzymatic bio-ethanol carrier enhancing gastric mucosal transit and bioavailability by +34%',
        },
        {
          name: 'Withania Somnifera (Ashwagandha) Root Extract',
          classification: 'Rasashastra_Adaptogen',
          dosage: '250 mg',
          mechanism: 'Withanolides down-regulating cortisol (-68%), protecting pancreatic beta-cells and buffering CYP450 stress',
        },
      ],
    },
    simulation_pathways: {
      stomach_gastric_phase: {
        gastric_disintegration_velocity_sec: 180.5,
        ghrelin_stimulation_index: 0.72,
        mucosal_shielding_coefficient: 1.45,
        ph_stability_window: 'pH 2.2 - 4.8',
      },
      neuro_endocrine_response: {
        gaba_receptor_binding_rate: 0.94,
        endogenous_melatonin_boost_percentage: 34.2,
        serotonin_retention_index: 0.81,
        cortisol_suppression_velocity: 2.4,
      },
      hepato_biliary_protection_matrix: {
        cytochrome_p450_stress_score: 32.4,
        hepatocyte_antioxidant_defense_index: 1.88,
        gall_bladder_bile_release_rate_ml_hr: 14.2,
        cholecystokinin_stability_coefficient: 0.91,
      },
      pancreatic_glucose_control: {
        basal_insulin_secretion_rate_uU_mL: 8.5,
        beta_cell_oxidative_protection_index: 1.62,
        nocturnal_glucose_stability_score: 94.5,
        glucagon_regulatory_balance_ratio: 1.12,
      },
    },
    cross_interaction_validator: {
      herb_drug_interference_detected: false,
      bioavailability_amplification_multiplier: 1.34,
      predicted_liver_clearance_half_life_hrs: 6.2,
      safety_clearance_status: 'APPROVED',
      hepatic_clearance_notes: 'Asava carrier bypasses hepatic bottleneck without competitive inhibition; Ashwagandha shields pancreatic islets from nocturnal glycemic spikes.',
    },
  },

  {
    $schema: 'https://json-schema.org',
    formulation_metadata: {
      codename: 'Soma-Neuro-09 (Bhavana Dual-Layer)',
      delivery_system: 'Bhavana Friction-Milled Biphasic Micro-Capsule with Self-Emulsifying Lipid Carrier',
      therapeutic_indication: 'Severe Neuro-Motor Restlessness & Acute Parasomnia Crisis',
      active_components: [
        {
          name: 'Zolpidem Hemi-Tartrate (Micro-Dose)',
          classification: 'Allopathic_Hypnotic',
          dosage: '2.5 mg',
          mechanism: 'Selective alpha-1 GABA-A receptor modulation for rapid somnolence onset',
        },
        {
          name: 'Drakshasava Bio-Fermented Asava Extract',
          classification: 'Ayurvedic_Fermentation_Carrier',
          dosage: '150 mg',
          mechanism: 'Self-generated micro-ethanol carrier accelerating gastric permeability and mucosal lining transit',
        },
        {
          name: 'Swarna Sutashekhara Ras (Gold-Bhasma + Shankhpushpi)',
          classification: 'Rasashastra_Adaptogen',
          dosage: '65 mg',
          mechanism: '18nm gold calcination lattice down-regulating ROS, boosting hepatocyte antioxidant defense and cortisol suppression',
        },
      ],
    },
    simulation_pathways: {
      stomach_gastric_phase: {
        gastric_disintegration_velocity_sec: 42,
        ghrelin_stimulation_index: 0.18,
        mucosal_shielding_coefficient: 0.88,
        ph_stability_window: 'pH 1.8 - 4.2',
      },
      neuro_endocrine_response: {
        gaba_receptor_binding_rate: 0.94,
        endogenous_melatonin_boost_percentage: 68.5,
        serotonin_retention_index: 0.82,
        cortisol_suppression_velocity: 0.76,
      },
      hepato_biliary_protection_matrix: {
        cytochrome_p450_stress_score: 22.4,
        hepatocyte_antioxidant_defense_index: 0.89,
        gall_bladder_bile_release_rate_ml_hr: 28.5,
        cholecystokinin_stability_coefficient: 0.91,
      },
      pancreatic_glucose_control: {
        basal_insulin_secretion_rate_uU_mL: 9.1,
        beta_cell_oxidative_protection_index: 1.54,
        nocturnal_glucose_stability_score: 91.8,
        glucagon_regulatory_balance_ratio: 1.08,
      },
    },
    cross_interaction_validator: {
      herb_drug_interference_detected: false,
      bioavailability_amplification_multiplier: 1.48,
      predicted_liver_clearance_half_life_hrs: 2.8,
      safety_clearance_status: 'APPROVED',
      hepatic_clearance_notes: 'Drakshasava fermentation bypasses CYP3A4 bottleneck; Swarna Bhasma scavenges oxidative free-radicals before microsomal accumulation.',
    },
  },

  {
    $schema: 'https://json-schema.org',
    formulation_metadata: {
      codename: 'Unbuffered Synthetic Surge (Toxicity Control)',
      delivery_system: 'Conventional Compressed Gelatin Capsule (Zero Ayurvedic Carriers)',
      therapeutic_indication: 'Brute-Force High-Dose Sedation (Stress Simulation Baseline)',
      active_components: [
        {
          name: 'High-Dose Zolpidem + Flurazepam Blend',
          classification: 'Allopathic_Hypnotic',
          dosage: '15.0 mg',
          mechanism: 'Unchecked non-selective benzodiazepine receptor suppression',
        },
        {
          name: 'Purified Water Carrier (No Fermentation)',
          classification: 'Ayurvedic_Fermentation_Carrier',
          dosage: '0 mg',
          mechanism: 'Standard aqueous dissolution',
        },
        {
          name: 'Untreated Raw Heavy Cinnabar (Hingula unpurified)',
          classification: 'Rasashastra_Adaptogen',
          dosage: '30 mg (Improper Shodhana)',
          mechanism: 'Uncalcined macro-particles lacking Maarana heat conversion',
        },
      ],
    },
    simulation_pathways: {
      stomach_gastric_phase: {
        gastric_disintegration_velocity_sec: 18,
        ghrelin_stimulation_index: 0.74,
        mucosal_shielding_coefficient: 0.25,
        ph_stability_window: 'pH < 1.5 (High Irritation)',
      },
      neuro_endocrine_response: {
        gaba_receptor_binding_rate: 0.98,
        endogenous_melatonin_boost_percentage: 12.0,
        serotonin_retention_index: 0.35,
        cortisol_suppression_velocity: 0.42,
      },
      hepato_biliary_protection_matrix: {
        cytochrome_p450_stress_score: 88.5,
        hepatocyte_antioxidant_defense_index: 0.22,
        gall_bladder_bile_release_rate_ml_hr: 12.0,
        cholecystokinin_stability_coefficient: 0.38,
      },
      pancreatic_glucose_control: {
        basal_insulin_secretion_rate_uU_mL: 3.2,
        beta_cell_oxidative_protection_index: 0.45,
        nocturnal_glucose_stability_score: 41.0,
        glucagon_regulatory_balance_ratio: 0.58,
      },
    },
    cross_interaction_validator: {
      herb_drug_interference_detected: true,
      bioavailability_amplification_multiplier: 0.85,
      predicted_liver_clearance_half_life_hrs: 9.4,
      safety_clearance_status: 'WARNING_HIGH_ACCUMULATION',
      hepatic_clearance_notes: 'Severe CYP3A4 competitive inhibition detected; nocturnal insulin drop creates nocturnal hypoglycemia risk.',
    },
  },

  {
    $schema: 'https://json-schema.org',
    formulation_metadata: {
      codename: 'Unregulated Mega-Dose Crisis (Critical Toxicity)',
      delivery_system: 'Rapid-Release Uncoated Matrix (Severe Organ Stress)',
      therapeutic_indication: 'Critical Toxicity Warning Demonstration & Emergency Decontamination Protocol',
      active_components: [
        {
          name: 'Synthetic Zolpidem + Secobarbital Complex',
          classification: 'Allopathic_Hypnotic',
          dosage: '25.0 mg',
          mechanism: 'Profound central nervous suppression triggering respiratory slowdown and CYP450 saturation',
        },
        {
          name: 'Synthetic Propylene Glycol Vehicle',
          classification: 'Ayurvedic_Fermentation_Carrier',
          dosage: '200 mg',
          mechanism: 'Synthetic non-fermented organic solvent inducing gastric epithelial erosion',
        },
        {
          name: 'Raw Heavy Ashoka & Untreated Bhasma Slag',
          classification: 'Rasashastra_Adaptogen',
          dosage: '120 mg (Zero Shodhana/Maarana)',
          mechanism: 'Unprocessed heavy metallic slag without nanoparticle friction milling causing acute hepatobiliary stagnation and beta-cell apoptosis',
        },
      ],
    },
    simulation_pathways: {
      stomach_gastric_phase: {
        gastric_disintegration_velocity_sec: 12,
        ghrelin_stimulation_index: 0.92,
        mucosal_shielding_coefficient: 0.18,
        ph_stability_window: 'pH < 1.2 (Severe Mucosal Erosion)',
      },
      neuro_endocrine_response: {
        gaba_receptor_binding_rate: 0.99,
        endogenous_melatonin_boost_percentage: 2.5,
        serotonin_retention_index: 0.15,
        cortisol_suppression_velocity: 0.12,
      },
      hepato_biliary_protection_matrix: {
        cytochrome_p450_stress_score: 94.2,
        hepatocyte_antioxidant_defense_index: 0.12,
        gall_bladder_bile_release_rate_ml_hr: 3.4,
        cholecystokinin_stability_coefficient: 0.19,
      },
      pancreatic_glucose_control: {
        basal_insulin_secretion_rate_uU_mL: 1.8,
        beta_cell_oxidative_protection_index: 0.22,
        nocturnal_glucose_stability_score: 28.5,
        glucagon_regulatory_balance_ratio: 0.32,
      },
    },
    cross_interaction_validator: {
      herb_drug_interference_detected: true,
      bioavailability_amplification_multiplier: 0.62,
      predicted_liver_clearance_half_life_hrs: 18.6,
      safety_clearance_status: 'CRITICAL_TOXICITY',
      hepatic_clearance_notes: 'CRITICAL WARNING: CYP450 stress at 94.2/100 blocks Phase-I hepatic oxidation. Pancreatic beta-cells suffering acute oxidative stress; immediate Sushruta Antidote Bio-Chelation protocol required.',
    },
  },
  {
    $schema: 'https://json-schema.org',
    formulation_metadata: {
      codename: 'ONCO-PathCheck-01',
      delivery_system: 'Targeted Nanoparticle & Botanical Liposome Dual-Track System',
      therapeutic_indication: 'Synergistic Tumor Angiogenesis Inhibition with Bone Marrow & Hepatocyte Cytoprotection',
      dosages_calculated: {
        allopathic_chemo_intensity_mg: 45.0,
        tulsi_apoptosis_inducer_mg: 300.0,
        shatavari_cytoprotective_factor_mg: 120.0,
        fermented_asava_carrier_ml: 2.0,
      },
      active_components: [
        {
          name: 'Paclitaxel Nanoparticle Core (Targeted Cytotoxic Delivery)',
          classification: 'Allopathic_Cytotoxic',
          dosage: '45 mg / m²',
          mechanism: 'Stabilizes microtubule polymers, disrupting mitotic spindle dynamics and blocking tumor cell division and angiogenesis pathways.',
        },
        {
          name: 'Ocimum Sanctum [Tulsi] Standardized Eugenol & Ursolic Acid Matrix',
          classification: 'Apoptosis_Inducer',
          dosage: '300 mg (Supercritical CO2 extract)',
          mechanism: 'Activates mitochondrial caspase cascade and p53 signaling to trigger selective apoptosis in dysplastic neoplastic cells.',
        },
        {
          name: 'Asparagus Racemosus [Shatavari] Shatavarins I-IV Liposomal Shield',
          classification: 'Botanical_Cytoprotective',
          dosage: '120 mg (Standardized Steroidal Saponins)',
          mechanism: 'Scavenges reactive oxygen species (ROS), protecting non-tumor tissue boundaries, bone marrow progenitor cells, and renal tubules against cytocidal damage.',
        },
        {
          name: 'Drakshasava 60-Day Micro-Fermented Yogavahi Carrier',
          classification: 'Ayurvedic_Fermentation_Carrier',
          dosage: '2.0 mL',
          mechanism: 'Self-generated bioactive organic acids permeabilize lipid membranes for targeted intracellular drug accumulation without high systemic dose toxicity.',
        },
      ],
    },
    simulation_pathways: {
      stomach_gastric_phase: {
        gastric_disintegration_velocity_sec: 165,
        ghrelin_stimulation_index: 0.28,
        mucosal_shielding_coefficient: 1.68,
        ph_stability_window: 'Targeted Duodenal / Systemic Nanoparticle Ingestion',
      },
      neuro_endocrine_response: {
        gaba_receptor_binding_rate: 0.15,
        endogenous_melatonin_boost_percentage: 12.0,
        serotonin_retention_index: 0.82,
        cortisol_suppression_velocity: 0.65,
      },
      hepato_biliary_protection_matrix: {
        cytochrome_p450_stress_score: 34.2,
        hepatocyte_antioxidant_defense_index: 0.94,
        gall_bladder_bile_release_rate_ml_hr: 9.2,
        cholecystokinin_stability_coefficient: 0.88,
      },
      computational_oncology_matrix: {
        tumor_angiogenesis_inhibition_velocity: 0.83,
        cellular_apoptosis_induction_rate: 3.0,
        non_tumor_cellular_integrity_score: 64.0,
        free_radical_scavenging_reserve: 9.6,
        cytoprotective_shield_engaged: true,
      },
    },
    cross_interaction_validator: {
      herb_drug_interference_detected: false,
      bioavailability_amplification_multiplier: 1.35,
      predicted_liver_clearance_half_life_hrs: 4.8,
      safety_clearance_status: 'APPROVED',
      hepatic_clearance_notes: 'APPROVED: Tumor angiogenesis inhibition reaches 83% while healthy cellular survival is preserved at 64% with active Shatavari-Tulsi cytoprotective shielding.',
    },
  },
];
