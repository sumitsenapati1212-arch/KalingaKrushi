import React, { useState, useEffect } from 'react';
import {
  CloudSun,
  Wind,
  Droplets,
  Thermometer,
  Compass,
  AlertTriangle,
  Calendar,
  Sparkles,
  MapPin,
  RefreshCw,
  Sun,
  CloudRain,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface WeatherForecastProps {
  language: Language;
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({ language }) => {
  const t = translations[language] || translations.en;
  const [district, setDistrict] = useState<string>('Bhubaneswar');
  const [loading, setLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<any>({
    temp: 28.5,
    humidity: 72,
    wind: 3.4,
    code: 1,
    ventStatus: 'Open 40%',
    misting: false,
    daily: [
      { day: 'Today', max: 32, min: 22, rainProb: 10, code: 1 },
      { day: 'Tomorrow', max: 31, min: 21, rainProb: 20, code: 2 },
      { day: 'Wed', max: 33, min: 23, rainProb: 5, code: 0 },
      { day: 'Thu', max: 34, min: 22, rainProb: 15, code: 1 },
      { day: 'Fri', max: 32, min: 21, rainProb: 40, code: 61 },
      { day: 'Sat', max: 30, min: 20, rainProb: 65, code: 63 },
      { day: 'Sun', max: 31, min: 21, rainProb: 30, code: 2 },
    ],
  });

  useEffect(() => {
    let isMounted = true;
    async function loadWeather() {
      setLoading(true);
      try {
        const res = await fetch(`/api/weather?district=${encodeURIComponent(district)}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.current) {
            setWeatherData({
              temp: data.current.temperature_2m,
              humidity: data.current.relative_humidity_2m,
              wind: data.current.wind_speed_10m,
              code: data.current.weather_code,
              ventStatus: data.polyhouseAdvise?.ventStatus || 'Open 40%',
              misting: data.polyhouseAdvise?.mistingRecommended || false,
              daily: data.daily?.temperature_2m_max?.map((max: number, i: number) => ({
                day: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : `Day +${i}`,
                max: Math.round(max),
                min: Math.round(data.daily.temperature_2m_min[i]),
                rainProb: data.daily.precipitation_probability_max?.[i] || 10,
                code: data.daily.weather_code?.[i] || 1,
              })) || weatherData.daily,
            });
          }
        }
      } catch (err) {
        console.error('Weather forecast fetch error:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadWeather();
    return () => {
      isMounted = false;
    };
  }, [district]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 via-green-800 to-teal-900 text-white shadow-xl relative overflow-hidden border border-emerald-700">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-emerald-200 border border-white/15 mb-3">
              <CloudSun className="w-3.5 h-3.5 text-lime-300" />
              <span>Polyhouse Micro-Climate Station</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {t.liveWeather}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-2xl">
              Micro-climate advisory and ventilation guide for protected greenhouses in Odisha
            </p>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-lime-300" />
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="py-2.5 px-4 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-lime-400 cursor-pointer"
            >
              <option value="Bhubaneswar" className="text-slate-900">Bhubaneswar (ଭୁବନେଶ୍ୱର)</option>
              <option value="Sambalpur" className="text-slate-900">Sambalpur (ସମ୍ବଲପୁର)</option>
              <option value="Cuttack" className="text-slate-900">Cuttack (କଟକ)</option>
              <option value="Puri" className="text-slate-900">Puri / Pipili (ପୁରୀ)</option>
              <option value="Bargarh" className="text-slate-900">Bargarh (ବରଗଡ଼)</option>
              <option value="Balasore" className="text-slate-900">Balasore (ବାଲେଶ୍ୱର)</option>
              <option value="Koraput" className="text-slate-900">Koraput (କୋରାପୁଟ)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Current Micro-climate Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-slate-200/80 dark:border-stone-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-bold uppercase tracking-wider">Outside Ambient</span>
            <Thermometer className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="text-4xl font-black text-slate-900 dark:text-white">
              {weatherData.temp}°C
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Internal Polyhouse: <strong>{Math.round((weatherData.temp - 2.5) * 10) / 10}°C</strong>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-stone-800 text-[11px] text-emerald-600 font-semibold">
            Optimal Photosynthesis Window
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-slate-200/80 dark:border-stone-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-bold uppercase tracking-wider">Relative Humidity</span>
            <Droplets className="w-4 h-4 text-cyan-500" />
          </div>
          <div>
            <div className="text-4xl font-black text-slate-900 dark:text-white">
              {weatherData.humidity}%
            </div>
            <div className="text-xs text-slate-500 mt-1">
              VPD Deficit: <strong>0.85 kPa</strong>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-stone-800 text-[11px] text-cyan-600 font-semibold">
            Target Range: 65% – 75%
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-slate-200/80 dark:border-stone-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-bold uppercase tracking-wider">Ventilation Action</span>
            <Wind className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
              {weatherData.ventStatus}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Wind: {weatherData.wind} m/s
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-stone-800 text-[11px] text-slate-600 dark:text-slate-400">
            Open top ridge vents 30 mins before noon
          </div>
        </div>
      </div>

      {/* 7-Day Micro-climate Forecast Cards */}
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-slate-200/80 dark:border-stone-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          7-Day Agro-Climate Outlook
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {weatherData.daily.map((d: any, idx: number) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-stone-800/60 border border-slate-200/60 dark:border-stone-700/60 text-center space-y-2"
            >
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {d.day}
              </div>

              <div className="flex justify-center py-1">
                {d.rainProb > 40 ? (
                  <CloudRain className="w-6 h-6 text-blue-500" />
                ) : (
                  <Sun className="w-6 h-6 text-amber-500" />
                )}
              </div>

              <div className="text-sm font-black text-slate-900 dark:text-white">
                {d.max}° <span className="text-xs text-slate-400 font-normal">/ {d.min}°</span>
              </div>

              <div className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                Rain: {d.rainProb}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
