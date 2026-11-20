const {
  getUnswipedProfiles,
  getExistingSwipe,
  recordSwipe,
  checkIncomingLike,
  createMatch,
  getProfileById,
  getMutualMatches,
  getCounts
} = require('../models/db');
const { DEMO_USER_ID, resetDatabase, seedData } = require('../seed/seeder');

/**
 * GET /feed
 * Return profiles that the demo user has not swiped on yet.
 * Excludes already liked and passed profiles.
 */
async function getFeed(req, res) {
  try {
    const userId = DEMO_USER_ID;
    const profiles = await getUnswipedProfiles(userId);

    return res.status(200).json({
      success: true,
      count: profiles.length,
      profiles
    });
  } catch (error) {
    console.error('Error fetching feed:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve feed profiles',
      error: error.message
    });
  }
}

/**
 * POST /swipe
 * Accept profile ID and swipe action (Like or Pass).
 * Validates request, records swipe, checks for mutual match,
 * and creates persistent match if mutual like exists.
 */
async function handleSwipe(req, res) {
  try {
    const userId = DEMO_USER_ID;
    // Support various naming conventions (profileId, profile_id, id, targetProfileId)
    const rawProfileId = req.body.profileId ?? req.body.profile_id ?? req.body.id ?? req.body.targetProfileId;
    const rawAction = req.body.action ?? req.body.swipeAction;

    // 1. Validate profile ID
    const profileId = parseInt(rawProfileId, 10);
    if (!profileId || isNaN(profileId) || profileId <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or missing profile ID. Must be a positive integer.'
      });
    }

    // 2. Validate action
    if (!rawAction || typeof rawAction !== 'string') {
      return res.status(400).json({
        success: false,
        message: "Missing swipe action. Must be 'like' or 'pass'."
      });
    }

    const action = rawAction.trim().toLowerCase();
    if (action !== 'like' && action !== 'pass') {
      return res.status(400).json({
        success: false,
        message: "Invalid swipe action. Expected 'like' or 'pass'."
      });
    }

    // 3. Verify target profile exists
    const profile = await getProfileById(profileId);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: `Profile with ID ${profileId} not found.`
      });
    }

    // 4. Prevent duplicate swipes on the same profile
    const existingSwipe = await getExistingSwipe(userId, profileId);
    if (existingSwipe) {
      return res.status(409).json({
        success: false,
        message: `Profile ${profileId} has already been swiped on.`
      });
    }

    // 5. Persist swipe in database
    await recordSwipe(userId, profileId, action);

    // 6. Handle Like vs Pass logic
    if (action === 'like') {
      // Check for mutual like (did target profile already like demo user?)
      const hasMutualLike = await checkIncomingLike(profileId, userId);

      if (hasMutualLike) {
        // Mutual like confirmed: create persistent match!
        const matchedProfile = await createMatch(userId, profileId);
        return res.status(200).json({
          success: true,
          matched: true,
          action: 'like',
          profileId,
          match: matchedProfile,
          message: "It's a match!"
        });
      } else {
        // One-sided like: no match created
        return res.status(200).json({
          success: true,
          matched: false,
          action: 'like',
          profileId,
          message: 'Profile liked successfully.'
        });
      }
    } else {
      // Pass action: no match created
      return res.status(200).json({
        success: true,
        matched: false,
        action: 'pass',
        profileId,
        message: 'Profile passed.'
      });
    }
  } catch (error) {
    console.error('Error handling swipe:', error);
    // Handle SQLite unique constraint error gracefully if raced
    if (error.message && error.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({
        success: false,
        message: 'Duplicate swipe: profile has already been swiped on.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to process swipe action',
      error: error.message
    });
  }
}

/**
 * GET /matches
 * Return only mutual matches for the demo user.
 * Never exposes one-sided incoming likes (privacy requirement).
 */
async function getMatches(req, res) {
  try {
    const userId = DEMO_USER_ID;
    const matches = await getMutualMatches(userId);

    return res.status(200).json({
      success: true,
      count: matches.length,
      matches
    });
  } catch (error) {
    console.error('Error fetching matches:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve matches',
      error: error.message
    });
  }
}

/**
 * GET /stats
 * Return swiping and matching statistics
 */
async function getStats(req, res) {
  try {
    const userId = DEMO_USER_ID;
    const counts = await getCounts(userId);
    return res.status(200).json({
      success: true,
      ...counts
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve stats',
      error: error.message
    });
  }
}

/**
 * POST /reset (for testing & demo convenience)
 * Resets swipes and matches back to initial state
 */
async function handleReset(req, res) {
  try {
    await resetDatabase();
    await seedData();
    return res.status(200).json({
      success: true,
      message: 'Demo data reset successfully.'
    });
  } catch (error) {
    console.error('Error resetting demo data:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to reset demo data',
      error: error.message
    });
  }
}

module.exports = {
  getFeed,
  handleSwipe,
  getMatches,
  getStats,
  handleReset
};
