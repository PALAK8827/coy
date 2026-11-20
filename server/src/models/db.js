const { db } = require('../config/database');
const { DEMO_USER_ID } = require('../seed/seeder');

/**
 * Format profile record from database (parse JSON interests)
 */
function formatProfile(row) {
  if (!row) return null;
  let interests = [];
  try {
    interests = JSON.parse(row.interests || '[]');
  } catch (e) {
    interests = (row.interests || '').split(',').map((s) => s.trim());
  }

  return {
    id: row.id,
    name: row.name,
    age: row.age,
    photo_url: row.photo_url,
    bio: row.bio,
    city_or_college: row.city_or_college,
    interests
  };
}

/**
 * Get feed of profiles that the user has not swiped on yet
 */
async function getUnswipedProfiles(userId = DEMO_USER_ID) {
  const query = `
    SELECT p.*
    FROM profiles p
    WHERE p.id NOT IN (
      SELECT target_profile_id
      FROM swipes
      WHERE user_id = ?
    )
    ORDER BY p.id ASC
  `;

  const rows = await db.all(query, [userId]);
  return rows.map(formatProfile);
}

/**
 * Check if a swipe already exists for this user and target profile
 */
async function getExistingSwipe(userId, targetProfileId) {
  const query = `
    SELECT * FROM swipes
    WHERE user_id = ? AND target_profile_id = ?
  `;
  return await db.get(query, [userId, targetProfileId]);
}

/**
 * Record a swipe (like or pass)
 */
async function recordSwipe(userId, targetProfileId, action) {
  const normalizedAction = action.toLowerCase();
  const query = `
    INSERT INTO swipes (user_id, target_profile_id, action)
    VALUES (?, ?, ?)
  `;
  const result = await db.run(query, [userId, targetProfileId, normalizedAction]);
  return result;
}

/**
 * Check whether the target profile has already liked the user
 */
async function checkIncomingLike(profileId, userId = DEMO_USER_ID) {
  const query = `
    SELECT * FROM incoming_likes
    WHERE profile_id = ? AND target_user_id = ?
  `;
  const row = await db.get(query, [profileId, userId]);
  return !!row;
}

/**
 * Create a mutual match
 */
async function createMatch(userId, matchedProfileId) {
  const query = `
    INSERT OR IGNORE INTO matches (user_id, matched_profile_id)
    VALUES (?, ?)
  `;
  await db.run(query, [userId, matchedProfileId]);

  // Return the matched profile
  const profile = await getProfileById(matchedProfileId);
  return profile;
}

/**
 * Get a profile by ID
 */
async function getProfileById(profileId) {
  const query = `SELECT * FROM profiles WHERE id = ?`;
  const row = await db.get(query, [profileId]);
  return formatProfile(row);
}

/**
 * Get all mutual matches for a user
 * Excludes any one-sided likes (privacy requirement)
 */
async function getMutualMatches(userId = DEMO_USER_ID) {
  const query = `
    SELECT 
      m.id AS match_id,
      m.created_at AS matched_at,
      p.id,
      p.name,
      p.age,
      p.photo_url,
      p.bio,
      p.city_or_college,
      p.interests
    FROM matches m
    JOIN profiles p ON m.matched_profile_id = p.id
    WHERE m.user_id = ?
    ORDER BY m.created_at DESC, m.id DESC
  `;

  const rows = await db.all(query, [userId]);
  return rows.map((row) => {
    let interests = [];
    try {
      interests = JSON.parse(row.interests || '[]');
    } catch (e) {
      interests = [];
    }
    return {
      match_id: row.match_id,
      matched_at: row.matched_at,
      id: row.id,
      name: row.name,
      age: row.age,
      photo_url: row.photo_url,
      bio: row.bio,
      city_or_college: row.city_or_college,
      interests
    };
  });
}

/**
 * Total counts for stats & empty state checks
 */
async function getCounts(userId = DEMO_USER_ID) {
  const totalProfilesRow = await db.get('SELECT COUNT(*) as count FROM profiles');
  const swipedProfilesRow = await db.get('SELECT COUNT(*) as count FROM swipes WHERE user_id = ?', [userId]);
  const matchesRow = await db.get('SELECT COUNT(*) as count FROM matches WHERE user_id = ?', [userId]);

  return {
    totalProfiles: totalProfilesRow ? totalProfilesRow.count : 0,
    swipedCount: swipedProfilesRow ? swipedProfilesRow.count : 0,
    matchesCount: matchesRow ? matchesRow.count : 0
  };
}

module.exports = {
  formatProfile,
  getUnswipedProfiles,
  getExistingSwipe,
  recordSwipe,
  checkIncomingLike,
  createMatch,
  getProfileById,
  getMutualMatches,
  getCounts
};
