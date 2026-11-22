import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, Fingerprint, Activity, Server, Lock } from 'lucide-react';

export default function ThreatScorecard({ analysis }) {
  if (!analysis) return null;

  const { score, severity, vectors, iocs, summary } = analysis;

  const getScoreColor = (val) => {
    if (val >= 80) return 'text-red-400 stroke-red-500 shadow-red-500/20';
    if (val >= 50) return 'text-amber-400 stroke-amber-500 shadow-amber-500/20';
    if (val >= 25) return 'text-yellow-400 stroke-yellow-500 shadow-yellow-500/20';
    return 'text-emerald-400 stroke-emerald-500 shadow-emerald-500/20';
  };

  const getProgressBarColor = (val) => {
    if (val >= 80) return 'bg-red-500';
    if (val >= 50) return 'bg-amber-500';
    if (val >= 25) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  // SVG Circular Gauge calculation
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-[#0b1222] border border-cyan-950/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
      
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h3 className="font-semibold text-sm text-slate-100 tracking-wide">
              Threat Scorecard & Risk Vectors
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            ZERO-TRUST ML
          </span>
        </div>

        {/* Gauge + Severity Banner */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-around gap-4 p-4 rounded-xl bg-[#070b16] border border-slate-800/80">
          
          {/* Circular Gauge */}
          <div className="relative flex items-center justify-center">
            <svg className="w-32 h-32 -rotate-90 transform">
              <circle
                cx="64"
                cy="64"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="64"
                cy="64"
                r={radius}
                className={`transition-all duration-1000 ease-out ${
                  score >= 80 ? 'stroke-red-500' : score >= 50 ? 'stroke-amber-500' : 'stroke-emerald-400'
                }`}
                strokeWidth="9"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            
            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-3xl font-extrabold font-mono ${getScoreColor(score).split(' ')[0]}`}>
                {score}
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                / 100 INDEX
              </span>
            </div>
          </div>

          {/* Severity & Summary Text */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              {score >= 80 ? (
                <ShieldAlert className="w-5 h-5 text-red-400" />
              ) : score >= 50 ? (
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              )}
              <span className={`font-mono font-extrabold text-sm tracking-wider uppercase ${getScoreColor(score).split(' ')[0]}`}>
                {severity}
              </span>
            </div>
            
            <p className="mt-2 text-xs text-slate-300 leading-relaxed font-sans">
              {summary}
            </p>
          </div>

        </div>

        {/* 4 Vector Metrics Breakdown */}
        <div className="mt-5 space-y-3">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">Temporal Urgency & Panic Induction</span>
              <span className="text-slate-200 font-semibold">{vectors.urgency}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-700 ${getProgressBarColor(vectors.urgency)}`}
                style={{ width: `${vectors.urgency}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">Brand / Institutional Impersonation</span>
              <span className="text-slate-200 font-semibold">{vectors.impersonation}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-700 ${getProgressBarColor(vectors.impersonation)}`}
                style={{ width: `${vectors.impersonation}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">Credential / Financial Harvest Risk</span>
              <span className="text-slate-200 font-semibold">{vectors.credentialRisk}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-700 ${getProgressBarColor(vectors.credentialRisk)}`}
                style={{ width: `${vectors.credentialRisk}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">Route & Domain Canonical Integrity</span>
              <span className="text-slate-200 font-semibold">{vectors.domainIntegrity}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-700 ${getProgressBarColor(vectors.domainIntegrity)}`}
                style={{ width: `${vectors.domainIntegrity}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Indicators of Compromise (IOC) Box */}
        {iocs && (
          <div className="mt-5 p-3.5 rounded-xl bg-[#070b16] border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300 pb-2 border-b border-slate-800">
              <Fingerprint className="w-3.5 h-3.5 text-cyan-400" />
              <span>Extracted IOC Evidence Matrix</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-[11px] font-mono">
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block">Identified Endpoint:</span>
                <span className="text-cyan-300 truncate block font-semibold">{iocs.domain}</span>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block">Host Signature:</span>
                <span className="text-slate-300 truncate block font-semibold">{iocs.ip}</span>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block">TLS Profile:</span>
                <span className="text-slate-300 truncate block font-semibold">{iocs.ssl}</span>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block">Assessed Vector:</span>
                <span className="text-amber-300 truncate block font-semibold">{iocs.intent}</span>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
