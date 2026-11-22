import React, { useState } from 'react';
import { Terminal, Shield, RefreshCw, Zap, Sparkles, Smartphone, Mail, MessageSquare, Info, CheckCircle2 } from 'lucide-react';
import { PRESET_SCENARIOS } from '../data/threatScenarios';
import { analyzeCustomContent } from '../utils/threatAnalyzer';

export default function SmartTriageScanner({ onScanComplete, currentPayload, currentAnalysis, onShowToast }) {
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [selectedPresetId, setSelectedPresetId] = useState(PRESET_SCENARIOS[0].id);
  const [inputText, setInputText] = useState(PRESET_SCENARIOS[0].content);
  const [isScanning, setIsScanning] = useState(false);
  const [scanPhase, setScanPhase] = useState('');
  const [scanSuccessPulse, setScanSuccessPulse] = useState(false);

  const filteredPresets = selectedChannel === 'all'
    ? PRESET_SCENARIOS
    : PRESET_SCENARIOS.filter(p => p.channel.toLowerCase().includes(selectedChannel));

  const handleSelectPreset = (scenario) => {
    setSelectedPresetId(scenario.id);
    setInputText(scenario.content);
    if (onScanComplete) {
      onScanComplete(scenario.content, scenario.presetAnalysis);
    }
    if (onShowToast) {
      onShowToast(`Loaded Preset: ${scenario.title}`, 'info');
    }
  };

  const handleScan = () => {
    if (!inputText.trim()) return;
    setIsScanning(true);
    setScanSuccessPulse(false);

    setScanPhase('1/4: Ingesting payload & tokenizing linguistic vectors...');
    
    setTimeout(() => {
      setScanPhase('2/4: Analyzing coercive urgency & psychological pressure...');
    }, 250);

    setTimeout(() => {
      setScanPhase('3/4: Correlating typo-squatted domains & consumer VPA handles...');
    }, 500);

    setTimeout(() => {
      setScanPhase('4/4: Synthesizing multi-dimensional heuristic threat matrix...');
    }, 750);

    setTimeout(() => {
      const matched = PRESET_SCENARIOS.find(p => p.content.trim() === inputText.trim());
      let res;
      if (matched) {
        res = matched.presetAnalysis;
      } else {
        res = analyzeCustomContent(inputText);
      }
      setIsScanning(false);
      setScanPhase('');
      setScanSuccessPulse(true);

      if (onScanComplete) {
        onScanComplete(inputText, res);
      }
      if (onShowToast) {
        onShowToast(`Scan Completed: ${res.score}/100 Risk (${res.severity})`, res.score >= 70 ? 'danger' : 'success');
      }

      setTimeout(() => setScanSuccessPulse(false), 2000);
    }, 1000);
  };

  const handleClear = () => {
    setSelectedPresetId(null);
    setInputText('');
    if (onShowToast) {
      onShowToast('Terminal buffer cleared', 'info');
    }
  };

  return (
    <section aria-labelledby="triage-scanner-heading" className="space-y-6 animate-card-in font-sans">
      
      {/* Central Terminal Header */}
      <div className="relative p-6 sm:p-7 rounded-2xl saas-hero border border-[#00E5FF]/25 shadow-xl overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/25 text-[#00E5FF] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Core Triage Terminal</span>
            </div>
            <h1 id="triage-scanner-heading" className="section-heading text-white">
              Zero-Trust Threat Ingestion & Analysis
            </h1>
            <p className="text-sm text-slate-300 max-w-xl font-normal leading-relaxed">
              Scan raw SMS, emails, WhatsApp circulars, and unverified links. Deconstructs social engineering lures, fake scholarships, unauthorized fee demands, and lookalike domains.
            </p>
          </div>

          {/* Channel Filters */}
          <div role="group" aria-label="Payload Channel Filter" className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[#080D16] border border-white/[0.08] self-start md:self-auto">
            <button
              onClick={() => setSelectedChannel('all')}
              aria-pressed={selectedChannel === 'all'}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all btn-tactile cursor-pointer ${
                selectedChannel === 'all' ? 'bg-[#00E5FF] text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setSelectedChannel('sms')}
              aria-pressed={selectedChannel === 'sms'}
              aria-label="Filter SMS payloads"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all btn-tactile cursor-pointer ${
                selectedChannel === 'sms' ? 'bg-[#00E5FF] text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
              <span>SMS</span>
            </button>
            <button
              onClick={() => setSelectedChannel('email')}
              aria-pressed={selectedChannel === 'email'}
              aria-label="Filter Email payloads"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all btn-tactile cursor-pointer ${
                selectedChannel === 'email' ? 'bg-[#00E5FF] text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Email</span>
            </button>
            <button
              onClick={() => setSelectedChannel('whatsapp')}
              aria-pressed={selectedChannel === 'whatsapp'}
              aria-label="Filter WhatsApp payloads"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all btn-tactile cursor-pointer ${
                selectedChannel === 'whatsapp' ? 'bg-[#00E5FF] text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Quick Presets Selector */}
        <div className="mt-5 pt-4 border-t border-white/[0.08]">
          <span className="text-xs text-slate-300 uppercase tracking-wider block mb-2.5 font-semibold">
            Select Verified Campus Benchmark Scenarios:
          </span>

          <div role="group" aria-label="Campus benchmark test presets" className="flex flex-wrap gap-2">
            {filteredPresets.map((scenario) => {
              const isSelected = selectedPresetId === scenario.id;
              return (
                <button
                  key={scenario.id}
                  onClick={() => handleSelectPreset(scenario)}
                  aria-pressed={isSelected}
                  aria-label={`Test Scenario: ${scenario.title}`}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 btn-tactile cursor-pointer ${
                    isSelected
                      ? 'bg-[#00E5FF] text-slate-950 font-semibold shadow-sm border border-[#00E5FF]'
                      : 'bg-[#080D16] text-slate-200 border border-white/[0.08] hover:border-white/[0.2]'
                  }`}
                >
                  <span className="text-[11px] opacity-80">[{scenario.threatCategory}]</span>
                  <span>{scenario.title}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                      isSelected
                        ? 'bg-slate-950/20 text-slate-950'
                        : scenario.presetAnalysis.score > 70
                        ? 'bg-[#FF365D]/20 text-[#FF365D]'
                        : 'bg-[#00FF9C]/20 text-[#00FF9C]'
                    }`}
                  >
                    {scenario.presetAnalysis.score}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Message Input Terminal */}
      <div className={`saas-card p-6 relative transition-all duration-300 ${
        scanSuccessPulse ? 'border-[#00FF9C] shadow-lg shadow-[#00FF9C]/10' : ''
      }`}>
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <label htmlFor="payload-terminal-input" className="flex items-center gap-2 card-heading text-white cursor-pointer">
            <Terminal className="w-4 h-4 text-[#00E5FF]" aria-hidden="true" />
            <span>Raw Payload Input Buffer</span>
          </label>

          <button
            onClick={handleClear}
            aria-label="Clear input terminal text"
            className="text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded bg-[#080D16] border border-white/[0.08] transition-colors btn-tactile cursor-pointer font-medium"
          >
            Clear Input
          </button>
        </div>

        {/* Textarea */}
        <div className="mt-4 relative">
          {isScanning && <div className="animate-scan-line" aria-hidden="true"></div>}

          <textarea
            id="payload-terminal-input"
            name="payload"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setSelectedPresetId(null);
            }}
            rows={5}
            aria-label="Suspicious text or URL to analyze"
            placeholder="Paste suspicious WhatsApp message, urgent email alert, SMS text, UPI payment handle, or URL here..."
            className="w-full bg-[#080D16]/95 border border-white/[0.1] rounded-xl p-4 text-xs sm:text-sm font-mono text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#00E5FF] transition-all resize-y"
          />
        </div>

        {/* Scanning status banner */}
        {isScanning && (
          <div role="status" aria-live="polite" className="mt-3 p-3 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center gap-2.5 animate-pulse font-mono text-xs">
            <RefreshCw className="w-3.5 h-3.5 text-[#00E5FF] animate-spin shrink-0" aria-hidden="true" />
            <span className="text-[#00E5FF] font-semibold">
              {scanPhase}
            </span>
          </div>
        )}

        {/* Action Controls & Transparent Disclaimer */}
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-3.5 border-t border-white/[0.08]">
          <div className="flex items-center gap-2 text-slate-300 text-xs">
            <Info className="w-4 h-4 text-[#00E5FF] shrink-0" aria-hidden="true" />
            <span className="leading-tight">
              <strong className="text-white">Transparent Zero-Trust Engine:</strong> Rule-based linguistic deconstruction & domain heuristics.
            </span>
          </div>

          <button
            onClick={handleScan}
            disabled={isScanning || !inputText.trim()}
            aria-label="Execute threat analysis on payload"
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-blue-600 hover:from-[#00E5FF] hover:to-blue-500 text-slate-950 font-semibold text-xs uppercase tracking-wider shadow-md shadow-[#00E5FF]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed btn-tactile cursor-pointer shrink-0"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" aria-hidden="true" />
                <span>Scanning Vector...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" aria-hidden="true" />
                <span>Scan Threat Payload</span>
              </>
            )}
          </button>
        </div>

      </div>

    </section>
  );
}
