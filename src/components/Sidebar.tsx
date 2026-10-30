import React from 'react';
import {
  LayoutDashboard,
  ScanLine,
  ShoppingBag,
  Calculator,
  GraduationCap,
  Landmark,
  CloudSun,
  Users,
  PhoneCall,
  Activity,
  CheckCircle,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

export type ActiveTab =
  | 'dashboard'
  | 'disease'
  | 'marketplace'
  | 'calculator'
  | 'training'
  | 'schemes'
  | 'weather'
  | 'community';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  language: Language;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  language,
  isMobileOpen,
  onCloseMobile,
}) => {
  const t = translations[language] || translations.en;

  const navItems = [
    {
      id: 'dashboard' as ActiveTab,
      label: t.navDashboard,
      icon: LayoutDashboard,
      badge: 'Live',
    },
    {
      id: 'disease' as ActiveTab,
      label: t.navDiseaseDetection,
      icon: ScanLine,
      badge: 'AI Doctor',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    },
    {
      id: 'marketplace' as ActiveTab,
      label: t.navMarketplace,
      icon: ShoppingBag,
      badge: 'Mandi',
    },
    {
      id: 'calculator' as ActiveTab,
      label: t.navCostCalculator,
      icon: Calculator,
      badge: 'MKUY',
    },
    {
      id: 'training' as ActiveTab,
      label: t.navTraining,
      icon: GraduationCap,
      badge: 'Certificate',
    },
    {
      id: 'schemes' as ActiveTab,
      label: t.navSchemes,
      icon: Landmark,
      badge: '70% Sub',
    },
    {
      id: 'weather' as ActiveTab,
      label: t.navWeather,
      icon: CloudSun,
    },
    {
      id: 'community' as ActiveTab,
      label: t.navCommunity,
      icon: Users,
    },
  ];

  const handleTabClick = (tabId: ActiveTab) => {
    onSelectTab(tabId);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed md:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 lg:w-72 bg-white dark:bg-stone-900 border-r border-slate-200/80 dark:border-stone-800 flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out overflow-y-auto ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* IoT Status Banner */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-green-500/10 to-teal-500/10 border border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <div>
                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  Polyhouse Unit 2
                </div>
                <div className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80">
                  Odisha Agro Zone • 24.8°C
                </div>
              </div>
            </div>
            <Activity className="w-4 h-4 text-emerald-600 animate-pulse" />
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 group text-left ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-stone-800/80 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                        isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-emerald-600'
                      }`}
                    />
                    <span className="tracking-tight">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badgeColor || 'bg-slate-100 dark:bg-stone-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Farmer Support / KVK Card */}
        <div className="pt-4 border-t border-slate-100 dark:border-stone-800 space-y-3">
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50">
            <div className="flex items-center gap-2 mb-1.5">
              <PhoneCall className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="text-xs font-bold text-amber-900 dark:text-amber-200">
                {language === 'or' ? 'କୃଷି ବିଜ୍ଞାନ କେନ୍ଦ୍ର (KVK)' : 'Farmer Support Helpline'}
              </span>
            </div>
            <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80 mb-2">
              {language === 'or'
                ? 'ଓଡ଼ିଶା କୃଷି ବିଭାଗ ନିଃଶୁଳ୍କ ହେଲ୍ପଲାଇନ'
                : 'Toll-free polyhouse expert agronomy advisory'}
            </p>
            <a
              href="tel:18001801551"
              className="w-full py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
            >
              <span>1800-180-1551</span>
            </a>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 font-mono">
            <span>PolySmart v2.4</span>
            <span className="flex items-center gap-1 text-emerald-600">
              <CheckCircle className="w-3 h-3" />
              Online
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
