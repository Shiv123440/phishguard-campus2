import React, { useState } from 'react';
import { AlertCircle, ShieldAlert, CheckCircle2, Info, Eye } from 'lucide-react';

export default function AttackAnatomy({ content, indicators = [] }) {
  const [activeIndicator, setActiveIndicator] = useState(null);

  // Helper to highlight words in text
  const renderHighlightedContent = () => {
    if (!content) return null;
    if (!indicators || indicators.length === 0) {
      return <p className="text-slate-300 font-mono text-sm leading-relaxed whitespace-pre-wrap">{content}</p>;
    }

    // Split and highlight phrases
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
              className={`cursor-pointer px-1 py-0.5 rounded font-semibold font-mono text-xs transition-all inline-block mx-0.5 ${
                ind.risk === 'critical'
                  ? 'bg-red-500/25 text-red-300 border border-red-500/60 hover:bg-red-500/40 glow-red'
                  : ind.risk === 'high'
                  ? 'bg-amber-500/25 text-amber-300 border border-amber-500/60 hover:bg-amber-500/40'
                  : ind.risk === 'safe'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/30 glow-green'
                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500/30'
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
      <div className="text-slate-200 font-mono text-sm leading-relaxed whitespace-pre-wrap">
        {parts}
      </div>
    );
  };

  return (
    <div className="bg-[#0b1222] border border-cyan-950/80 rounded-2xl p-5 shadow-xl relative overflow-hidden">
      
      {/* Subtle top cyber accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60"></div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-cyan-400" />
          <h3 className="font-semibold text-sm text-slate-100 tracking-wide">
            Attack Vector Deconstruction & Trigger Map
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Hover / Click highlighted tokens to inspect psychological triggers
        </span>
      </div>

      {/* Main inspected content */}
      <div className="mt-4 p-4 rounded-xl bg-[#070b16] border border-slate-800/80 min-h-[120px]">
        {renderHighlightedContent()}
      </div>

      {/* Interactive Trigger Inspector Card */}
      {activeIndicator && (
        <div className="mt-4 p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 flex items-start gap-3 animate-fadeIn">
          {activeIndicator.risk === 'critical' ? (
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          ) : activeIndicator.risk === 'safe' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          )}

          <div className="flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-slate-100">
                Trigger: "{activeIndicator.phrase}"
              </span>
              <span
                className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                  activeIndicator.risk === 'critical'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : activeIndicator.risk === 'safe'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}
              >
                {activeIndicator.risk} Risk
              </span>
            </div>

            <p className="text-xs text-cyan-300 mt-1 font-mono font-semibold">
              Category: {activeIndicator.type}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {activeIndicator.risk === 'critical'
                ? 'Coercive social engineering tactic designed to induce irrational panic, override critical thinking, and force immediate compliance.'
                : activeIndicator.risk === 'safe'
                ? 'Verified standard operational protocol token matching genuine institutional administrative nomenclature.'
                : 'Potential deception marker often used in phishing lures and unauthorized credential collection.'}
            </p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
        <span className="text-slate-500">Risk Markers:</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-red-500/80"></span>
          <span>Critical Manipulation / Malicious Link</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-amber-500/80"></span>
          <span>High Urgency / Financial Trap</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-emerald-500/80"></span>
          <span>Verified Institutional Safe</span>
        </span>
      </div>

    </div>
  );
}
