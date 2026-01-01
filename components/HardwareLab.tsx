
import React from 'react';

const HardwareLab: React.FC = () => {
  const targetEnvironments = [
    { id: 'LAB-01', name: 'Active Directory Range', status: 'Isolated', os: 'Windows Server 2022', vulns: 3 },
    { id: 'LAB-02', name: 'Cloud Native Sandbox', status: 'Simulated', os: 'Alpine Linux / K8s', vulns: 12 },
    { id: 'LAB-03', name: 'Legacy Mainframe', status: 'Encrypted', os: 'IBM z/OS (Sim)', vulns: 1 },
    { id: 'LAB-04', name: 'OT/ICS Grid', status: 'Monitoring', os: 'FreeRTOS / Modbus', vulns: 5 },
  ];

  return (
    <div className="flex flex-col gap-4 h-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Lab Infrastructure Management */}
        <div className="cyber-border cyber-bg p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center border-b border-green-900 pb-2">
            <span className="text-xs font-bold tracking-widest flex items-center gap-2">
              <i className="fas fa-server text-emerald-500"></i>
              VIRTUAL_LAB_INFRASTRUCTURE
            </span>
            <span className="text-[9px] text-emerald-500 bg-emerald-950 px-2 py-0.5 border border-emerald-500/30">
              CLUSTER_STABLE
            </span>
          </div>
          
          <div className="flex flex-col gap-2">
            {targetEnvironments.map((env) => (
              <div key={env.id} className="flex justify-between items-center p-2 border border-green-900/50 hover:border-emerald-500 transition-colors group">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500">ID: {env.id}</span>
                  <span className="text-xs font-bold group-hover:text-emerald-400">{env.name}</span>
                  <span className="text-[9px] text-gray-600">{env.os}</span>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-amber-500">{env.vulns} VULNS</div>
                  <div className="text-[9px] text-emerald-600 font-mono tracking-tighter uppercase">{env.status}</div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full cyber-border bg-emerald-950/20 py-2 text-xs hover:bg-emerald-950/50 mt-2">
            PROVISION_NEW_ENVIRONMENT
          </button>
        </div>

        {/* Evidence Locker / Sandbox Stats */}
        <div className="cyber-border cyber-bg p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center border-b border-green-900 pb-2">
            <span className="text-xs font-bold tracking-widest flex items-center gap-2">
              <i className="fas fa-box-open text-amber-500"></i>
              EVIDENCE_LOCKER
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 flex-1">
            <div className="cyber-bg border border-green-900/30 p-2 flex flex-col justify-center items-center">
              <span className="text-2xl font-bold text-emerald-400">142</span>
              <span className="text-[9px] text-gray-500">PCAP_REPOS</span>
            </div>
            <div className="cyber-bg border border-green-900/30 p-2 flex flex-col justify-center items-center">
              <span className="text-2xl font-bold text-cyan-400">28</span>
              <span className="text-[9px] text-gray-500">MALWARE_SAMPLES</span>
            </div>
            <div className="cyber-bg border border-green-900/30 p-2 flex flex-col justify-center items-center">
              <span className="text-2xl font-bold text-purple-400">8.2 GB</span>
              <span className="text-[9px] text-gray-500">ENCRYPTED_STORAGE</span>
            </div>
            <div className="cyber-bg border border-green-900/30 p-2 flex flex-col justify-center items-center">
              <span className="text-2xl font-bold text-amber-400">12</span>
              <span className="text-[9px] text-gray-500">SNAPSHOTS_PENDING</span>
            </div>
          </div>
          
          <p className="text-[9px] text-gray-600 text-center italic">
            ISO-27001 COMPLIANT SANDBOX STORAGE ACTIVE
          </p>
        </div>
      </div>

      {/* Lab Logs / Snapshot Management */}
      <div className="flex-1 cyber-border cyber-bg p-4 overflow-y-auto">
        <h3 className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-2">
          <i className="fas fa-history"></i> INFRASTRUCTURE_EVENT_LOG
        </h3>
        <div className="font-mono text-[11px] space-y-1">
          <div className="text-gray-500">[10:45:22] <span className="text-emerald-500">INIT</span> Virtual Lab Range Delta spinning up...</div>
          <div className="text-gray-500">[10:45:25] <span className="text-cyan-500">INFO</span> Snapshot 'Post-Exploit-A' created for target 'LAB-02'.</div>
          <div className="text-gray-500">[10:46:01] <span className="text-amber-500">WARN</span> Sandbox internet-outbound traffic detected and blocked.</div>
          <div className="text-gray-500">[10:48:12] <span className="text-emerald-500">INIT</span> Evidence locker synchronization complete.</div>
        </div>
      </div>
    </div>
  );
};

export default HardwareLab;
