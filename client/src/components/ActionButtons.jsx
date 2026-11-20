import React from 'react';
import { X, Heart, Info } from 'lucide-react';

/**
 * Action buttons for desktop & mobile
 * Left button: Pass
 * Right button: Like
 * Center button: Toggle full bio
 */
export default function ActionButtons({ onPass, onLike, onToggleInfo, disabled = false, isInfoOpen = false }) {
  return (
    <div className="flex items-center justify-center gap-6 py-4 px-2">
      {/* PASS BUTTON (Left swipe action) */}
      <button
        type="button"
        id="btn-pass"
        disabled={disabled}
        onClick={onPass}
        aria-label="Pass profile (Swipe Left)"
        className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/90 border-2 border-rose-500/40 text-rose-400 hover:text-white hover:bg-rose-500 hover:border-rose-500 shadow-lg shadow-rose-950/40 hover:shadow-rose-600/30 hover:scale-110 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
      >
        <X className="w-8 h-8 stroke-[2.5] transition-transform duration-200 group-hover:rotate-90" />
        <span className="sr-only">Pass</span>
      </button>

      {/* INFO BUTTON (View full details) */}
      <button
        type="button"
        id="btn-info"
        onClick={onToggleInfo}
        aria-label="Toggle profile info"
        className={`flex items-center justify-center w-12 h-12 rounded-full border shadow-md transition-all duration-200 hover:scale-105 active:scale-95 ${
          isInfoOpen 
            ? 'bg-slate-700 border-indigo-400 text-indigo-300' 
            : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-700/80'
        }`}
      >
        <Info className="w-5 h-5 stroke-[2]" />
      </button>

      {/* LIKE BUTTON (Right swipe action) */}
      <button
        type="button"
        id="btn-like"
        disabled={disabled}
        onClick={onLike}
        aria-label="Like profile (Swipe Right)"
        className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/90 border-2 border-emerald-500/40 text-emerald-400 hover:text-white hover:bg-emerald-500 hover:border-emerald-500 shadow-lg shadow-emerald-950/40 hover:shadow-emerald-600/30 hover:scale-110 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
      >
        <Heart className="w-8 h-8 stroke-[2.5] group-hover:fill-white transition-transform duration-200 group-hover:scale-110" />
        <span className="sr-only">Like</span>
      </button>
    </div>
  );
}
