
import React, { useState, useEffect, useRef } from 'react';
import { getSecurityInsights } from '../services/geminiService';

interface TerminalProps {
  logs: any[];
}

const Terminal: React.FC<TerminalProps> = ({ logs }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim();
    setInput('');
    setOutput(prev => [...prev, `> ${cmd}`]);
    setLoading(true);

    const context = logs.slice(-5).map(l => l.message).join('. ');
    const response = await getSecurityInsights(cmd, context);
    
    setOutput(prev => [...prev, response]);
    setLoading(false);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output, logs, loading]);

  return (
    <div className="flex flex-col h-full cyber-bg cyber-border p-4 font-mono text-sm">
      <div className="flex justify-between items-center mb-4 border-b border-green-900 pb-2">
        <span className="glow-text flex items-center gap-2">
          <i className="fas fa-terminal"></i> PENNY_CORE_INTEL
        </span>
        <span className="text-xs text-green-700">STABLE // REV_23</span>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-2">
        {logs.map((log) => (
          <div key={log.id} className="text-xs">
            <span className="text-gray-600">[{log.timestamp.split('T')[1].slice(0, 8)}]</span>{' '}
            <span className={
              log.level === 'CRIT' ? 'text-red-500' : 
              log.level === 'WARN' ? 'text-amber-500' : 
              log.level === 'AUTH' ? 'text-cyan-500' : 'text-emerald-500'
            }>
              {log.level}
            </span>{' '}
            <span className="text-gray-400">@{log.source}:</span>{' '}
            <span className="text-gray-300">{log.message}</span>
          </div>
        ))}
        
        {output.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap ${line.startsWith('>') ? 'text-cyan-400' : 'text-emerald-300 italic'}`}>
            {line}
          </div>
        ))}
        
        {loading && (
          <div className="animate-pulse text-cyan-400">Processing intelligence stream...</div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleCommand} className="flex gap-2">
        <span className="text-emerald-500">penny@sentinel:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none flex-1 text-emerald-400"
          placeholder="Ask Penny for intelligence..."
          autoFocus
        />
      </form>
    </div>
  );
};

export default Terminal;
