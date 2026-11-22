import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gamepad2, Trophy, RotateCcw, CheckCircle2, XCircle, HelpCircle, Shield, Award, Sparkles } from 'lucide-react';
import { PHISH_ARENA_QUESTIONS } from '../data/threatScenarios';

export default function PhishArena() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = PHISH_ARENA_QUESTIONS[currentIdx];

  const handleSelectOption = (option) => {
    if (selectedOption !== null) return; // Prevent multiple clicks

    setSelectedOption(option);
    setShowExplanation(true);

    if (option.isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);

    if (currentIdx + 1 < PHISH_ARENA_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback gracefully
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setIsCompleted(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-[#0b1222] border border-purple-900/60 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-mono mb-2">
              <Gamepad2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Interactive Training Arena</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              PhishOrLegit? Test Your Threat Instincts
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Can you identify subtle social engineering triggers, spoofed headers, and urgent lures in 60 seconds?
            </p>
          </div>

          <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-end">
            <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-purple-800/40 text-center font-mono">
              <span className="text-[10px] text-slate-400 block uppercase">CURRENT SCORE</span>
              <span className="text-xl font-extrabold text-purple-400">
                {score} / {PHISH_ARENA_QUESTIONS.length}
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        {!isCompleted && (
          <div className="mt-5">
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
              <span>Simulation Stage {currentIdx + 1} of {PHISH_ARENA_QUESTIONS.length}</span>
              <span>{Math.round(((currentIdx) / PHISH_ARENA_QUESTIONS.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-purple-500 h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / PHISH_ARENA_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Main Arena Game Card */}
      {!isCompleted ? (
        <div className="bg-[#0b1222] border border-cyan-950/80 rounded-2xl p-6 shadow-xl space-y-6">
          
          {/* Scenario Details & Mock Device UI */}
          <div className="border border-slate-800 rounded-2xl overflow-hidden bg-[#070b16]">
            
            {/* Mock Header (Simulating an SMS / WhatsApp / Email bar) */}
            <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                <span className="text-slate-400 ml-2">Channel: [{currentQ.channel}]</span>
              </div>
              <div className="text-cyan-400 font-semibold truncate max-w-[200px] sm:max-w-none">
                Sender: {currentQ.sender}
              </div>
            </div>

            {/* Message Body */}
            <div className="p-6">
              <h3 className="text-sm font-semibold text-slate-300 font-mono mb-3">
                {currentQ.title}
              </h3>
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-slate-200 text-sm font-mono leading-relaxed whitespace-pre-wrap">
                {currentQ.text}
              </div>
            </div>

          </div>

          {/* Interactive Choice Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQ.options.map((option) => {
              const isChosen = selectedOption?.id === option.id;
              let btnStyle = 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-200';

              if (selectedOption !== null) {
                if (option.isCorrect) {
                  btnStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-300 glow-green';
                } else if (isChosen && !option.isCorrect) {
                  btnStyle = 'bg-red-950/50 border-red-500 text-red-300 glow-red';
                } else {
                  btnStyle = 'bg-slate-900/30 border-slate-800/50 text-slate-600';
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option)}
                  disabled={selectedOption !== null}
                  className={`p-4 rounded-xl border text-sm font-bold font-mono transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                >
                  <span>{option.label}</span>
                  {selectedOption !== null && (
                    option.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : isChosen ? (
                      <XCircle className="w-5 h-5 text-red-400" />
                    ) : null
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation && (
            <div className={`p-4 rounded-xl border animate-fadeIn ${
              selectedOption?.isCorrect
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-red-950/30 border-red-500/40 text-red-200'
            }`}>
              <div className="flex items-start gap-3">
                {selectedOption?.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-bold text-sm font-mono">
                    {selectedOption?.isCorrect ? 'Correct Assessment!' : 'Deception Trigger Missed!'}
                  </h4>
                  <p className="text-xs mt-1 text-slate-300 leading-relaxed font-sans">
                    {currentQ.explanation}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-mono text-xs font-bold shadow-lg transition-all cursor-pointer"
                >
                  {currentIdx + 1 < PHISH_ARENA_QUESTIONS.length ? 'Next Challenge →' : 'View Arena Verdict'}
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Completion Screen */
        <div className="bg-[#0b1222] border border-purple-900/80 rounded-2xl p-8 shadow-2xl text-center space-y-6 animate-fadeIn">
          <div className="flex justify-center">
            <div className="p-4 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-300">
              <Trophy className="w-12 h-12" />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-white">
              Simulation Complete!
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              You scored <span className="text-purple-400 font-bold font-mono text-lg">{score} / {PHISH_ARENA_QUESTIONS.length}</span> on the Zero-Trust Social Engineering Challenge.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#070b16] border border-slate-800 max-w-md mx-auto text-xs font-mono text-slate-300">
            {score >= 3 ? (
              <p className="text-emerald-400 font-bold">
                🛡️ Elite Threat Radar: You demonstrated sharp cognitive resilience against manipulative temporal triggers and deceptive domains.
              </p>
            ) : (
              <p className="text-amber-400 font-bold">
                ⚠️ Vulnerability Warning: 1 or more deceptive traps bypassed your vigilance. Always verify non-institutional TLDs and urgency timers!
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition-all shadow-lg cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Training Simulation</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
