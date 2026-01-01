
import React from 'react';
import { DomainType } from './types';

export const DOMAIN_ICONS: Record<DomainType, React.ReactNode> = {
  [DomainType.Monitor]: <i className="fas fa-desktop text-cyan-400"></i>,
  [DomainType.Reconnaissance]: <i className="fas fa-binoculars text-emerald-400"></i>,
  [DomainType.Influence]: <i className="fas fa-project-diagram text-purple-400"></i>,
  [DomainType.Exploitation]: <i className="fas fa-skull-crossbones text-red-500"></i>,
  [DomainType.Vulnerability]: <i className="fas fa-search text-amber-400"></i>,
  [DomainType.Cloud]: <i className="fas fa-cloud text-blue-400"></i>,
  [DomainType.Social]: <i className="fas fa-users text-pink-400"></i>,
  [DomainType.Ethics]: <i className="fas fa-balance-scale text-gray-400"></i>,
};

export const INITIAL_LOGS = [
  { id: '1', timestamp: new Date().toISOString(), level: 'AUTH', source: 'CORE', message: 'Penny R23 Kernel Initialized.' },
  { id: '2', timestamp: new Date().toISOString(), level: 'INFO', source: 'CRABBY', message: 'Firewall active. Deep packet inspection enabled.' },
  { id: '3', timestamp: new Date().toISOString(), level: 'WARN', source: 'BOT_MANAGER', message: 'High frequency requests detected from block 185.x.x.x' },
];
