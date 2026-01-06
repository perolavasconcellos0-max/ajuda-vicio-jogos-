
import React, { useState, useEffect } from 'react';
import { AppTab, UserProgress, GardenItem } from './types';
import Dashboard from './components/Dashboard';
import GardenView from './components/GardenView';
import AIChat from './components/AIChat';
import EmergencyButton from './components/EmergencyButton';
import Header from './components/Header';
import CommunityMural from './components/CommunityMural';
import VisionGallery from './components/VisionGallery';
import AudioPower from './components/AudioPower';
import Onboarding from './components/Onboarding';
import PromotionTips from './components/PromotionTips';
import { LayoutDashboard, Leaf, MessageSquare, AlertCircle, Sparkles, Image as ImageIcon, Headphones, Users } from 'lucide-react';

const INITIAL_PROGRESS: UserProgress = {
  isFirstAccess: true,
  averageWeeklyLoss: 0,
  mainGoal: '',
  daysClean: 0,
  moneySaved: 0,
  timeSaved: 0,
  level: 1,
  experience: 0,
  inventory: [
    { id: '1', type: 'flower', rarity: 'common', name: 'Brotinho da Paz', unlockedAt: new Date().toISOString() }
  ],
  visions: [],
  gratitudeNotes: [],
  seeds: 10,
  lastCheckIn: new Date().toISOString(),
  nextRewardTime: new Date().toISOString(),
  rewardClaims: 0,
  reflectionClicks: 0,
  goodActionsDone: 0,
  attributes: {
    resilience: 1,
    clarity: 1,
    selfControl: 1
  },
  dailyQuests: [
    { id: 'q1', label: 'Beber 2L de água', completed: false, type: 'clarity' },
    { id: 'q2', label: 'Não olhar sites de aposta', completed: false, type: 'resilience' },
    { id: 'q3', label: 'Registrar economia do dia', completed: false, type: 'selfControl' }
  ],
  vitalityPoints: 0,
  ethosCoins: 0,
  streakStartedAt: new Date().toISOString(),
  referralCount: 0
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('serenity_bloom_v10');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...INITIAL_PROGRESS, ...parsed };
    }
    return INITIAL_PROGRESS;
  });

  useEffect(() => {
    localStorage.setItem('serenity_bloom_v10', JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (updates: Partial<UserProgress>) => {
    setProgress(prev => ({ ...prev, ...updates }));
  };

  if (progress.isFirstAccess) {
    return <Onboarding onComplete={(data) => updateProgress({ ...data, isFirstAccess: false })} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard progress={progress} updateProgress={updateProgress} setTab={setActiveTab} />;
      case AppTab.GARDEN:
        return <GardenView progress={progress} />;
      case AppTab.VISION:
        return <VisionGallery progress={progress} updateProgress={updateProgress} />;
      case AppTab.AUDIO:
        return <AudioPower progress={progress} updateProgress={updateProgress} />;
      case AppTab.CHAT:
        return <AIChat progress={progress} />;
      case AppTab.EMERGENCY:
        return <EmergencyButton />;
      case AppTab.COMMUNITY:
        return <CommunityMural progress={progress} updateProgress={updateProgress} />;
      case AppTab.PROMOTE:
        return <PromotionTips onBack={() => setActiveTab(AppTab.DASHBOARD)} moneySaved={progress.moneySaved} daysClean={progress.daysClean} referralCount={progress.referralCount} updateProgress={updateProgress} />;
      default:
        return <Dashboard progress={progress} updateProgress={updateProgress} setTab={setActiveTab} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col bg-[#fcfdfe] shadow-2xl relative overflow-hidden font-sans">
      <Header progress={progress} />
      
      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
        {renderContent()}
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-xl border-t border-slate-100 px-2 py-3 flex justify-around items-center z-50">
        <NavButton 
          active={activeTab === AppTab.DASHBOARD} 
          onClick={() => setActiveTab(AppTab.DASHBOARD)}
          icon={<LayoutDashboard size={18} />}
          label="Início"
        />
        <NavButton 
          active={activeTab === AppTab.GARDEN} 
          onClick={() => setActiveTab(AppTab.GARDEN)}
          icon={<Leaf size={18} />}
          label="Jardim"
        />
        <NavButton 
          active={activeTab === AppTab.VISION} 
          onClick={() => setActiveTab(AppTab.VISION)}
          icon={<ImageIcon size={18} />}
          label="Sonhos"
        />
        <NavButton 
          active={activeTab === AppTab.AUDIO} 
          onClick={() => setActiveTab(AppTab.AUDIO)}
          icon={<Headphones size={18} />}
          label="Refúgio"
        />
        <NavButton 
          active={activeTab === AppTab.COMMUNITY} 
          onClick={() => setActiveTab(AppTab.COMMUNITY)}
          icon={<Users size={18} />}
          label="Pulso"
        />
        <NavButton 
          active={activeTab === AppTab.EMERGENCY} 
          onClick={() => setActiveTab(AppTab.EMERGENCY)}
          icon={<AlertCircle size={18} />}
          label="SOS"
          danger
        />
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label, danger }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all duration-300 ${
      active 
        ? (danger ? 'text-red-500 scale-110' : 'text-emerald-600 scale-110') 
        : 'text-slate-400 hover:text-emerald-400'
    }`}
  >
    <div className={active ? 'drop-shadow-sm' : ''}>
      {icon}
    </div>
    <span className={`text-[7px] font-black uppercase tracking-widest ${active ? 'opacity-100' : 'opacity-60'}`}>
      {label}
    </span>
  </button>
);

export default App;
