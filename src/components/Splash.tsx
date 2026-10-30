import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface SplashProps {
  language: Language;
  onComplete: () => void;
}

export const Splash: React.FC<SplashProps> = ({ language, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const t = translations[language] || translations.en;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2.5;
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-br from-emerald-950 via-forest-900 to-green-950 text-white overflow-hidden p-6 select-none">
      {/* Background ambient glowing shapes and polyhouse geometric grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="poly-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
              <path d="M 0 24 L 24 0 L 48 24 L 24 48 Z" fill="none" stroke="rgba(52,211,153,0.3)" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#poly-grid)" />
        </svg>
      </div>

      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-lime-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Tag & Skip Button */}
      <div className="w-full max-w-4xl flex items-center justify-between z-10 pt-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Odisha & National Smart Agriculture Platform</span>
        </div>
        <button
          onClick={onComplete}
          className="text-xs text-white/70 hover:text-white px-3 py-1.5 rounded-full bg-black/20 hover:bg-white/10 transition-colors backdrop-blur-sm"
        >
          {t.skipIntro}
        </button>
      </div>

      {/* Center Brand Identity */}
      <div className="flex flex-col items-center justify-center text-center my-auto z-10 max-w-lg px-4">
        {/* Animated PolySmart Logo: Green Leaf inside Greenhouse Archetype */}
        <div className="relative mb-8 group">
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-lime-400 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition duration-700 animate-pulse" />
          
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 bg-gradient-to-b from-stone-900 to-emerald-950 rounded-3xl p-4 shadow-2xl border border-emerald-400/40 flex items-center justify-center">
            {/* High fidelity stylized SVG leaf and greenhouse arch inspired by screenshot 1 */}
            <svg
              viewBox="0 0 200 200"
              className="w-28 h-28 sm:w-36 sm:h-36 drop-shadow-[0_10px_20px_rgba(16,185,129,0.4)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Greenhouse Arch & Vents */}
              <path
                d="M30 150 V95 C30 55 65 30 100 30 C135 30 170 55 170 95 V150"
                stroke="#34d399"
                strokeWidth="5"
                strokeLinecap="round"
                className="opacity-70"
              />
              <path
                d="M100 30 V50 M30 150 H170"
                stroke="#34d399"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Central Symmetrical Geometric Leaf Layers (as seen in Screenshot 1) */}
              <g className="transition-transform duration-700 transform hover:scale-105">
                {/* Central Top Leaf */}
                <path
                  d="M100 52 C100 52 124 84 124 104 C124 118 113 128 100 128 C87 128 76 118 76 104 C76 84 100 52 100 52 Z"
                  fill="url(#leaf-gradient)"
                />
                {/* Left Tier 1 Leaf */}
                <path
                  d="M68 96 C84 96 98 108 98 126 C98 142 84 150 72 150 C58 150 48 138 48 124 C48 108 68 96 68 96 Z"
                  fill="#10b981"
                  className="opacity-90"
                />
                {/* Right Tier 1 Leaf */}
                <path
                  d="M132 96 C116 96 102 108 102 126 C102 142 116 150 128 150 C142 150 152 138 152 124 C152 108 132 96 132 96 Z"
                  fill="#10b981"
                  className="opacity-90"
                />
                {/* Leaf Central Spine */}
                <path
                  d="M100 70 V144"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M100 105 L116 94 M100 122 L116 112 M100 105 L84 94 M100 122 L84 112"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </g>

              <defs>
                <linearGradient id="leaf-gradient" x1="100" y1="52" x2="100" y2="128" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a3e635" />
                  <stop offset="1" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-2 flex items-center justify-center gap-2">
          <span>Poly</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-lime-300">
            Smart
          </span>
        </h1>

        <p className="text-lg sm:text-xl font-medium text-emerald-200/90 mb-3 tracking-wide">
          {t.tagline}
        </p>

        <p className="text-xs sm:text-sm text-emerald-300/70 max-w-md leading-relaxed">
          {language === 'or'
            ? 'ସ୍ମାର୍ଟ୍ ପଲିହାଉସ୍ ନିୟନ୍ତ୍ରଣ, AI ରୋଗ ନିରୂପଣ, ସରକାରୀ ସବସିଡି (MKUY/MIDH) ଓ ସିଧାସଳଖ ମଣ୍ଡି ବଜାର |'
            : language === 'hi'
            ? 'स्मार्ट पॉलीहाउस नियंत्रण, AI फसल रोग पहचान, सरकारी सब्सिडी एवं सीधी मंडी बिक्री।'
            : 'Autonomous greenhouse micro-climate control, AI crop pathology, government subsidies, and direct mandi linkage.'}
        </p>
      </div>

      {/* Bottom Loading Progress & Get Started Button */}
      <div className="w-full max-w-md flex flex-col items-center gap-4 z-10 pb-6">
        {progress < 100 ? (
          <div className="w-full space-y-2">
            <div className="flex justify-between items-center text-xs text-emerald-300/80 font-mono px-1">
              <span>{language === 'or' ? 'ପଲିହାଉସ୍ ତଥ୍ୟ ଲୋଡ୍ ହେଉଛି...' : 'Initializing Smart Polyhouse Engine...'}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden p-0.5 border border-emerald-500/30">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-lime-400 rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(52,211,153,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-lime-300 animate-fade-in font-medium">
            <CheckCircle2 className="w-4 h-4 text-lime-400" />
            <span>{language === 'or' ? 'ସମସ୍ତ ସେନ୍ସର ଓ ସିଷ୍ଟମ୍ ସକ୍ରିୟ !' : 'All Polyhouse Sensors & AI Ready'}</span>
          </div>
        )}

        <button
          onClick={onComplete}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-green-500 text-stone-950 font-bold text-base shadow-[0_10px_25px_rgba(16,185,129,0.35)] hover:shadow-[0_12px_30px_rgba(16,185,129,0.5)] transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>{t.getStarted}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-[11px] text-emerald-400/60 text-center">
          Empowering Indian Polyhouse Farmers • Govt. of Odisha MKUY Partnered
        </p>
      </div>
    </div>
  );
};
