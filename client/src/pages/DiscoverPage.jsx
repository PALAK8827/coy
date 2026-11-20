import React, { useState, useEffect, useCallback } from 'react';
import { fetchFeed, sendSwipe, fetchMatches, resetDemoData } from '../api/client';
import SwipeCard from '../components/SwipeCard';
import ActionButtons from '../components/ActionButtons';
import MatchesView from '../components/MatchesView';
import MatchModal from '../components/MatchModal';
import EmptyFeed from '../components/EmptyFeed';
import { Layers, Heart, AlertCircle, RefreshCw } from 'lucide-react';

/**
 * Discover Page
 * Houses all main application functionality:
 * 1. Profile Discovery / Swiping interface (1 card at a time)
 * 2. Matches view accessible within Discover (Matches is NOT a separate main navigation tab)
 */
export default function DiscoverPage({ onMatchCountChange }) {
  // Discover sub-view: 'cards' | 'matches'
  const [subView, setSubView] = useState('cards');

  // Feed & Matches State
  const [profiles, setProfiles] = useState([]);
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [error, setError] = useState(null);

  // Active match for modal celebration
  const [currentMatch, setCurrentMatch] = useState(null);

  // External swipe trigger for desktop action buttons ('like' | 'pass')
  const [buttonSwipeTrigger, setButtonSwipeTrigger] = useState(null);

  // Full bio info expansion toggle
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);

  // Load feed and matches from SQLite backend
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [feedData, matchesData] = await Promise.all([
        fetchFeed(),
        fetchMatches()
      ]);

      const feedProfiles = feedData.profiles || [];
      const userMatches = matchesData.matches || [];

      setProfiles(feedProfiles);
      setMatches(userMatches);
      onMatchCountChange?.(userMatches.length);
    } catch (err) {
      console.error('Failed to load Discover data:', err);
      setError(err.message || 'Could not connect to the backend server.');
    } finally {
      setIsLoading(false);
    }
  }, [onMatchCountChange]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle Swipe action (from card drag gesture or desktop buttons)
  const handleSwipe = async (action) => {
    if (profiles.length === 0 || isSwiping) return;

    const currentProfile = profiles[0];
    setIsSwiping(true);
    setIsInfoExpanded(false);

    try {
      // 1. Send swipe action to SQLite backend (saves like/pass persistently)
      const result = await sendSwipe(currentProfile.id, action);

      // 2. Remove the swiped profile from queue immediately (1 card at a time, never reappears)
      setProfiles((prev) => prev.slice(1));
      setButtonSwipeTrigger(null);

      // 3. If mutual match occurred, trigger match modal celebration!
      if (result.matched && result.match) {
        setCurrentMatch(result.match);
        // Refresh matches list
        const updatedMatches = await fetchMatches();
        const newMatches = updatedMatches.matches || [];
        setMatches(newMatches);
        onMatchCountChange?.(newMatches.length);
      }
    } catch (err) {
      console.error('Swipe error:', err);
      // Even if duplicate or error, advance card so user isn't stuck
      setProfiles((prev) => prev.slice(1));
      setButtonSwipeTrigger(null);
    } finally {
      setIsSwiping(false);
    }
  };

  // Button triggers
  const triggerLike = () => {
    if (isSwiping || profiles.length === 0) return;
    setButtonSwipeTrigger('like');
  };

  const triggerPass = () => {
    if (isSwiping || profiles.length === 0) return;
    setButtonSwipeTrigger('pass');
  };

  const toggleInfo = () => {
    setIsInfoExpanded((prev) => !prev);
  };

  // Keyboard shortcut listener (Desktop convenience)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (subView !== 'cards' || currentMatch || profiles.length === 0 || isSwiping) return;

      if (e.key === 'ArrowRight') {
        triggerLike();
      } else if (e.key === 'ArrowLeft') {
        triggerPass();
      } else if (e.key === 'i' || e.key === 'I') {
        toggleInfo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [subView, currentMatch, profiles.length, isSwiping]);

  // Reset Demo handler
  const handleReset = async () => {
    try {
      setIsResetting(true);
      await resetDemoData();
      await loadData();
    } catch (err) {
      console.error('Reset error:', err);
    } finally {
      setIsResetting(false);
    }
  };

  // Switch to Matches view from MatchModal
  const handleViewMatchesFromModal = () => {
    setCurrentMatch(null);
    setSubView('matches');
  };

  return (
    <div className="flex-1 flex flex-col w-full max-w-lg mx-auto px-4 py-3">
      {/* DISCOVER SUB-NAVIGATION (Housed entirely within Discover) */}
      <div className="flex items-center justify-between bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60 shadow-md mb-4">
        {/* Toggle 1: Swiping Feed */}
        <button
          type="button"
          id="subview-cards"
          onClick={() => setSubView('cards')}
          className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-200 ${
            subView === 'cards'
              ? 'bg-slate-700 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4 text-rose-400" />
          <span>Swipe Profiles</span>
          {profiles.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-slate-900/60 text-[10px] text-slate-300 font-mono">
              {profiles.length}
            </span>
          )}
        </button>

        {/* Toggle 2: Matches View (Inside Discover) */}
        <button
          type="button"
          id="subview-matches"
          onClick={() => setSubView('matches')}
          className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-200 ${
            subView === 'matches'
              ? 'bg-gradient-to-r from-brand-600 to-rose-500 text-white shadow-md shadow-brand-600/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Heart className="w-4 h-4 text-white fill-white" />
          <span>Matches</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
            subView === 'matches' ? 'bg-white/20 text-white' : 'bg-brand-500/20 text-brand-400'
          }`}>
            {matches.length}
          </span>
        </button>
      </div>

      {/* ERROR STATE */}
      {error && (
        <div className="bg-rose-950/60 border border-rose-500/50 rounded-2xl p-4 text-center my-auto">
          <AlertCircle className="w-8 h-8 text-rose-400 mx-auto mb-2" />
          <h3 className="text-white font-bold text-sm mb-1">Connection Error</h3>
          <p className="text-xs text-rose-200 mb-3">{error}</p>
          <button
            onClick={loadData}
            className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5 mx-auto hover:bg-rose-500 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* LOADING STATE */}
      {isLoading && !error && (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[460px]">
          <div className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-brand-500 animate-spin mb-4" />
          <p className="text-sm font-semibold text-slate-400">Loading discovery feed...</p>
        </div>
      )}

      {/* SUBVIEW 1: CARDS (SWIPE FEED) */}
      {!isLoading && !error && subView === 'cards' && (
        <div className="flex-1 flex flex-col items-center justify-between w-full">
          {profiles.length > 0 ? (
            <>
              {/* DISPLAY EXACTLY ONE PROFILE CARD AT A TIME */}
              <div className="relative w-full flex items-center justify-center my-auto">
                <SwipeCard
                  key={profiles[0].id}
                  profile={profiles[0]}
                  onSwipe={handleSwipe}
                  isSwiping={isSwiping}
                  swipeDirection={buttonSwipeTrigger}
                  isInfoExpanded={isInfoExpanded}
                  onToggleInfo={toggleInfo}
                />
              </div>

              {/* DESKTOP & MOBILE ACTION BUTTONS */}
              <div className="w-full mt-2">
                <ActionButtons
                  onPass={triggerPass}
                  onLike={triggerLike}
                  onToggleInfo={toggleInfo}
                  isInfoOpen={isInfoExpanded}
                  disabled={isSwiping}
                />
              </div>
            </>
          ) : (
            /* EMPTY FEED STATE (WHEN ALL PROFILES HAVE BEEN SWIPED) */
            <EmptyFeed
              matchCount={matches.length}
              onViewMatches={() => setSubView('matches')}
              onResetDemo={handleReset}
              isResetting={isResetting}
            />
          )}
        </div>
      )}

      {/* SUBVIEW 2: MATCHES VIEW (INSIDE DISCOVER) */}
      {!isLoading && !error && subView === 'matches' && (
        <MatchesView
          matches={matches}
          onBackToSwipe={() => setSubView('cards')}
        />
      )}

      {/* MUTUAL MATCH CELEBRATION MODAL */}
      <MatchModal
        match={currentMatch}
        onClose={() => setCurrentMatch(null)}
        onViewMatches={handleViewMatchesFromModal}
      />
    </div>
  );
}
