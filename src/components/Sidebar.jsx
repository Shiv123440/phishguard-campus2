import React from 'react';
import { Shield, LayoutDashboard, Terminal, Eye, ShieldAlert, Gamepad2, PhoneCall, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
  const navItems = [
    { id: 'command', label: 'Command Centre', icon: LayoutDashboard, badge: 'Overview', desc: 'Threat activity & SOC metrics' },
    { id: 'scanner', label: 'Triage Scanner', icon: Terminal, badge: 'Core', desc: 'Message & URL vector analysis' },
    { id: 'deconstruction', label: 'Threat Radar', icon: Eye, badge: 'Geometry', desc: 'Heuristic indicators & breakdown' },
    { id: 'defense', label: 'Safe Defense', icon: ShieldAlert, badge: 'Docket', desc: '1930 report & containment actions' },
    { id: 'simulator', label: 'Scam Simulator', icon: Gamepad2, badge: '60s', desc: 'Interactive campus cyber drill' }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-200"
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-[#080D16] border-r border-white/[0.08] flex flex-col justify-between transition-all duration-200 ease-in-out font-sans ${
          isMobileOpen ? 'translate-x-0 w-64 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}`}
      >
        {/* Top: Logo & Branding */}
        <div>
          <div className="h-16 px-4 flex items-center justify-between border-b border-white/[0.08] bg-[#070B13]">
            <div
              onClick={() => { setActiveTab('command'); setIsMobileOpen(false); }}
              className="flex items-center gap-3 cursor-pointer overflow-hidden group"
              title="PhishGuard Campus Home"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-[#111D2B] border border-[#00E5FF]/40 shadow-sm shrink-0 group-hover:border-[#00E5FF] transition-colors">
                <Shield className="w-4 h-4 text-[#00E5FF]" />
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF9C] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF9C]"></span>
                </span>
              </div>

              {(!isCollapsed || isMobileOpen) && (
                <div className="truncate">
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-bold text-sm tracking-tight text-white">
                      PhishGuard
                    </span>
                    <span className="text-[10px] font-semibold text-[#00E5FF] px-1.5 py-0.2 rounded bg-[#00E5FF]/10 border border-[#00E5FF]/25">
                      Campus
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-normal">
                    Cyber Intelligence SOC
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors btn-tactile cursor-pointer"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              aria-label="Toggle Sidebar"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              aria-label="Close Mobile Navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section Heading */}
          {(!isCollapsed || isMobileOpen) && (
            <div className="px-4 pt-5 pb-2 text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Platform Modules
            </div>
          )}

          {/* Nav Items (Using Inter font) */}
          <nav className="p-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all btn-tactile cursor-pointer text-left relative ${
                    isActive
                      ? 'bg-[#111D2B] text-white border border-[#00E5FF]/35 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04] border border-transparent'
                  }`}
                  title={isCollapsed ? `${item.label} — ${item.desc}` : undefined}
                >
                  {/* Active Indicator Accent Bar */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-[#00E5FF]"></span>
                  )}

                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#00E5FF]' : 'text-slate-400'}`} />

                  {(!isCollapsed || isMobileOpen) && (
                    <div className="flex-1 flex items-center justify-between truncate">
                      <div className="truncate">
                        <span className={`block truncate text-xs ${isActive ? 'font-semibold text-white' : 'font-medium text-slate-200'}`}>
                          {item.label}
                        </span>
                        <span className="block text-[11px] font-normal text-slate-400 truncate">
                          {item.desc}
                        </span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ml-2 shrink-0 ${
                        isActive
                          ? 'bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30 font-semibold'
                          : 'bg-white/[0.04] text-slate-400 border border-white/[0.06]'
                      }`}>
                        {item.badge}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom: System Telemetry & Helpline */}
        <div className="p-3 border-t border-white/[0.08] space-y-2 bg-[#070B13]">
          {(!isCollapsed || isMobileOpen) && (
            <div className="p-3 rounded-xl bg-[#111D2B]/50 border border-white/[0.06] text-xs">
              <div className="flex items-center justify-between pb-1">
                <span className="text-slate-400 text-[11px] font-medium">Protection Status</span>
                <span className="text-[#00FF9C] text-[11px] font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9C]"></span>
                  Active Shield
                </span>
              </div>
              <span className="text-slate-400 text-[11px] block leading-tight">
                100% Client-Side / Zero-Logging Privacy
              </span>
            </div>
          )}

          <a
            href="tel:1930"
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#FF365D]/10 border border-[#FF365D]/30 text-[#FF365D] hover:bg-[#FF365D]/20 text-xs font-semibold transition-colors btn-tactile"
            title="National Cyber Crime Reporting Helpline: 1930"
          >
            <PhoneCall className="w-3.5 h-3.5 shrink-0 animate-pulse" />
            {(!isCollapsed || isMobileOpen) && <span>Cyber Helpline: 1930</span>}
          </a>
        </div>
      </aside>
    </>
  );
}
