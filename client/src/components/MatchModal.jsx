import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, X, ArrowRight } from 'lucide-react';

export default function MatchModal({ match, onClose, onViewMatches }) {
  useEffect(() => {
    if (!match) return;

    // Fire confetti celebration
    const count = 200;
    const defaults = {
      origin: { y: 0.65 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#f43f5e', '#fb7185', '#ec4899', '#ffffff']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#10b981', '#34d399', '#f43f5e']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45
    });
  }, [match]);

  if (!match) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="match-modal-title"
        className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700/80 rounded-3xl p-6 sm:p-8 text-center shadow-2xl shadow-rose-950/50 animate-scale-up"
      >
        {/* Close icon button */}
        <button
          onClick={onClose}
          aria-label="Close match dialog"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebratory badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4 animate-bounce-soft">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Mutual Connection</span>
        </div>

        {/* Title */}
        <h2 
          id="match-modal-title"
          className="text-4xl sm:text-5xl font-black italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 mb-2 drop-shadow"
        >
          It's a Match!
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-medium mb-6">
          You and <span className="text-white font-bold">{match.name}</span> liked each other.
        </p>

        {/* Overlapping Profile Avatars */}
        <div className="relative flex items-center justify-center mb-8 h-32">
          {/* Demo User Avatar (Left) */}
          <div className="relative z-10 -mr-4 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-slate-800 shadow-xl bg-slate-800">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80"
              alt="You"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Glowing Animated Heart Center Badge */}
          <div className="relative z-30 -mx-3 w-12 h-12 rounded-full bg-gradient-to-tr from-brand-600 to-rose-400 flex items-center justify-center shadow-lg shadow-brand-500/50 border-2 border-white animate-pulse">
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>

          {/* Matched Profile Avatar (Right) */}
          <div className="relative z-20 -ml-4 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-rose-500 shadow-xl shadow-rose-900/40 bg-slate-800">
            <img
              src={match.photo_url}
              alt={match.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Profile preview snippet */}
        <div className="bg-slate-800/60 rounded-2xl p-3 mb-6 border border-slate-700/60">
          <p className="text-xs text-slate-300 italic line-clamp-2">
            "{match.bio}"
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            id="btn-view-matches-modal"
            onClick={onViewMatches}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-brand-600 to-rose-500 text-white font-bold text-base shadow-lg shadow-brand-600/30 hover:shadow-brand-600/50 hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <span>View in Matches</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            id="btn-keep-swiping-modal"
            onClick={onClose}
            className="w-full py-3 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-sm border border-slate-700 transition-all"
          >
            Keep Swiping
          </button>
        </div>
      </div>
    </div>
  );
}
