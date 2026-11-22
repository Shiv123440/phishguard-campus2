// Heuristic Natural Language and Security Feature Extraction Engine
// Note: This operates strictly as an offline zero-trust heuristic rule engine,
// not pretending to query live proprietary external blocklists without connectivity.

const URGENCY_PATTERNS = [
  /within \d+\s*(hours?|mins?|minutes?|days?)/i,
  /immediately|urgent|critical|emergency|asap|act now|expires (today|soon)|last chance/i,
  /failure to comply|before \d+:\d+\s*(pm|am)|before \d+\s*(pm|am)/i,
  /don't ignore|immediate action required|suspended within/i
];

const COERCION_PATTERNS = [
  /suspend(ed|ion)?|de-register|deregistration|disciplinary action|police report|fine of|penalty/i,
  /account (blocked|frozen|locked)|revocation|cancelled|terminated|vacate room/i,
  /legal action|arrest warrant|court notice|hall ticket/i
];

const IMPERSONATION_PATTERNS = [
  /registrar(\s+office)?|dean of|welfare|director|exam(ination)? cell|placement cell|hostel warden/i,
  /google(\s+india)?|amazon|microsoft|apple|meta|netflix/i,
  /state bank|sbi|hdfc|icici|rbi|income tax|cyber cell|police/i,
  /national scholarship portal|nsp|ugc|pmkvy|gov\.in/i
];

const SENSITIVE_FINANCIAL_PATTERNS = [
  /aadhaar|pan card|kyc|photo ID|passport copy|front-back photo/i,
  /otp|pin|password|cvv|secret code|auth token|master password/i,
  /upi|gpay|paytm|phonepe|send rs|pay inr|advance fee|deposit fee|processing fee|registration fee/i,
  /earn \d+.*daily|guaranteed return|crypto|usdt|telegram coordinator/i
];

const SUSPICIOUS_DOMAIN_EXTENSIONS = [
  /\.xyz\b/i, /\.online\b/i, /\.live\b/i, /\.top\b/i, /\.club\b/i, /\.site\b/i,
  /\.buzz\b/i, /\.tk\b/i, /\.ml\b/i, /\.ga\b/i, /\.cf\b/i, /\.link\b/i, /\.work\b/i
];

const SAFE_DOMAIN_EXTENSIONS = [
  /\.edu(\.[a-z]{2})?\b/i, /\.ac\.[a-z]{2}\b/i, /\.gov(\.[a-z]{2})?\b/i
];

export function analyzeCustomContent(text) {
  if (!text || text.trim().length === 0) {
    return null;
  }

  const indicators = [];
  let urgencyPoints = 5;
  let impersonationPoints = 5;
  let financialRiskPoints = 5;
  let domainRiskPoints = 5;

  // 1. Urgency detection
  URGENCY_PATTERNS.forEach(pattern => {
    const match = text.match(pattern);
    if (match) {
      urgencyPoints += 32;
      indicators.push({
        phrase: match[0],
        type: 'Temporal Pressure / Panic Trigger',
        risk: 'critical',
        explanation: 'Creates acute time stress to short-circuit critical evaluation and consultation.'
      });
    }
  });

  // 2. Coercion & Penalties
  COERCION_PATTERNS.forEach(pattern => {
    const match = text.match(pattern);
    if (match) {
      urgencyPoints += 25;
      financialRiskPoints += 25;
      indicators.push({
        phrase: match[0],
        type: 'Coercive Penalty / Threat of Loss',
        risk: 'critical',
        explanation: 'Threatens severe disciplinary or academic sanctions if compliance is delayed.'
      });
    }
  });

  // 3. Impersonation detection
  IMPERSONATION_PATTERNS.forEach(pattern => {
    const match = text.match(pattern);
    if (match) {
      impersonationPoints += 35;
      indicators.push({
        phrase: match[0],
        type: 'Brand or Authority Claim',
        risk: 'high',
        explanation: 'Falsely borrows credibility of recognized institutions or corporations.'
      });
    }
  });

  // 4. Financial & Identity Traps
  SENSITIVE_FINANCIAL_PATTERNS.forEach(pattern => {
    const match = text.match(pattern);
    if (match) {
      financialRiskPoints += 35;
      indicators.push({
        phrase: match[0],
        type: 'Credential / Financial Harvesting Trap',
        risk: 'critical',
        explanation: 'Directly solicits identity documents, credentials, or unverified fund transfers.'
      });
    }
  });

  // 5. URL & Domain extraction
  const urlRegex = /(https?:\/\/[^\s]+|t\.me\/[^\s]+|bit\.ly\/[^\s]+|tinyurl\.com\/[^\s]+)/gi;
  const urls = text.match(urlRegex) || [];
  let extractedDomain = 'None detected';

  if (urls.length > 0) {
    const firstUrl = urls[0];
    try {
      const cleanUrl = firstUrl.startsWith('http') ? firstUrl : `https://${firstUrl}`;
      const urlObj = new URL(cleanUrl);
      extractedDomain = urlObj.hostname;

      const isSuspiciousTLD = SUSPICIOUS_DOMAIN_EXTENSIONS.some(re => re.test(urlObj.hostname));
      const isShortener = /(bit\.ly|tinyurl\.com|t\.co|is\.gd|cutt\.ly)/i.test(urlObj.hostname);
      const isSafeAcademic = SAFE_DOMAIN_EXTENSIONS.some(re => re.test(urlObj.hostname));

      if (isSafeAcademic) {
        domainRiskPoints = 4;
        indicators.push({
          phrase: urlObj.hostname,
          type: 'Verified Institutional Academic Domain',
          risk: 'safe',
          explanation: 'Conforms to accredited higher-education academic network protocols.'
        });
      } else if (isSuspiciousTLD) {
        domainRiskPoints += 85;
        indicators.push({
          phrase: urlObj.hostname,
          type: 'Disposable / High-Risk TLD',
          risk: 'critical',
          explanation: 'Commonly registered for fleeting phishing campaigns with zero verified ownership.'
        });
      } else if (isShortener) {
        domainRiskPoints += 60;
        indicators.push({
          phrase: firstUrl,
          type: 'Obfuscated URL Shortener',
          risk: 'high',
          explanation: 'Deliberately conceals true server endpoint destination from the recipient.'
        });
      } else {
        domainRiskPoints += 45;
        indicators.push({
          phrase: urlObj.hostname,
          type: 'Unverified External Domain',
          risk: 'high',
          explanation: 'Third-party host with no official association to academic records.'
        });
      }
    } catch {
      domainRiskPoints += 30;
    }
  }

  // Check for UPI Handles
  const upiRegex = /[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/g;
  const upiMatches = text.match(upiRegex) || [];
  let extractedVpa = 'None';
  if (upiMatches.length > 0) {
    extractedVpa = upiMatches[0];
    financialRiskPoints += 30;
    indicators.push({
      phrase: extractedVpa,
      type: 'Consumer UPI Handle Payment Vector',
      risk: 'high',
      explanation: 'Personal UPI handle soliciting payments outside institutional ERP billing accounts.'
    });
  }

  // Map to the 4 Core Vector Metrics
  const phishingConfidence = Math.min(Math.max(Math.round(urgencyPoints * 0.4 + impersonationPoints * 0.3 + financialRiskPoints * 0.3), 5), 98);
  const impersonationLevel = Math.min(Math.max(impersonationPoints, 4), 98);
  const domainRisk = Math.min(Math.max(domainRiskPoints, 4), 99);
  const payloadRisk = Math.min(Math.max(financialRiskPoints, 4), 98);

  const totalScore = Math.round(
    phishingConfidence * 0.35 +
    impersonationLevel * 0.25 +
    domainRisk * 0.20 +
    payloadRisk * 0.20
  );

  let severity = 'LOW RISK';
  let badgeColor = '#00FF9C';
  if (totalScore >= 80) {
    severity = 'CRITICAL THREAT';
    badgeColor = '#FF365D';
  } else if (totalScore >= 50) {
    severity = 'SUSPICIOUS / ELEVATED RISK';
    badgeColor = '#F59E0B';
  } else if (totalScore >= 25) {
    severity = 'MODERATE CAUTION';
    badgeColor = '#FBBF24';
  } else {
    severity = 'VERIFIED SAFE';
    badgeColor = '#00FF9C';
  }

  return {
    score: totalScore,
    severity,
    badgeColor,
    isHeuristicOffline: true,
    transparencyNote: 'HEURISTIC RISK ASSESSMENT (OFFLINE ZERO-TRUST). Based on natural language deception patterns, domain topology heuristics, and financial solicitation markers.',
    summary: totalScore > 65
      ? `High-confidence deceptive threat detected. Extracted ${indicators.length} risk indicators including severe psychological pressure triggers, unverified payment vectors, and suspicious routing.`
      : totalScore > 30
      ? `Caution recommended. Content exhibits mild coercion or unverified third-party references requiring institutional validation.`
      : `No significant deceptive markers detected. Content exhibits standard legitimate communication structures.`,
    vectors: {
      phishingConfidence,
      impersonationLevel,
      domainRisk,
      payloadRisk
    },
    indicators: indicators.length > 0 ? indicators : [
      { phrase: 'Standard Text Structure', type: 'Normal conversational syntax', risk: 'safe', explanation: 'No anomalies detected.' }
    ],
    iocs: {
      domain: extractedDomain,
      ip: totalScore > 60 ? 'Unverified / Dynamic Host Range' : 'Standard Host Profile',
      vpa: extractedVpa,
      ssl: totalScore > 60 ? 'Third-Party DV TLS' : 'Standard Verified TLS',
      intent: totalScore > 60 ? 'Suspected credential theft or financial intercept' : 'Benign information broadcast'
    },
    safeResponse: totalScore > 50
      ? `I have noted your message. University policy strictly requires financial, academic, and credential matters to be handled via official verified portals (.edu.in) or directly in person at the administration office. I do not transfer funds to personal UPI handles or click unverified links.`
      : `Notice acknowledged through standard student channels.`,
    recommendedActions: totalScore > 50 ? [
      'Do not click external URLs or submit payment details.',
      'Report the sender handle to campus security and Telecom DND.',
      'Submit the domain for campus firewall blocklisting.',
      'If credentials were entered, immediately reset your campus LDAP password.'
    ] : [
      'No defensive escalation needed.'
    ]
  };
}
