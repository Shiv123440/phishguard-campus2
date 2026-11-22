export const SOC_METRICS = {
  totalScans: 14892,
  threatsDetected: 3412,
  criticalBlocked: 841,
  campusProtectionRate: '99.4%',
  defconLevel: 3,
  activeNodes: 12,
  uptime: '99.98%'
};

export const RECENT_THREAT_ACTIVITY = [
  { id: 'act-1', time: '2m ago', channel: 'Telegram', severity: 'CRITICAL', title: 'Task-Scam Bot Ring', target: 'CS Undergraduates', action: 'IOC Extracted & Blocked' },
  { id: 'act-2', time: '14m ago', channel: 'SMS', severity: 'HIGH', title: 'NSP Scholarship UPI Lure', target: 'Engineering Hostel 4', action: 'Reported to 1930' },
  { id: 'act-3', time: '38m ago', channel: 'WhatsApp', severity: 'HIGH', title: 'Fake Mid-Term Exam Fee Form', target: 'First-Year Batch Group', action: 'Advisory Broadcasted' },
  { id: 'act-4', time: '1h ago', channel: 'URL', severity: 'CRITICAL', title: 'Spoofed Wi-Fi Captive Portal', target: 'Library Wireless Subnet', action: 'DNS Sinkholed' },
  { id: 'act-5', time: '2h ago', channel: 'Email', severity: 'SAFE', title: 'Dean Academic Council Minutes', target: 'All Faculty & Students', action: 'Verified Legitimate' }
];

export const PRESET_SCENARIOS = [
  {
    id: 'exam-fee-scam',
    title: 'Urgent Semester Exam Fee Notice',
    badge: 'Campus Phishing',
    channel: 'Email / WhatsApp',
    threatCategory: 'Fraudulent Fee Request',
    content: `URGENT NOTICE FROM UNIVERSITY REGISTRAR OFFICE:
Your Fall 2026 examination registration fee has NOT been reconciled. Failure to clear the dues within 3 hours will result in immediate de-registration from tomorrow's Mid-Term Examinations and a disciplinary fine of INR 5,000.

Click the emergency payment gateway immediately:
http://portal-campus-fee-reconciliation.online/verify-student?id=94821

Pay via UPI handle [univ.exam.fee@ybl] or debit card to avoid hall ticket revocation. Do not ignore.`,
    presetAnalysis: {
      score: 96,
      severity: 'CRITICAL THREAT',
      badgeColor: '#FF365D',
      summary: 'High-severity social engineering attack impersonating the University Registrar using extreme temporal coercion, intimidation, and an unauthorized non-academic domain (.online) with a consumer UPI handle.',
      vectors: {
        phishingConfidence: 96,
        impersonationLevel: 94,
        domainRisk: 98,
        payloadRisk: 92
      },
      indicators: [
        { phrase: 'within 3 hours', type: 'Temporal Pressure / Panic Inducement', risk: 'critical', explanation: 'Forces rapid, unconsidered action to prevent victim from consulting campus authorities.' },
        { phrase: 'immediate de-registration', type: 'Intimidation & Coercive Threat', risk: 'critical', explanation: 'Weaponizes academic anxiety with severe consequences (hall ticket revocation).' },
        { phrase: 'portal-campus-fee-reconciliation.online', type: 'Typo-Squatted Malicious Domain', risk: 'critical', explanation: 'Uses disposable .online extension instead of accredited university .edu.in or .ac.in domain.' },
        { phrase: 'univ.exam.fee@ybl', type: 'Consumer UPI Handle Spoof', risk: 'high', explanation: 'Personal Yes Bank (@ybl) UPI handle masquerading as an institutional university payment gateway.' }
      ],
      iocs: {
        domain: 'portal-campus-fee-reconciliation.online',
        ip: '185.220.101.52 (Bulletproof VPS Host)',
        vpa: 'univ.exam.fee@ybl (Consumer VPA)',
        ssl: 'Let\'s Encrypt 24h Certificate (No Organization Validation)',
        intent: 'Student tuition theft & bank credential harvesting'
      },
      safeResponse: `I have received your message regarding fee reconciliation. To ensure security, I will verify my enrollment and payment status directly through the official university portal at https://student.university.edu.in and visit the Dean's Office in person. I will not click third-party links or transfer funds to personal UPI handles.`,
      recommendedActions: [
        'Do not click the provided link or initiate UPI payment.',
        'Submit the malicious domain to Campus IT Firewall blocklist.',
        'File an incident docket with National Cyber Crime Helpline (1930).',
        'Broadcast an alert to Class Representative (CR) channels.'
      ]
    }
  },
  {
    id: 'telegram-job-scam',
    title: 'Google AI Task Internship Offer',
    badge: 'Recruitment Fraud',
    channel: 'SMS / Telegram',
    threatCategory: 'Fake Internship Offer',
    content: `Dear Candidate, Google India Careers has shortlisted your LinkedIn profile for Remote AI Task Evaluator position!
Earn 3,500 INR to 8,000 INR daily by spending 30-45 minutes rating mobile apps and watching short videos. No technical experience required.

To activate your daily payout account, register immediately with our VIP Telegram Coordinator:
https://t.me/Google_HR_Recruitment_Official_Admin
Bonus of 500 INR instantly credited upon submitting your Aadhaar / PAN card front-back photos.`,
    presetAnalysis: {
      score: 91,
      severity: 'CRITICAL THREAT',
      badgeColor: '#FF365D',
      summary: 'Task-based employment and identity theft scam leveraging Tier-1 tech branding, unrealistic compensation metrics, and identity document harvesting on Telegram.',
      vectors: {
        phishingConfidence: 91,
        impersonationLevel: 98,
        domainRisk: 84,
        payloadRisk: 95
      },
      indicators: [
        { phrase: 'Earn 3,500 INR to 8,000 INR daily', type: 'Unrealistic Financial Incentive', risk: 'critical', explanation: 'Textbook advance-fee task scam lure offering absurd pay for trivial micro-tasks.' },
        { phrase: 'Google_HR_Recruitment_Official_Admin', type: 'Brand Impersonation / Fake Authority', risk: 'critical', explanation: 'Legitimate corporate HR never conducts hiring or onboarding via private Telegram handles.' },
        { phrase: 'Aadhaar / PAN card front-back photos', type: 'Identity Theft / KYC Hijacking', risk: 'critical', explanation: 'Direct attempt to steal government identity documents for fraudulent SIM or loan applications.' },
        { phrase: 'No technical experience required', type: 'Broad Net Social Engineering Hook', risk: 'high', explanation: 'Designed to target broke undergraduates without specialized qualifications.' }
      ],
      iocs: {
        domain: 't.me (External Third-Party Redirect)',
        ip: 'Rotated CDN Proxy',
        vpa: 'None (Direct Identity Harvesting)',
        ssl: 'Valid Host, Malicious Payload Profile',
        intent: 'Identity theft (KYC fraud) & Advance-Fee Task fraud'
      },
      safeResponse: `Official Google hiring is conducted solely through google.com/careers. I do not share government identity documents (Aadhaar/PAN) or engage with unverified messaging handles. This communication has been logged with campus security.`,
      recommendedActions: [
        'Never upload Aadhaar, PAN, or bank details to messaging platforms.',
        'Report and block the Telegram user account immediately.',
        'Warn fellow batchmates against unsolicited part-time job SMS blasts.',
        'File a report at cybercrime.gov.in under identity theft.'
      ]
    }
  },
  {
    id: 'scholarship-scam',
    title: 'National Scholarship Direct Disbursal',
    badge: 'Government Impersonation',
    channel: 'SMS',
    threatCategory: 'Bogus Scholarship Notice',
    content: `GOVT NATIONAL SCHOLARSHIP PORTAL (NSP):
Congratulations! Your pending merit scholarship grant of Rs 25,000 has been sanctioned for Academic Session 2026.
To receive direct bank credit before 5:00 PM today, link your active UPI VPA address now:
http://nsp-scholarship-direct-disburse.top/link-upi

Failure to claim today will result in fund lapse back to central treasury.`,
    presetAnalysis: {
      score: 93,
      severity: 'CRITICAL THREAT',
      badgeColor: '#FF365D',
      summary: 'Deceptive government scholarship scheme mimicking official NSP portals with artificial expiry deadlines and a malicious .top domain.',
      vectors: {
        phishingConfidence: 93,
        impersonationLevel: 96,
        domainRisk: 99,
        payloadRisk: 88
      },
      indicators: [
        { phrase: 'before 5:00 PM today', type: 'Artificial Expiry Deadline', risk: 'critical', explanation: 'Forces haste so students do not verify on official government scholarship portals.' },
        { phrase: 'nsp-scholarship-direct-disburse.top', type: 'Illegitimate Top-Level Domain (.top)', risk: 'critical', explanation: 'Indian government portals strictly use .gov.in or .nic.in domains.' },
        { phrase: 'link your active UPI VPA address', type: 'Payment Redirection Vector', risk: 'critical', explanation: 'Real scholarships are credited via DBT (Direct Benefit Transfer) through Aadhaar-seeded bank accounts, never via SMS UPI links.' },
        { phrase: 'fund lapse back to central treasury', type: 'Psychological Fear of Loss', risk: 'high', explanation: 'Manipulates fear of losing entitled financial support.' }
      ],
      iocs: {
        domain: 'nsp-scholarship-direct-disburse.top',
        ip: '104.21.48.19 (Cloudflare Protected Fake Origin)',
        vpa: 'Direct Harvest via Link',
        ssl: 'Cloudflare Free DV SSL',
        intent: 'Financial redirection & UPI PIN harvesting'
      },
      safeResponse: `Scholarship disbursements occur strictly via PFMS/DBT through official government portals at scholarships.gov.in. I do not provide bank details or UPI IDs via SMS links.`,
      recommendedActions: [
        'Verify your real scholarship status only at scholarships.gov.in.',
        'Do not click the .top URL or enter your UPI PIN.',
        'Report SMS sender ID to Telecom Regulatory Authority / DND registry.'
      ]
    }
  },
  {
    id: 'wifi-sso-spoof',
    title: 'Campus Wi-Fi Portal SSO Re-Login',
    badge: 'Credential Harvester',
    channel: 'Web / Captive Portal',
    threatCategory: 'Spoofed Campus Portal',
    content: `https://campus-login.secure-wifi-portal.xyz/student-auth/login.php?redirect=campus_intranet&session_id=89104fa

CAMPUS WIRELESS NETWORK SECURITY ALERT:
Your device session has expired. To maintain uninterrupted access to campus Wi-Fi and Intranet, enter your University Roll Number, Campus LDAP Email, and Master Password below.`,
    presetAnalysis: {
      score: 95,
      severity: 'CRITICAL THREAT',
      badgeColor: '#FF365D',
      summary: 'High-fidelity credential harvesting clone imitating the university wireless captive portal. Designed to harvest student LDAP credentials and campus network passwords.',
      vectors: {
        phishingConfidence: 95,
        impersonationLevel: 98,
        domainRisk: 99,
        payloadRisk: 96
      },
      indicators: [
        { phrase: 'secure-wifi-portal.xyz', type: 'Unregistered Disposable TLD (.xyz)', risk: 'critical', explanation: 'Campus portals are hosted on institutional internal subdomains, never third-party .xyz TLDs.' },
        { phrase: 'campus-login', type: 'Subdomain Deception Technique', risk: 'high', explanation: 'Prepending "campus-login" tricks hasty users who glance only at the first word.' },
        { phrase: 'Master Password below', type: 'LDAP Credential Interception', risk: 'critical', explanation: 'Direct attempt to steal student master passwords for campus intranet access.' }
      ],
      iocs: {
        domain: 'secure-wifi-portal.xyz',
        ip: '45.142.214.19 (Known Rogue Host)',
        vpa: 'None (Credential Theft)',
        ssl: 'Free Let\'s Encrypt TLS',
        intent: 'Mass campus directory password theft & MITM relay'
      },
      safeResponse: `Legitimate captive portals are hosted on internal university gateway IPs (e.g., 10.x.x.x or 172.16.x.x). Never authenticate against external .xyz domains.`,
      recommendedActions: [
        'Disconnect immediately from unverified "Open Campus" SSIDs.',
        'Report rogue Wi-Fi access points to the Campus Network Operations Centre (NOC).',
        'Change your university LDAP password immediately if already entered.'
      ]
    }
  },
  {
    id: 'authentic-circular',
    title: 'Official Dean Circular: Library Timings',
    badge: 'Verified Authentic',
    channel: 'Campus Portal',
    threatCategory: 'Legitimate Notice',
    content: `CIRCULAR: Central Library Extended Hours during End-Semester Examinations 2026.
From Nov 25 through Dec 15, reading halls on Ground and First Floor will remain open 24/7. Valid student RFID badge required at entry turnstiles.

For reading room bookings and study room reservations, visit the official student intranet:
https://library.university.edu.in/resources/reading-halls

Signed,
Dr. A. K. Sharma
Dean of Student Welfare`,
    presetAnalysis: {
      score: 4,
      severity: 'VERIFIED SAFE',
      badgeColor: '#00FF9C',
      summary: 'Authentic institutional announcement. Uses accredited institutional domain (.edu.in), calm non-coercive tone, clear physical authentication (RFID) requirements, and standard academic nomenclature.',
      vectors: {
        phishingConfidence: 4,
        impersonationLevel: 2,
        domainRisk: 3,
        payloadRisk: 4
      },
      indicators: [
        { phrase: 'library.university.edu.in', type: 'Official Accredited Academic Domain', risk: 'safe', explanation: 'Canonical institutional .edu.in domain with verified TLS hierarchy.' },
        { phrase: 'Valid student RFID badge required', type: 'Standard Physical Access Control', risk: 'safe', explanation: 'In-person institutional security check, absence of digital credential traps.' },
        { phrase: 'From Nov 25 through Dec 15', type: 'Standard Scheduling Information', risk: 'safe', explanation: 'Standard advance notice timeline without false panic triggers.' }
      ],
      iocs: {
        domain: 'library.university.edu.in',
        ip: '14.139.12.85 (Institutional Education Network - ERNET)',
        vpa: 'None',
        ssl: 'DigiCert Valid Extended Validation TLS',
        intent: 'Legitimate public information disclosure'
      },
      safeResponse: `Verified authentic institutional circular. No defensive response or escalation required.`,
      recommendedActions: [
        'No defensive action required. Notice conforms to standard university operational policies.'
      ]
    }
  }
];

export const SIMULATOR_CHALLENGES = [
  {
    id: 1,
    title: 'Scenario 1: Urgent Semester Hall Ticket Revocation',
    channel: 'WhatsApp Message',
    sender: 'Academic Exam Cell (+91 99887 76655)',
    snippet: 'ATTENTION: Hall tickets for Dec 2026 exams will be blocked today at 6 PM for students with pending lab fines. Clear INR 450 immediately to avoid detention: https://exam-hallticket-clearance.live/pay?roll=all',
    clues: [
      { text: 'exam-hallticket-clearance.live', isRedFlag: true, reason: 'Illegitimate .live extension' },
      { text: 'today at 6 PM', isRedFlag: true, reason: 'Artificial panic timeline' },
      { text: 'Dec 2026 exams', isRedFlag: false, reason: 'Standard context' }
    ],
    isFraud: true,
    category: 'Fake Fee Request',
    explanation: 'Scammers use false deadlines (6 PM today) and non-academic domains (.live) to panic students into paying fake lab fines.'
  },
  {
    id: 2,
    title: 'Scenario 2: Amazon Software Summer Internship 2026',
    channel: 'Email',
    sender: 'recruitment-team@amazon.jobs',
    snippet: 'Thank you for participating in the campus drive. We invite you to view your interview schedule on the official Amazon candidate portal: https://www.amazon.jobs/en/applicant/dashboard. Login with your secure university SSO.',
    clues: [
      { text: 'amazon.jobs', isRedFlag: false, reason: 'Official Amazon careers domain' },
      { text: 'secure university SSO', isRedFlag: false, reason: 'Legitimate standard federated authentication' }
    ],
    isFraud: false,
    category: 'Legitimate Opportunity',
    explanation: 'The link points directly to the canonical amazon.jobs domain with no suspicious redirects, urgent payment demands, or unverified chat links.'
  },
  {
    id: 3,
    title: 'Scenario 3: UGC National Higher Education Scholarship',
    channel: 'SMS',
    sender: 'DZ-UGCSCH',
    snippet: 'UGC Scholarship Award: You have been selected for Rs 40,000 annual scholarship! To confirm your bank branch verification, send Rs 299 registration fee to ugc.scholarship.fee@okaxis within 2 hours.',
    clues: [
      { text: 'send Rs 299 registration fee', isRedFlag: true, reason: 'Advance-fee fraud hook' },
      { text: 'ugc.scholarship.fee@okaxis', isRedFlag: true, reason: 'Personal consumer UPI handle' },
      { text: 'within 2 hours', isRedFlag: true, reason: 'Coercive urgency' }
    ],
    isFraud: true,
    category: 'Bogus Scholarship Notice',
    explanation: 'Government scholarships never charge a "registration fee" to receive funds, and official bodies never accept payments to personal consumer UPI handles (@okaxis).'
  },
  {
    id: 4,
    title: 'Scenario 4: Hostel Warden Room Re-Allotment Circular',
    channel: 'WhatsApp Group',
    sender: '+91 91234 56789 (Unknown Number)',
    snippet: 'Urgent notice for all Boys Hostel Block C residents: Room allotment has changed. Download the new room list and pay 1500 mess security deposit to UPI ID hostelwarden2026@paytm immediately or vacate room.',
    clues: [
      { text: 'hostelwarden2026@paytm', isRedFlag: true, reason: 'Personal Paytm VPA handle' },
      { text: 'or vacate room', isRedFlag: true, reason: 'Aggressive extortion tactic' }
    ],
    isFraud: true,
    category: 'Spoofed WhatsApp Circular',
    explanation: 'Hostel deposits are processed exclusively through college ERP or official bank challans, never via personal Paytm VPAs accompanied by eviction threats.'
  }
];
