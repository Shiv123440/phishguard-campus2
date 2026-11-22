import { describe, it } from 'node:test';
import assert from 'node:assert';
import { analyzeCustomContent } from '../src/utils/threatAnalyzer.js';
import { PRESET_SCENARIOS, SIMULATOR_CHALLENGES, SOC_METRICS } from '../src/data/threatScenarios.js';

describe('Threat Analyzer Core Engine', () => {
  it('should detect critical temporal urgency and coercion', () => {
    const maliciousText = 'URGENT NOTICE: Pay your examination fee within 3 hours at http://portal-campus-fee.online/pay or face immediate de-registration.';
    const result = analyzeCustomContent(maliciousText);
    
    assert.ok(result !== null);
    assert.ok(result.score >= 30);
    assert.strictEqual(result.isHeuristicOffline, true);
    assert.ok(result.vectors.domainRisk >= 70);
  });

  it('should detect high-risk multi-vector phishing payloads', () => {
    const fullScam = PRESET_SCENARIOS[0].content;
    const result = analyzeCustomContent(fullScam);
    assert.ok(result !== null);
    assert.ok(result.score >= 50);
  });

  it('should detect suspicious disposable TLDs', () => {
    const phishingUrlText = 'Check details at http://campus-fee-portal.online/verify';
    const result = analyzeCustomContent(phishingUrlText);
    
    assert.ok(result.vectors.domainRisk >= 70);
    assert.ok(result.indicators.some(i => i.type.includes('TLD') || i.type.includes('Domain')));
  });

  it('should detect consumer UPI handles impersonating institutions', () => {
    const upiScam = 'Transfer semester registration fee to registrar.univ@okaxis immediately.';
    const result = analyzeCustomContent(upiScam);
    
    assert.strictEqual(result.iocs.vpa, 'registrar.univ@okaxis');
    assert.ok(result.vectors.payloadRisk >= 30);
  });

  it('should correctly classify legitimate institutional communication', () => {
    const legitText = 'Central Library will remain open 24/7 during exams. Visit https://library.university.edu.in with valid RFID badge.';
    const result = analyzeCustomContent(legitText);
    
    assert.ok(result.score < 30);
    assert.strictEqual(result.severity, 'VERIFIED SAFE');
  });

  it('should return null for empty input', () => {
    assert.strictEqual(analyzeCustomContent(''), null);
    assert.strictEqual(analyzeCustomContent('   '), null);
  });
});

describe('Preset Scenarios & Simulator Data Integrity', () => {
  it('should have valid benchmark presets with score bounds', () => {
    assert.ok(PRESET_SCENARIOS.length >= 4);
    PRESET_SCENARIOS.forEach(p => {
      assert.ok(p.id && p.title && p.content);
      assert.ok(p.presetAnalysis.score >= 0 && p.presetAnalysis.score <= 100);
      assert.ok(p.presetAnalysis.vectors.phishingConfidence !== undefined);
    });
  });

  it('should contain balanced interactive simulator challenges', () => {
    assert.ok(SIMULATOR_CHALLENGES.length >= 4);
    const fraudCount = SIMULATOR_CHALLENGES.filter(c => c.isFraud).length;
    const legitCount = SIMULATOR_CHALLENGES.filter(c => !c.isFraud).length;
    assert.ok(fraudCount > 0);
    assert.ok(legitCount > 0);
  });

  it('should have valid SOC telemetry metadata', () => {
    assert.ok(SOC_METRICS.totalScans > 10000);
    assert.strictEqual(SOC_METRICS.defconLevel, 3);
  });
});
