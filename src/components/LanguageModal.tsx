import React from 'react';
import { Check, Globe, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface LanguageModalProps {
  isOpen: boolean;
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  onConfirm: () => void;
}

interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  region: string;
  greeting: string;
}

const languages: LanguageOption[] = [
  {
    code: 'or',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    region: 'ଓଡ଼ିଶା (Odisha Special)',
    greeting: 'ନମସ୍କାର କୃଷକ ଭାଇ',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    region: 'Standard / Pan-India',
    greeting: 'Welcome Farmer',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    region: 'राष्ट्रीय (National)',
    greeting: 'नमस्ते किसान भाई',
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    region: 'পশ্চিমবঙ্গ ও ত্রিপুরা',
    greeting: 'নমস্কার কৃষক বন্ধু',
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    region: 'ఆంధ్రప్రదేశ్ & తెలంగాణ',
    greeting: 'నమస్కారం రైతు సోదరా',
  },
];

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  currentLanguage,
  onSelectLanguage,
  onConfirm,
}) => {
  if (!isOpen) return null;
  const t = translations[currentLanguage] || translations.en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-emerald-500/30 overflow-hidden transform transition-all">
        {/* Header with decorative agricultural green badge */}
        <div className="bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-800 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-emerald-100 mb-2 border border-white/20">
            <Globe className="w-3.5 h-3.5 text-lime-300" />
            <span>PolySmart Multilingual Indian Agriculture</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-1">
            {t.selectLanguage}
          </h2>
          <p className="text-xs text-emerald-100/90 max-w-md mx-auto">
            {t.languageSelectDesc}
          </p>
        </div>

        {/* Language Options Grid */}
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {languages.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onSelectLanguage(lang.code)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-center justify-between group ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-stone-700 bg-white dark:bg-stone-800/60'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-colors ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 group-hover:bg-emerald-200'
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-slate-900 dark:text-white">
                        {lang.nativeName}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        ({lang.name})
                      </span>
                      {lang.code === 'or' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                          <Sparkles className="w-2.5 h-2.5" />
                          Odisha
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                      {lang.greeting}
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500">
                      {lang.region}
                    </div>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-600 text-white scale-110'
                      : 'border-slate-300 dark:border-stone-600 group-hover:border-emerald-400'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Confirmation Button */}
        <div className="p-6 bg-slate-50 dark:bg-stone-900/80 border-t border-slate-100 dark:border-stone-800 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {currentLanguage === 'or'
              ? 'ଯେକୌଣସି ସମୟରେ ଉପର ମେନୁରୁ ଭାଷା ବଦଳାଇ ପାରିବେ'
              : 'You can switch languages anytime from the top bar'}
          </div>
          <button
            onClick={onConfirm}
            className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 whitespace-nowrap active:scale-95"
          >
            <span>{t.continueBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
