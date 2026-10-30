import React, { useState, useEffect } from 'react';
import { Language, UserRole, UserProfile, PolyhouseZone, MarketplaceProduct, MandiRateItem } from './types';
import { translations } from './translations';
import { initialZones, initialProducts, mandiRates } from './data/mockData';
import { Splash } from './components/Splash';
import { LanguageModal } from './components/LanguageModal';
import { Navbar } from './components/Navbar';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { DiseaseDetection } from './components/DiseaseDetection';
import { Marketplace } from './components/Marketplace';
import { CostCalculator } from './components/CostCalculator';
import { TrainingCenter } from './components/TrainingCenter';
import { GovernmentSchemes } from './components/GovernmentSchemes';
import { WeatherForecast } from './components/WeatherForecast';
import { CommunityForum } from './components/CommunityForum';
import { NotificationCenter, NotificationItem } from './components/NotificationCenter';

export default function App() {
  // 1. Language state (with persistent localStorage)
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('polysmart_lang');
    return (saved as Language) || 'or'; // default to Odia as specially highlighted by user
  });

  // 2. Onboarding & Splash state
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(() => {
    return !localStorage.getItem('polysmart_lang_chosen');
  });

  // 3. User & Role state
  const [role, setRole] = useState<UserRole>('farmer');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'farmer-101',
    name: 'Ramesh Sahu (ରମେଶ ସାହୁ)',
    phone: '+91 94370 82910',
    village: 'Sasan Polyhouse Hub',
    district: 'Sambalpur',
    state: 'Odisha',
    role: 'farmer',
    language: 'or',
    polyhouseArea: 2500, // sq.m
    polyhouseType: 'Naturally Ventilated Polyhouse (NVPH)',
    activeCrops: ['Dutch Capsicum', 'Dutch Cut Roses', 'Indeterminate Tomato', 'English Cucumber'],
    certificationsCompleted: 1,
  });

  // 4. Navigation & Layout state
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('polysmart_theme') === 'dark';
  });

  // 5. App Data State
  const [zones, setZones] = useState<PolyhouseZone[]>(initialZones);
  const [products, setProducts] = useState<MarketplaceProduct[]>(initialProducts);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      type: 'alert',
      title: 'Polyhouse Bay A1 Humidity Warning',
      message: 'Relative humidity reached 78%. Automated side vents adjusted to 40% open to avoid spore germination.',
      time: '10 mins ago',
      read: false,
    },
    {
      id: 'notif-2',
      type: 'market',
      title: 'Bhubaneswar Mandi Price Surge',
      message: 'Grade A+ Red & Yellow Capsicum modal price increased to ₹65/kg (+8.3%).',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 'notif-3',
      type: 'scheme',
      title: 'Odisha APICOL MKUY Subsidy Window',
      message: 'New sanction tranche released for commercial polyhouses. Submit DPR before 15th.',
      time: '3 hours ago',
      read: true,
    },
    {
      id: 'notif-4',
      type: 'irrigation',
      title: 'Precision Fertigation Completed',
      message: 'Drip schedule of 19:19:19 @ 2.5g/L successfully dispensed in Bay B2.',
      time: '5 hours ago',
      read: true,
    },
  ]);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('polysmart_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('polysmart_theme', 'light');
    }
  }, [darkMode]);

  // Persist language
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('polysmart_lang', lang);
    localStorage.setItem('polysmart_lang_chosen', 'true');
    setUserProfile((prev) => ({ ...prev, language: lang }));
  };

  const handleConfirmLanguageModal = () => {
    localStorage.setItem('polysmart_lang_chosen', 'true');
    setShowLanguageModal(false);
  };

  // Audio Read-aloud feature
  const handleSpeakAdvisory = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const t = translations[language] || translations.en;
    const currentZone = zones[0];
    const textToSpeak =
      language === 'or'
        ? `ପଲିସ୍ମାର୍ଟ ଡ୍ୟାସବୋର୍ଡ ସ୍ଥିତି: ଆପଣଙ୍କ ପଲିହାଉସ୍ ବେ A1 ରେ ତାପମାତ୍ରା ୨୪.୮ ଡିଗ୍ରୀ ଏବଂ ଆର୍ଦ୍ରତା ୭୨ ପ୍ରତିଶତ ରହିଛି | ଗଛର ସ୍ୱାସ୍ଥ୍ୟ ସୂଚକ ୯୫ ପ୍ରତିଶତ ଅଛି | ବଜାରରେ କ୍ୟାପ୍ସିକମ୍ ଦର ୬୫ ଟଙ୍କା କିଲୋ ପ୍ରତି ଚାଲିଛି |`
        : language === 'hi'
        ? `पॉलीस्मार्ट डैशबोर्ड रिपोर्ट: आपके पॉलीहाउस बे A1 में तापमान 24.8 डिग्री और आर्द्रता 72% है। फसल स्वास्थ्य 95% उत्तम है। शिमला मिर्च का मंडी भाव ₹65 प्रति किलो है।`
        : `PolySmart Advisory: Your polyhouse greenhouse is operating at 24.8 degrees Celsius with 72% relative humidity. Crop health score is 95%. Wholesale capsicum rate is 65 rupees per kg.`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language === 'hi' ? 'hi-IN' : language === 'bn' ? 'bn-IN' : language === 'te' ? 'te-IN' : 'en-US';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleAddProduct = (newProd: MarketplaceProduct) => {
    setProducts([newProd, ...products]);
  };

  const handleUpdateZone = (updatedZone: PolyhouseZone) => {
    setZones((prev) => prev.map((z) => (z.id === updatedZone.id ? updatedZone : z)));
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleDismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-stone-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* 1. Animated Splash Screen */}
      {showSplash && (
        <Splash language={language} onComplete={() => setShowSplash(false)} />
      )}

      {/* 2. Language Selection Modal (Onboarding or Manual) */}
      <LanguageModal
        isOpen={showLanguageModal}
        currentLanguage={language}
        onSelectLanguage={handleLanguageChange}
        onConfirm={handleConfirmLanguageModal}
      />

      {/* 3. Top Navbar */}
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        openLanguageModal={() => setShowLanguageModal(true)}
        role={role}
        onRoleChange={setRole}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isMobileSidebarOpen={isMobileSidebarOpen}
        unreadCount={notifications.filter((n) => !n.read).length}
        onToggleNotifications={() => setIsNotificationOpen(true)}
        userProfile={userProfile}
        onSpeakAdvisory={handleSpeakAdvisory}
        isSpeaking={isSpeaking}
      />

      {/* 4. Main Body with Responsive Sidebar and Content Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          language={language}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <Dashboard
              language={language}
              userProfile={userProfile}
              zones={zones}
              onUpdateZone={handleUpdateZone}
              mandiRates={mandiRates}
              onNavigateTab={setActiveTab}
              onOpenDiseaseScanner={() => setActiveTab('disease')}
            />
          )}

          {activeTab === 'disease' && (
            <DiseaseDetection language={language} />
          )}

          {activeTab === 'marketplace' && (
            <Marketplace
              language={language}
              role={role}
              products={products}
              onAddProduct={handleAddProduct}
            />
          )}

          {activeTab === 'calculator' && (
            <CostCalculator language={language} />
          )}

          {activeTab === 'training' && (
            <TrainingCenter language={language} userProfile={userProfile} />
          )}

          {activeTab === 'schemes' && (
            <GovernmentSchemes language={language} />
          )}

          {activeTab === 'weather' && (
            <WeatherForecast language={language} />
          )}

          {activeTab === 'community' && (
            <CommunityForum language={language} userProfile={userProfile} />
          )}
        </main>
      </div>

      {/* 5. Notification Center Slide-over */}
      <NotificationCenter
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        language={language}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
        onDismiss={handleDismissNotification}
      />
    </div>
  );
}
