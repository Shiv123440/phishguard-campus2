import React from 'react';
import { Shield, ShieldAlert, ShieldCheck, Activity, Terminal, Flame, AlertOctagon, Radio, ArrowUpRight, Zap, Cpu, Layers, Lock, Database, ArrowRight } from 'lucide-react';
import { SOC_METRICS, RECENT_THREAT_ACTIVITY } from '../data/threatScenarios';

export default function CommandCentre({ onNavigate }) {
  return (
    <div className="space-y-8 animate-card-in font-sans">
      
      {/* Editorial, Sophisticated SOC Hero Header (Space Grotesk + Inter) */}
      <div className="relative p-6 sm:p-8 rounded-2xl saas-hero border border-[#00E5FF]/20 overflow-hidden">
        {/* Ambient subtle glow gradients */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00E5FF]/[0.07] rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#A78BFA]/[0.05] rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/25 text-[#00E5FF] text-xs font-medium">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF9C] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF9C]"></span>
              </span>
              <span>Zero-Trust Higher-Education Protection Platform</span>
            </div>

            <h1 className="hero-heading text-white">
              PhishGuard <span className="text-[#00E5FF]">Campus</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
              Autonomous security intelligence console. Intercepts social engineering, unauthorized fee reconciliation traps, lookalike portals, and deceptive recruiting before students or staff are compromised.
            </p>

            {/* Clear Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('scanner')}
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-blue-600 hover:from-[#00E5FF] hover:to-blue-500 text-slate-950 font-semibold text-sm shadow-md shadow-[#00E5FF]/20 transition-all btn-tactile cursor-pointer"
              >
                <Terminal className="w-4 h-4" />
                <span>Launch Triage Scanner</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('simulator')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#111D2B]/90 hover:bg-[#111D2B] border border-[#A78BFA]/35 hover:border-[#A78BFA] text-[#A78BFA] font-medium text-sm transition-all btn-tactile cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>60s Scam Simulation</span>
              </button>
            </div>
          </div>

          {/* Threat Level Dial Card */}
          <div className="flex flex-col items-center justify-center p-5 rounded-xl bg-[#080D16]/80 border border-white/[0.08] self-center lg:self-auto min-w-[210px] shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider pb-2 border-b border-white/[0.08] w-full justify-center font-medium">
              <Flame className="w-4 h-4 text-[#FF365D]" />
              <span>Threat Level Matrix</span>
            </div>

            <div className="my-3 relative flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#FF365D]/30 flex items-center justify-center"></div>
              <div className="absolute flex flex-col items-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">DEFCON</span>
                <span className="font-heading text-3xl font-bold text-[#FF365D]">
                  {SOC_METRICS.defconLevel}
                </span>
                <span className="text-[10px] font-bold text-[#FF365D] uppercase tracking-wider">Elevated</span>
              </div>
            </div>

            <div className="w-full flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/[0.08]">
              <span>Active Subnets:</span>
              <span className="text-[#00E5FF] font-semibold font-mono">{SOC_METRICS.activeNodes} Protected</span>
            </div>
          </div>
        </div>

      </div>

      {/* Redesigned 4 KPI Cards (Space Grotesk Numbers + Inter Labels) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* KPI 1 */}
        <div className="saas-card p-5 flex flex-col justify-between border-t-2 border-t-[#00E5FF]">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400">
            <span>Total Scans Logged</span>
            <Activity className="w-4 h-4 text-[#00E5FF]" />
          </div>
          <div className="my-3 kpi-value text-white">
            {SOC_METRICS.totalScans.toLocaleString()}
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#00FF9C] flex items-center gap-1 font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% this semester
            </span>
            <span className="text-[10px] text-slate-500 font-mono">*Simulated</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="saas-card p-5 flex flex-col justify-between border-t-2 border-t-amber-500">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400">
            <span>Threats Intercepted</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <div className="my-3 kpi-value text-amber-400">
            {SOC_METRICS.threatsDetected.toLocaleString()}
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-normal">22.9% positive ratio</span>
            <span className="text-[10px] text-slate-500 font-mono">*Simulated</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="saas-card p-5 flex flex-col justify-between border-t-2 border-t-[#FF365D]">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400">
            <span>Critical Neutralized</span>
            <AlertOctagon className="w-4 h-4 text-[#FF365D]" />
          </div>
          <div className="my-3 kpi-value text-[#FF365D]">
            {SOC_METRICS.criticalBlocked.toLocaleString()}
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-red-300 font-normal">Fee & credential traps</span>
            <span className="text-[10px] text-slate-500 font-mono">*Simulated</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="saas-card p-5 flex flex-col justify-between border-t-2 border-t-[#00FF9C]">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400">
            <span>Network Shield Health</span>
            <ShieldCheck className="w-4 h-4 text-[#00FF9C]" />
          </div>
          <div className="my-3 kpi-value text-[#00FF9C]">
            {SOC_METRICS.campusProtectionRate}
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-normal">All gateways shielded</span>
            <span className="text-[10px] text-slate-500 font-mono">*Simulated</span>
          </div>
        </div>

      </div>

      {/* Grid: Clean Activity Stream & Organized Subsystems */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Clean Threat Activity Feed */}
        <div className="lg:col-span-7 saas-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#00E5FF] animate-pulse" />
              <h2 className="card-heading text-white">
                Live Threat Intelligence Feed
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              [Live Stream]
            </span>
          </div>

          <div className="divide-y divide-white/[0.06] text-sm">
            {RECENT_THREAT_ACTIVITY.map((act) => (
              <div key={act.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/[0.02] px-2 rounded-lg transition-colors">
                <div className="flex items-start sm:items-center gap-3">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase shrink-0 border ${
                    act.severity === 'CRITICAL'
                      ? 'bg-red-500/15 text-[#FF365D] border-red-500/30'
                      : act.severity === 'HIGH'
                      ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                      : 'bg-emerald-500/15 text-[#00FF9C] border-emerald-500/30'
                  }`}>
                    {act.severity}
                  </span>

                  <div>
                    <span className="font-semibold text-slate-100 block text-xs sm:text-sm">{act.title}</span>
                    <span className="text-xs text-slate-400">Target: {act.target} ({act.channel})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <span className="text-xs text-[#00E5FF] font-medium">{act.action}</span>
                  <span className="text-[11px] text-slate-400 font-mono">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Cols: Structured Defensive Subsystems */}
        <div className="lg:col-span-5 saas-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#A78BFA]" />
              <h2 className="card-heading text-white">
                Defensive Subsystems
              </h2>
            </div>
            <span className="text-xs text-[#00FF9C] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00FF9C]"></span> All Systems Normal
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-[#080D16] border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-slate-200 font-semibold block text-xs">NLP Linguistic Pressure Engine</span>
                <span className="text-slate-400 text-[11px]">Heuristic Urgency & Coercion Extraction</span>
              </div>
              <span className="text-[#00FF9C] text-xs font-mono font-bold">ONLINE</span>
            </div>

            <div className="p-3 rounded-xl bg-[#080D16] border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-slate-200 font-semibold block text-xs">VPA & UPI Impersonation Radar</span>
                <span className="text-slate-400 text-[11px]">Consumer vs Merchant MCC Analysis</span>
              </div>
              <span className="text-[#00FF9C] text-xs font-mono font-bold">ONLINE</span>
            </div>

            <div className="p-3 rounded-xl bg-[#080D16] border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-slate-200 font-semibold block text-xs">Domain Typo-Squatting Correlator</span>
                <span className="text-slate-400 text-[11px]">Disposable TLD & Lookalike Detection</span>
              </div>
              <span className="text-[#00FF9C] text-xs font-mono font-bold">ONLINE</span>
            </div>

            <div className="p-3 rounded-xl bg-[#080D16] border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-slate-200 font-semibold block text-xs">Docket & Containment Compiler</span>
                <span className="text-slate-400 text-[11px]">Automated 1930 / IT Desk Format Generator</span>
              </div>
              <span className="text-[#00FF9C] text-xs font-mono font-bold">ONLINE</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#00E5FF]/5 border border-[#00E5FF]/15 text-xs text-slate-300 leading-relaxed">
            <strong className="text-[#00E5FF]">Sandbox Telemetry Notice:</strong> Statistics and threat activity rows reflect simulated campus baseline datasets for hackathon evaluation.
          </div>
        </div>

      </div>

    </div>
  );
}
