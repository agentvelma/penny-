
import React from 'react';

interface SidebarProps {
  activeTab: 'dashboard' | 'network' | 'intel' | 'lab' | 'recon';
  setActiveTab: (tab: 'dashboard' | 'network' | 'intel' | 'lab' | 'recon') => void;
  onOpenSettings: () => void;
  onPowerOff: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onOpenSettings, onPowerOff }) => {
  return (
    <nav className="w-16 md:w-20 cyber-bg cyber-border flex flex-col flex-shrink-0 items-center py-6 gap-8 z-20">
      <div className="text-emerald-500 text-2xl mb-4 border-b border-green-900 pb-4 w-10 flex justify-center">
        <i className="fas fa-biohazard animate-spin-slow"></i>
      </div>
      
      <button 
        onClick={() => setActiveTab('dashboard')}
        className={`w-12 h-12 flex items-center justify-center rounded transition-all ${
          activeTab === 'dashboard' ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(0,255,65,0.6)]' : 'text-emerald-500 hover:bg-emerald-950'
        }`}
        title="Dashboard Overview"
      >
        <i className="fas fa-th-large"></i>
      </button>

      <button 
        onClick={() => setActiveTab('network')}
        className={`w-12 h-12 flex items-center justify-center rounded transition-all ${
          activeTab === 'network' ? 'bg-purple-500 text-black shadow-[0_0_15px_rgba(168,85,247,0.6)]' : 'text-purple-500 hover:bg-purple-950'
        }`}
        title="Influence Ops Tracing"
      >
        <i className="fas fa-project-diagram"></i>
      </button>

      <button 
        onClick={() => setActiveTab('recon')}
        className={`w-12 h-12 flex items-center justify-center rounded transition-all ${
          activeTab === 'recon' ? 'bg-red-500 text-black shadow-[0_0_15px_rgba(239,68,68,0.6)]' : 'text-red-500 hover:bg-red-950/20'
        }`}
        title="Reconnaissance Center"
      >
        <i className="fas fa-binoculars"></i>
      </button>

      <button 
        onClick={() => setActiveTab('intel')}
        className={`w-12 h-12 flex items-center justify-center rounded transition-all ${
          activeTab === 'intel' ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.6)]' : 'text-cyan-500 hover:bg-cyan-950'
        }`}
        title="AI Intelligence Terminal"
      >
        <i className="fas fa-brain"></i>
      </button>

      <button 
        onClick={() => setActiveTab('lab')}
        className={`w-12 h-12 flex items-center justify-center rounded transition-all ${
          activeTab === 'lab' ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.6)]' : 'text-amber-500 hover:bg-amber-950'
        }`}
        title="Virtual Lab Infrastructure"
      >
        <i className="fas fa-microchip"></i>
      </button>

      <div className="mt-auto space-y-6 pb-4 flex flex-col items-center">
        <button 
          onClick={onOpenSettings}
          className="text-gray-600 hover:text-emerald-400 transition-colors p-2"
          title="System Settings"
        >
          <i className="fas fa-cog"></i>
        </button>
        <button 
          onClick={onPowerOff}
          className="text-gray-600 hover:text-red-500 transition-colors p-2"
          title="Emergency Power Off"
        >
          <i className="fas fa-power-off"></i>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
