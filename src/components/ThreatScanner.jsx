import React, { useState } from 'react';
import { Terminal, Shield, RefreshCw, Zap, Sparkles, AlertCircle, ArrowRight, FileText } from 'lucide-react';
import { PRESET_SCENARIOS } from '../data/threatScenarios';
import { analyzeCustomContent } from '../utils/threatAnalyzer';
import AttackAnatomy from './AttackAnatomy';
import ThreatScorecard from './ThreatScorecard';

export default function ThreatScanner({ onSelectForPlaybook }) {
  const [selectedPresetId, setSelectedPresetId] = useState(PRESET_SCENARIOS[0].id);
  const [inputText, setInputText] = useState(PRESET_SCENARIOS[0].content);
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(PRESET_SCENARIOS[0].presetAnalysis);

  const handleSelectPreset = (scenario) => {
    setSelectedPresetId(scenario.id);
    setInputText(scenario.content);
    setAnalysisResult(scenario.presetAnalysis);
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      // Check if matches one of the presets exactly
      const matched = PRESET_SCENARIOS.find(p => p.content.trim() === inputText.trim());
      if (matched) {
        setAnalysisResult(matched.presetAnalysis);
      } else {
        const dynamicResult = analyzeCustomContent(inputText);
        setAnalysisResult(dynamicResult);
      }
      setIsScanning(false);
    }, 400);
  };

  const handleClear = () => {
    setSelectedPresetId(null);
    setInputText('');
    setAnalysisResult(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Header */}
      <div className="relative p-6 rounded-3xl bg-gradient-to-b from-[#0c1326] via-[#090f1d] to-[#070b16] border border-cyan-900/50 shadow-2xl overflow-hidden">
        
        {/* Cyber grid and glow background */}
        <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Zero-Trust Social Engineering Intelligence Terminal</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Detect, Deconstruct & Neutralize <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Deceptive Social Engineering
            </span>
          </h1>

          <p className="mt-2 text-sm sm:text-base text-slate-400 leading-relaxed">
            Stop campus phishing, fake registration fee traps, spoofed portals, and task scams before they compromise students. Inspect raw messages, extract psychological coercion triggers, and generate verified cyber incident reports.
          </p>

          {/* Quick Preset Selector Pills for Judges */}
          <div className="mt-5">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
              ⚡ Quick Test Presets (Instant Hackathon Scenarios):
            </span>

            <div className="flex flex-wrap gap-2">
              {PRESET_SCENARIOS.map((scenario) => {
                const isSelected = selectedPresetId === scenario.id;
                return (
                  <button
                    key={scenario.id}
                    onClick={() => handleSelectPreset(scenario)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 border border-cyan-400 scale-[1.02]'
                        : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
                    }`}
                  >
                    <span>{scenario.title}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded ${
                        isSelected
                          ? 'bg-slate-950/20 text-slate-950'
                          : scenario.presetAnalysis.score > 70
                          ? 'bg-red-500/20 text-red-300'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      {scenario.presetAnalysis.score}% Threat
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Input Area */}
      <div className="bg-[#0b1222] border border-cyan-950/80 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <h3 className="font-semibold text-sm text-slate-100 tracking-wide">
              Raw Payload Inspector (Paste Custom SMS / Email / Telegram / Link)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors font-mono px-2 py-1 rounded bg-slate-900 border border-slate-800"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="mt-3">
          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setSelectedPresetId(null);
            }}
            rows={5}
            placeholder="Paste suspicious WhatsApp message, urgent email alert, SMS text, or URL here to deconstruct psychological & technical attack vectors..."
            className="w-full bg-[#070b16] border border-slate-800 rounded-xl p-4 text-sm font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-y"
          />
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <span className="text-xs text-slate-400 font-mono">
            Analysis incorporates: NLP Temporal Triggers, Typo-Squatting, Credential Traps, and Threat Scoring.
          </span>

          <button
            onClick={handleScan}
            disabled={isScanning || !inputText.trim()}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                <span>Running Zero-Trust Heuristics...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-slate-950" />
                <span>Deconstruct & Analyze Payload</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Results Display */}
      {analysisResult ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AttackAnatomy
              content={inputText}
              indicators={analysisResult.indicators}
            />
            <ThreatScorecard
              analysis={analysisResult}
            />
          </div>

          {/* Quick Action to Incident Report */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-800/40 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100 font-mono">
                  Threat Triage Complete ({analysisResult.score}/100 Risk)
                </h4>
                <p className="text-xs text-slate-400">
                  Generate an official Cyber Crime / IT Desk containment docket from this payload.
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectForPlaybook({ content: inputText, analysis: analysisResult })}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-mono text-xs font-semibold transition-all cursor-pointer"
            >
              <span>Open Containment Playbook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center rounded-2xl bg-[#0b1222]/50 border border-slate-800 text-slate-500 font-mono text-sm">
          Enter content above or choose a preset test case to trigger threat analysis.
        </div>
      )}

    </div>
  );
}
