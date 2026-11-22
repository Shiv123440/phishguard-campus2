import React, { useState } from 'react';
import { Eye, ShieldAlert, CheckCircle2, AlertTriangle, Fingerprint, Activity } from 'lucide-react';
import InteractiveRadarChart from './InteractiveRadarChart';

export default function VisualThreatDeconstruction({ content, analysis }) {
  const [activeIndicator, setActiveIndicator] = useState(null);

  if (!analysis) return null;

  const { score, severity, vectors, indicators, iocs, summary } = analysis;

  const renderHighlightedContent = () => {
    if (!content) return null;
    if (!indicators || indicators.length === 0) {
      return <p className="text-slate-300 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{content}</p>;
    }

    let parts = [content];

    indicators.forEach((ind) => {
      if (!ind.phrase) return;
      const newParts = [];

      parts.forEach((part) => {
        if (typeof part !== 'string') {
          newParts.push(part);
          return;
        }

        const lowerPart = part.toLowerCase();
        const lowerPhrase = ind.phrase.toLowerCase();
        const index = lowerPart.indexOf(lowerPhrase);

        if (index !== -1) {
          const before = part.substring(0, index);
          const matched = part.substring(index, index + ind.phrase.length);
          const after = part.substring(index + ind.phrase.length);

          if (before) newParts.push(before);
          newParts.push(
            <span
              key={`${ind.phrase}-${Math.random()}`}
              onClick={() => setActiveIndicator(ind)}
              onMouseEnter={() => setActiveIndicator(ind)}
              className={`cursor-pointer px-1.5 py-0.5 rounded font-mono text-xs transition-all inline-block mx-0.5 font-semibold ${
                ind.risk === 'critical'
                  ? 'bg-[#FF365D]/15 text-red-200 border border-[#FF365D]/40 hover:bg-[#FF365D]/25'
                  : ind.risk === 'high'
                  ? 'bg-amber-500/15 text-amber-200 border border-amber-500/40 hover:bg-amber-500/25'
                  : ind.risk === 'safe'
                  ? 'bg-[#00FF9C]/10 text-[#00FF9C] border border-[#00FF9C]/30 hover:bg-[#00FF9C]/20'
                  : 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 hover:bg-[#00E5FF]/20'
              }`}
            >
              {matched}
            </span>
          );
          if (after) newParts.push(after);
        } else {
          newParts.push(part);
        }
      });

      parts = newParts;
    });

    return (
      <div className="text-slate-200 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
        {parts}
      </div>
    );
  };

  const getMeterColor = (val) => {
    if (val >= 80) return 'bg-[#FF365D]';
    if (val >= 50) return 'bg-amber-500';
    if (val >= 25) return 'bg-yellow-500';
    return 'bg-[#00FF9C]';
  };

  return (
    <div className="space-y-6 animate-card-in font-sans">
      
      {/* Top Banner with Threat Classification */}
      <div className="saas-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className={`p-3 rounded-xl border shrink-0 ${
            score >= 75 ? 'bg-[#FF365D]/15 border-[#FF365D]/40 text-[#FF365D]' : 'bg-[#00FF9C]/15 border-[#00FF9C]/40 text-[#00FF9C]'
          }`}>
            <ShieldAlert className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                Verdict:
              </span>
              <span className={`font-heading font-bold text-sm sm:text-base tracking-tight uppercase ${
                score >= 75 ? 'text-[#FF365D]' : score >= 40 ? 'text-amber-400' : 'text-[#00FF9C]'
              }`}>
                {severity} ({score}/100 Risk)
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed max-w-xl">
              {summary}
            </p>
          </div>
        </div>

        <div className="text-xs font-mono px-3 py-1 rounded bg-[#080D16] border border-white/[0.08] text-slate-400 shrink-0 self-stretch sm:self-auto text-center font-semibold">
          HEURISTIC SCANNER v2.4
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Highlighted Message & Red Flag Inspector */}
        <div className="lg:col-span-7 saas-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#00E5FF]" />
              <h2 className="card-heading text-white">
                Attack Vector Deconstruction
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              Click tokens to inspect
            </span>
          </div>

          {/* Highlighted text container */}
          <div className="p-4 rounded-xl bg-[#080D16] border border-white/[0.06] min-h-[130px]">
            {renderHighlightedContent()}
          </div>

          {/* Active Red Flag Explanation Drawer */}
          {activeIndicator ? (
            <div className="p-4 rounded-xl bg-[#080D16] border border-[#00E5FF]/25 space-y-1.5 animate-fadeIn">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold text-white">
                  Token: "{activeIndicator.phrase}"
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase border ${
                  activeIndicator.risk === 'critical'
                    ? 'bg-[#FF365D]/15 text-[#FF365D] border-[#FF365D]/30'
                    : activeIndicator.risk === 'safe'
                    ? 'bg-[#00FF9C]/15 text-[#00FF9C] border-[#00FF9C]/30'
                    : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                }`}>
                  {activeIndicator.risk} Risk
                </span>
              </div>

              <div className="text-xs font-medium text-[#00E5FF]">
                Attack Vector: {activeIndicator.type}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {activeIndicator.explanation}
              </p>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-[#080D16]/50 border border-white/[0.06] text-xs text-slate-400 text-center">
              Hover or click any highlighted segment above to inspect why it triggers the threat heuristics.
            </div>
          )}

          {/* Indicators of Compromise (IOC) */}
          {iocs && (
            <div className="pt-3 border-t border-white/[0.08]">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 pb-2">
                <Fingerprint className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>Extracted IOC Evidence Matrix</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-[#080D16] border border-white/[0.06]">
                  <span className="text-slate-500 block text-[10px]">TARGET DOMAIN / ENDPOINT:</span>
                  <span className="text-[#00E5FF] truncate block font-bold">{iocs.domain}</span>
                </div>
                <div className="p-2.5 rounded bg-[#080D16] border border-white/[0.06]">
                  <span className="text-slate-500 block text-[10px]">PAYMENT VPA / UPI:</span>
                  <span className="text-amber-400 truncate block font-bold">{iocs.vpa || 'None'}</span>
                </div>
                <div className="p-2.5 rounded bg-[#080D16] border border-white/[0.06]">
                  <span className="text-slate-500 block text-[10px]">HOST / IP PROFILE:</span>
                  <span className="text-slate-300 truncate block font-bold">{iocs.ip}</span>
                </div>
                <div className="p-2.5 rounded bg-[#080D16] border border-white/[0.06]">
                  <span className="text-slate-500 block text-[10px]">PRIMARY ATTACK INTENT:</span>
                  <span className="text-red-300 truncate block font-bold">{iocs.intent}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right 5 Cols: Radar Chart & 4 Vector Progress Meters */}
        <div className="lg:col-span-5 saas-card p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#00E5FF]" />
              <h2 className="card-heading text-white">
                Multi-Vector Radar Geometry
              </h2>
            </div>
            <span className="text-xs text-[#00E5FF] font-semibold">RADAR v2</span>
          </div>

          {/* SVG Radar Chart */}
          <div className="flex justify-center">
            <InteractiveRadarChart
              vectors={vectors}
              score={score}
              severity={severity}
            />
          </div>

          {/* 4 Risk Progress Meters */}
          <div className="space-y-3 pt-3 border-t border-white/[0.08] text-xs">
            <div>
              <div className="flex justify-between mb-1 text-slate-300 font-medium">
                <span>Phishing Confidence</span>
                <span className="font-mono font-bold text-white">{vectors.phishingConfidence}%</span>
              </div>
              <div className="w-full bg-[#080D16] rounded-full h-1.5 overflow-hidden border border-white/[0.06]">
                <div
                  className={`h-full transition-all duration-500 ${getMeterColor(vectors.phishingConfidence)}`}
                  style={{ width: `${vectors.phishingConfidence}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-slate-300 font-medium">
                <span>Impersonation Level</span>
                <span className="font-mono font-bold text-white">{vectors.impersonationLevel}%</span>
              </div>
              <div className="w-full bg-[#080D16] rounded-full h-1.5 overflow-hidden border border-white/[0.06]">
                <div
                  className={`h-full transition-all duration-500 ${getMeterColor(vectors.impersonationLevel)}`}
                  style={{ width: `${vectors.impersonationLevel}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-slate-300 font-medium">
                <span>Domain Risk</span>
                <span className="font-mono font-bold text-white">{vectors.domainRisk}%</span>
              </div>
              <div className="w-full bg-[#080D16] rounded-full h-1.5 overflow-hidden border border-white/[0.06]">
                <div
                  className={`h-full transition-all duration-500 ${getMeterColor(vectors.domainRisk)}`}
                  style={{ width: `${vectors.domainRisk}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-slate-300 font-medium">
                <span>Payload Risk</span>
                <span className="font-mono font-bold text-white">{vectors.payloadRisk}%</span>
              </div>
              <div className="w-full bg-[#080D16] rounded-full h-1.5 overflow-hidden border border-white/[0.06]">
                <div
                  className={`h-full transition-all duration-500 ${getMeterColor(vectors.payloadRisk)}`}
                  style={{ width: `${vectors.payloadRisk}%` }}
                ></div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
