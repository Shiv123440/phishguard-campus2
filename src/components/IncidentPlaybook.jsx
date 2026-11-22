import React, { useState } from 'react';
import { ShieldAlert, Copy, Check, Download, CheckSquare, Square, FileText, Lock, AlertTriangle, ExternalLink } from 'lucide-react';

export default function IncidentPlaybook({ selectedItem }) {
  const [copied, setCopied] = useState(false);
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Do not click external URLs or scan attached QR codes', done: true },
    { id: 2, text: 'Submit domain to Campus IT Firewall blocklist (DNS sinkhole)', done: false },
    { id: 3, text: 'Revoke active OAuth & SSO sessions if credentials were submitted', done: false },
    { id: 4, text: 'Notify Bank / Freeze UPI handle if financial transfer initiated', done: false },
    { id: 5, text: 'Broadcast warning notice to hostel & student WhatsApp groups', done: false }
  ]);

  const toggleCheck = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const payload = selectedItem?.content || 'Suspicious Fall 2026 examination fee notice requesting urgent UPI transfer via portal-campus-fees.online';
  const analysis = selectedItem?.analysis || {
    score: 96,
    severity: 'CRITICAL',
    iocs: {
      domain: 'portal-campus-fees.online',
      ip: '185.220.101.52',
      ssl: 'Let\'s Encrypt 1-Day Old',
      intent: 'Student payment fraud & credential theft'
    }
  };

  const incidentId = 'AEGIS-2026-X84B-92';
  const timestamp = new Date().toISOString();

  const formattedReport = `=====================================================
AEGISGUARD ZERO-TRUST CYBER INCIDENT REPORT
Reference ID: ${incidentId}
Generated At: ${timestamp}
Classification: ${analysis.severity} (Threat Score: ${analysis.score}/100)
=====================================================

1. INCIDENT OVERVIEW:
Social engineering attack targeted against student/campus community using coercive urgency tactics and deceptive infrastructure.

2. EVIDENCE PAYLOAD CAPTURE:
"""
${payload}
"""

3. INDICATORS OF COMPROMISE (IOCs):
- Identified Target Host / Domain: ${analysis.iocs?.domain || 'N/A'}
- Host Signature / IP Classification: ${analysis.iocs?.ip || 'N/A'}
- Cryptographic TLS Status: ${analysis.iocs?.ssl || 'N/A'}
- Attack Vector & Intent: ${analysis.iocs?.intent || 'Social engineering / credential harvesting'}

4. RECOMMENDED REMEDIATION ACTIONS:
- Add ${analysis.iocs?.domain || 'target domain'} to campus DNS sinkhole
- Trigger student credential invalidation for affected users
- File formal notice on National Cyber Crime Reporting Portal (cybercrime.gov.in)
- Flag deceptive payment VPAs to National Payments Corporation of India (NPCI)

Report Hash (SHA-256): e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
=====================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([formattedReport], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Incident-Report-${incidentId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-[#0b1222] border border-emerald-900/60 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
              <span>Automated Incident Response & Playbook</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Incident Triage Dossier & Containment Playbook
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              One-click standardized evidence docket for University IT Helpdesk, CERT-In, and National Cyber Crime Portal.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white font-mono text-xs font-semibold transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Docket'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .TXT</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Standardized Report View */}
        <div className="lg:col-span-2 bg-[#0b1222] border border-cyan-950/80 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <h3 className="font-semibold text-sm text-slate-100 font-mono">
                Standardized Evidence Docket [{incidentId}]
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 font-bold">
              {analysis.severity}
            </span>
          </div>

          <pre className="p-4 rounded-xl bg-[#060912] border border-slate-800/90 text-xs font-mono text-emerald-300 leading-relaxed overflow-x-auto whitespace-pre-wrap select-all max-h-[460px] overflow-y-auto">
            {formattedReport}
          </pre>
        </div>

        {/* Right 1 Col: Interactive Containment Checklist */}
        <div className="bg-[#0b1222] border border-cyan-950/80 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              <h3 className="font-semibold text-sm text-slate-100">
                Containment Checklist
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              {checklist.filter(c => c.done).length}/{checklist.length} DONE
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Critical defensive steps required to contain exposure and prevent campus-wide lateral movement.
          </p>

          <div className="space-y-3">
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-3 rounded-xl border text-xs font-mono transition-all flex items-start gap-3 cursor-pointer ${
                  item.done
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {item.done ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                )}
                <span className={item.done ? 'line-through opacity-80' : ''}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Direct Government & Campus Portal Links */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
              Official Reporting Portals:
            </span>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-cyan-300 hover:text-cyan-200 hover:border-cyan-500/40 transition-all"
            >
              <span>National Cyber Crime Portal (1930)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.cert-in.org.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-cyan-300 hover:text-cyan-200 hover:border-cyan-500/40 transition-all"
            >
              <span>CERT-In Incident Desk</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
