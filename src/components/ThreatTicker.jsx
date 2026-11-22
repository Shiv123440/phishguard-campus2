import React, { useState, useEffect } from 'react';
import { Radio, AlertOctagon, ShieldCheck, Flame, Bell } from 'lucide-react';
import { LIVE_CAMPUS_THREATS } from '../data/threatScenarios';

export default function ThreatTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % LIVE_CAMPUS_THREATS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const activeAlert = LIVE_CAMPUS_THREATS[currentIndex];

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'CRITICAL':
        return 'bg-red-500/20 text-red-400 border-red-500/40';
      case 'WARNING':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'DEFENDED':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
    }
  };

  return (
    <div className="bg-[#050913] border-b border-cyan-950/40 py-2 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        
        {/* Left: Ticker Label & DEFCON indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 font-mono text-[11px]">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span className="font-semibold uppercase tracking-wider">LIVE INTEL RADAR</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-slate-400 font-mono text-[11px]">
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-amber-400">
              <Flame className="w-3 h-3" />
              DEFCON 3: ELEVATED PHISHING
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">CAMPUS NODES: 8 ACTIVE</span>
          </div>
        </div>

        {/* Center: Live cycling message */}
        <div className="flex items-center gap-2 flex-1 justify-center max-w-2xl overflow-hidden">
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border ${getBadgeStyle(activeAlert.type)}`}>
            {activeAlert.type}
          </span>
          <span className="text-slate-300 font-mono text-xs truncate">
            {activeAlert.text}
          </span>
          <span className="text-[10px] text-slate-500 font-mono shrink-0">
            [{activeAlert.time}]
          </span>
        </div>

        {/* Right: Quick action status */}
        <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-400 font-mono">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Zero-Trust Heuristics v2.4</span>
        </div>

      </div>
    </div>
  );
}
