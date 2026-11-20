import React from 'react';
import { Sparkles, Heart, RotateCcw, ArrowRight } from 'lucide-react';

export default function EmptyFeed({ matchCount = 0, onViewMatches, onResetDemo, isResetting = false }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 max-w-md mx-auto text-center bg-slate-800/50 border border-slate-700/60 rounded-3xl shadow-2xl my-auto animate-fade-in">
      {/* Icon Graphic */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-600/30 to-purple-600/30 border border-brand-500/30 flex items-center justify-center text-brand-400 shadow-inner">
          <Sparkles className="w-10 h-10 animate-bounce-soft text-brand-400" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
        </div>
      </div>

      {/* Main Title */}
      <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">
        You're All Caught Up!
      </h2>

      {/* Subtitle */}
      <p className="text-slate-300 text-sm leading-relaxed mb-6">
        You have swiped through all available profiles in your feed. Check out your mutual matches or reset the demo feed to test again!
      </p>

      {/* Buttons */}
      <div className="w-full flex flex-col gap-3">
        {matchCount > 0 && (
          <button
            type="button"
            id="btn-empty-view-matches"
            onClick={onViewMatches}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-brand-600 to-rose-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>View Your Matches ({matchCount})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        <button
          type="button"
          id="btn-empty-reset"
          disabled={isResetting}
          onClick={onResetDemo}
          className="w-full py-3 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs border border-slate-700/80 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
          <span>{isResetting ? 'Resetting Demo Data...' : 'Reset Swipes Demo (Replay Feed)'}</span>
        </button>
      </div>
    </div>
  );
}
