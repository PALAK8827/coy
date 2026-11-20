import React, { useState, useRef, useEffect } from 'react';
import { MapPin, GraduationCap, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';

const SWIPE_THRESHOLD = 110;

/**
 * Single profile card with touch/pointer drag gestures, smooth animations,
 * dynamic LIKE / NOPE visual badges, and detailed info panel.
 */
export default function SwipeCard({
  profile,
  onSwipe,
  isSwiping = false,
  swipeDirection = null, // 'like' | 'pass' from external buttons
  isInfoExpanded = false,
  onToggleInfo
}) {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [exitDirection, setExitDirection] = useState(null); // 'like' | 'pass'
  const cardRef = useRef(null);
  const pointerStartRef = useRef({ x: 0, y: 0, time: 0 });

  // Handle external button trigger (Like / Pass button click)
  useEffect(() => {
    if (swipeDirection && !exitDirection) {
      setExitDirection(swipeDirection);
      const timer = setTimeout(() => {
        onSwipe(swipeDirection);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [swipeDirection]);

  if (!profile) return null;

  // Pointer drag start (touch or mouse)
  const handlePointerDown = (e) => {
    if (isSwiping || exitDirection) return;
    // Don't drag if clicking buttons inside the card
    if (e.target.closest('button')) return;

    e.currentTarget.setPointerCapture?.(e.pointerId);
    setIsDragging(true);
    pointerStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now()
    };
  };

  // Pointer drag move
  const handlePointerMove = (e) => {
    if (!isDragging || isSwiping || exitDirection) return;

    const deltaX = e.clientX - pointerStartRef.current.x;
    const deltaY = e.clientY - pointerStartRef.current.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  // Pointer drag end / release
  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch (err) {}

    const deltaX = dragOffset.x;
    const deltaTime = Math.max(1, Date.now() - pointerStartRef.current.time);
    const velocityX = Math.abs(deltaX) / deltaTime;

    // Check if threshold exceeded or quick flick
    if (deltaX > SWIPE_THRESHOLD || (deltaX > 50 && velocityX > 0.6)) {
      // Swiped Right -> Like
      setExitDirection('like');
      setTimeout(() => {
        onSwipe('like');
      }, 280);
    } else if (deltaX < -SWIPE_THRESHOLD || (deltaX < -50 && velocityX > 0.6)) {
      // Swiped Left -> Pass
      setExitDirection('pass');
      setTimeout(() => {
        onSwipe('pass');
      }, 280);
    } else {
      // Reset back to center
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  // Dynamic visual stamp opacity based on drag distance
  const likeOpacity = Math.min(1, Math.max(0, dragOffset.x / SWIPE_THRESHOLD));
  const passOpacity = Math.min(1, Math.max(0, -dragOffset.x / SWIPE_THRESHOLD));

  // Determine card transform & transition styling
  let transformStyle = '';
  let transitionStyle = 'none';

  if (exitDirection === 'like') {
    transformStyle = 'translate3d(120%, 30px, 0) rotate(25deg)';
    transitionStyle = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease';
  } else if (exitDirection === 'pass') {
    transformStyle = 'translate3d(-120%, 30px, 0) rotate(-25deg)';
    transitionStyle = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease';
  } else if (isDragging) {
    const rotation = (dragOffset.x / 14);
    transformStyle = `translate3d(${dragOffset.x}px, ${dragOffset.y * 0.4}px, 0) rotate(${rotation}deg)`;
    transitionStyle = 'none';
  } else {
    transformStyle = 'translate3d(0, 0, 0) rotate(0deg)';
    transitionStyle = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  }

  // Parse or sanitize interests
  const interestsList = Array.isArray(profile.interests)
    ? profile.interests
    : typeof profile.interests === 'string'
    ? JSON.parse(profile.interests || '[]')
    : [];

  const isCollege = profile.city_or_college && (
    profile.city_or_college.includes('University') ||
    profile.city_or_college.includes('College') ||
    profile.city_or_college.includes('School') ||
    profile.city_or_college.includes('Institute') ||
    profile.city_or_college.includes('MIT')
  );

  return (
    <div
      ref={cardRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      style={{
        transform: transformStyle,
        transition: transitionStyle,
        touchAction: 'none'
      }}
      className={`relative w-full max-w-[390px] h-[540px] md:h-[570px] rounded-3xl overflow-hidden shadow-2xl bg-slate-800 border border-slate-700/60 cursor-grab active:cursor-grabbing select-none ${
        exitDirection ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Profile Photo */}
      <img
        src={profile.photo_url}
        alt={profile.name}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none transition-transform duration-500 scale-[1.02]"
        onError={(e) => {
          // Fallback portrait image if network fails
          e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
        }}
      />

      {/* Vignette Gradients for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />

      {/* VISUAL FEEDBACK: "LIKE" STAMP (Visible when dragging right or on like button) */}
      <div
        style={{
          opacity: exitDirection === 'like' ? 1 : likeOpacity,
          transform: `scale(${exitDirection === 'like' ? 1.15 : 0.85 + likeOpacity * 0.25}) rotate(-18deg)`
        }}
        className="absolute top-8 left-8 z-30 pointer-events-none transition-all duration-100"
      >
        <div className="px-5 py-2 border-4 border-emerald-400 bg-emerald-950/70 backdrop-blur-md rounded-2xl shadow-xl shadow-emerald-900/50">
          <span className="text-3xl font-black tracking-widest text-emerald-400 uppercase">
            LIKE
          </span>
        </div>
      </div>

      {/* VISUAL FEEDBACK: "NOPE" / "PASS" STAMP (Visible when dragging left or on pass button) */}
      <div
        style={{
          opacity: exitDirection === 'pass' ? 1 : passOpacity,
          transform: `scale(${exitDirection === 'pass' ? 1.15 : 0.85 + passOpacity * 0.25}) rotate(18deg)`
        }}
        className="absolute top-8 right-8 z-30 pointer-events-none transition-all duration-100"
      >
        <div className="px-5 py-2 border-4 border-rose-500 bg-rose-950/70 backdrop-blur-md rounded-2xl shadow-xl shadow-rose-900/50">
          <span className="text-3xl font-black tracking-widest text-rose-500 uppercase">
            NOPE
          </span>
        </div>
      </div>

      {/* CARD CONTENT OVERLAY (Bottom Area) */}
      <div className="absolute bottom-0 inset-x-0 p-5 text-white z-20 flex flex-col justify-end">
        {/* Name and Age */}
        <div className="flex items-baseline gap-3 mb-1.5">
          <h2 className="text-3xl font-extrabold tracking-tight drop-shadow-md">
            {profile.name}
          </h2>
          <span className="text-2xl font-semibold text-rose-300 drop-shadow">
            {profile.age}
          </span>
        </div>

        {/* City or College */}
        {profile.city_or_college && (
          <div className="flex items-center gap-1.5 text-sm text-slate-200 font-medium mb-3 drop-shadow">
            {isCollege ? (
              <GraduationCap className="w-4 h-4 text-rose-400 flex-shrink-0" />
            ) : (
              <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0" />
            )}
            <span className="truncate">{profile.city_or_college}</span>
          </div>
        )}

        {/* Bio */}
        <p className={`text-sm text-slate-200/90 leading-relaxed drop-shadow mb-3.5 ${isInfoExpanded ? '' : 'line-clamp-2'}`}>
          {profile.bio}
        </p>

        {/* Interests Pills */}
        {interestsList.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {interestsList.slice(0, isInfoExpanded ? 8 : 4).map((interest, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-900/60 backdrop-blur-md border border-white/15 text-slate-200"
              >
                {interest}
              </span>
            ))}
            {!isInfoExpanded && interestsList.length > 4 && (
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-white/10 text-slate-300">
                +{interestsList.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Expand info hint */}
        <button
          type="button"
          onClick={onToggleInfo}
          className="self-center mt-1 text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors py-1"
        >
          {isInfoExpanded ? (
            <>
              <span>Collapse info</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>Tap for details</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
