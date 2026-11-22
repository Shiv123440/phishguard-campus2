import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Gamepad2, Trophy, RotateCcw, CheckCircle2, XCircle, Timer, Flame, Award, ArrowRight, Zap } from 'lucide-react';
import { SIMULATOR_CHALLENGES } from '../data/threatScenarios';

export default function InteractiveScamSimulator({ onShowToast }) {
  const [gameState, setGameState] = useState('intro'); // 'intro', 'playing', 'finished'
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let interval = null;
    if (gameState === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
    return () => clearInterval(interval);
  }, [gameState, timeLeft]);

  const startGame = () => {
    setGameState('playing');
    setTimeLeft(60);
    setCurrentIdx(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setHistory([]);
    if (onShowToast) {
      onShowToast('60-Second Cyber Drill Started!', 'info');
    }
  };

  const currentQ = SIMULATOR_CHALLENGES[currentIdx];

  const handleAnswer = (userChoseFraud) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(userChoseFraud);
    setShowExplanation(true);

    const isCorrect = userChoseFraud === currentQ.isFraud;
    const newStreak = isCorrect ? streak + 1 : 0;
    setStreak(newStreak);
    if (newStreak > maxStreak) setMaxStreak(newStreak);

    if (isCorrect) {
      const points = 100 + newStreak * 25;
      setScore((prev) => prev + points);
      if (onShowToast) {
        onShowToast(`+${points} Pts! Accurate Triage (${newStreak}x Streak)`, 'success');
      }
    } else {
      if (onShowToast) {
        onShowToast('Deception trap missed!', 'danger');
      }
    }

    setHistory((prev) => [
      ...prev,
      {
        scenario: currentQ.title,
        category: currentQ.category,
        userAnswer: userChoseFraud ? 'Fraud' : 'Legit',
        correctAnswer: currentQ.isFraud ? 'Fraud' : 'Legit',
        isCorrect
      }
    ]);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);

    if (currentIdx + 1 < SIMULATOR_CHALLENGES.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    setGameState('finished');
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Fallback
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-card-in font-sans">
      
      {/* Intro Screen */}
      {gameState === 'intro' && (
        <div className="saas-card p-6 sm:p-9 border border-[#A78BFA]/30 text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/25 text-[#A78BFA] text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>Campus Cyber Drill // 60-Second Simulator</span>
          </div>

          <h1 className="hero-heading text-white">
            Can You Spot the Campus Phish?
          </h1>

          <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed font-normal">
            You will face 4 realistic campus communication intercepts: fake scholarship notices, urgent hall ticket cancellations, bogus part-time tech internships, and spoofed hostel circulars.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-lg mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-[#080D16] border border-white/[0.08]">
              <span className="text-[#00E5FF] font-semibold block text-xs">⏱️ 60-Sec Timer</span>
              <span className="text-slate-400 text-xs">Make rapid, decisive evaluations under pressure.</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#080D16] border border-white/[0.08]">
              <span className="text-amber-400 font-semibold block text-xs">🔥 Streak Multipliers</span>
              <span className="text-slate-400 text-xs">Earn +25 bonus points for consecutive correct calls.</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#080D16] border border-white/[0.08]">
              <span className="text-[#00FF9C] font-semibold block text-xs">🏆 SOC Accreditation</span>
              <span className="text-slate-400 text-xs">Get your campus cyber vigilance rating.</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={startGame}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#A78BFA] to-purple-600 hover:from-[#A78BFA] hover:to-purple-500 text-slate-950 font-semibold text-xs uppercase tracking-wider shadow-md shadow-[#A78BFA]/20 transition-all btn-tactile cursor-pointer"
            >
              Start 60s Simulation Drill
            </button>
          </div>
        </div>
      )}

      {/* Active Game Screen */}
      {gameState === 'playing' && (
        <div className="space-y-5">
          
          {/* HUD: Timer, Score, Streak */}
          <div className="saas-card p-4 rounded-xl flex items-center justify-between gap-3">
            {/* Timer (Space Grotesk Number) */}
            <div className={`p-2.5 rounded-xl flex items-center gap-2 font-bold text-sm ${
              timeLeft <= 15 ? 'bg-[#FF365D]/15 text-[#FF365D] border border-[#FF365D]/30 animate-pulse' : 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/25'
            }`}>
              <Timer className="w-4 h-4" />
              <span className="font-heading text-base">{timeLeft}s</span>
              <span className="text-xs uppercase font-medium">Remaining</span>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
              <Flame className="w-4 h-4" />
              <span>Streak: <strong className="font-heading text-sm">{streak}x</strong></span>
            </div>

            {/* Score */}
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Score</span>
              <span className="font-heading text-xl font-bold text-white">{score} <span className="text-xs font-mono font-normal text-slate-400">PTS</span></span>
            </div>
          </div>

          {/* Scenario Intercept Card */}
          <div className="saas-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Intercept {currentIdx + 1} of {SIMULATOR_CHALLENGES.length}:</span>
                <span className="text-[#00E5FF] font-semibold">[{currentQ.category}]</span>
              </div>
              <span className="text-slate-400">Via {currentQ.channel}</span>
            </div>

            {/* Simulated Device Notification */}
            <div className="p-4 rounded-xl bg-[#080D16] border border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-white/[0.06]">
                <span className="text-slate-400">Sender: <strong className="text-slate-200">{currentQ.sender}</strong></span>
                <span className="text-[10px] text-slate-500 font-mono">ENCRYPTED PROTOCOL</span>
              </div>

              <div className="text-sm text-slate-200 leading-relaxed font-normal">
                {currentQ.snippet}
              </div>

              {/* Clues Highlight Preview */}
              <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] font-mono">
                <span className="text-slate-500 self-center font-sans font-medium text-xs">Inspected Clues:</span>
                {currentQ.clues.map((c, i) => (
                  <span
                    key={i}
                    className={`px-2 py-0.5 rounded border ${
                      c.isRedFlag ? 'bg-[#FF365D]/15 text-red-300 border-[#FF365D]/30 font-semibold' : 'bg-[#00FF9C]/15 text-[#00FF9C] border-[#00FF9C]/30 font-semibold'
                    }`}
                  >
                    "{c.text}" — {c.reason}
                  </span>
                ))}
              </div>
            </div>

            {/* Tactical Decision Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <button
                onClick={() => handleAnswer(true)}
                disabled={selectedAnswer !== null}
                className={`p-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2 btn-tactile cursor-pointer ${
                  selectedAnswer !== null
                    ? currentQ.isFraud
                      ? 'bg-[#FF365D]/20 border-[#FF365D] text-[#FF365D]'
                      : 'opacity-40 border-white/[0.06] text-slate-500'
                    : 'bg-[#080D16] border-white/[0.08] hover:border-[#FF365D] text-white hover:bg-[#FF365D]/10'
                }`}
              >
                <span>🛑 Flag as Fraudulent / Phish</span>
              </button>

              <button
                onClick={() => handleAnswer(false)}
                disabled={selectedAnswer !== null}
                className={`p-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2 btn-tactile cursor-pointer ${
                  selectedAnswer !== null
                    ? !currentQ.isFraud
                      ? 'bg-[#00FF9C]/20 border-[#00FF9C] text-[#00FF9C]'
                      : 'opacity-40 border-white/[0.06] text-slate-500'
                    : 'bg-[#080D16] border-white/[0.08] hover:border-[#00FF9C] text-white hover:bg-[#00FF9C]/10'
                }`}
              >
                <span>✅ Verify as Legitimate</span>
              </button>
            </div>

            {/* Feedback & Pedagogical Breakdown */}
            {showExplanation && (
              <div className={`p-4 rounded-xl border animate-fadeIn space-y-2.5 ${
                selectedAnswer === currentQ.isFraud
                  ? 'bg-[#00FF9C]/10 border-[#00FF9C]/35 text-[#00FF9C]'
                  : 'bg-[#FF365D]/10 border-[#FF365D]/35 text-[#FF365D]'
              }`}>
                <div className="flex items-start gap-2.5">
                  {selectedAnswer === currentQ.isFraud ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h3 className="font-heading font-bold text-sm">
                      {selectedAnswer === currentQ.isFraud ? 'Accurate Triage Call! (+Points Earned)' : 'Tactical Deception Missed!'}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed font-normal">
                      {currentQ.explanation}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#A78BFA] to-purple-600 text-slate-950 text-xs font-semibold transition-all btn-tactile cursor-pointer"
                  >
                    <span>{currentIdx + 1 < SIMULATOR_CHALLENGES.length ? 'Next Intercept →' : 'View Performance Dossier'}</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* Finished Summary Screen */}
      {gameState === 'finished' && (
        <div className="saas-card p-7 sm:p-9 border border-[#A78BFA]/35 text-center space-y-5 animate-fadeIn">
          <div className="flex justify-center">
            <div className="p-3.5 rounded-2xl bg-[#A78BFA]/15 border border-[#A78BFA]/30 text-[#A78BFA]">
              <Trophy className="w-10 h-10" />
            </div>
          </div>

          <div>
            <h2 className="section-heading text-white">
              Simulation Complete!
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Final Score: <span className="text-[#00E5FF] font-heading font-bold text-lg">{score} PTS</span> • Max Streak: <span className="text-amber-400 font-heading font-bold">{maxStreak}x</span>
            </p>
          </div>

          {/* Performance Assessment Badge */}
          <div className="p-4 rounded-xl bg-[#080D16] border border-white/[0.08] max-w-md mx-auto text-xs">
            {score >= 350 ? (
              <div className="text-[#00FF9C] space-y-1">
                <span className="font-heading font-bold text-sm block">🛡️ Grade: Elite SOC Tactician</span>
                <span className="text-slate-300">You demonstrated sharp cognitive resilience against coercive urgency triggers and deceptive lookalike domains.</span>
              </div>
            ) : score >= 200 ? (
              <div className="text-amber-400 space-y-1">
                <span className="font-heading font-bold text-sm block">⚠️ Grade: Intermediate Vigilance</span>
                <span className="text-slate-300">Good awareness, but subtle task-scams or advance-fee traps occasionally bypassed your evaluation.</span>
              </div>
            ) : (
              <div className="text-[#FF365D] space-y-1">
                <span className="font-heading font-bold text-sm block">🚨 Grade: Critical Vulnerability</span>
                <span className="text-slate-300">You are susceptible to artificial panic deadlines and spoofed university circulars. Review the Threat Deconstruction guide!</span>
              </div>
            )}
          </div>

          {/* Detailed Breakdown List */}
          <div className="text-left text-xs max-w-md mx-auto space-y-2">
            <span className="text-slate-400 block pb-1 border-b border-white/[0.08] font-medium">Intercept Evaluation History:</span>
            {history.map((h, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-[#080D16] border border-white/[0.06]">
                <span className="text-slate-300 truncate max-w-[240px] text-xs font-normal">{h.scenario}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                  h.isCorrect ? 'text-[#00FF9C] bg-[#00FF9C]/10' : 'text-[#FF365D] bg-[#FF365D]/10'
                }`}>
                  {h.isCorrect ? 'ACCURATE' : 'DECEIVED'}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#A78BFA] hover:bg-[#A78BFA]/90 text-slate-950 font-semibold text-xs uppercase tracking-wider transition-all btn-tactile cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Simulation Drill</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
