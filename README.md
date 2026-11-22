# PhishGuard Campus 🛡️
### Zero-Trust Cyber Intelligence Platform & SOC Terminal

> **Event:** PromptWars x TechverseSolutions Hackathon (Hack2Skill)  
> **Chosen Vertical:** Defence and Security  
> **Repository Size:** ~0.15 MB (Strictly < 10 MB compliance)  
> **Branch:** `main` (Single branch compliance)  
> **Architecture:** 100% Client-Side Zero-Logging / Autonomous Heuristic SOC  

---

## 🎯 1. Chosen Vertical: Defence and Security
We selected the **Defence and Security** vertical to solve the epidemic of predatory social engineering, urgent fee traps, fake internship offers, and fraudulent UPI circulars targeting university students and campus networks.

Standard perimeter defenses (antivirus, network firewalls) fail against human deception. PhishGuard Campus bridges this gap as an autonomous Security Operations Centre (SOC) and cognitive triage terminal.

---

## 🧠 2. Approach and Logic

### The Cognitive Defense Principle
Rather than relying on brittle, lagging blacklists, PhishGuard Campus deconstructs the **underlying anatomy of social engineering attacks**:
1. **Linguistic Urgency & Pressure Profiling:** Detects coercive artificial countdowns (*"within 3 hours"*, *"expires today"*) designed to short-circuit critical evaluation.
2. **Authority & Intimidation Detection:** Flags threats of academic sanctions (*"immediate de-registration"*, *"hall ticket revocation"*).
3. **Domain & Route Integrity:** Identifies disposable high-risk TLDs (`.online`, `.xyz`, `.top`, `.live`) and typo-squatted lookalike domains imitating university ERP portals.
4. **Financial Interception Vectors:** Detects consumer UPI/VPA handles (`@okaxis`, `@ybl`, `@paytm`) masquerading as institutional fee collection accounts.

---

## ⚙️ 3. How the Solution Works

### System Flow
1. **Multi-Channel Ingestion:** The user pastes suspicious content from SMS, WhatsApp groups, emails, or raw URLs.
2. **Autonomous Heuristic Tokenization:** The offline Zero-Trust engine extracts risk tokens without transmitting sensitive personal data to third-party APIs.
3. **Vector Geometry & Radar Scoring:** Computes calibrated metrics for:
   - Phishing Confidence (%)
   - Impersonation Level (%)
   - Domain Risk (%)
   - Payload Risk (%)
4. **Interactive Attack Deconstruction:** Visual chips highlight manipulative trigger words in real time with educational explanations.
5. **One-Click Incident Playbook:** Generates standardized legal incident dockets for India's National Cyber Crime Portal (1930 / `cybercrime.gov.in`) and a DNS sinkhole advisory for the campus IT department.
6. **Gamified 60-Second Simulator:** A timed triage drill with streak multipliers to build student cognitive resilience against deception.

---

## 📌 4. Assumptions Made
1. **Zero-Trust Client-Side Privacy:** We assume students may paste messages containing personal details (roll numbers, names, phone numbers). Therefore, the entire inspection engine runs **100% locally in browser memory** with zero cloud persistence or credential logging.
2. **Heuristic Transparency:** The platform explicitly discloses that risk ratings are derived from rule-based linguistic anomaly detection, avoiding deceptive claims of live external DNS blocklist queries when operating offline.
3. **Simulated SOC Telemetry:** Dashboard statistics and real-time feeds represent simulated campus network baselines designed for hackathon demonstration.

---

## 🧪 5. Verification & Testing
The project includes a comprehensive native test suite covering the heuristic analyzer, scenario data integrity, and telemetry bounds:

```bash
# Run automated test suite (9 passing tests in <100ms)
npm test
```

### Test Coverage Highlights:
- Temporal urgency & coercion detection tests
- Disposable TLD identification tests
- Consumer UPI handle extraction tests
- Institutional legitimate circular whitelisting tests
- Boundary and empty input edge cases

---

## ♿ 6. Accessibility & Efficiency (WCAG AA Compliance)
- **Accessible Form Controls:** Explicit `<label htmlFor="...">` associations on all input terminals.
- **ARIA Integration:** Full `aria-label`, `aria-pressed`, `aria-live="polite"`, and `role="status"` attributes across dynamic components.
- **High-Contrast Dark Mode:** Strict WCAG AA compliance with high-legibility Space Grotesk and Inter typography.
- **Code Splitting:** Dynamic `React.lazy()` and `<Suspense>` chunking for maximum runtime efficiency and instant loading.

---

## 💻 Quick Start

```bash
# Clone repository
git clone https://github.com/Shiv123440/phishguard-campus2.git

# Navigate into project directory
cd phishguard-campus2

# Install dependencies
npm install

# Run test suite
npm test

# Launch development server
npm run dev
```

---

## 📜 License
Distributed under the MIT License. Built for the PromptWars x TechverseSolutions Hackathon.
