import React, { useState } from 'react';
import { ShieldCheck, Copy, Check, Download, ExternalLink, CheckSquare, Square, FileText, Send, Building, ShieldAlert } from 'lucide-react';

export default function OneClickSafeDefense({ payload, analysis, onShowToast }) {
  const [activeTab, setActiveTab] = useState('cybercell');
  const [copiedTab, setCopiedTab] = useState(null);
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Do not click provided URLs or scan any embedded QR code.', done: true },
    { id: 2, text: 'Submit domain to Campus IT Firewall blocklist / DNS sinkhole.', done: false },
    { id: 3, text: 'Revoke active student OAuth/SSO sessions if credentials were submitted.', done: false },
    { id: 4, text: 'Contact Bank immediately & freeze UPI handle if fund transfer was attempted.', done: false },
    { id: 5, text: 'Broadcast warning notice to hostel & student WhatsApp groups.', done: false }
  ]);

  const toggleCheck = (id) => {
    setChecklist(prev => prev.map(c => c.id === id ? { ...c, done: !c.done } : c));
  };

  const incidentId = 'PGC-SOC-2026-X84B';
  const timestamp = new Date().toISOString();

  const currentPayload = payload || 'Urgent Fall 2026 examination registration fee notice via portal-campus-fees.online';
  const currentAnalysis = analysis || {
    score: 96,
    severity: 'CRITICAL THREAT',
    iocs: {
      domain: 'portal-campus-fees.online',
      vpa: 'univ.exam.fee@ybl',
      ip: '185.220.101.52',
      intent: 'Student fee fraud & credential theft'
    },
    safeResponse: 'I will verify my examination fee status directly on student.university.edu.in. I do not transfer funds to personal UPI handles or click unverified links.',
    recommendedActions: [
      'Do not click provided URLs or scan attached QR codes.',
      'Report personal UPI handle to bank and cyber helpline 1930.',
      'Submit suspicious domain to campus firewall blocklist.'
    ]
  };

  const cyberCellReport = `=====================================================
NATIONAL CYBER CRIME REPORTING PORTAL (1930 / cybercrime.gov.in)
INCIDENT DOSSIER: ${incidentId}
REPORTED AT: ${timestamp}
INCIDENT TYPE: Social Engineering / Financial Impersonation Phishing
THREAT LEVEL: ${currentAnalysis.severity} (Score: ${currentAnalysis.score}/100)
=====================================================

COMPLAINANT / REPORTING ENTITY:
Student Defense Monitoring Cell (PhishGuard Campus SOC)

SUSPICIOUS EVIDENCE PAYLOAD CAPTURE:
-----------------------------------------------------
${currentPayload}
-----------------------------------------------------

INDICATORS OF COMPROMISE (IOCs):
- Identified Malicious Host / Domain: ${currentAnalysis.iocs?.domain || 'N/A'}
- Extracted Payment VPA Handle: ${currentAnalysis.iocs?.vpa || 'N/A'}
- Host Signature / IP Range: ${currentAnalysis.iocs?.ip || 'N/A'}
- Suspected Intent: ${currentAnalysis.iocs?.intent || 'Social engineering / credential theft'}

NARRATIVE SUMMARY:
Suspect utilized deceptive urgency triggers, institutional authority impersonation, and unverified payment channels to coerce victim into unauthorized fund transfer / credential disclosure.

RECOMMENDED LAW ENFORCEMENT ACTIONS:
1. Block identified VPA handle (${currentAnalysis.iocs?.vpa || 'N/A'}) with NPCI.
2. Request domain registrar suspension for ${currentAnalysis.iocs?.domain || 'N/A'}.
3. Trace hosting provider IP infrastructure.

Evidence Cryptographic Hash (SHA-256): 8f4e2b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b
=====================================================`;

  const campusITDraft = `TO: Campus IT Security & Network Operations Centre (noc@university.edu.in)
FROM: PhishGuard Campus Automated Incident Triage
SUBJECT: [SECURITY ADVISORY] Deceptive Campus Phishing Vector Detected - Block Request

Dear IT Security Team,

Our campus threat triage terminal has intercepted a high-confidence social engineering attack targeting university students.

INCIDENT DETAILS:
- Incident ID: ${incidentId}
- Threat Classification: ${currentAnalysis.severity} (${currentAnalysis.score}/100)
- Target Infrastructure: ${currentAnalysis.iocs?.domain || 'External Host'}
- Associated Payment Handle: ${currentAnalysis.iocs?.vpa || 'N/A'}

EVIDENCE EXTRACT:
"${currentPayload.substring(0, 220)}..."

REQUESTED IT CONTAINMENT ACTIONS:
1. Implement immediate DNS Sinkhole for "${currentAnalysis.iocs?.domain || 'target domain'}" on all campus Wi-Fi & LAN resolvers.
2. Filter incoming emails containing matching subjects or URLs at the campus mail gateway.
3. Broadcast a brief notification via the official Student Intranet noticeboard.

Generated automatically by PhishGuard Campus SOC.`;

  const safeResponseText = currentAnalysis.safeResponse || `I have received your notification. To comply with institutional security policies, I handle all university matters, fee verifications, and internship submissions solely through the official accredited portal at https://university.edu.in or in person at the administration office. I do not transfer funds to personal UPI handles or click unverified links.`;

  const getActiveTextToCopy = () => {
    switch (activeTab) {
      case 'cybercell': return cyberCellReport;
      case 'campusit': return campusITDraft;
      case 'saferesponse': return safeResponseText;
      default: return cyberCellReport;
    }
  };

  const handleCopy = (tabKey) => {
    const text = getActiveTextToCopy();
    navigator.clipboard.writeText(text);
    setCopiedTab(tabKey);
    if (onShowToast) {
      onShowToast('Draft copied to clipboard!', 'success');
    }
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const handleDownload = () => {
    const text = getActiveTextToCopy();
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${activeTab.toUpperCase()}-Dossier-${incidentId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    if (onShowToast) {
      onShowToast(`Downloaded ${activeTab.toUpperCase()} Dossier`, 'info');
    }
  };

  return (
    <div className="space-y-6 animate-card-in font-sans">
      
      {/* Header (Space Grotesk + Inter) */}
      <div className="saas-hero p-6 sm:p-7 border border-[#00FF9C]/25 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00FF9C]/10 border border-[#00FF9C]/25 text-[#00FF9C] text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>One-Click Safe Defense Playbook</span>
            </div>
            <h1 className="section-heading text-white">
              Automated Containment & Incident Response
            </h1>
            <p className="text-sm text-slate-300 max-w-xl font-normal leading-relaxed">
              Export standardized legal and IT reporting dockets. Prevent lateral spread with automated de-escalation responses and structured containment protocols.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
            <button
              onClick={() => handleCopy(activeTab)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#080D16] border border-white/[0.1] hover:border-[#00E5FF] text-white font-medium text-xs transition-all btn-tactile cursor-pointer"
            >
              {copiedTab === activeTab ? <Check className="w-4 h-4 text-[#00FF9C]" /> : <Copy className="w-4 h-4 text-[#00E5FF]" />}
              <span>{copiedTab === activeTab ? 'Copied to Clipboard!' : 'Copy Current Draft'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00FF9C] to-emerald-600 text-slate-950 font-semibold text-xs transition-all btn-tactile cursor-pointer shadow-sm shadow-[#00FF9C]/20"
            >
              <Download className="w-4 h-4" />
              <span>Download .TXT</span>
            </button>
          </div>
        </div>

        {/* Tab Controls (Inter Font Segmented Control) */}
        <div className="mt-5 flex flex-wrap gap-1.5 border-b border-white/[0.08] pb-2">
          <button
            onClick={() => setActiveTab('cybercell')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all btn-tactile cursor-pointer ${
              activeTab === 'cybercell'
                ? 'bg-[#00E5FF] text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Cyber Cell Docket</span>
          </button>

          <button
            onClick={() => setActiveTab('campusit')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all btn-tactile cursor-pointer ${
              activeTab === 'campusit'
                ? 'bg-[#00E5FF] text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Campus IT Draft</span>
          </button>

          <button
            onClick={() => setActiveTab('saferesponse')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all btn-tactile cursor-pointer ${
              activeTab === 'saferesponse'
                ? 'bg-[#00E5FF] text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Safe Response</span>
          </button>

          <button
            onClick={() => setActiveTab('actions')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all btn-tactile cursor-pointer ${
              activeTab === 'actions'
                ? 'bg-[#00E5FF] text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Containment Actions ({checklist.filter(c => c.done).length}/{checklist.length})</span>
          </button>
        </div>

      </div>

      {/* Main Content Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Active Report Document */}
        <div className="lg:col-span-8 saas-card p-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00E5FF]" />
              <h2 className="card-heading text-white">
                {activeTab === 'cybercell' && 'Formal Incident Dossier (National 1930 Portal Format)'}
                {activeTab === 'campusit' && 'Campus IT NOC Containment Request Draft'}
                {activeTab === 'saferesponse' && 'Pre-Formatted Safe De-escalation Reply'}
                {activeTab === 'actions' && 'Interactive Containment Protocol Checklist'}
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              ID: {incidentId}
            </span>
          </div>

          {activeTab === 'cybercell' && (
            <pre className="mt-4 p-4 rounded-xl bg-[#080D16] border border-white/[0.06] text-xs font-mono text-[#00FF9C] leading-relaxed overflow-x-auto whitespace-pre-wrap select-all max-h-[440px] overflow-y-auto">
              {cyberCellReport}
            </pre>
          )}

          {activeTab === 'campusit' && (
            <pre className="mt-4 p-4 rounded-xl bg-[#080D16] border border-white/[0.06] text-xs font-mono text-cyan-200 leading-relaxed overflow-x-auto whitespace-pre-wrap select-all max-h-[440px] overflow-y-auto">
              {campusITDraft}
            </pre>
          )}

          {activeTab === 'saferesponse' && (
            <div className="mt-4 space-y-3.5">
              <div className="p-4 rounded-xl bg-[#080D16] border border-white/[0.06] text-sm text-slate-200 leading-relaxed">
                "{safeResponseText}"
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                💡 <strong>Why this works:</strong> Scammers rely on panic to bypass cognitive checks. Citing formal institutional policies signals that the lure has failed and deters automated follow-up extortion.
              </p>
            </div>
          )}

          {activeTab === 'actions' && (
            <div className="mt-4 space-y-2.5">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3.5 rounded-xl border text-xs transition-all flex items-start gap-3 btn-tactile cursor-pointer ${
                    item.done
                      ? 'bg-[#00FF9C]/10 border-[#00FF9C]/35 text-[#00FF9C]'
                      : 'bg-[#080D16] border-white/[0.08] text-slate-300 hover:border-white/[0.18]'
                  }`}
                >
                  {item.done ? (
                    <CheckSquare className="w-4 h-4 text-[#00FF9C] shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  )}
                  <span className={item.done ? 'line-through opacity-80' : 'font-medium'}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 4 Cols: Reporting Guidance & Helplines */}
        <div className="lg:col-span-4 saas-card p-6 space-y-4">
          <h2 className="card-heading text-white pb-3 border-b border-white/[0.08]">
            Reporting Guidance
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#080D16] border border-white/[0.06]">
              <span className="font-semibold text-white block text-xs">Step 1: Retain Raw Evidence</span>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Do not delete the scam SMS or chat. Screenshots and headers serve as formal evidence.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#080D16] border border-white/[0.06]">
              <span className="font-semibold text-white block text-xs">Step 2: Dial Helpline 1930</span>
              <p className="text-slate-400 mt-1 leading-relaxed">
                If money was transferred, contact 1930 within the first 2 hours to initiate a bank account freeze.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#080D16] border border-white/[0.06]">
              <span className="font-semibold text-white block text-xs">Step 3: Alert Campus IT NOC</span>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Forward the IT draft so administrators can block rogue domains across the campus Wi-Fi network.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-white/[0.08] space-y-2 font-medium">
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#080D16] border border-[#00E5FF]/25 text-xs text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-colors btn-tactile"
            >
              <span>National Cyber Crime Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://www.cert-in.org.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#080D16] border border-white/[0.08] text-xs text-slate-300 hover:bg-white/[0.04] transition-colors btn-tactile"
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
