export type Language = 'en' | 'or' | 'hi' | 'bn' | 'te';

export type UserRole = 'farmer' | 'buyer' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  village: string;
  district: string;
  state: string;
  role: UserRole;
  language: Language;
  polyhouseArea: number; // in sq.m
  polyhouseType: string;
  activeCrops: string[];
  certificationsCompleted: number;
}

export interface PolyhouseZone {
  id: string;
  name: string;
  crop: string;
  variety: string;
  plantedDate: string;
  harvestDate: string;
  healthScore: number;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  ec: number;
  ph: number;
  autoWatering: boolean;
  status: 'optimal' | 'warning' | 'alert';
  imageUrl: string;
}

export interface DiseaseDetectionResult {
  crop: string;
  disease: string;
  isHealthy: boolean;
  confidence: number;
  severity: 'Low' | 'Moderate' | 'High' | 'None';
  symptoms: string[];
  causes: string[];
  organicRemedy: string[];
  chemicalTreatment: string[];
  polyhouseClimateAdvice: string;
  preventiveMeasures: string[];
  disclaimer: string;
}

export interface MarketplaceProduct {
  id: string;
  title: string;
  category: 'vegetables' | 'fruits' | 'flowers' | 'exotics' | 'seedlings';
  price: number;
  unit: string; // e.g. 'kg', 'stem', 'box', 'tray'
  quantity: number;
  location: string;
  farmerName: string;
  farmerPhone: string;
  harvestDate: string;
  grade: 'A+' | 'Export Quality' | 'Grade A' | 'Organic Certified';
  imageUrl: string;
  discountPercent?: number;
  minOrder: number;
  description: string;
}

export interface CostCalculatorInputs {
  areaSqMeters: number;
  polyhouseType: 'nvph' | 'fan_pad' | 'shade_net' | 'hitech';
  giPipeGrade: 'class_b' | 'class_c';
  coveringFilm: 'uv_200' | 'diffused_200' | 'anti_fog_200';
  insectNet: '40_mesh' | '50_mesh';
  irrigationType: 'drip_automated' | 'drip_manual' | 'fogger_system';
  automationLevel: 'basic' | 'smart_sensors' | 'fully_automated';
  farmerCategory: 'general' | 'sc_st' | 'women_shg' | 'small_marginal';
  stateScheme: 'mkuy_odisha' | 'midh_national' | 'none';
}

export interface CostCalculationResult {
  totalGrossCost: number;
  costPerSqMeter: number;
  subsidyPercentage: number;
  subsidyAmount: number;
  netFarmerInvestment: number;
  bankLoanAvailable: number;
  farmerContribution: number;
  breakdown: {
    civilWork: number;
    giStructure: number;
    polyfilmAndNets: number;
    irrigationAndMisting: number;
    automationAndSensors: number;
    labourAndErection: number;
  };
  economics: {
    expectedAnnualYieldKg: number;
    estimatedAnnualGrossRevenue: number;
    estimatedAnnualOperationalExpense: number;
    netAnnualProfit: number;
    roiPaybackYears: number;
  };
}

export interface TrainingLesson {
  id: string;
  title: string;
  duration: string;
  category: 'construction' | 'cultivation' | 'irrigation' | 'pest_management' | 'fertigation';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  videoThumbnail: string;
  summary: string;
  keyTakeaways: string[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface GovernmentScheme {
  id: string;
  title: string;
  authority: string;
  maxSubsidy: string;
  subsidyPercent: string;
  eligibility: string[];
  documentsRequired: string[];
  applicationPortal: string;
  tag: 'State Scheme' | 'Central Scheme' | 'Credit Linked';
  description: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  location: string;
  crop: string;
  avatar: string;
  date: string;
  title: string;
  content: string;
  likes: number;
  commentsCount: number;
  tags: string[];
  replies: {
    author: string;
    role: string;
    content: string;
    date: string;
  }[];
}

export interface MandiRateItem {
  commodity: string;
  variety: string;
  market: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  updatedAt: string;
}
