import React from 'react';
import { Shield, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/[0.08] bg-[#070B13] py-7 text-xs text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2.5">
          <Shield className="w-4 h-4 text-[#00E5FF]" />
          <span className="font-heading font-bold text-slate-200 tracking-tight">PhishGuard Campus</span>
          <span className="text-slate-400">— Zero-Trust Cyber Intelligence Platform</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-center text-xs">
          <span className="text-slate-400">Defence and Security Track</span>
          <span>•</span>
          <span className="text-[#00FF9C] flex items-center gap-1 font-medium">
            <Lock className="w-3 h-3" />
            100% Client-Side Privacy
          </span>
          <span>•</span>
          <span className="text-[#00E5FF] font-medium">Helpline: <strong className="font-mono">1930</strong></span>
        </div>

      </div>
    </footer>
  );
}
