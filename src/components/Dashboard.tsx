import React, { useState, useEffect } from 'react';
import {
  CloudSun,
  Wind,
  Droplets,
  HeartPulse,
  Layers,
  Thermometer,
  Zap,
  Sparkles,
  ArrowUpRight,
  Send,
  ScanLine,
  Calculator,
  TrendingUp,
  GraduationCap,
  BellRing,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  MapPin,
  Calendar,
  Volume2,
} from 'lucide-react';
import { Language, UserProfile, PolyhouseZone, MandiRateItem } from '../types';
import { translations } from '../translations';
import { ActiveTab } from './Sidebar';

interface DashboardProps {
  language: Language;
  userProfile: UserProfile;
  zones: PolyhouseZone[];
  onUpdateZone: (zone: PolyhouseZone) => void;
  mandiRates: MandiRateItem[];
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenDiseaseScanner: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  language,
  userProfile,
  zones,
  onUpdateZone,
  mandiRates,
  onNavigateTab,
  onOpenDiseaseScanner,
}) => {
  const t = translations[language] || translations.en;

  const [selectedZone, setSelectedZone] = useState<PolyhouseZone>(zones[0]);
  const [district, setDistrict] = useState<string>(userProfile.district || 'Bhubaneswar');
  const [autoWateringGlobal, setAutoWateringGlobal] = useState<boolean>(true);
  const [aiQuestion, setAiQuestion] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiMessages, setAiMessages] = useState<
    { sender: 'user' | 'ai'; text: string; time: string }[]
  >([
    {
      sender: 'ai',
      text:
        language === 'or'
          ? 'ଜୋନ୍ A1 (କ୍ୟାପ୍ସିକମ୍) ପାଇଁ ପରାମର୍ଶ: ଆଜି ବାହାର ଆର୍ଦ୍ରତା ୭୨% ରହିଛି | ପଲିହାଉସ୍ ସାଇଡ୍ ଭେଣ୍ଟ୍ ୪୦% ଖୋଲା ରଖନ୍ତୁ ଏବଂ ଅପରାହ୍ନ ୨ଟାରେ ୧୫ ମିନିଟ୍ ବୁନ୍ଦା ଜଳସେଚନ ଦିଅନ୍ତୁ |'
          : language === 'hi'
          ? 'ज़ोन A1 (शिमला मिर्च) के लिए सलाह: आज बाहरी आर्द्रता 72% है। साइड कर्टेन 40% खुला रखें और दोपहर 2 बजे 15 मिनट ड्रिप सिंचाई चलाएं।'
          : 'Advisory for Area 1 (Capsicum): Relative humidity is 72%. Keep side curtain vents cracked at 40% until 4 PM. Target EC 2.1 mS/cm during upcoming fruit-filling cycle.',
      time: '08:15 AM',
    },
  ]);

  const [weatherData, setWeatherData] = useState<{
    temp: number;
    humidity: number;
    wind: number;
    condition: string;
    ventStatus: string;
  }>({
    temp: 26.5,
    humidity: 74,
    wind: 3.4,
    condition: 'Partly Sunny',
    ventStatus: 'Vent Open 40%',
  });

  // Fetch real weather from backend proxy
  useEffect(() => {
    let isMounted = true;
    async function fetchWeather() {
      try {
        const res = await fetch(`/api/weather?district=${encodeURIComponent(district)}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.current) {
            setWeatherData({
              temp: data.current.temperature_2m,
              humidity: data.current.relative_humidity_2m,
              wind: data.current.wind_speed_10m,
              condition: data.current.weather_code === 0 ? 'Clear Skies' : 'Optimal Polyhouse Climate',
              ventStatus: data.polyhouseAdvise?.ventStatus || 'Vent Open 40%',
            });
          }
        }
      } catch (e) {
        console.error('Weather error:', e);
      }
    }
    fetchWeather();
    return () => {
      isMounted = false;
    };
  }, [district]);

  // Handle AI query
  const handleSendAi = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiQuestion.trim() || isAiLoading) return;

    const userText = aiQuestion.trim();
    setAiQuestion('');
    setAiMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);

    setIsAiLoading(true);
    try {
      const response = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userText,
          language,
          farmContext: {
            selectedCrop: selectedZone.crop,
            temperature: selectedZone.temperature,
            humidity: selectedZone.humidity,
            district,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: data.advice || 'Follow recommended irrigation and vent schedule.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } catch (err) {
      console.error('AI Advisor error:', err);
      setAiMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text:
            language === 'or'
              ? 'ମାଟିର pH ୬.୦ ରୁ ୬.୨ ଏବଂ EC ୨.୦ ମଧ୍ୟରେ ରଖନ୍ତୁ | ଫଙ୍ଗସ୍ ସଂକ୍ରମଣରୁ ରକ୍ଷା ପାଇବା ପାଇଁ ଅପରାହ୍ନ ପରେ ସ୍ପ୍ରେ କରନ୍ତୁ ନାହିଁ |'
              : 'Maintain water pH between 6.0–6.2 and EC at 2.0. Avoid foliar misting after sunset to protect leaves from spore germination.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const toggleZoneAutoWatering = (zoneId: string) => {
    const updated = { ...selectedZone, autoWatering: !selectedZone.autoWatering };
    setSelectedZone(updated);
    onUpdateZone(updated);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* 1. Header Banner & Farmer Profile Overview */}
      <div className="relative rounded-3xl bg-gradient-to-r from-emerald-800 via-green-800 to-emerald-900 text-white p-6 sm:p-8 shadow-xl overflow-hidden border border-emerald-700/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-lime-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-emerald-200 border border-white/15">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              <span>{userProfile.polyhouseType} • {userProfile.polyhouseArea} m² ({Math.round(userProfile.polyhouseArea * 0.000247105 * 100) / 100} Acres)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.welcomeFarmer}, {userProfile.name}! 👋
            </h1>

            <p className="text-emerald-100/90 text-sm max-w-2xl leading-relaxed">
              {language === 'or'
                ? `ଆପଣଙ୍କ ପଲିହାଉସ୍ (ୟୁନିଟ୍ ୨, ${userProfile.district}) ର ସମସ୍ତ ୪ଟି ବେ' ରେ ତାପମାତ୍ରା ଓ ଆର୍ଦ୍ରତା ନିୟନ୍ତ୍ରଣ ଅନୁକୂଳ ଅଛି | ଫସଲ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚକ ୯୫% ରହିଛି |`
                : `All 4 bays in your ${userProfile.district} greenhouse cluster are operating in optimal micro-climate conditions. Plant Health Index is at 95%.`}
            </p>
          </div>

          {/* Quick Weather & District Switcher Badge */}
          <div className="w-full lg:w-auto flex flex-wrap sm:flex-nowrap items-center gap-3 bg-black/25 backdrop-blur-md p-3 rounded-2xl border border-white/15">
            <div className="flex items-center gap-2.5 pr-3 border-r border-white/20">
              <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300">
                <CloudSun className="w-6 h-6" />
              </div>
              <div>
                <div className="text-lg font-bold leading-none">{weatherData.temp}°C</div>
                <div className="text-[11px] text-emerald-200">{weatherData.condition}</div>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2 text-emerald-100">
                <Wind className="w-3.5 h-3.5 text-lime-300" />
                <span>{t.windSpeed}: <strong>{weatherData.wind} m/s</strong></span>
              </div>
              <div className="flex items-center gap-2 text-emerald-100">
                <Droplets className="w-3.5 h-3.5 text-cyan-300" />
                <span>{t.humidity}: <strong>{weatherData.humidity}%</strong></span>
              </div>
            </div>

            <div className="pl-2">
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="bg-white/15 border border-white/30 rounded-xl px-2.5 py-1 text-xs text-white font-semibold focus:outline-none focus:ring-2 focus:ring-lime-400 cursor-pointer"
              >
                <option value="Bhubaneswar" className="text-slate-900">Bhubaneswar (ଭୁବନେଶ୍ୱର)</option>
                <option value="Sambalpur" className="text-slate-900">Sambalpur (ସମ୍ବଲପୁର)</option>
                <option value="Cuttack" className="text-slate-900">Cuttack (କଟକ)</option>
                <option value="Puri" className="text-slate-900">Puri / Pipili (ପୁରୀ / ପିପିଲି)</option>
                <option value="Bargarh" className="text-slate-900">Bargarh (ବରଗଡ଼)</option>
                <option value="Balasore" className="text-slate-900">Balasore (ବାଲେଶ୍ୱର)</option>
                <option value="Koraput" className="text-slate-900">Koraput (କୋରାପୁଟ)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Metric Cards Row (Inspired by Screenshot 1) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Plant Health */}
        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-slate-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span className="font-medium truncate">{t.overallPlantHealth}</span>
            <HeartPulse className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
            95%
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 mt-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>Optimal Vitality</span>
          </div>
        </div>

        {/* Active Crop Zones */}
        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-slate-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span className="font-medium truncate">{t.activeCropZones}</span>
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            4 Bays
          </div>
          <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium mt-1">
            {zones.length} Protected Zones
          </div>
        </div>

        {/* Soil & Substrate Status */}
        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-slate-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span className="font-medium truncate">{t.soilNutrientStatus}</span>
            <Droplets className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">
            Optimal
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            EC: 2.1 • Moisture 68%
          </div>
        </div>

        {/* Auto Watering Toggle */}
        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-slate-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span className="font-medium truncate">{t.autoWatering}</span>
            <Zap className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              {autoWateringGlobal ? 'Active' : 'Paused'}
            </div>
            <button
              onClick={() => setAutoWateringGlobal(!autoWateringGlobal)}
              className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
                autoWateringGlobal ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-stone-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  autoWateringGlobal ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          <div className="text-[11px] text-cyan-600 dark:text-cyan-400 mt-1">
            Interval: 3 Hours
          </div>
        </div>

        {/* pH Balancer */}
        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-slate-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span className="font-medium truncate">{t.phBalancer}</span>
            <Thermometer className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            6.2 pH
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            Automatic Dosing
          </div>
        </div>

        {/* Fertilizer Application Gauge */}
        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-slate-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span className="font-medium truncate">{t.fertilizerDosage}</span>
            <Sparkles className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white">
            Moderate
          </div>
          <div className="w-full bg-slate-100 dark:bg-stone-800 h-2 rounded-full mt-2 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 w-3/4 h-full rounded-full" />
          </div>
        </div>
      </div>

      {/* 3. Main Interactive Polyhouse Zone View & Growth Analytics + AI Assistant (Screenshot 1 Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Polyhouse Visual Zone & IoT Telemetry (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-slate-200/80 dark:border-stone-800 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-600" />
                  <span>{t.zoneMapTitle}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select a polyhouse bay to inspect micro-sensors and crop health
                </p>
              </div>

              {/* Bay selector tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-stone-800 overflow-x-auto max-w-full">
                {zones.map((z) => (
                  <button
                    key={z.id}
                    onClick={() => setSelectedZone(z)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                      selectedZone.id === z.id
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    {z.name.replace('Polyhouse Bay ', 'Bay ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Zone Card (Visual Banner + Sensor Log) */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-stone-700">
              <div className="h-52 w-full relative">
                <img
                  src={selectedZone.imageUrl}
                  alt={selectedZone.crop}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Floating Zone Tag */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                    {selectedZone.name}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      selectedZone.healthScore >= 90
                        ? 'bg-emerald-500/90 text-white'
                        : 'bg-amber-500/90 text-white'
                    }`}
                  >
                    Health: {selectedZone.healthScore}%
                  </span>
                </div>

                {/* Crop & Timeline Info at bottom of image */}
                <div className="absolute bottom-3 left-3 right-3 text-white flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2">
                  <div>
                    <h4 className="text-xl font-black">{selectedZone.crop}</h4>
                    <p className="text-xs text-emerald-200">{selectedZone.variety}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                    <div>
                      <span className="text-slate-300 block text-[10px]">Planted:</span>
                      <span className="font-bold">{selectedZone.plantedDate}</span>
                    </div>
                    <div className="w-px h-6 bg-white/20" />
                    <div>
                      <span className="text-slate-300 block text-[10px]">Harvest:</span>
                      <span className="font-bold text-lime-300">{selectedZone.harvestDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sensor Telemetry Grid for Selected Zone */}
              <div className="p-4 bg-slate-50 dark:bg-stone-800/60 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-slate-200/60 dark:border-stone-700">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Temperature</div>
                  <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                    {selectedZone.temperature}°C
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">Optimal (24–28°C)</div>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-slate-200/60 dark:border-stone-700">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Humidity</div>
                  <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                    {selectedZone.humidity}%
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">Under Control</div>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-slate-200/60 dark:border-stone-700">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Soil Moisture</div>
                  <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                    {selectedZone.soilMoisture}%
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">Adequate Drip</div>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-slate-200/60 dark:border-stone-700 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">Irrigation Drip</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                      {selectedZone.autoWatering ? 'On' : 'Off'}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleZoneAutoWatering(selectedZone.id)}
                    className="mt-1 text-[10px] font-bold text-emerald-600 hover:text-emerald-700 text-left underline"
                  >
                    Toggle Bay Valve
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Shortcuts (Row) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={onOpenDiseaseScanner}
              className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white font-bold text-xs flex flex-col items-center justify-center gap-2 shadow-md shadow-emerald-600/20 hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              <ScanLine className="w-5 h-5" />
              <span>{t.scanDiseaseNow}</span>
            </button>

            <button
              onClick={() => onNavigateTab('marketplace')}
              className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 font-bold text-xs text-slate-800 dark:text-slate-100 flex flex-col items-center justify-center gap-2 shadow-sm hover:border-emerald-500 transition transform hover:-translate-y-0.5"
            >
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>{t.checkMandiRates}</span>
            </button>

            <button
              onClick={() => onNavigateTab('calculator')}
              className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 font-bold text-xs text-slate-800 dark:text-slate-100 flex flex-col items-center justify-center gap-2 shadow-sm hover:border-emerald-500 transition transform hover:-translate-y-0.5"
            >
              <Calculator className="w-5 h-5 text-amber-500" />
              <span>{t.calculateCost}</span>
            </button>

            <button
              onClick={() => onNavigateTab('training')}
              className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 font-bold text-xs text-slate-800 dark:text-slate-100 flex flex-col items-center justify-center gap-2 shadow-sm hover:border-emerald-500 transition transform hover:-translate-y-0.5"
            >
              <GraduationCap className="w-5 h-5 text-indigo-500" />
              <span>{t.viewTraining}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Growth Analytics Gauge & AI Agronomist Chat (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Growth Analytics Arc Card (Screenshot 1 element) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-slate-200/80 dark:border-stone-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.growthAnalytics}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Vegetative maturity & biomass trajectory
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                Strong Balance
              </span>
            </div>

            {/* Circular SVG Gauge for 87% */}
            <div className="flex flex-col items-center justify-center py-2">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Track Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-slate-100 dark:text-stone-800"
                    fill="transparent"
                  />
                  {/* Progress Arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 * (1 - 0.87)}
                    strokeLinecap="round"
                    className="text-emerald-500 transition-all duration-1000 ease-out"
                    fill="transparent"
                  />
                </svg>

                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-slate-900 dark:text-white leading-none">
                    87%
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                    {t.growthLevel}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 w-full mt-3 text-center border-t border-slate-100 dark:border-stone-800 pt-3">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Max Score</div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200">92 Max</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Min Recorded</div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200">72 Min</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Cluster Average</div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200">84 Avg</div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Agronomist Panel (Screenshot 1 element) */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50 to-green-50/50 dark:from-stone-900 dark:to-stone-900 border border-emerald-200 dark:border-stone-800 shadow-sm flex flex-col h-[400px]">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-100 dark:border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {t.aiAdvisoryTitle}
                  </h4>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400">
                    Grounded with Odisha Agriculture & KVK Database
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200/80 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300">
                Online
              </span>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1 text-xs">
              {aiMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : 'bg-white dark:bg-stone-800 text-slate-800 dark:text-slate-100 border border-emerald-100 dark:border-stone-700 rounded-tl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-0.5 px-1">{msg.time}</span>
                </div>
              ))}

              {isAiLoading && (
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-white dark:bg-stone-800 text-slate-500 text-xs">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                  <span>PolySmart AI is formulating agronomy response...</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendAi} className="pt-2 flex items-center gap-2">
              <input
                type="text"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder={t.askAiPlaceholder}
                className="flex-1 bg-white dark:bg-stone-800 border border-slate-200 dark:border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={!aiQuestion.trim() || isAiLoading}
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 4. Live Mandi Market Prices Ticker Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-slate-200/80 dark:border-stone-800 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>
                {language === 'or' ? 'ଆଜିର ଲାଇଭ୍ ମଣ୍ଡି ବଜାର ଦର (Odisha Mandi Prices)' : 'Today Live Odisha Mandi Rates'}
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verified daily benchmark prices for protected cultivation vegetables & flowers
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('marketplace')}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>View Full Market</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {mandiRates.map((mandi, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-stone-800/60 border border-slate-200/60 dark:border-stone-700/60"
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {mandi.commodity}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {mandi.market}
              </div>

              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">
                  ₹{mandi.modalPrice}
                </span>
                <span className="text-[10px] text-slate-400">{mandi.unit}</span>
              </div>

              <div className="mt-1 flex items-center justify-between text-[10px]">
                <span className="text-slate-400">Range: ₹{mandi.minPrice} - ₹{mandi.maxPrice}</span>
                <span
                  className={`font-bold ${
                    mandi.trend === 'up'
                      ? 'text-emerald-600'
                      : mandi.trend === 'down'
                      ? 'text-rose-600'
                      : 'text-slate-500'
                  }`}
                >
                  {mandi.changePercent > 0 ? `+${mandi.changePercent}%` : `${mandi.changePercent}%`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
