
export enum DomainType {
  Monitor = 'Monitor',
  Reconnaissance = 'Reconnaissance',
  Influence = 'Influence',
  Exploitation = 'Exploitation',
  Vulnerability = 'Vulnerability',
  Cloud = 'Cloud',
  Social = 'Social',
  Ethics = 'Ethics'
}

export enum SystemStatus {
  Planning = 'Planning',
  Recon = 'Recon',
  Scanning = 'Scanning',
  GainingAccess = 'Gaining Access',
  Monitoring = 'Monitoring',
  Mitigating = 'Mitigating',
  Analysis = 'Analysis',
  Reporting = 'Reporting',
  Remediated = 'Remediated'
}

export interface SecurityNode {
  id: string;
  name: string;
  type: DomainType;
  status: SystemStatus;
  health: number; // 0-100
  lastUpdate: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'CRIT' | 'AUTH';
  source: string;
  message: string;
}

export interface BotCluster {
  id: string;
  origin: string;
  count: number;
  sentiment: 'MALICIOUS' | 'NEUTRAL' | 'COORDINATED';
  tags: string[];
}
