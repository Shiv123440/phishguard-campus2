import React, { useState, useEffect } from 'react';
import { Menu, Radio, Flame, PhoneCall, ShieldCheck, Database } from 'lucide-react';
import { RECENT_THREAT_ACTIVITY } from '../data/threatScenarios';

export default function TopHeader({ onOpenMobileMenu, activeTabName }) {
  const [currentAlertIdx, setCurrentAlertIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAlertIdx((prev) => (prev + 1) % RECENT_THREAT_ACTIVITY.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const activeAlert = RECENT_THREAT_ACTIVITY[currentAlertIdx];

  return (
    <header className="sticky top-0 z-30 bg-[#080D16]/90 backdrop-blur-md border-b border-white/[0.08] h-16 px-4 sm:px-6 flex items-center justify-between gap-4 font-sans">
      
      {/* Left: Mobile Drawer Trigger & Current Location Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl bg-[#111D2B] border border-white/[0.1] text-slate-300 hover:text-white btn-tactile cursor-pointer"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium tracking-wide uppercase hidden md:inline">
            SOC Intelligence /
          </span>
          <span className="font-heading text-sm sm:text-base font-bold text-white tracking-tight">
            {activeTabName}
          </span>
        </div>
      </div>

      {/* Center: Live Threat Intelligence Ticker */}
      <div className="hidden lg:flex items-center gap-2.5 flex-1 max-w-lg mx-4 px-3.5 py-1.5 rounded-full bg-[#111D2B]/70 border border-white/[0.08] text-xs overflow-hidden">
        <Radio className="w-3.5 h-3.5 text-[#00E5FF] shrink-0 animate-pulse" />
        <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold uppercase shrink-0 border font-mono ${
          activeAlert.severity === 'CRITICAL'
            ? 'bg-red-500/15 text-[#FF365D] border-red-500/30'
            : activeAlert.severity === 'HIGH'
            ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
            : 'bg-emerald-500/15 text-[#00FF9C] border-emerald-500/30'
        }`}>
          {activeAlert.severity}
        </span>
        <span className="text-slate-300 truncate text-xs font-normal">
          {activeAlert.title} targeting {activeAlert.target}
        </span>
        <span className="text-slate-400 text-[11px] shrink-0 ml-auto font-mono">
          {activeAlert.time}
        </span>
      </div>

      {/* Right: Simulated Mode Badge & Quick Helpline */}
      <div className="flex items-center gap-2.5">
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111D2B]/60 border border-white/[0.08] text-xs text-slate-400 font-medium" title="All telemetry data and threat feeds operate in simulated sandbox mode">
          <Database className="w-3.5 h-3.5 text-[#A78BFA]" />
          <span>Simulated Telemetry</span>
        </div>

        <a
          href="tel:1930"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF365D]/10 border border-[#FF365D]/30 text-[#FF365D] text-xs font-semibold hover:bg-[#FF365D]/20 transition-colors btn-tactile"
          title="National Cyber Crime Reporting Helpline"
        >
          <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
          <span className="font-mono font-bold">1930</span>
        </a>
      </div>

    </header>
  );
}
