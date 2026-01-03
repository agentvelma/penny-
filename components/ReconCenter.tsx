
import React, { useState } from 'react';
import { getSecurityInsights } from '../services/geminiService';

const ReconCenter: React.FC = () => {
  const [targetUrl, setTargetUrl] = useState('');
  const [targetIp, setTargetIp] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [rawData, setRawData] = useState('');
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const tools = [
    { id: 'bot', name: 'BOT_MANAGER', icon: 'fa-robot', color: 'text-purple-400' },
    { id: 'firewall', name: 'FIREWALL_CFG', icon: 'fa-fire-extinguisher', color: 'text-orange-500' },
    { id: 'osint', name: 'X_OSINT_SUITE', icon: 'fa-globe-americas', color: 'text-cyan-400' },
    { id: 'rev', name: 'REV_ENGINEER', icon: 'fa-code-branch', color: 'text-emerald-400' },
    { id: 'calc', name: 'METATRON_CALC', icon: 'fa-calculator', color: 'text-amber-500' },
    { id: 'cloud', name: 'CLOUD_SENTINEL', icon: 'fa-cloud-meatball', color: 'text-blue-400' },
  ];

  const runAnalysis = async (type: string, inputData: string) => {
    if (!inputData.trim()) return;
    setIsAnalyzing(true);
    let prompt = '';

    switch(type) {
      case 'URL':
        prompt = `Conduct an OSINT reconnaissance analysis on URL: ${inputData}. Search for CMS, platform manipulation, and bot farm signatures.`;
        break;
      case 'IP':
        prompt = `Perform a deep footprinting on IP: ${inputData}. Check for open ports, vulnerabilities, and geographic attribution.`;
        break;
      case 'GITHUB':
        prompt = `Simulate a security audit for the GitHub repository: ${inputData}. Identify potential secrets leakage (API keys), vulnerable dependencies, and common coding flaws (OWASP Top 10) in this specific repo context.`;
        break;
      case 'DATA':
        prompt = `Analyze this security data blob for patterns of exploitation or influence operations: ${inputData}`;
        break;
      default:
        prompt = `Quick analysis for tool ${type}: ${inputData}`;
    }

    const result = await getSecurityInsights(prompt, `Target: ${inputData} Type: ${type}`);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="flex flex-col gap-6 pb-20 overflow-y-visible">
      {/* Top Banner Status */}
      <div className="cyber-border cyber-bg p-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-[10px] font-bold tracking-[0.4em]">RECON_ACTIVE // LISTENING_ON_TUNNELS</span>
        </div>
        <div className="text-[9px] text-gray-500 uppercase">Proxy: TOR_ROUTING_ACTIVE</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Ingestion Suite */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="cyber-border cyber-bg p-5 flex flex-col gap-5">
            <h3 className="text-xs font-bold tracking-[0.3em] border-b border-green-900 pb-3 flex items-center gap-2">
              <i className="fas fa-satellite text-red-500"></i> TARGET_INGESTION_SUITE
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Domain / Web Target</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 bg-black/80 border border-green-900 p-2 text-xs text-emerald-400 outline-none focus:border-emerald-500 transition-all placeholder:text-gray-800"
                  />
                  <button 
                    onClick={() => runAnalysis('URL', targetUrl)}
                    disabled={!targetUrl || isAnalyzing}
                    className="px-4 bg-emerald-950 border border-emerald-500 text-[10px] hover:bg-emerald-800 disabled:opacity-50 transition-colors uppercase font-bold"
                  >
                    OSINT
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">IP / Endpoint</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={targetIp}
                    onChange={(e) => setTargetIp(e.target.value)}
                    placeholder="8.8.8.8"
                    className="flex-1 bg-black/80 border border-green-900 p-2 text-xs text-emerald-400 outline-none focus:border-emerald-500 transition-all placeholder:text-gray-800"
                  />
                  <button 
                    onClick={() => runAnalysis('IP', targetIp)}
                    disabled={!targetIp || isAnalyzing}
                    className="px-4 bg-red-950 border border-red-500 text-red-500 text-[10px] hover:bg-red-900 disabled:opacity-50 transition-colors uppercase font-bold"
                  >
                    TRACE
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">GitHub Repository Scan</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/user/repo"
                    className="flex-1 bg-black/80 border border-cyan-900 p-2 text-xs text-cyan-400 outline-none focus:border-cyan-500 transition-all placeholder:text-gray-800"
                  />
                  <button 
                    onClick={() => runAnalysis('GITHUB', githubUrl)}
                    disabled={!githubUrl || isAnalyzing}
                    className="px-6 bg-cyan-950 border border-cyan-500 text-cyan-400 text-[10px] hover:bg-cyan-800 disabled:opacity-50 transition-colors uppercase font-bold flex items-center gap-2"
                  >
                    <i className="fab fa-github"></i> AUDIT_REPO
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <label className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Data Payload Analysis</label>
              <textarea 
                value={rawData}
                onChange={(e) => setRawData(e.target.value)}
                placeholder="Paste decrypted logs, hex dumps, or JSON blobs..."
                className="w-full bg-black/80 border border-green-900 p-3 text-xs text-emerald-400 outline-none focus:border-emerald-500 transition-all resize-none min-h-[120px] placeholder:text-gray-800 font-mono"
              />
              <button 
                onClick={() => runAnalysis('DATA', rawData)}
                disabled={!rawData || isAnalyzing}
                className="w-full py-2 bg-cyan-950 border border-cyan-500 text-cyan-400 text-[10px] hover:bg-cyan-900 disabled:opacity-50 tracking-[0.4em] uppercase font-black"
              >
                EXECUTE_HEURISTIC_SCAN
              </button>
            </div>
          </div>
        </div>

        {/* Reinstated Tools Grid */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="cyber-border cyber-bg p-5 flex flex-col gap-4">
            <h3 className="text-xs font-bold tracking-[0.3em] border-b border-green-900 pb-3 flex items-center gap-2">
              <i className="fas fa-toolbox text-amber-500"></i> PENTESTER_TOOLKIT
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {tools.map((tool) => (
                <button 
                  key={tool.id}
                  className="flex flex-col items-center justify-center p-4 border border-green-900/50 hover:bg-emerald-950/20 hover:border-emerald-500 transition-all group"
                  onClick={() => runAnalysis(tool.name, "SYSTEM_QUERY")}
                >
                  <i className={`fas ${tool.icon} ${tool.color} text-xl mb-2 group-hover:scale-110 transition-transform`}></i>
                  <span className="text-[8px] font-bold text-gray-400 tracking-tighter group-hover:text-white uppercase">{tool.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="cyber-border cyber-bg p-4 flex-1">
             <div className="flex flex-col h-full justify-center items-center gap-2 border border-dashed border-green-900/30">
                <i className="fas fa-skull text-3xl text-red-900/30"></i>
                <span className="text-[9px] text-gray-700 uppercase font-black tracking-widest text-center">Exploit_Framework_v2.5<br/>Locked // Awaiting_Auth</span>
             </div>
          </div>
        </div>
      </div>

      {/* Intelligence Stream - The primary output terminal for Recon */}
      <div className="cyber-border cyber-bg p-6 flex flex-col min-h-[400px]">
        <div className="flex justify-between items-center border-b border-green-900 pb-3 mb-6">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-bold text-emerald-400 tracking-[0.4em] uppercase">Intelligence_Trace_Stream</h3>
            <div className="flex gap-1">
              <span className="w-1 h-3 bg-emerald-500 animate-[bounce_1s_infinite]"></span>
              <span className="w-1 h-3 bg-emerald-500 animate-[bounce_1.2s_infinite]"></span>
              <span className="w-1 h-3 bg-emerald-500 animate-[bounce_0.8s_infinite]"></span>
            </div>
          </div>
          <button 
            onClick={() => setAnalysis('')}
            className="text-[9px] text-red-500 hover:text-red-400 transition-colors uppercase font-bold"
          >
            Clear_Buffer
          </button>
        </div>
        
        <div className="font-mono text-sm text-emerald-300 whitespace-pre-wrap leading-relaxed custom-scrollbar">
          {analysis ? (
             <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                {analysis}
             </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-20 opacity-30 gap-4 pointer-events-none">
               <i className="fas fa-fingerprint text-6xl text-emerald-900"></i>
               <div className="text-center">
                 <div className="text-xs font-bold tracking-widest uppercase mb-1">Awaiting_Data_Ingest</div>
                 <div className="text-[9px]">Select a tool or input target to begin reconnaissance sequence</div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReconCenter;
