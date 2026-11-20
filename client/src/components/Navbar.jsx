import React from 'react';
import { Flame } from 'lucide-react';

/**
 * Main application navigation bar
 * STRICT REQUIREMENT: Exactly TWO main navigation tabs:
 * 1. Home
 * 2. Discover
 */
export default function Navbar({ activeTab, onSelectTab, matchCount = 0 }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => onSelectTab('discover')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-rose-400 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
            <Flame className="w-6 h-6 text-white fill-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white">
            Coy<span className="text-brand-500">.</span>
          </span>
        </div>

        {/* EXACTLY TWO MAIN NAVIGATION TABS */}
        <nav className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-full border border-slate-700/60 shadow-inner">
          {/* 1. Home Tab */}
          <button
            id="tab-home"
            onClick={() => onSelectTab('home')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeTab === 'home'
                ? 'bg-gradient-to-r from-slate-700 to-slate-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Home
          </button>

          {/* 2. Discover Tab */}
          <button
            id="tab-discover"
            onClick={() => onSelectTab('discover')}
            className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === 'discover'
                ? 'bg-gradient-to-r from-brand-600 to-rose-500 text-white shadow-md shadow-brand-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Discover</span>
            {matchCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
