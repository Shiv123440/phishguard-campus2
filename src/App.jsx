import React, { useState, useEffect, Suspense, lazy } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import Footer from './components/Footer';
import { PRESET_SCENARIOS } from './data/threatScenarios';
import { ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Info, X, Loader2 } from 'lucide-react';

// Dynamic code splitting for maximum runtime efficiency and faster first-contentful paint
const CommandCentre = lazy(() => import('./components/CommandCentre'));
const SmartTriageScanner = lazy(() => import('./components/SmartTriageScanner'));
const VisualThreatDeconstruction = lazy(() => import('./components/VisualThreatDeconstruction'));
const OneClickSafeDefense = lazy(() => import('./components/OneClickSafeDefense'));
const InteractiveScamSimulator = lazy(() => import('./components/InteractiveScamSimulator'));

export default function App() {
  const [activeTab, setActiveTab] = useState('command');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Shared payload and analysis state
  const [currentPayload, setCurrentPayload] = useState(PRESET_SCENARIOS[0].content);
  const [currentAnalysis, setCurrentAnalysis] = useState(PRESET_SCENARIOS[0].presetAnalysis);

  // Global Toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleScanComplete = (payload, analysis) => {
    setCurrentPayload(payload);
    setCurrentAnalysis(analysis);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'command': return 'Command Centre';
      case 'scanner': return 'Smart Triage Scanner';
      case 'deconstruction': return 'Threat Deconstruction & Radar';
      case 'defense': return 'One-Click Safe Defense';
      case 'simulator': return '60-Second Scam Simulator';
      default: return 'SOC Intelligence';
    }
  };

  return (
    <div className="min-h-screen bg-[#080D16] text-slate-100 flex flex-col font-sans selection:bg-[#00E5FF]/25 selection:text-[#00E5FF] relative overflow-x-hidden">
      
      {/* Toast Notification Container with Accessibility aria-live */}
      {toast && (
        <div role="status" aria-live="polite" className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-toast max-w-sm w-full px-4 pointer-events-none">
          <div className={`p-3 rounded-xl border font-sans text-xs shadow-2xl flex items-center justify-between gap-3 pointer-events-auto ${
            toast.type === 'success'
              ? 'bg-[#080D16]/95 border-[#00FF9C]/60 text-[#00FF9C] shadow-[#00FF9C]/10'
              : toast.type === 'danger'
              ? 'bg-[#080D16]/95 border-[#FF365D]/60 text-[#FF365D] shadow-[#FF365D]/10'
              : 'bg-[#080D16]/95 border-[#00E5FF]/60 text-[#00E5FF] shadow-[#00E5FF]/10'
          }`}>
            <div className="flex items-center gap-2">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 text-[#00FF9C]" aria-hidden="true" />}
              {toast.type === 'danger' && <AlertCircle className="w-4 h-4 shrink-0 text-[#FF365D]" aria-hidden="true" />}
              {toast.type === 'info' && <Info className="w-4 h-4 shrink-0 text-[#00E5FF]" aria-hidden="true" />}
              <span className="truncate text-slate-100 font-medium">{toast.message}</span>
            </div>
            <button
              onClick={() => setToast(null)}
              aria-label="Dismiss toast alert"
              className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* Persistent Military/SOC Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Wrapper */}
      <div className={`flex-1 flex flex-col transition-all duration-200 ease-in-out ${isCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        
        {/* Simplified, Clean Top Header */}
        <TopHeader
          onOpenMobileMenu={() => setIsMobileOpen(true)}
          activeTabName={getTabTitle()}
        />

        {/* Content Body with Suspense */}
        <main id="main-content" role="main" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          <Suspense fallback={
            <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-[#00E5FF]" />
              <span className="text-xs font-mono">Loading Security Telemetry Module...</span>
            </div>
          }>
            {/* TAB 1: Command Centre */}
            {activeTab === 'command' && (
              <CommandCentre onNavigate={(tab) => setActiveTab(tab)} />
            )}

            {/* TAB 2: Smart Triage Scanner */}
            {activeTab === 'scanner' && (
              <div className="space-y-6">
                <SmartTriageScanner
                  onScanComplete={handleScanComplete}
                  currentPayload={currentPayload}
                  currentAnalysis={currentAnalysis}
                  onShowToast={showToast}
                />

                {/* Integrated Visual Threat Deconstruction beneath the Scanner */}
                <div className="pt-4 border-t border-white/[0.08]">
                  <VisualThreatDeconstruction
                    content={currentPayload}
                    analysis={currentAnalysis}
                  />
                </div>

                {/* Quick Jump to One-Click Safe Defense */}
                <div className="p-4 sm:p-5 rounded-xl saas-card border border-[#00FF9C]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#00FF9C]/15 border border-[#00FF9C]/30 text-[#00FF9C] shrink-0">
                      <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="font-heading text-sm font-bold text-white">
                        Threat Analysis Verified ({currentAnalysis?.score || 96}/100 Risk)
                      </h2>
                      <p className="text-xs text-slate-300 font-sans">
                        Generate standardized legal and IT reporting dockets with one click.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('defense')}
                    aria-label="Open Safe Defense Playbook with current findings"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00FF9C] hover:bg-[#00FF9C]/90 text-slate-950 font-semibold text-xs uppercase tracking-wider transition-all btn-tactile cursor-pointer shadow-sm shadow-[#00FF9C]/20 shrink-0"
                  >
                    <span>Open Safe Defense Playbook</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: Visual Threat Deconstruction */}
            {activeTab === 'deconstruction' && (
              <VisualThreatDeconstruction
                content={currentPayload}
                analysis={currentAnalysis}
              />
            )}

            {/* TAB 4: One-Click Safe Defense */}
            {activeTab === 'defense' && (
              <OneClickSafeDefense
                payload={currentPayload}
                analysis={currentAnalysis}
                onShowToast={showToast}
              />
            )}

            {/* TAB 5: Interactive 60-Second Scam Simulator */}
            {activeTab === 'simulator' && (
              <InteractiveScamSimulator onShowToast={showToast} />
            )}
          </Suspense>
        </main>

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
}
