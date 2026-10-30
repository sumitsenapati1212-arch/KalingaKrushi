import React, { useState } from 'react';
import {
  Globe,
  Bell,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Menu,
  X,
  Shield,
  ShoppingBag,
  Sprout,
  User,
  ChevronDown,
} from 'lucide-react';
import { Language, UserRole, UserProfile } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  openLanguageModal: () => void;
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onToggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
  unreadCount: number;
  onToggleNotifications: () => void;
  userProfile: UserProfile;
  onSpeakAdvisory: () => void;
  isSpeaking: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  openLanguageModal,
  role,
  onRoleChange,
  darkMode,
  onToggleDarkMode,
  onToggleMobileSidebar,
  isMobileSidebarOpen,
  unreadCount,
  onToggleNotifications,
  userProfile,
  onSpeakAdvisory,
  isSpeaking,
}) => {
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const t = translations[language] || translations.en;

  const languagesList: { code: Language; label: string; native: string }[] = [
    { code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ (Odisha)' },
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  ];

  const currentLangObj = languagesList.find((l) => l.code === language) || languagesList[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-stone-800"
            aria-label="Toggle Navigation"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* PolySmart Logo Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-500 flex items-center justify-center shadow-md shadow-emerald-600/30 text-white">
              <svg viewBox="0 0 100 100" className="w-6 h-6 fill-white">
                <path d="M50 10 C32 30 18 45 18 68 C18 84 32 92 50 92 C68 92 82 84 82 68 C82 45 68 30 50 10 Z" />
                <path d="M50 22 C58 38 72 52 72 68 C72 78 62 84 50 84 Z" fill="#bbf7d0" />
                <path d="M50 90 L50 38" stroke="#166534" strokeWidth="4" strokeLinecap="round" />
                <path d="M50 62 L64 52" stroke="#166534" strokeWidth="3" strokeLinecap="round" />
                <path d="M50 74 L36 64" stroke="#166534" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white leading-none">
                Poly<span className="text-emerald-600 dark:text-emerald-400">Smart</span>
              </span>
              <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                {language === 'or' ? 'ସ୍ମାର୍ଟ୍ ପଲିହାଉସ୍' : 'Smart Polyhouse'}
              </span>
            </div>
          </div>
        </div>

        {/* Center / Right: Interactive Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Voice Audio Read-Aloud Button */}
          <button
            onClick={onSpeakAdvisory}
            title={t.audioAdvisory}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isSpeaking
                ? 'bg-amber-500 text-white animate-pulse shadow-md shadow-amber-500/30'
                : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
            <span className="hidden md:inline">{isSpeaking ? 'Speaking...' : t.audioAdvisory}</span>
          </button>

          {/* Role Switcher (Farmer / Buyer / Admin) */}
          <div className="relative">
            <button
              onClick={() => {
                setShowRoleDropdown(!showRoleDropdown);
                setShowLangDropdown(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-stone-800 bg-white dark:bg-stone-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-emerald-400 transition"
            >
              {role === 'farmer' && <Sprout className="w-3.5 h-3.5 text-emerald-600" />}
              {role === 'buyer' && <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />}
              {role === 'admin' && <Shield className="w-3.5 h-3.5 text-amber-600" />}
              <span className="hidden lg:inline capitalize">
                {role === 'farmer' ? t.roleFarmer : role === 'buyer' ? t.roleBuyer : t.roleAdmin}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-slate-100 dark:border-stone-800 py-1.5 z-50">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Active Mode
                </div>
                <button
                  onClick={() => {
                    onRoleChange('farmer');
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs flex items-center gap-2 hover:bg-emerald-50 dark:hover:bg-stone-800 ${
                    role === 'farmer' ? 'text-emerald-600 font-bold bg-emerald-50/50' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Sprout className="w-4 h-4 text-emerald-600" />
                  <span>{t.roleFarmer}</span>
                </button>
                <button
                  onClick={() => {
                    onRoleChange('buyer');
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs flex items-center gap-2 hover:bg-emerald-50 dark:hover:bg-stone-800 ${
                    role === 'buyer' ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 text-blue-600" />
                  <span>{t.roleBuyer}</span>
                </button>
                <button
                  onClick={() => {
                    onRoleChange('admin');
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs flex items-center gap-2 hover:bg-emerald-50 dark:hover:bg-stone-800 ${
                    role === 'admin' ? 'text-amber-600 font-bold bg-amber-50/50' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Shield className="w-4 h-4 text-amber-600" />
                  <span>{t.roleAdmin}</span>
                </button>
              </div>
            )}
          </div>

          {/* Multilingual Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowLangDropdown(!showLangDropdown);
                setShowRoleDropdown(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/60 dark:bg-emerald-950/40 text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 transition shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{currentLangObj.native}</span>
              <ChevronDown className="w-3 h-3 text-emerald-500" />
            </button>

            {showLangDropdown && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-stone-800 py-2 z-50">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>{t.selectLanguage}</span>
                  <button
                    onClick={() => {
                      setShowLangDropdown(false);
                      openLanguageModal();
                    }}
                    className="text-emerald-600 hover:underline text-[10px]"
                  >
                    View All
                  </button>
                </div>
                {languagesList.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onLanguageChange(l.code);
                      setShowLangDropdown(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-emerald-50 dark:hover:bg-stone-800 ${
                      language === l.code
                        ? 'text-emerald-600 font-bold bg-emerald-50/60 dark:bg-emerald-950/40'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="font-medium">{l.native}</span>
                    <span className="text-[10px] text-slate-400">{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <button
            onClick={onToggleNotifications}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-stone-800 transition"
            title={t.notifications}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            )}
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-stone-800 transition"
            title={darkMode ? t.lightMode : t.darkMode}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Farmer Profile Avatar Badge */}
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-stone-800">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-emerald-500/30">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                {userProfile.name}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                {userProfile.district}, Odisha
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
