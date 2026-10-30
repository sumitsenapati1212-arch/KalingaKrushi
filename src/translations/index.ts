import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  getStarted: string;
  skipIntro: string;
  welcomeFarmer: string;
  selectLanguage: string;
  languageSelectDesc: string;
  continueBtn: string;
  changeLanguage: string;
  
  // Navigation
  navDashboard: string;
  navDiseaseDetection: string;
  navMarketplace: string;
  navCostCalculator: string;
  navTraining: string;
  navSchemes: string;
  navWeather: string;
  navCommunity: string;
  navProfile: string;

  // Roles
  roleFarmer: string;
  roleBuyer: string;
  roleAdmin: string;

  // Dashboard
  quickStats: string;
  totalPolyhouseArea: string;
  activeCropZones: string;
  overallPlantHealth: string;
  activeSensors: string;
  soilNutrientStatus: string;
  autoWatering: string;
  phBalancer: string;
  fertilizerDosage: string;
  growthAnalytics: string;
  growthLevel: string;
  weatherOverview: string;
  currentCrops: string;
  quickActions: string;
  scanDiseaseNow: string;
  calculateCost: string;
  checkMandiRates: string;
  viewTraining: string;
  aiAdvisoryTitle: string;
  aiAdvisoryDesc: string;
  askAiPlaceholder: string;
  askAiBtn: string;
  zoneMapTitle: string;

  // Disease Scanner
  diseaseScannerTitle: string;
  diseaseScannerSubtitle: string;
  uploadLeafPhoto: string;
  takeCameraPhoto: string;
  orChooseSample: string;
  sampleTomato: string;
  sampleCapsicum: string;
  sampleCucumber: string;
  diagnoseCrop: string;
  analyzingImage: string;
  diagnosisResult: string;
  confidenceScore: string;
  identifiedDisease: string;
  affectedCrop: string;
  symptomsLabel: string;
  causesLabel: string;
  organicRemedyLabel: string;
  chemicalTreatmentLabel: string;
  polyhouseClimateAdviceLabel: string;
  preventiveMeasuresLabel: string;
  expertConsultation: string;
  callAgronomist: string;
  kvkHelpline: string;
  aiDisclaimer: string;

  // Marketplace
  marketplaceTitle: string;
  marketplaceSubtitle: string;
  allCategories: string;
  catVegetables: string;
  catFruits: string;
  catFlowers: string;
  catExotics: string;
  catSeedlings: string;
  addNewProduct: string;
  filterByLocation: string;
  contactFarmer: string;
  chatWhatsApp: string;
  placeOrder: string;
  availableStock: string;
  harvestDateLabel: string;
  exportGrade: string;

  // Calculator
  calculatorTitle: string;
  calculatorSubtitle: string;
  landArea: string;
  polyhouseTypeLabel: string;
  structureMaterial: string;
  irrigationSetup: string;
  subsidyScheme: string;
  farmerCategoryLabel: string;
  calculateEstimate: string;
  totalInvestment: string;
  govtSubsidy: string;
  netFarmerCost: string;
  annualYieldForecast: string;
  projectedProfit: string;
  roiPeriod: string;
  downloadReport: string;

  // Training
  trainingTitle: string;
  trainingSubtitle: string;
  startCourse: string;
  startQuiz: string;
  certificateEarned: string;
  downloadCertificate: string;
  progressLabel: string;

  // Schemes & Help
  schemesTitle: string;
  schemesSubtitle: string;
  applyNow: string;
  guidelines: string;
  subsidyAmountLabel: string;

  // Weather & Notifications
  liveWeather: string;
  windSpeed: string;
  humidity: string;
  notifications: string;
  markAllRead: string;
  darkMode: string;
  lightMode: string;
  audioAdvisory: string;
  listenInLanguage: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "PolySmart",
    tagline: "Grow Smarter, Farm Better.",
    getStarted: "Get Started",
    skipIntro: "Skip to Dashboard",
    welcomeFarmer: "Welcome back, Farmer",
    selectLanguage: "Choose Your Preferred Language",
    languageSelectDesc: "Select your native language for a tailored smart farming experience",
    continueBtn: "Continue to App",
    changeLanguage: "Change Language",

    navDashboard: "Dashboard",
    navDiseaseDetection: "Crop Doctor AI",
    navMarketplace: "Farmer Mandi",
    navCostCalculator: "Cost & Subsidy Calc",
    navTraining: "Krishi Academy",
    navSchemes: "Govt Schemes",
    navWeather: "Weather & Radar",
    navCommunity: "Kisan Forum",
    navProfile: "Farm Profile",

    roleFarmer: "Polyhouse Grower",
    roleBuyer: "Wholesale Buyer",
    roleAdmin: "Agronomist / Officer",

    quickStats: "Live Polyhouse Diagnostics",
    totalPolyhouseArea: "Total Polyhouse Area",
    activeCropZones: "Active Crop Zones",
    overallPlantHealth: "Crop Health Index",
    activeSensors: "IoT Sensors Online",
    soilNutrientStatus: "Soil & Substrate Status",
    autoWatering: "Automated Drip",
    phBalancer: "Water pH & EC Balancer",
    fertilizerDosage: "Fertigation Intensity",
    growthAnalytics: "Growth Analytics",
    growthLevel: "Maturity Rate",
    weatherOverview: "Odisha Agro-Climate",
    currentCrops: "Standing Crops",
    quickActions: "Quick Actions",
    scanDiseaseNow: "Scan Leaf for Disease",
    calculateCost: "Calculate Setup Cost",
    checkMandiRates: "Live Mandi Rates",
    viewTraining: "Polyhouse Tutorials",
    aiAdvisoryTitle: "PolySmart AI Agronomist",
    aiAdvisoryDesc: "Ask any question regarding climate, pests, fertigation, or yields",
    askAiPlaceholder: "e.g. My capsicum leaves are turning yellow, what EC should I maintain?",
    askAiBtn: "Get Advice",
    zoneMapTitle: "Polyhouse Structural Zone Map",

    diseaseScannerTitle: "AI Plant Disease Detection",
    diseaseScannerSubtitle: "Upload leaf photos or take a snapshot for instant pathogen diagnosis and organic remedies",
    uploadLeafPhoto: "Upload Crop Photo",
    takeCameraPhoto: "Use Camera",
    orChooseSample: "Or select a test leaf sample:",
    sampleTomato: "Tomato Leaf Blight",
    sampleCapsicum: "Capsicum Powdery Mildew",
    sampleCucumber: "Cucumber Downy Mildew",
    diagnoseCrop: "Analyze with Gemini AI",
    analyzingImage: "Scanning leaf cellular structure...",
    diagnosisResult: "Pathology Diagnosis",
    confidenceScore: "AI Diagnostic Confidence",
    identifiedDisease: "Identified Problem",
    affectedCrop: "Crop Identified",
    symptomsLabel: "Observed Symptoms",
    causesLabel: "Underlying Causes",
    organicRemedyLabel: "Organic & Bio-Control Remedies",
    chemicalTreatmentLabel: "Targeted Agrochemicals",
    polyhouseClimateAdviceLabel: "Polyhouse Climate Action",
    preventiveMeasuresLabel: "Preventive Measures",
    expertConsultation: "Need Pathologist Advice?",
    callAgronomist: "Call KVK Agronomist",
    kvkHelpline: "Odisha Krishi Toll-Free: 1800-180-1551",
    aiDisclaimer: "Preliminary AI screening. Consult state agriculture extension officers before applying Schedule IV chemicals.",

    marketplaceTitle: "Farmer Marketplace & e-Mandi",
    marketplaceSubtitle: "Direct farm-to-buyer marketplace for high-grade polyhouse vegetables, fruits & flowers",
    allCategories: "All Produce",
    catVegetables: "Vegetables",
    catFruits: "Fruits",
    catFlowers: "Cut Flowers",
    catExotics: "Exotics",
    catSeedlings: "Polyhouse Nursery",
    addNewProduct: "List New Harvest",
    filterByLocation: "Filter by District",
    contactFarmer: "Call Farmer",
    chatWhatsApp: "WhatsApp",
    placeOrder: "Request Purchase",
    availableStock: "Stock Ready",
    harvestDateLabel: "Harvest Date",
    exportGrade: "Grade",

    calculatorTitle: "Polyhouse Cost & Subsidy Calculator",
    calculatorSubtitle: "Calculate total capital investment, government subsidies (MIDH / MKUY Odisha), and ROI",
    landArea: "Polyhouse Land Area",
    polyhouseTypeLabel: "Polyhouse Structure Type",
    structureMaterial: "GI Pipe Specifications",
    irrigationSetup: "Irrigation & Fertigation",
    subsidyScheme: "Select Government Subsidy",
    farmerCategoryLabel: "Farmer Category",
    calculateEstimate: "Calculate Economics",
    totalInvestment: "Estimated Project Cost",
    govtSubsidy: "Eligible Government Subsidy",
    netFarmerCost: "Net Farmer Capital Required",
    annualYieldForecast: "Expected Annual Yield",
    projectedProfit: "Net Annual Profit",
    roiPeriod: "Expected ROI Payback",
    downloadReport: "Download Detailed PDF Project Report",

    trainingTitle: "Polyhouse Farmer Training Academy",
    trainingSubtitle: "Practical masterclasses, video tutorials, quizzes, and government certified completion certificates",
    startCourse: "Start Lesson",
    startQuiz: "Take Certification Quiz",
    certificateEarned: "PolySmart Certified Smart Farmer",
    downloadCertificate: "Download Certificate (PDF)",
    progressLabel: "Training Completion",

    schemesTitle: "Odisha & Central Agriculture Schemes",
    schemesSubtitle: "Direct subsidies up to 70% under MKUY, MIDH, PMKSY, and interest subvention loans",
    applyNow: "Apply Online",
    guidelines: "View Official Guidelines",
    subsidyAmountLabel: "Subsidy Support",

    liveWeather: "Polyhouse Weather Station",
    windSpeed: "Wind Speed",
    humidity: "Relative Humidity",
    notifications: "Smart Alerts",
    markAllRead: "Mark all as read",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    audioAdvisory: "Audio Read-Aloud",
    listenInLanguage: "Listen in your language",
  },

  or: {
    appName: "ପଲିସ୍ମାର୍ଟ (PolySmart)",
    tagline: "ସ୍ମାର୍ଟ୍ ଚାଷ, ଉନ୍ନତ ବିକାଶ |",
    getStarted: "ଆରମ୍ଭ କରନ୍ତୁ",
    skipIntro: "ମୁଖ୍ୟ ପୃଷ୍ଠାକୁ ଯାଆନ୍ତୁ",
    welcomeFarmer: "ନମସ୍କାର, କୃଷକ ଭାଇ",
    selectLanguage: "ଆପଣଙ୍କ ପସନ୍ଦର ଭାଷା ବାଛନ୍ତୁ",
    languageSelectDesc: "ନିଜ ମାତୃଭାଷାରେ ସରଳ ଓ ସଠିକ ସ୍ମାର୍ଟ୍ ପଲିହାଉସ୍ ଚାଷ ତଥ୍ୟ ପାଆନ୍ତୁ",
    continueBtn: "ଆଗକୁ ବଢ଼ନ୍ତୁ",
    changeLanguage: "ଭାଷା ବଦଳାନ୍ତୁ",

    navDashboard: "ଡ୍ୟାସବୋର୍ଡ",
    navDiseaseDetection: "ରୋଗ ନିଦାନ (AI)",
    navMarketplace: "କୃଷକ ମଣ୍ଡି",
    navCostCalculator: "ଖର୍ଚ୍ଚ ଓ ସବସିଡି ଗଣନା",
    navTraining: "ତାଲିମ କେନ୍ଦ୍ର",
    navSchemes: "ସରକାରୀ ଯୋଜନା",
    navWeather: "ପାଣିପାଗ ତଥ୍ୟ",
    navCommunity: "କୃଷକ ଚର୍ଚ୍ଚା",
    navProfile: "ଫାର୍ମ ପ୍ରୋଫାଇଲ",

    roleFarmer: "ପଲିହାଉସ କୃଷକ",
    roleBuyer: "ପାଇକାରୀ ବ୍ୟବସାୟୀ",
    roleAdmin: "କୃଷି ବିଶେଷଜ୍ଞ",

    quickStats: "ପଲିହାଉସ ପ୍ରତ୍ୟକ୍ଷ ସ୍ଥିତି",
    totalPolyhouseArea: "ମୋଟ ପଲିହାଉସ କ୍ଷେତ୍ରଫଳ",
    activeCropZones: "ସକ୍ରିୟ ଫସଲ ଜୋନ୍",
    overallPlantHealth: "ଗଛର ସ୍ୱାସ୍ଥ୍ୟ ସୂଚକ",
    activeSensors: "ସେନସର ଅନଲାଇନ୍",
    soilNutrientStatus: "ମାଟି ଓ ପୁଷ୍ଟିକର ସ୍ଥିତି",
    autoWatering: "ସ୍ୱୟଂଚାଳିତ ବୁନ୍ଦା ଜଳସେଚନ",
    phBalancer: "ଜଳର pH ଓ EC ମାନ",
    fertilizerDosage: "ଖତ ଓ ସାର ପ୍ରୟୋଗ",
    growthAnalytics: "ବୃଦ୍ଧି ବିଶ୍ଳେଷଣ",
    growthLevel: "ଫସଲ ପରିପକ୍ୱତା",
    weatherOverview: "ଓଡ଼ିଶା କୃଷି ପାଣିପାଗ",
    currentCrops: "ଲାଗିଥିବା ଫସଲ",
    quickActions: "ଜରୁରୀ ସୁବିଧା",
    scanDiseaseNow: "ପତ୍ର ରୋଗ ପରୀକ୍ଷା",
    calculateCost: "ପଲିହାଉସ ଖର୍ଚ୍ଚ ଗଣନା",
    checkMandiRates: "ମଣ୍ଡି ଦର ଦେଖନ୍ତୁ",
    viewTraining: "ଚାଷ ତାଲିମ ଭିଡିଓ",
    aiAdvisoryTitle: "ପଲିସ୍ମାର୍ଟ AI କୃଷି ପରାମର୍ଶ",
    aiAdvisoryDesc: "ତାପମାତ୍ରା, ରୋଗ ପୋକ, ଜଳସେଚନ ଓ ଅମଳ ବାବଦରେ ପଚାରନ୍ତୁ",
    askAiPlaceholder: "ଉଦାହରଣ: କ୍ୟାପ୍ସିକମ୍ ପତ୍ର ହଳଦିଆ ପଡୁଛି, କଣ ସାର ଦେବି?",
    askAiBtn: "ପରାମର୍ଶ ନିଅନ୍ତୁ",
    zoneMapTitle: "ପଲିହାଉସ ଗଠନ ଓ ଜୋନ୍ ମାନଚିତ୍ର",

    diseaseScannerTitle: "AI ଫସଲ ରୋଗ ଚିହ୍ନଟ",
    diseaseScannerSubtitle: "ରୋଗିଣା ପତ୍ରର ଫଟୋ ଉଠାନ୍ତୁ ଏବଂ କୃତ୍ରିମ ବୁଦ୍ଧିମତା (AI) ସାହାଯ୍ୟରେ ସଙ୍ଗେ ସଙ୍ଗେ ସଠିକ୍ ପ୍ରତିକାର ପାଆନ୍ତୁ",
    uploadLeafPhoto: "ଫଟୋ ଅପଲୋଡ କରନ୍ତୁ",
    takeCameraPhoto: "କ୍ୟାମେରା ବ୍ୟବହାର କରନ୍ତୁ",
    orChooseSample: "କିମ୍ବା ପରୀକ୍ଷା ପାଇଁ ନମୁନା ବାଛନ୍ତୁ:",
    sampleTomato: "ଟମାଟୋ ଆଗୁଆ ପତ୍ରପୋଡ଼ା",
    sampleCapsicum: "ଶିମଳା ଲଙ୍କା ଧୂଳିଆ ରୋଗ",
    sampleCucumber: "ଶସା ତଳମାଟିଆ ଫିମ୍ପି",
    diagnoseCrop: "AI ଦ୍ୱାରା ଯାଞ୍ଚ କରନ୍ତୁ",
    analyzingImage: "ପତ୍ରର ଅଣୁବୀକ୍ଷଣ ଯାଞ୍ଚ ଚାଲିଛି...",
    diagnosisResult: "ରୋଗ ନିରୂପଣ ଫଳାଫଳ",
    confidenceScore: "ନିର୍ଭୁଲତା ସମ୍ଭାବନା",
    identifiedDisease: "ଚିହ୍ନଟ ହୋଇଥିବା ରୋଗ",
    affectedCrop: "ଫସଲର ନାମ",
    symptomsLabel: "ଦେଖାଯାଉଥିବା ଲକ୍ଷଣ",
    causesLabel: "ରୋଗର ମୁଖ୍ୟ କାରଣ",
    organicRemedyLabel: "ଜୈବିକ ଓ ପ୍ରାକୃତିକ ନିୟନ୍ତ୍ରଣ",
    chemicalTreatmentLabel: "ରାସାୟନିକ ଔଷଧ ପ୍ରୟୋଗ",
    polyhouseClimateAdviceLabel: "ପଲିହାଉସ ତାପମାତ୍ରା ଓ ପବନ ନିୟନ୍ତ୍ରଣ",
    preventiveMeasuresLabel: "ପ୍ରତିଷେଧକ ବ୍ୟବସ୍ଥା",
    expertConsultation: "କୃଷି ବୈଜ୍ଞାନିକଙ୍କ ସହ କଥା ହେବେ କି?",
    callAgronomist: "କୃଷି ବିଶେଷଜ୍ଞଙ୍କୁ ଫୋନ କରନ୍ତୁ",
    kvkHelpline: "ଓଡ଼ିଶା କୃଷି ଟୋଲ୍ ଫ୍ରି: 1800-180-1551",
    aiDisclaimer: "ଏହା ଏକ ପ୍ରାଥମିକ AI ଯାଞ୍ଚ | କୀଟନାଶକ ପ୍ରୟୋଗ ପୂର୍ବରୁ ସ୍ଥାନୀୟ କୃଷି ଅଧିକାରୀଙ୍କ ପରାମର୍ଶ ନିଅନ୍ତୁ |",

    marketplaceTitle: "କୃଷକ ବଜାର ଓ ଇ-ମଣ୍ଡି",
    marketplaceSubtitle: "ମଧ୍ୟସ୍ଥି ବିନା ସିଧାସଳଖ ଉତ୍ତମ ମାନର ପଲିହାଉସ ପନିପରିବା ଓ ଫୁଲ ବିକ୍ରୟ କରନ୍ତୁ",
    allCategories: "ସମସ୍ତ ଉତ୍ପାଦ",
    catVegetables: "ପନିପରିବା",
    catFruits: "ଫଳମୂଳ",
    catFlowers: "କଟ୍ ଫ୍ଲାୱାର୍",
    catExotics: "ଦାମୀ ବିଦେଶୀ ଫସଲ",
    catSeedlings: "ପଲିହାଉସ ଚାରା ନର୍ସରୀ",
    addNewProduct: "ନୂଆ ଫସଲ ଯୋଡନ୍ତୁ",
    filterByLocation: "ଜିଲ୍ଲା ଅନୁସାରେ ଖୋଜନ୍ତୁ",
    contactFarmer: "କୃଷକଙ୍କୁ ଫୋନ କରନ୍ତୁ",
    chatWhatsApp: "ହ୍ୱାଟ୍ସଆପ୍ ବାର୍ତ୍ତା",
    placeOrder: "କିଣିବାକୁ ଅନୁରୋଧ କରନ୍ତୁ",
    availableStock: "ଉପଲବ୍ଧ ପରିମାଣ",
    harvestDateLabel: "ଅମଳ ତାରିଖ",
    exportGrade: "ଗୁଣବତ୍ତା ଗ୍ରେଡ୍",

    calculatorTitle: "ପଲିହାଉସ ନିର୍ମାଣ ଖର୍ଚ୍ଚ ଓ ସବସିଡି ଗଣନା",
    calculatorSubtitle: "ଜମି କ୍ଷେତ୍ରଫଳ ଅନୁସାରେ ସରକାରୀ ରିହାତି (MKUY/MIDH) ଓ ଲାଭ ଆକଳନ କରନ୍ତୁ",
    landArea: "ପଲିହାଉସ ଜମିର ଆୟତନ",
    polyhouseTypeLabel: "ପଲିହାଉସର ପ୍ରକାର",
    structureMaterial: "ଜି.ଆଇ. ପାଇପ୍ ମାନ",
    irrigationSetup: "ଜଳସେଚନ ଓ ଫଗର ସୁବିଧା",
    subsidyScheme: "ସରକାରୀ ସବସିଡି ଯୋଜନା",
    farmerCategoryLabel: "କୃଷକ ବର୍ଗ",
    calculateEstimate: "ସମ୍ପୂର୍ଣ୍ଣ ହିସାବ କାଢ଼ନ୍ତୁ",
    totalInvestment: "ମୋଟ ନିର୍ମାଣ ଖର୍ଚ୍ଚ",
    govtSubsidy: "ସରକାରୀ ରିହାତି (ସବସିଡି)",
    netFarmerCost: "ଚାଷୀଙ୍କ ନିଜସ୍ୱ ଖର୍ଚ୍ଚ",
    annualYieldForecast: "ବାର୍ଷିକ ଆନୁମାନିକ ଅମଳ",
    projectedProfit: "ବାର୍ଷିକ ନିଟ୍ ଲାଭ",
    roiPeriod: "ଖର୍ଚ୍ଚ ଫେରିପାଇବା ସମୟ",
    downloadReport: "ପ୍ରକଳ୍ପ ରିପୋର୍ଟ ଡାଉନଲୋଡ କରନ୍ତୁ (PDF)",

    trainingTitle: "ସ୍ମାର୍ଟ୍ କୃଷକ ତାଲିମ କେନ୍ଦ୍ର",
    trainingSubtitle: "ପଲିହାଉସ ପରିଚାଳନା ଭିଡିଓ, କୁଇଜ୍ ଓ ପ୍ରମାଣପତ୍ର ହାସଲ କରନ୍ତୁ",
    startCourse: "ପାଠ ପଢ଼ନ୍ତୁ",
    startQuiz: "ପ୍ରମାଣପତ୍ର କୁଇଜ୍ ଦିଅନ୍ତୁ",
    certificateEarned: "ପଲିସ୍ମାର୍ଟ ସ୍ମାର୍ଟ୍ ଚାଷୀ ପ୍ରମାଣପତ୍ର",
    downloadCertificate: "ପ୍ରମାଣପତ୍ର ଡାଉନଲୋଡ କରନ୍ତୁ",
    progressLabel: "ତାଲିମ ଅଗ୍ରଗତି",

    schemesTitle: "ଓଡ଼ିଶା ତଥା କେନ୍ଦ୍ର ସରକାରୀ କୃଷି ଯୋଜନା",
    schemesSubtitle: "ମୁଖ୍ୟମନ୍ତ୍ରୀ କୃଷି ଉଦ୍ୟୋଗ ଯୋଜନା (MKUY) ଓ MIDH ଅଧୀନରେ ୭୦% ପର୍ଯ୍ୟନ୍ତ ସବସିଡି",
    applyNow: "ଅନଲାଇନ୍ ଆବେଦନ କରନ୍ତୁ",
    guidelines: "ନିୟମାବଳୀ ପଢ଼ନ୍ତୁ",
    subsidyAmountLabel: "ମିଳିବାକୁ ଥିବା ସବସିଡି",

    liveWeather: "ପଲିହାଉସ ପାଣିପାଗ କେନ୍ଦ୍ର",
    windSpeed: "ପବନର ଗତି",
    humidity: "ଆପେକ୍ଷିକ ଆର୍ଦ୍ରତା",
    notifications: "ଜରୁରୀ ସୂଚନା",
    markAllRead: "ସବୁ ପଢ଼ିଲି",
    darkMode: "ଡାର୍କ ମୋଡ୍",
    lightMode: "ଲାଇଟ୍ ମୋଡ୍",
    audioAdvisory: "ଶୁଣିବା ପାଇଁ ସ୍ୱର (Audio)",
    listenInLanguage: "ନିଜ ଭାଷାରେ ଶୁଣନ୍ତୁ",
  },

  hi: {
    appName: "पॉलीस्मार्ट (PolySmart)",
    tagline: "स्मार्ट खेती, बेहतर तरक्की।",
    getStarted: "शुरू करें",
    skipIntro: "डैशबोर्ड पर जाएं",
    welcomeFarmer: "स्वागत है, किसान भाई",
    selectLanguage: "अपनी पसंदीदा भाषा चुनें",
    languageSelectDesc: "अपनी मातृभाषा में पॉलीहाउस खेती की संपूर्ण जानकारी पाएं",
    continueBtn: "आगे बढ़ें",
    changeLanguage: "भाषा बदलें",

    navDashboard: "डैशबोर्ड",
    navDiseaseDetection: "फसल रोग निदान",
    navMarketplace: "किसान मंडी",
    navCostCalculator: "लागत एवं सब्सिडी कैलकुलेटर",
    navTraining: "प्रशिक्षण केंद्र",
    navSchemes: "सरकारी योजनाएं",
    navWeather: "मौसम पूर्वानुमान",
    navCommunity: "किसान चौपाल",
    navProfile: "फार्म प्रोफाइल",

    roleFarmer: "पॉलीहाउस किसान",
    roleBuyer: "थोक खरीदार",
    roleAdmin: "कृषि विशेषज्ञ",

    quickStats: "पॉलीहाउस सजीव स्थिति",
    totalPolyhouseArea: "कुल पॉलीहाउस क्षेत्रफल",
    activeCropZones: "सक्रिय फसल क्षेत्र",
    overallPlantHealth: "फसल स्वास्थ्य सूचकांक",
    activeSensors: "ऑनलाइन सेंसर",
    soilNutrientStatus: "मिट्टी एवं पोषण स्थिति",
    autoWatering: "स्वचालित ड्रिप सिंचाई",
    phBalancer: "जल pH एवं EC संतुलन",
    fertilizerDosage: "उर्वरक की मात्रा",
    growthAnalytics: "वृद्धि विश्लेषण",
    growthLevel: "परिपक्वता दर",
    weatherOverview: "कृषि मौसम जानकारी",
    currentCrops: "वर्तमान फसलें",
    quickActions: "त्वरित कार्य",
    scanDiseaseNow: "रोग की जांच करें",
    calculateCost: "लागत का हिसाब लगाएं",
    checkMandiRates: "ताज़ा मंडी भाव",
    viewTraining: "खेती ट्यूटोरियल",
    aiAdvisoryTitle: "पॉलीस्मार्ट AI कृषि सलाहकार",
    aiAdvisoryDesc: "तापमान, कीट, सिंचाई या उत्पादन संबंधी कोई भी सवाल पूछें",
    askAiPlaceholder: "जैसे: शिमला मिर्च की पत्तियां पीली पड़ रही हैं, क्या करें?",
    askAiBtn: "सलाह लें",
    zoneMapTitle: "पॉलीहाउस स्ट्रक्चरल ज़ोन नक्शा",

    diseaseScannerTitle: "AI फसल रोग पहचान",
    diseaseScannerSubtitle: "पत्तियों की फोटो अपलोड करें और तुरंत सटीक जैविक एवं रासायनिक उपचार पाएं",
    uploadLeafPhoto: "फोटो अपलोड करें",
    takeCameraPhoto: "कैमरा खोलें",
    orChooseSample: "या टेस्ट सैंपल चुनें:",
    sampleTomato: "टमाटर का अगेती झुलसा",
    sampleCapsicum: "शिमला मिर्च चूर्णिल फफूंद",
    sampleCucumber: "खीरे का डाउनी मिल्ड्यू",
    diagnoseCrop: "AI द्वारा जांचें",
    analyzingImage: "पत्ती की जांच हो रही है...",
    diagnosisResult: "रोग निदान परिणाम",
    confidenceScore: "सटीकता दर",
    identifiedDisease: "पहचाना गया रोग",
    affectedCrop: "प्रभावित फसल",
    symptomsLabel: "प्रमुख लक्षण",
    causesLabel: "रोग के कारण",
    organicRemedyLabel: "जैविक एवं प्राकृतिक उपचार",
    chemicalTreatmentLabel: "रासायनिक कीटनाशक उपचार",
    polyhouseClimateAdviceLabel: "पॉलीहाउस वेंटिलेशन नियंत्रण",
    preventiveMeasuresLabel: "रोकथाम के उपाय",
    expertConsultation: "कृषि विशेषज्ञ से बात करें",
    callAgronomist: "वैज्ञानिक को कॉल करें",
    kvkHelpline: "किसान कॉल सेंटर: 1800-180-1551",
    aiDisclaimer: "यह AI आधारित प्राथमिक सलाह है। भारी छिड़काव से पहले कृषि अधिकारी से परामर्श अवश्य लें।",

    marketplaceTitle: "किसान मंडी एवं ई-मार्केट",
    marketplaceSubtitle: "बिना बिचौलियों के सीधे खरीदारों को उच्च गुणवत्ता वाली सब्जियां व फूल बेचें",
    allCategories: "सभी उत्पाद",
    catVegetables: "सब्जियां",
    catFruits: "फल",
    catFlowers: "फूल",
    catExotics: "विदेशी सब्जियां",
    catSeedlings: "नर्सरी पौधे",
    addNewProduct: "नया उत्पाद जोड़ें",
    filterByLocation: "जिले अनुसार खोजें",
    contactFarmer: "किसान को कॉल करें",
    chatWhatsApp: "व्हाट्सएप करें",
    placeOrder: "खरीद अनुरोध भेजें",
    availableStock: "उपलब्ध स्टॉक",
    harvestDateLabel: "तुड़ाई तिथि",
    exportGrade: "ग्रेड",

    calculatorTitle: "पॉलीहाउस निर्माण लागत एवं सब्सिडी कैलकुलेटर",
    calculatorSubtitle: "क्षेत्रफल के अनुसार सरकारी सब्सिडी (MIDH / राज्य योजनाएं) और मुनाफे का आकलन करें",
    landArea: "पॉलीहाउस भूमि क्षेत्रफल",
    polyhouseTypeLabel: "पॉलीहाउस का प्रकार",
    structureMaterial: "जीआई पाइप ग्रेड",
    irrigationSetup: "सिंचाई और फॉगर सिस्टम",
    subsidyScheme: "सरकारी सब्सिडी योजना",
    farmerCategoryLabel: "किसान श्रेणी",
    calculateEstimate: "लागत की गणना करें",
    totalInvestment: "अनुमानित कुल लागत",
    govtSubsidy: "पात्र सरकारी सब्सिडी",
    netFarmerCost: "किसान का वास्तविक खर्च",
    annualYieldForecast: "अनुमानित वार्षिक उपज",
    projectedProfit: "वार्षिक शुद्ध लाभ",
    roiPeriod: "लागत वापसी अवधि",
    downloadReport: "विस्तृत प्रोजेक्ट रिपोर्ट डाउनलोड करें",

    trainingTitle: "स्मार्ट किसान प्रशिक्षण केंद्र",
    trainingSubtitle: "वीडियो मास्टरक्लास, प्रश्नोत्तरी और सरकारी मान्यता प्राप्त प्रमाण पत्र",
    startCourse: "पाठ शुरू करें",
    startQuiz: "प्रमाण पत्र क्विज दें",
    certificateEarned: "पॉलीस्मार्ट प्रमाणित किसान",
    downloadCertificate: "प्रमाण पत्र डाउनलोड करें",
    progressLabel: "प्रशिक्षण प्रगति",

    schemesTitle: "कृषि सब्सिडी एवं सरकारी योजनाएं",
    schemesSubtitle: "MIDH, PMKSY और राज्य योजनाओं में 50% से 70% तक की भारी छूट",
    applyNow: "ऑनलाइन आवेदन करें",
    guidelines: "दिशानिर्देश देखें",
    subsidyAmountLabel: "सब्सिडी राशि",

    liveWeather: "पॉलीहाउस मौसम केंद्र",
    windSpeed: "हवा की गति",
    humidity: "सापेक्षिक आर्द्रता",
    notifications: "महत्वपूर्ण सूचनाएं",
    markAllRead: "सभी पढ़ा हुआ मार्क करें",
    darkMode: "डार्क मोड",
    lightMode: "लाइट मोड",
    audioAdvisory: "आवाज में सुनें",
    listenInLanguage: "अपनी भाषा में ऑडियो सुनें",
  },

  bn: {
    appName: "পলি-স্মার্ট (PolySmart)",
    tagline: "স্মার্ট চাষ, উন্নত ভবিষ্যৎ।",
    getStarted: "শুরু করুন",
    skipIntro: "ড্যাশবোর্ডে যান",
    welcomeFarmer: "স্বাগতম, কৃষক বন্ধু",
    selectLanguage: "আপনার পছন্দের ভাষা নির্বাচন করুন",
    languageSelectDesc: "নিজের মাতৃভাষায় আধুনিক পলিহাউস চাষের সঠিক পরামর্শ পান",
    continueBtn: "এগিয়ে যান",
    changeLanguage: "ভাষা পরিবর্তন",

    navDashboard: "ড্যাশবোর্ড",
    navDiseaseDetection: "রোগ নির্ণয় (AI)",
    navMarketplace: "কৃষক মান্ডি",
    navCostCalculator: "খরচ ও ভর্তুকি ক্যালকুলেটর",
    navTraining: "প্রশিক্ষণ কেন্দ্র",
    navSchemes: "সরকারি প্রকল্প",
    navWeather: "আবহাওয়া বার্তা",
    navCommunity: "কৃষক মঞ্চ",
    navProfile: "ফার্ম প্রোফাইল",

    roleFarmer: "পলিহাউস কৃষক",
    roleBuyer: "পাইকারি ক্রেতা",
    roleAdmin: "কৃষি বিশেষজ্ঞ",

    quickStats: "পলিহাউসের তাৎক্ষণিক অবস্থা",
    totalPolyhouseArea: "মোট পলিহাউসের আয়তন",
    activeCropZones: "সক্রিয় ফসল অঞ্চল",
    overallPlantHealth: "গাছের স্বাস্থ্য সূচক",
    activeSensors: "অনলাইন সেন্সর",
    soilNutrientStatus: "মাটি ও পুষ্টি উপাদান",
    autoWatering: "স্বয়ংক্রিয় ড্রিপ সেচ",
    phBalancer: "জলের pH ও EC মাত্রা",
    fertilizerDosage: "সার প্রয়োগের মাত্রা",
    growthAnalytics: "বৃদ্ধি বিশ্লেষণ",
    growthLevel: "পরিপক্কতার হার",
    weatherOverview: "কৃষি আবহাওয়া",
    currentCrops: "বর্তমান ফসল",
    quickActions: "জরুরি সেবা",
    scanDiseaseNow: "পাতার রোগ পরীক্ষা",
    calculateCost: "খরচ গণনা করুন",
    checkMandiRates: "বর্তমান মান্ডি দর",
    viewTraining: "চাষের ভিডিও টিউটোরিয়াল",
    aiAdvisoryTitle: "পলি-স্মার্ট AI কৃষি পরামর্শ",
    aiAdvisoryDesc: "তাপমাত্রা, রোগ পোকা ও সার প্রয়োগ সম্পর্কে প্রশ্ন করুন",
    askAiPlaceholder: "যেমন: ক্যাপসিকাম গাছের পাতা হলুদ হয়ে যাচ্ছে, কী করণীয়?",
    askAiBtn: "পরামর্শ নিন",
    zoneMapTitle: "পলিহাউস স্ট্রাকচারাল জোন ম্যাপ",

    diseaseScannerTitle: "AI উদ্ভিদের রোগ সনাক্তকরণ",
    diseaseScannerSubtitle: "পাতার ছবি আপলোড করে কৃত্রিম বুদ্ধিমত্তা দ্বারা তাৎক্ষণিক প্রতিকার জানুন",
    uploadLeafPhoto: "ছবি আপলোড করুন",
    takeCameraPhoto: "ক্যামেরা ব্যবহার করুন",
    orChooseSample: "অথবা নমুনা বেছে নিন:",
    sampleTomato: "টমেটোর আগাম ধসা",
    sampleCapsicum: "ক্যাপসিকামের সাদা গুঁড়ো রোগ",
    sampleCucumber: "শসার ডাউনি মিলডিউ",
    diagnoseCrop: "AI দিয়ে রোগ নির্ণয়",
    analyzingImage: "পাতার নমুনা বিশ্লেষণ চলছে...",
    diagnosisResult: "রোগ নির্ণয়ের ফলাফল",
    confidenceScore: "সঠিকতার মাত্রা",
    identifiedDisease: "শনাক্ত রোগ",
    affectedCrop: "ফসলের নাম",
    symptomsLabel: "প্রধান লক্ষণসমূহ",
    causesLabel: "রোগের কারণ",
    organicRemedyLabel: "জৈব প্রতিকার",
    chemicalTreatmentLabel: "রাসায়নিক নিয়ন্ত্রণ",
    polyhouseClimateAdviceLabel: "পলিহাউসের আবহাওয়া নিয়ন্ত্রণ",
    preventiveMeasuresLabel: "প্রতিরোধমূলক ব্যবস্থা",
    expertConsultation: "কৃষি বিজ্ঞানীর সাথে কথা বলুন",
    callAgronomist: "বিশেষজ্ঞকে কল করুন",
    kvkHelpline: "কৃষক হেল্পলাইন: 1800-180-1551",
    aiDisclaimer: "এটি একটি প্রাথমিক AI মূল্যায়ন। কীটনাশক ব্যবহারের পূর্বে কৃষি আধিকারিকের পরামর্শ নিন।",

    marketplaceTitle: "কৃষক বাজার ও ই-মান্ডি",
    marketplaceSubtitle: "মধ্যস্বত্বভোগী ছাড়াই সরাসরি উন্নত মানের পলিহাউস ফসল বিক্রি করুন",
    allCategories: "সকল ফসল",
    catVegetables: "শাকসবজি",
    catFruits: "ফলমূল",
    catFlowers: "কাট ফ্লাওয়ার",
    catExotics: "বিদেশি সবজি",
    catSeedlings: "নার্সারি চারা",
    addNewProduct: "নতুন ফসল তালিকাভুক্ত করুন",
    filterByLocation: "জেলা অনুযায়ী খুঁজুন",
    contactFarmer: "কৃষককে কল করুন",
    chatWhatsApp: "হোয়াটসঅ্যাপ বার্তা",
    placeOrder: "ক্রয় অনুরোধ পাঠান",
    availableStock: "মজুত পরিমাণ",
    harvestDateLabel: "তোলার তারিখ",
    exportGrade: "মান গ্রেড",

    calculatorTitle: "পলিহাউস নির্মাণ খরচ ও ভর্তুকি ক্যালকুলেটর",
    calculatorSubtitle: "সরকারি ভর্তুকি (MIDH / রাজ্য প্রকল্প) এবং আয়ের হিসাব জানুন",
    landArea: "পলিহাউসের জমির আয়তন",
    polyhouseTypeLabel: "পলিহাউসের ধরন",
    structureMaterial: "জিআই পাইপ গ্রেড",
    irrigationSetup: "সেচ ও ফগার ব্যবস্থা",
    subsidyScheme: "সরকারি ভর্তুকি প্রকল্প",
    farmerCategoryLabel: "কৃষক শ্রেণি",
    calculateEstimate: "হিসাব করুন",
    totalInvestment: "মোট নির্মাণ ব্যয়",
    govtSubsidy: "প্রাপ্য সরকারি অনুদান",
    netFarmerCost: "কৃষকের নিজস্ব খরচ",
    annualYieldForecast: "বার্ষিক আনুমানিক ফলন",
    projectedProfit: "বার্ষিক লাভ",
    roiPeriod: "খরচ উঠে আসার সময়",
    downloadReport: "প্রজেক্ট রিপোর্ট ডাউনলোড করুন",

    trainingTitle: "স্মার্ট কৃষক প্রশিক্ষণ একাডেমি",
    trainingSubtitle: "ভিডিও পাঠ, কুইজ এবং সরকারি শংসাপত্র",
    startCourse: "পাঠ শুরু করুন",
    startQuiz: "কুইজে অংশ নিন",
    certificateEarned: "পলি-স্মার্ট সার্টিফায়েড কৃষক",
    downloadCertificate: "সার্টিফিকেট ডাউনলোড করুন",
    progressLabel: "প্রশিক্ষণ অগ্রগতি",

    schemesTitle: "কৃষি প্রকল্প ও সরকারি সাহায্য",
    schemesSubtitle: "MIDH ও রাজ্যের অধীনে ৭০% পর্যন্ত নিশ্চিত ভর্তুকি",
    applyNow: "অনলাইনে আবেদন করুন",
    guidelines: "নিয়মাবলী দেখুন",
    subsidyAmountLabel: "ভর্তুকির পরিমাণ",

    liveWeather: "পলিহাউস আবহাওয়া কেন্দ্র",
    windSpeed: "বাতাসের গতিবেগ",
    humidity: "আপেক্ষিক আর্দ্রতা",
    notifications: "জরুরি বার্তা",
    markAllRead: "সব পড়া হয়েছে",
    darkMode: "ডার্ক মোড",
    lightMode: "লাইট মোড",
    audioAdvisory: "অডিওতে শুনুন",
    listenInLanguage: "নিজের ভাষায় পরামর্শ শুনুন",
  },

  te: {
    appName: "పాలీస్మార్ట్ (PolySmart)",
    tagline: "స్మార్ట్ సాగు, ఉత్తమ ప్రగతి.",
    getStarted: "ప్రారంభించండి",
    skipIntro: "డ్యాష్‌బోర్డ్‌కు వెళ్లండి",
    welcomeFarmer: "స్వాగతం, రైతు సోదరా",
    selectLanguage: "మీ ప్రాధాన్య భాషను ఎంచుకోండి",
    languageSelectDesc: "మీ మాతృభాషలో సమగ్ర పాలీహౌస్ వ్యవసాయ సమాచారాన్ని పొందండి",
    continueBtn: "ముందుకు సాగండి",
    changeLanguage: "భాష మార్చండి",

    navDashboard: "డ్యాష్‌బోర్డ్",
    navDiseaseDetection: "పంట తెగుళ్ల గుర్తింపు",
    navMarketplace: "రైతు మార్కెట్",
    navCostCalculator: "వ్యయం & రాయితీ కాలిక్యులేటర్",
    navTraining: "శిక్షణా కేంద్రం",
    navSchemes: "ప్రభుత్వ పథకాలు",
    navWeather: "వాతావరణం",
    navCommunity: "రైతు వేదిక",
    navProfile: "ఫామ్ ప్రొఫైల్",

    roleFarmer: "పాలీహౌస్ రైతు",
    roleBuyer: "హోల్‌సేల్ వ్యాపారి",
    roleAdmin: "వ్యవసాయ నిపుణులు",

    quickStats: "పాలీహౌస్ ప్రత్యక్ష స్థితి",
    totalPolyhouseArea: "మొత్తం పాలీహౌస్ విస్తీర్ణం",
    activeCropZones: "సాగులో ఉన్న పంట విభాగాలు",
    overallPlantHealth: "మొక్కల ఆరోగ్య సూచిక",
    activeSensors: "ఆన్‌లైన్ సెన్సార్లు",
    soilNutrientStatus: "నేల & పోషకాల స్థితి",
    autoWatering: "ఆటోమేటిక్ డ్రిప్ నీటిపారుదల",
    phBalancer: "నీటి pH & EC నియంత్రణ",
    fertilizerDosage: "ఎరువుల మోతాదు",
    growthAnalytics: "వృద్ధి విశ్లేషణ",
    growthLevel: "దిగుబడి పరిపక్వత",
    weatherOverview: "వ్యవసాయ వాతావరణ సమాచారం",
    currentCrops: "ప్రస్తుత పంటలు",
    quickActions: "త్వరిత సేవలు",
    scanDiseaseNow: "తెగులును గుర్తించండి",
    calculateCost: "వ్యయాన్ని లెక్కించండి",
    checkMandiRates: "మార్కెట్ ధరలు",
    viewTraining: "శిక్షణ వీడియోలు",
    aiAdvisoryTitle: "పాలీస్మార్ట్ AI వ్యవసాయ సలహాదారు",
    aiAdvisoryDesc: "ఉష్ణోగ్రత, తెగుళ్లు, ఎరువుల నిర్వహణపై సలహాలు పొందండి",
    askAiPlaceholder: "ఉదాహరణ: క్యాప్సికం ఆకులు పసుపు రంగులోకి మారుతున్నాయి, ఏమి చేయాలి?",
    askAiBtn: "సలహా పొందండి",
    zoneMapTitle: "పాలీహౌస్ నిర్మాణ మ్యాప్",

    diseaseScannerTitle: "AI పంట తెగుళ్ల గుర్తింపు",
    diseaseScannerSubtitle: "ఆకు ఫోటో తీసి ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ ద్వారా నివారణ చర్యలను పొందండి",
    uploadLeafPhoto: "ఫోటో అప్‌లోడ్ చేయండి",
    takeCameraPhoto: "కెమెరా ఉపయోగించండి",
    orChooseSample: "లేదా నమూనాను ఎంచుకోండి:",
    sampleTomato: "టమాట ముందస్తు ఎండు తెగులు",
    sampleCapsicum: "క్యాప్సికం బూడిద తెగులు",
    sampleCucumber: "దోస డౌనీ మిల్డో",
    diagnoseCrop: "AI ద్వారా పరీక్షించండి",
    analyzingImage: "నమూనా విశ్లేషణ జరుగుతోంది...",
    diagnosisResult: "నిర్ధారణ ఫలితం",
    confidenceScore: "కచ్చితత్వం",
    identifiedDisease: "గుర్తించిన తెగులు",
    affectedCrop: "పంట పేరు",
    symptomsLabel: "ప్రధాన లక్షణాలు",
    causesLabel: "తెగులు రావడానికి కారణాలు",
    organicRemedyLabel: "సేంద్రీయ నివారణ చర్యలు",
    chemicalTreatmentLabel: "రసాయన మందుల వాడకం",
    polyhouseClimateAdviceLabel: "పాలీహౌస్ వాతావరణ నిర్వహణ",
    preventiveMeasuresLabel: "ముందస్తు జాగ్రత్తలు",
    expertConsultation: "వ్యవసాయ శాస్త్రవేత్తలతో మాట్లాడండి",
    callAgronomist: "నిపుణులకు కాల్ చేయండి",
    kvkHelpline: "రైతు కాల్ సెంటర్: 1800-180-1551",
    aiDisclaimer: "ఇది ప్రాథమిక AI విశ్లేషణ. రసాయనాలు వాడే ముందు వ్యవసాయ అధికారిని సంప్రదించండి.",

    marketplaceTitle: "రైతు మార్కెట్ & ఈ-మండి",
    marketplaceSubtitle: "దళారుల ప్రమేయం లేకుండా నాణ్యమైన కూరగాయలు మరియు పూలను నేరుగా విక్రయించండి",
    allCategories: "అన్ని ఉత్పత్తులు",
    catVegetables: "కూరగాయలు",
    catFruits: "పండ్లు",
    catFlowers: "పూలు",
    catExotics: "విదేశీ పంటలు",
    catSeedlings: "నర్సరీ మొక్కలు",
    addNewProduct: "కొత్త పంటను చేర్చండి",
    filterByLocation: "జిల్లా ప్రకారం శోధించండి",
    contactFarmer: "రైతుకు కాల్ చేయండి",
    chatWhatsApp: "వాట్సాప్ మెసేజ్",
    placeOrder: "ఆర్డర్ అభ్యర్థన",
    availableStock: "అందుబాటులో ఉన్న నిల్వ",
    harvestDateLabel: "కోత తేదీ",
    exportGrade: "గ్రేడ్",

    calculatorTitle: "పాలీహౌస్ వ్యయం & రాయితీ కాలిక్యులేటర్",
    calculatorSubtitle: "విస్తీర్ణం ఆధారంగా ప్రభుత్వ రాయితీ (MIDH / రాష్ట్ర పథకాలు) మరియు లాభాల అంచనా",
    landArea: "పాలీహౌస్ భూమి విస్తీర్ణం",
    polyhouseTypeLabel: "పాలీహౌస్ రకం",
    structureMaterial: "జీఐ పైపుల రకం",
    irrigationSetup: "డ్రిప్ మరియు ఫాగర్ వ్యవస్థ",
    subsidyScheme: "ప్రభుత్వ రాయితీ పథకం",
    farmerCategoryLabel: "రైతు వర్గం",
    calculateEstimate: "ఖర్చు లెక్కించండి",
    totalInvestment: "మొత్తం అంచనా వ్యయం",
    govtSubsidy: "లభించే ప్రభుత్వ రాయితీ",
    netFarmerCost: "రైతు భరించవలసిన నికర ఖర్చు",
    annualYieldForecast: "వార్షిక అంచనా దిగుబడి",
    projectedProfit: "వార్షిక నికర లాభం",
    roiPeriod: "పెట్టుబడి తిరిగి వచ్చే కాలం",
    downloadReport: "ప్రాజెక్ట్ నివేదికను డౌన్‌లోడ్ చేయండి",

    trainingTitle: "స్మార్ట్ రైతు శిక్షణా కేంద్రం",
    trainingSubtitle: "వీడియో పాఠాలు, క్విజ్ మరియు అధికారిక ధ్రువపత్రాలు",
    startCourse: "పాఠం ప్రారంభించండి",
    startQuiz: "క్విజ్ రాయండి",
    certificateEarned: "పాలీస్మార్ట్ ధ్రువీకృత రైతు",
    downloadCertificate: "సర్టిఫికెట్ డౌన్‌లోడ్ చేయండి",
    progressLabel: "శిక్షణ పురోగతి",

    schemesTitle: "వ్యవసాయ రాయితీలు & పథకాలు",
    schemesSubtitle: "MIDH మరియు రాష్ట్ర పథకాల కింద 70% వరకు భారీ రాయితీలు",
    applyNow: "ఆన్‌లైన్‌లో దరఖాస్తు చేయండి",
    guidelines: "నిబంధనలు చదవండి",
    subsidyAmountLabel: "రాయితీ మొత్తం",

    liveWeather: "పాలీహౌస్ వాతావరణ కేంద్రం",
    windSpeed: "గాలి వేగం",
    humidity: "తేమ శాతం",
    notifications: "ముఖ్య హెచ్చరికలు",
    markAllRead: "అన్నీ చదివినట్లు గుర్తించు",
    darkMode: "డార్క్ మోడ్",
    lightMode: "లైట్ మోڈ",
    audioAdvisory: "వాయిస్ సలహా వినండి",
    listenInLanguage: "మీ భాషలో వినండి",
  },
};
