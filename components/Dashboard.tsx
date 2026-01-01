
import React from 'react';
import { DomainType, SystemStatus, SecurityNode } from '../types';
import { DOMAIN_ICONS } from '../constants';

const Dashboard: React.FC = () => {
  const nodes: SecurityNode[] = [
    { id: '1', name: 'Real-Time Threat', type: DomainType.Monitor, status: SystemStatus.Monitoring, health: 98, lastUpdate: 'Now' },
    { id: '2', name: 'OSINT Probe', type: DomainType.Reconnaissance, status: SystemStatus.Scanning, health: 100, lastUpdate: '2m' },
    { id: '3', name: 'Bot Cluster Delta', type: DomainType.Influence, status: SystemStatus.Analysis, health: 45, lastUpdate: '12m' },
    { id: '4', name: 'S3 Bucket Scan', type: DomainType.Cloud, status: SystemStatus.Recon, health: 90, lastUpdate: '5s' },
    { id: '5', name: 'Social Eng Range', type: DomainType.Social, status: SystemStatus.Planning, health: 80, lastUpdate: '1h' },
    { id: '6', name: 'Payload Testing', type: DomainType.Exploitation, status: SystemStatus.GainingAccess, health: 70, lastUpdate: 'Now' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {nodes.map(node => (
        <div key={node.id} className="cyber-border cyber-bg p-4 flex flex-col gap-3 group transition-all hover:border-emerald-500">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{DOMAIN_ICONS[node.type]}</div>
              <div>
                <h3 className="font-bold text-sm tracking-widest">{node.name.toUpperCase()}</h3>
                <span className="text-[10px] text-gray-500 uppercase">{node.type}</span>
              </div>
            </div>
            <div className={`px-2 py-0.5 text-[9px] rounded-sm border ${
              node.health < 50 ? 'border-red-500 text-red-500' : 'border-emerald-500 text-emerald-500'
            }`}>
              {node.status.toUpperCase()}
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>INTEGRITY</span>
              <span>{node.health}%</span>
            </div>
            <div className="h-1 bg-gray-900 overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${
                  node.health < 50 ? 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]' : 'bg-emerald-500'
                }`}
                style={{ width: `${node.health}%` }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-2 border-t border-gray-900 pt-2 text-[10px] text-gray-600 italic">
            <span>#{node.id.padStart(4, '0')}</span>
            <span>LAST_SYNC: {node.lastUpdate}</span>
          </div>
        </div>
      ))}

      {/* Stats Summary Widget */}
      <div className="lg:col-span-3 cyber-border cyber-bg p-4 bg-emerald-950/10">
        <div className="flex flex-wrap gap-8 justify-around">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-emerald-400">2048</span>
            <span className="text-[10px] tracking-widest text-gray-500">ACTIVE DOMAINS</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-cyan-400">04</span>
            <span className="text-[10px] tracking-widest text-gray-500">CRITICAL ALERTS</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-purple-400">12.4K</span>
            <span className="text-[10px] tracking-widest text-gray-500">BOTS TRACED</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-amber-400">92%</span>
            <span className="text-[10px] tracking-widest text-gray-500">SYSTEM HEALTH</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
