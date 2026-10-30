import React, { useState } from 'react';
import {
  Landmark,
  ExternalLink,
  CheckCircle2,
  FileText,
  BadgePercent,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
} from 'lucide-react';
import { Language, GovernmentScheme } from '../types';
import { translations } from '../translations';
import { governmentSchemes } from '../data/mockData';

interface GovernmentSchemesProps {
  language: Language;
}

export const GovernmentSchemes: React.FC<GovernmentSchemesProps> = ({ language }) => {
  const t = translations[language] || translations.en;
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme>(governmentSchemes[0]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 via-green-800 to-teal-900 text-white shadow-xl relative overflow-hidden border border-emerald-700">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-emerald-200 border border-white/15 mb-3">
            <Landmark className="w-3.5 h-3.5 text-lime-300" />
            <span>Govt of Odisha & Ministry of Agriculture & Farmers Welfare</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {t.schemesTitle}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-2xl">
            {t.schemesSubtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Schemes Directory List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider px-1">
            Available Subsidy Schemes
          </h3>

          {governmentSchemes.map((scheme) => {
            const isSelected = selectedScheme.id === scheme.id;
            return (
              <button
                key={scheme.id}
                onClick={() => setSelectedScheme(scheme)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition duration-200 ${
                  isSelected
                    ? 'border-emerald-600 bg-white dark:bg-stone-900 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      scheme.tag === 'State Scheme'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}
                  >
                    {scheme.tag}
                  </span>
                  <span className="text-xs font-black text-emerald-600">
                    {scheme.subsidyPercent} Subsidy
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                  {scheme.title}
                </h4>

                <div className="text-[11px] text-slate-500 mt-1 truncate">
                  {scheme.authority}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Selected Scheme Deep-Dive & Application Checklist (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-slate-200/80 dark:border-stone-800 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-stone-800">
              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {selectedScheme.authority}
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                  {selectedScheme.title}
                </h3>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-right">
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block font-bold">
                  Max Financial Assistance
                </span>
                <span className="text-base font-black text-emerald-800 dark:text-emerald-200">
                  {selectedScheme.maxSubsidy}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedScheme.description}
            </p>

            {/* Eligibility Requirements */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-stone-800/60 border border-slate-200/60 dark:border-stone-700 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span>Eligibility Criteria</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {selectedScheme.eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Documents Checklist */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-stone-800/60 border border-slate-200/60 dark:border-stone-700 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                <span>Documents Required for Online Application</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {selectedScheme.documentsRequired.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action link */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-slate-400">
                Official portal links operate under Government SSL encryption.
              </div>
              <a
                href={selectedScheme.applicationPortal}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition"
              >
                <span>{t.applyNow}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
