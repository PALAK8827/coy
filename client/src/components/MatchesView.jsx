import React, { useState } from 'react';
import { Sparkles, MapPin, GraduationCap, Heart, Clock, ArrowLeft, MessageCircle } from 'lucide-react';

export default function MatchesView({ matches = [], onBackToSwipe }) {
  const [selectedMatch, setSelectedMatch] = useState(null);

  const formatMatchTime = (dateString) => {
    if (!dateString) return 'Just now';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return 'Recently';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSwipe}
            aria-label="Back to Swiping"
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <span>Mutual Matches</span>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold border border-brand-500/30">
                {matches.length}
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Only mutual connections appear here (100% private)
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {matches.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-slate-800/40 rounded-3xl border border-slate-700/50">
          <div className="w-16 h-16 rounded-3xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 mb-4 shadow-inner">
            <Heart className="w-8 h-8 text-rose-500/60" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Matches Yet</h3>
          <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
            Keep swiping right on profiles you like. When someone likes you back, your mutual match will appear right here!
          </p>
          <button
            onClick={onBackToSwipe}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-rose-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 hover:opacity-95 active:scale-95 transition-all"
          >
            Start Swiping in Discover
          </button>
        </div>
      ) : (
        /* Matches Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {matches.map((item) => {
            const isCollege = item.city_or_college && (
              item.city_or_college.includes('University') ||
              item.city_or_college.includes('College') ||
              item.city_or_college.includes('School') ||
              item.city_or_college.includes('Institute') ||
              item.city_or_college.includes('MIT')
            );

            return (
              <div
                key={item.id || item.match_id}
                onClick={() => setSelectedMatch(item)}
                className="group relative bg-slate-800/90 hover:bg-slate-800 rounded-3xl overflow-hidden border border-slate-700/60 shadow-lg hover:shadow-xl hover:shadow-rose-950/20 hover:border-brand-500/50 transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Photo Header */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.photo_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />
                  
                  {/* Matched badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-emerald-400 flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>Matched</span>
                  </div>

                  {/* Name and Age on bottom of image */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-xl font-bold text-white drop-shadow">
                        {item.name}
                      </h3>
                      <span className="text-lg font-semibold text-rose-300 drop-shadow">
                        {item.age}
                      </span>
                    </div>
                    {item.city_or_college && (
                      <div className="flex items-center gap-1 text-xs text-slate-300 font-medium drop-shadow truncate mt-0.5">
                        {isCollege ? (
                          <GraduationCap className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                        ) : (
                          <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                        )}
                        <span className="truncate">{item.city_or_college}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-300/90 line-clamp-2 leading-relaxed mb-3">
                    {item.bio}
                  </p>

                  {/* Interests tags */}
                  {Array.isArray(item.interests) && item.interests.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.interests.slice(0, 3).map((interest, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-slate-700/60 text-slate-300 border border-slate-600/50"
                        >
                          {interest}
                        </span>
                      ))}
                      {item.interests.length > 3 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-slate-700/30 text-slate-400">
                          +{item.interests.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Footer with matched date */}
                  <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>Matched {formatMatchTime(item.matched_at)}</span>
                    </div>
                    <span className="text-brand-400 font-semibold group-hover:underline">
                      View details &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Match Detail Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl animate-scale-up">
            <div className="relative h-72 w-full bg-slate-950">
              <img
                src={selectedMatch.photo_url}
                alt={selectedMatch.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40" />
              <button
                onClick={() => setSelectedMatch(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-3xl font-extrabold text-white">
                    {selectedMatch.name}
                  </h3>
                  <span className="text-2xl font-bold text-rose-400">
                    {selectedMatch.age}
                  </span>
                </div>
                {selectedMatch.city_or_college && (
                  <p className="text-sm text-slate-300 font-medium">
                    {selectedMatch.city_or_college}
                  </p>
                )}
              </div>
            </div>

            <div className="p-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                About
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed mb-5">
                {selectedMatch.bio}
              </p>

              {Array.isArray(selectedMatch.interests) && selectedMatch.interests.length > 0 && (
                <>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Interests
                  </h4>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {selectedMatch.interests.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedMatch(null)}
                  className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors border border-slate-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
