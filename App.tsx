
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Terminal from './components/Terminal';
import NetworkVisualizer from './components/NetworkVisualizer';
import HardwareLab from './components/HardwareLab';
import ReconCenter from './components/ReconCenter';
import { INITIAL_LOGS } from './constants';
import { LogEntry } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'network' | 'intel' | 'lab' | 'recon'>('dashboard');
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [showSettings, setShowSettings] = useState(false);
  const [isPoweredOff, setIsPoweredOff] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);

  // Simulate incoming logs
  useEffect(() => {
    if (isPoweredOff || isShuttingDown) return;
    const interval = setInterval(() => {
      const sources = ['CRABBY', 'PENNY', 'BOT_MANAGER', 'FIREWALL'];
      const messages = [
        'Heartbeat signal verified.',
        'Network packet analyzed: ICMP Echo.',
        'Anomaly detected in outbound traffic.',
        'User authentication successful: ADMIN.',
        'Influence cluster re-calculated.'
      ];
      
      const newLog: LogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
        level: Math.random() > 0.8 ? 'WARN' : 'INFO',
        source: sources[Math.floor(Math.random() * sources.length)],
        message: messages[Math.floor(Math.random() * messages.length)]
      };
      
      setLogs(prev => [...prev.slice(-49), newLog]);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isPoweredOff, isShuttingDown]);

  const handlePowerOff = () => {
    setIsShuttingDown(true);
    setTimeout(() => {
      setIsPoweredOff(true);
      setIsShuttingDown(false);
    }, 3000);
  };

  const handleReboot = () => {
    setIsPoweredOff(false);
    setActiveTab('dashboard');
    setLogs(INITIAL_LOGS);
  };

  if (isPoweredOff) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center font-mono cursor-none">
        <div className="text-emerald-900 text-xs mb-8 opacity-20">SYSTEM_HALTED // NO_KERNEL_LOADED</div>
        <button 
          onClick={handleReboot}
          className="px-6 py-2 border border-emerald-900 text-emerald-900 hover:border-emerald-500 hover:text-emerald-500 transition-all text-xs tracking-[0.5em]"
        >
          REBOOT_SYSTEM
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#050505] text-emerald-500 overflow-hidden p-2 gap-2 relative">
      {/* Shutdown Overlay */}
      {isShuttingDown && (
        <div className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
          <div className="text-red-500 text-2xl font-bold mb-4 animate-pulse tracking-[0.2em]">EMERGENCY_SHUTDOWN_SEQUENCE</div>
          <div className="w-64 h-1 bg-gray-900 mb-4 overflow-hidden cyber-border">
            <div className="h-full bg-red-600 animate-[loading_3s_ease-in-out]"></div>
          </div>
          <div className="text-[10px] text-gray-500 space-y-1 font-mono uppercase">
            <div>Purging volatile memory...</div>
            <div>Terminating sentinel processes...</div>
            <div>Closing secure tunnels...</div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="cyber-border cyber-bg w-full max-w-md p-6 flex flex-col gap-6 relative">
            <button 
              onClick={() => setShowSettings(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <i className="fas fa-times"></i>
            </button>
            <h2 className="text-sm font-bold tracking-[0.3em] border-b border-green-900 pb-2 flex items-center gap-2">
              <i className="fas fa-sliders-h"></i> KERNEL_SETTINGS
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border border-green-900/30">
                <div>
                  <div className="text-xs font-bold">DEEP_PACKET_INSPECTION</div>
                  <div className="text-[10px] text-gray-500">Enable L7 filtering via Crabby AI</div>
                </div>
                <div className="w-10 h-5 bg-emerald-900 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-emerald-400 rounded-full"></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 border border-green-900/30">
                <div>
                  <div className="text-xs font-bold">ANONYMOUS_PROXY_MODE</div>
                  <div className="text-[10px] text-gray-500">Route all recon traffic through TOR</div>
                </div>
                <div className="w-10 h-5 bg-gray-800 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-gray-600 rounded-full"></div>
                </div>
              </div>

              <div className="flex flex-col gap-2 p-3 border border-green-900/30">
                <div className="text-xs font-bold uppercase tracking-widest">Primary Intelligence Core</div>
                <select className="bg-black border border-green-900 text-[10px] p-1 outline-none text-emerald-400">
                  <option>gemini-3-flash-preview (Standard)</option>
                  <option>gemini-3-pro-preview (Advanced Reasoning)</option>
                </select>
              </div>
            </div>

            <button 
              onClick={() => setShowSettings(false)}
              className="w-full py-2 bg-emerald-950 border border-emerald-500 text-xs hover:bg-emerald-800"
            >
              APPLY_CHANGES
            </button>
          </div>
        </div>
      )}

      {/* Sidebar Navigation - Forced width for stability */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab as any} 
        onOpenSettings={() => setShowSettings(true)}
        onPowerOff={handlePowerOff}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col gap-2 overflow-hidden min-w-0">
        {/* Header */}
        <header className="cyber-border cyber-bg p-4 flex justify-between items-center h-16 flex-shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold tracking-[0.2em] glow-text flex items-center gap-2">
              <i className="fas fa-shield-halved text-emerald-400 animate-pulse"></i>
              PENNY R23
            </h1>
            <div className="h-6 w-px bg-green-900"></div>
            <div className="flex gap-4 text-[10px] uppercase text-gray-500 font-mono">
              <span className="flex items-center gap-1"><i className="fas fa-circle text-emerald-500 text-[6px]"></i> KERNEL_ACTIVE</span>
              <span className="flex items-center gap-1"><i className="fas fa-circle text-emerald-500 text-[6px]"></i> PROXY_READY</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-[9px] text-gray-500 tracking-widest">THREAT_LEVEL</div>
              <div className="text-amber-500 text-xs font-bold tracking-widest">ELEVATED (GUARDED)</div>
            </div>
            <button 
              onClick={handlePowerOff}
              className="cyber-border hover:bg-red-950 hover:border-red-500 px-4 py-1 text-xs transition-colors group"
            >
              <span className="group-hover:text-red-500 uppercase tracking-tighter">EMERGENCY_PURGE</span>
            </button>
          </div>
        </header>

        {/* View Switching Container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'network' && (
            <div className="flex flex-col gap-4">
              <NetworkVisualizer />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="cyber-border cyber-bg p-4 h-64 overflow-y-auto">
                  <h4 className="text-sm font-bold mb-2 border-b border-green-900 uppercase">Bot_Farm_Identified</h4>
                  <ul className="text-xs space-y-2 text-emerald-400/80">
                    <li>Cluster Alpha (185.x.x.x) - High Coordination (0.89)</li>
                    <li>Cluster Gamma (103.x.x.x) - Political Sentiment (MAL)</li>
                    <li>Cluster Delta (45.x.x.x) - Crypto Spam Pattern</li>
                  </ul>
                </div>
                <div className="cyber-border cyber-bg p-4 h-64">
                   <h4 className="text-sm font-bold mb-2 border-b border-green-900 uppercase">Gephi_Snapshot_Data</h4>
                   <div className="flex items-center justify-center h-full text-gray-600 text-[10px]">
                      [ GEXF EXPORT READY ]
                   </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'intel' && (
             <div className="h-full">
                <Terminal logs={logs} />
             </div>
          )}
          {activeTab === 'lab' && <HardwareLab />}
          {activeTab === 'recon' && <ReconCenter />}
        </div>
      </main>

      {/* Right Sidebar - Active Intel Stream (Only on wide screens) */}
      <aside className="hidden xl:flex w-80 flex-shrink-0 flex-col gap-2">
        <div className="flex-1 min-h-0">
          <Terminal logs={logs} />
        </div>
        <div className="h-1/3 cyber-border cyber-bg p-4 overflow-hidden flex flex-col flex-shrink-0">
          <h3 className="text-xs font-bold border-b border-green-900 mb-2 pb-1 uppercase tracking-widest">Recon_Feed</h3>
          <div className="text-[10px] space-y-2 overflow-y-auto scrollbar-hide">
             <div className="flex gap-2">
                <span className="text-emerald-300">[SHODAN]</span>
                <span className="text-gray-500">Service: HTTP/1.1 (80)</span>
             </div>
             <div className="flex gap-2">
                <span className="text-purple-300">[WHOIS]</span>
                <span className="text-gray-500">Domain expiry: 12-2025</span>
             </div>
             <div className="flex gap-2">
                <span className="text-cyan-300">[CENSYS]</span>
                <span className="text-gray-500">Cert: Let's Encrypt (RSA)</span>
             </div>
             <div className="flex gap-2 border-t border-green-900/30 pt-1 mt-1">
                <span className="text-red-400">[ALARM]</span>
                <span className="text-gray-400 italic">Subdomain enumeration started...</span>
             </div>
          </div>
        </div>
      </aside>

      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #050505; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #00ff41; border-radius: 2px; }
      `}</style>
    </div>
  );
};

export default App;
