const { db } = require('../config/database');
const { mockProfiles, prelikedProfileIds } = require('./seedData');

const DEMO_USER_ID = 1;

async function initializeDatabase() {
  // 1. Create Users table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      photo_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Create Profiles table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      photo_url TEXT NOT NULL,
      bio TEXT NOT NULL,
      city_or_college TEXT NOT NULL,
      interests TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 3. Create Swipes table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS swipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      target_profile_id INTEGER NOT NULL,
      action TEXT NOT NULL CHECK(action IN ('like', 'pass')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, target_profile_id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (target_profile_id) REFERENCES profiles(id)
    );
  `);

  // 4. Create Matches table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS matches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      matched_profile_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, matched_profile_id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (matched_profile_id) REFERENCES profiles(id)
    );
  `);

  // 5. Create Incoming Likes table (profiles that have liked the demo user prior to demo user swiping)
  // This satisfies:
  // "Some profiles must already have liked the demo/logged-in user so that mutual matches can be demonstrated."
  // "Never display one-sided incoming Likes."
  // "Never expose profiles that have liked the demo user unless a mutual match exists."
  await db.exec(`
    CREATE TABLE IF NOT EXISTS incoming_likes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      profile_id INTEGER NOT NULL,
      target_user_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(profile_id, target_user_id),
      FOREIGN KEY (profile_id) REFERENCES profiles(id),
      FOREIGN KEY (target_user_id) REFERENCES users(id)
    );
  `);

  console.log('Database tables initialized successfully.');
}

async function seedData() {
  await initializeDatabase();

  // Ensure demo user exists
  const existingUser = await db.get('SELECT id FROM users WHERE id = ?', [DEMO_USER_ID]);
  if (!existingUser) {
    await db.run(
      'INSERT INTO users (id, name, email, photo_url) VALUES (?, ?, ?, ?)',
      [
        DEMO_USER_ID,
        'Demo User',
        'demo@coy.app',
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'
      ]
    );
    console.log('Demo user seeded.');
  }

  // Check profiles count
  const profileCountRow = await db.get('SELECT COUNT(*) as count FROM profiles');
  const count = profileCountRow ? profileCountRow.count : 0;

  if (count < mockProfiles.length) {
    console.log(`Seeding ${mockProfiles.length} realistic profiles...`);
    for (const p of mockProfiles) {
      await db.run(
        `INSERT OR REPLACE INTO profiles (id, name, age, photo_url, bio, city_or_college, interests)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          p.id,
          p.name,
          p.age,
          p.photo_url,
          p.bio,
          p.city_or_college,
          JSON.stringify(p.interests)
        ]
      );
    }
    console.log(`Seeded ${mockProfiles.length} profiles successfully.`);
  } else {
    console.log(`Profiles table already populated with ${count} profiles.`);
  }

  // Seed incoming likes for demo user
  const incomingLikesCountRow = await db.get(
    'SELECT COUNT(*) as count FROM incoming_likes WHERE target_user_id = ?',
    [DEMO_USER_ID]
  );
  if (!incomingLikesCountRow || incomingLikesCountRow.count === 0) {
    console.log('Seeding pre-existing incoming likes on demo user...');
    for (const profileId of prelikedProfileIds) {
      await db.run(
        `INSERT OR IGNORE INTO incoming_likes (profile_id, target_user_id) VALUES (?, ?)`,
        [profileId, DEMO_USER_ID]
      );
    }
    console.log(`Seeded ${prelikedProfileIds.length} pre-existing likes from profiles.`);
  }
}

/**
 * Reset helper for testing
 */
async function resetDatabase() {
  await db.exec(`
    DELETE FROM matches;
    DELETE FROM swipes;
  `);
  console.log('Swipes and matches cleared for testing.');
}

module.exports = {
  DEMO_USER_ID,
  initializeDatabase,
  seedData,
  resetDatabase
};
