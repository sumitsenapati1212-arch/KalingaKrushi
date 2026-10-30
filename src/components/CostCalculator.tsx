import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Download,
  CheckCircle2,
  Percent,
  TrendingUp,
  DollarSign,
  Building,
  Layers,
  Sparkles,
  Printer,
  ShieldCheck,
  FileSpreadsheet,
} from 'lucide-react';
import { Language, CostCalculatorInputs, CostCalculationResult } from '../types';
import { translations } from '../translations';

interface CostCalculatorProps {
  language: Language;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ language }) => {
  const t = translations[language] || translations.en;

  const [area, setArea] = useState<number>(1000); // in sq. meters
  const [areaUnit, setAreaUnit] = useState<'sqm' | 'sqft' | 'guntha' | 'acre'>('sqm');
  const [polyhouseType, setPolyhouseType] = useState<CostCalculatorInputs['polyhouseType']>('nvph');
  const [giPipeGrade, setGiPipeGrade] = useState<CostCalculatorInputs['giPipeGrade']>('class_b');
  const [coveringFilm, setCoveringFilm] = useState<CostCalculatorInputs['coveringFilm']>('anti_fog_200');
  const [insectNet, setInsectNet] = useState<CostCalculatorInputs['insectNet']>('40_mesh');
  const [irrigationType, setIrrigationType] = useState<CostCalculatorInputs['irrigationType']>('drip_automated');
  const [farmerCategory, setFarmerCategory] = useState<CostCalculatorInputs['farmerCategory']>('women_shg');
  const [stateScheme, setStateScheme] = useState<CostCalculatorInputs['stateScheme']>('mkuy_odisha');

  // Convert area to sq.m for calculation
  const areaInSqM = useMemo(() => {
    switch (areaUnit) {
      case 'sqft':
        return area * 0.092903;
      case 'guntha':
        return area * 101.17;
      case 'acre':
        return area * 4046.86;
      default:
        return area;
    }
  }, [area, areaUnit]);

  // Economic calculation
  const calculation: CostCalculationResult = useMemo(() => {
    // Base rate per sq.meter based on polyhouse type
    let baseRatePerSqm = 920; // NVPH standard MIDH norm
    if (polyhouseType === 'fan_pad') baseRatePerSqm = 1450;
    else if (polyhouseType === 'shade_net') baseRatePerSqm = 710;
    else if (polyhouseType === 'hitech') baseRatePerSqm = 1850;

    // Adjustments for GI pipe and film
    if (giPipeGrade === 'class_b') baseRatePerSqm += 40;
    if (coveringFilm === 'anti_fog_200') baseRatePerSqm += 25;
    if (irrigationType === 'drip_automated') baseRatePerSqm += 45;

    const totalGross = Math.round(areaInSqM * baseRatePerSqm);

    // Subsidy percentage
    let subsidyPct = 0;
    if (stateScheme === 'mkuy_odisha') {
      subsidyPct = farmerCategory === 'women_shg' || farmerCategory === 'sc_st' ? 70 : 50;
    } else if (stateScheme === 'midh_national') {
      subsidyPct = 50;
    }

    const subsidyAmount = Math.round(totalGross * (subsidyPct / 100));
    const netFarmerInv = totalGross - subsidyAmount;
    const bankLoan = Math.round(netFarmerInv * 0.85);
    const farmerOwnMargin = netFarmerInv - bankLoan;

    // Cost Breakdown
    const breakdown = {
      civilWork: Math.round(totalGross * 0.12),
      giStructure: Math.round(totalGross * 0.42),
      polyfilmAndNets: Math.round(totalGross * 0.18),
      irrigationAndMisting: Math.round(totalGross * 0.14),
      automationAndSensors: Math.round(totalGross * 0.06),
      labourAndErection: Math.round(totalGross * 0.08),
    };

    // Projected Economics (e.g., Colored Capsicum yielding 15-18 kg/sq.m/yr at ₹55/kg average)
    const expectedYieldKg = Math.round(areaInSqM * 16.5);
    const grossRev = Math.round(expectedYieldKg * 58);
    const opEx = Math.round(areaInSqM * 240); // seed, fertilizer, electricity, labour
    const netProfit = grossRev - opEx;
    const paybackYears = Math.round((netFarmerInv / Math.max(netProfit, 1)) * 10) / 10;

    return {
      totalGrossCost: totalGross,
      costPerSqMeter: Math.round(baseRatePerSqm),
      subsidyPercentage: subsidyPct,
      subsidyAmount,
      netFarmerInvestment: netFarmerInv,
      bankLoanAvailable: bankLoan,
      farmerContribution: farmerOwnMargin,
      breakdown,
      economics: {
        expectedAnnualYieldKg: expectedYieldKg,
        estimatedAnnualGrossRevenue: grossRev,
        estimatedAnnualOperationalExpense: opEx,
        netAnnualProfit: netProfit,
        roiPaybackYears: paybackYears,
      },
    };
  }, [
    areaInSqM,
    polyhouseType,
    giPipeGrade,
    coveringFilm,
    irrigationType,
    farmerCategory,
    stateScheme,
  ]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 via-green-800 to-teal-900 text-white shadow-xl relative overflow-hidden border border-emerald-700">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-emerald-200 border border-white/15 mb-3">
              <Calculator className="w-3.5 h-3.5 text-lime-300" />
              <span>Odisha MKUY & MIDH Cost Engineering Model</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {t.calculatorTitle}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-2xl">
              {t.calculatorSubtitle}
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 backdrop-blur-md border border-white/20 transition active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Print Project DPR</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-slate-200/80 dark:border-stone-800 shadow-sm space-y-5">
            {/* 1. Land Area & Units */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  {t.landArea}
                </label>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-stone-800 p-1 rounded-xl text-xs font-semibold">
                  <button
                    onClick={() => setAreaUnit('sqm')}
                    className={`px-2.5 py-1 rounded-lg transition ${
                      areaUnit === 'sqm' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    m²
                  </button>
                  <button
                    onClick={() => setAreaUnit('sqft')}
                    className={`px-2.5 py-1 rounded-lg transition ${
                      areaUnit === 'sqft' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    sq.ft
                  </button>
                  <button
                    onClick={() => setAreaUnit('guntha')}
                    className={`px-2.5 py-1 rounded-lg transition ${
                      areaUnit === 'guntha' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Guntha
                  </button>
                  <button
                    onClick={() => setAreaUnit('acre')}
                    className={`px-2.5 py-1 rounded-lg transition ${
                      areaUnit === 'acre' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Acre
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="250"
                    max="5000"
                    step="50"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="w-28 flex-shrink-0">
                    <input
                      type="number"
                      value={area}
                      onChange={(e) => setArea(Number(e.target.value))}
                      className="w-full py-1.5 px-3 rounded-xl border border-slate-200 dark:border-stone-700 bg-slate-50 dark:bg-stone-800 text-center font-bold text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>250 {areaUnit} (Small Model)</span>
                  <span className="font-semibold text-emerald-600">
                    Calculated: {Math.round(areaInSqM)} m² (
                    {Math.round(areaInSqM * 0.000247105 * 100) / 100} Acres)
                  </span>
                  <span>5,000 {areaUnit} (Commercial)</span>
                </div>
              </div>
            </div>

            {/* 2. Polyhouse Type Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                {t.polyhouseTypeLabel}
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  {
                    id: 'nvph',
                    title: 'Naturally Ventilated (NVPH)',
                    desc: 'Cost Effective • Best for Odisha Climate',
                    costNorm: '₹920–₹960/m²',
                  },
                  {
                    id: 'fan_pad',
                    title: 'Fan & Pad Evaporative',
                    desc: 'Active Cooling • Exotic Dutch Cut Roses',
                    costNorm: '₹1,450–₹1,500/m²',
                  },
                  {
                    id: 'shade_net',
                    title: 'Insect-Proof Shade Net House',
                    desc: 'Low Capex • Off-season Vegetables',
                    costNorm: '₹710/m²',
                  },
                  {
                    id: 'hitech',
                    title: 'Hi-Tech Climate Controlled',
                    desc: 'Fully Automated IoT Micro-Sensors',
                    costNorm: '₹1,850/m²',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPolyhouseType(item.id as any)}
                    className={`p-3 rounded-2xl border-2 text-left transition ${
                      polyhouseType === item.id
                        ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-sm'
                        : 'border-slate-200 dark:border-stone-800 hover:border-emerald-300'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900 dark:text-white">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{item.desc}</div>
                    <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 mt-1">
                      {item.costNorm}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Structure & Film Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1.5">
                  GI Pipe Specification
                </label>
                <select
                  value={giPipeGrade}
                  onChange={(e) => setGiPipeGrade(e.target.value as any)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-stone-700 bg-slate-50 dark:bg-stone-800 text-xs font-semibold text-slate-900 dark:text-white"
                >
                  <option value="class_b">GI Class B (Heavy Duty - Recommended)</option>
                  <option value="class_c">GI Class C (Super Heavy Wind Resistant)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1.5">
                  Covering Polyfilm
                </label>
                <select
                  value={coveringFilm}
                  onChange={(e) => setCoveringFilm(e.target.value as any)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-stone-700 bg-slate-50 dark:bg-stone-800 text-xs font-semibold text-slate-900 dark:text-white"
                >
                  <option value="anti_fog_200">200µ Multi-Layer Anti-Fog & Anti-Drip</option>
                  <option value="diffused_200">200µ High-Diffusion Film (70% scatter)</option>
                  <option value="uv_200">200µ Standard UV Stabilized</option>
                </select>
              </div>
            </div>

            {/* 4. Irrigation System */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1.5">
                {t.irrigationSetup}
              </label>
              <select
                value={irrigationType}
                onChange={(e) => setIrrigationType(e.target.value as any)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-stone-700 bg-slate-50 dark:bg-stone-800 text-xs font-semibold text-slate-900 dark:text-white"
              >
                <option value="drip_automated">Automated Drip Fertigation + 4-Way Foggers</option>
                <option value="drip_manual">Manual Venturi Drip System</option>
                <option value="fogger_system">Overhead Micro-Misting / Fogger Station</option>
              </select>
            </div>

            {/* 5. Government Subsidy Scheme & Farmer Category (Odisha MKUY focus) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-stone-800">
              <div>
                <label className="block text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1.5">
                  {t.subsidyScheme}
                </label>
                <select
                  value={stateScheme}
                  onChange={(e) => setStateScheme(e.target.value as any)}
                  className="w-full py-2.5 px-3 rounded-xl border-2 border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/40 text-xs font-bold text-emerald-950 dark:text-emerald-200"
                >
                  <option value="mkuy_odisha">MKUY Odisha (Up to 70% Subsidy)</option>
                  <option value="midh_national">MIDH Central (50% Cost Norm)</option>
                  <option value="none">No Subsidy (Full Self-Financed)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1.5">
                  {t.farmerCategoryLabel}
                </label>
                <select
                  value={farmerCategory}
                  onChange={(e) => setFarmerCategory(e.target.value as any)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-stone-700 bg-slate-50 dark:bg-stone-800 text-xs font-semibold text-slate-900 dark:text-white"
                >
                  <option value="women_shg">Women SHG / SC / ST / Agri-Grad (70% Subsidy)</option>
                  <option value="general">General Category Farmer (50% Subsidy)</option>
                  <option value="small_marginal">Small & Marginal Farmer</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Financial & Economic Summary (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-900 via-green-900 to-teal-950 text-white shadow-xl space-y-5 border border-emerald-700">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Project Investment Overview
              </span>
              <div className="text-3xl font-black mt-1">
                ₹{calculation.totalGrossCost.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-emerald-200/80 mt-0.5">
                Estimated Gross Cost (₹{calculation.costPerSqMeter} / m²)
              </div>
            </div>

            {/* Subsidy Highlight Badge */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-200">
                <span>Eligible Govt Subsidy ({calculation.subsidyPercentage}%)</span>
                <span className="text-lime-300 font-bold">Approved Scheme</span>
              </div>
              <div className="text-2xl font-black text-lime-300">
                - ₹{calculation.subsidyAmount.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-emerald-200/90 leading-tight">
                Direct back-ended capital subsidy deposited in APICOL / Bank account upon structure inspection.
              </p>
            </div>

            {/* Net Farmer Capital Required */}
            <div className="pt-2 border-t border-white/20">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-emerald-200 font-medium">Net Farmer Investment:</span>
                <span className="text-2xl font-black text-white">
                  ₹{calculation.netFarmerInvestment.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-emerald-300/80 mt-1">
                <span>Bank Loan Assist (85%): ₹{calculation.bankLoanAvailable.toLocaleString('en-IN')}</span>
                <span>Margin (15%): ₹{calculation.farmerContribution.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Projected Returns & Payback */}
            <div className="p-3.5 rounded-2xl bg-black/25 backdrop-blur-md border border-white/10 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-emerald-300 block">Annual Net Profit</span>
                <span className="text-base font-black text-lime-300">
                  ₹{calculation.economics.netAnnualProfit.toLocaleString('en-IN')}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-300 block">Payback ROI</span>
                <span className="text-base font-black text-white">
                  {calculation.economics.roiPaybackYears} Years
                </span>
              </div>
            </div>

            {/* Download PDF / Report Button */}
            <button
              onClick={handlePrint}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 text-stone-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{t.downloadReport}</span>
            </button>
          </div>

          {/* Detailed Cost Breakdown Table */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-slate-200/80 dark:border-stone-800 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Component Cost Breakdown
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-stone-800">
                <span className="text-slate-500">GI Structure (Pipes, Arches, Clamps)</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  ₹{calculation.breakdown.giStructure.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-stone-800">
                <span className="text-slate-500">UV Polyfilm & Insect Proof Nets</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  ₹{calculation.breakdown.polyfilmAndNets.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-stone-800">
                <span className="text-slate-500">Irrigation, Drip & Fogger System</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  ₹{calculation.breakdown.irrigationAndMisting.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-stone-800">
                <span className="text-slate-500">Civil Foundation & Concrete Grouting</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  ₹{calculation.breakdown.civilWork.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-stone-800">
                <span className="text-slate-500">Labour, Erection & Transport</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  ₹{calculation.breakdown.labourAndErection.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Smart Sensors & Climate Automation</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  ₹{calculation.breakdown.automationAndSensors.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
