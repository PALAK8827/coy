import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DiscoverPage from './pages/DiscoverPage';

/**
 * Main Application Root
 * STRICT REQUIREMENT:
 * Exactly TWO main navigation tabs:
 * 1. Home (Completely blank - no cards, sections, or features)
 * 2. Discover (All functionality: swiping, match modal, matches view)
 * Matches must NOT be a separate main navigation tab.
 * No unnecessary tabs (no Chat, Settings, Profile, Premium).
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [matchCount, setMatchCount] = useState(0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white">
      {/* Top Navbar with EXACTLY TWO main navigation tabs */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        matchCount={matchCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'discover' && (
          <DiscoverPage onMatchCountChange={setMatchCount} />
        )}
      </main>
    </div>
  );
}
