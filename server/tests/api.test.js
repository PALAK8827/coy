const assert = require('assert');
const http = require('http');
const path = require('path');
const fs = require('fs');

// Set test environment
process.env.NODE_ENV = 'test';
// Use a test sqlite file
const testDbFile = path.resolve(__dirname, '../data/test_coy.sqlite');
if (fs.existsSync(testDbFile)) {
  fs.unlinkSync(testDbFile);
}
process.env.DB_FILE_PATH = testDbFile;

const app = require('../src/app');
const { seedData, DEMO_USER_ID } = require('../src/seed/seeder');
const { db } = require('../src/config/database');
const { prelikedProfileIds } = require('../src/seed/seedData');

let server;
let baseUrl;

async function request(method, path, body = null) {
  const url = `${baseUrl}${path}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  const res = await fetch(url, options);
  const data = await res.json().catch(() => null);
  return { status: res.status, ok: res.ok, data };
}

async function runTests() {
  console.log('--- Starting Coy SDE Assignment Verification Test Suite ---');

  // Initialize DB and Seed
  await seedData();

  // Start HTTP server on dynamic port
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  baseUrl = `http://127.0.0.1:${port}`;
  console.log(`Test server running at ${baseUrl}`);

  let passedTests = 0;
  const totalTests = 13;

  try {
    // -------------------------------------------------------------
    // Scenario 1: At least 30 mock profiles are available
    // -------------------------------------------------------------
    console.log('\n[Scenario 1] Checking total mock profiles in database...');
    const totalRow = await db.get('SELECT COUNT(*) as count FROM profiles');
    assert(totalRow.count >= 30, `Expected at least 30 profiles, found ${totalRow.count}`);
    console.log(`  PASSED: Database contains ${totalRow.count} profiles (>= 30).`);
    passedTests++;

    // -------------------------------------------------------------
    // Scenario 2: GET /feed returns profiles correctly
    // -------------------------------------------------------------
    console.log('\n[Scenario 2] Testing GET /feed returns profiles...');
    const feedRes = await request('GET', '/feed');
    assert.strictEqual(feedRes.status, 200);
    assert(feedRes.data.success === true);
    assert(Array.isArray(feedRes.data.profiles));
    assert(feedRes.data.profiles.length >= 30);
    const firstProfile = feedRes.data.profiles[0];
    assert(firstProfile.id && firstProfile.name && firstProfile.age && firstProfile.photo_url && firstProfile.bio);
    assert(Array.isArray(firstProfile.interests));
    console.log(`  PASSED: GET /feed returned ${feedRes.data.profiles.length} structured profiles.`);
    passedTests++;

    // -------------------------------------------------------------
    // Scenario 3 & 4: Right swipe successfully records a Like
    // -------------------------------------------------------------
    console.log('\n[Scenario 4] Testing Right Swipe (Like) on a non-mutual profile (e.g. ID 2)...');
    // ID 2 is not in prelikedProfileIds [1, 3, 6, 9, 13, 17, 22, 27]
    const likeRes = await request('POST', '/swipe', { profileId: 2, action: 'like' });
    assert.strictEqual(likeRes.status, 200);
    assert.strictEqual(likeRes.data.success, true);
    assert.strictEqual(likeRes.data.action, 'like');
    assert.strictEqual(likeRes.data.matched, false); // Profile 2 did not pre-like demo user
    console.log('  PASSED: Right swipe recorded Like in database.');
    passedTests++;

    // -------------------------------------------------------------
    // Scenario 5: Left swipe successfully records a Pass
    // -------------------------------------------------------------
    console.log('\n[Scenario 5] Testing Left Swipe (Pass) on profile (e.g. ID 4)...');
    const passRes = await request('POST', '/swipe', { profileId: 4, action: 'pass' });
    assert.strictEqual(passRes.status, 200);
    assert.strictEqual(passRes.data.success, true);
    assert.strictEqual(passRes.data.action, 'pass');
    assert.strictEqual(passRes.data.matched, false);
    console.log('  PASSED: Left swipe recorded Pass in database.');
    passedTests++;

    // -------------------------------------------------------------
    // Scenario 3: Already swiped profiles do not appear again in /feed
    // -------------------------------------------------------------
    console.log('\n[Scenario 3] Verifying swiped profiles (ID 2 and ID 4) are excluded from /feed...');
    const feedAfterSwipe = await request('GET', '/feed');
    const remainingIds = feedAfterSwipe.data.profiles.map((p) => p.id);
    assert(!remainingIds.includes(2), 'Profile ID 2 should be excluded from feed');
    assert(!remainingIds.includes(4), 'Profile ID 4 should be excluded from feed');
    console.log('  PASSED: Swiped profiles (2, 4) no longer appear in /feed.');
    passedTests++;

    // -------------------------------------------------------------
    // Scenario 6: A profile cannot be swiped multiple times
    // -------------------------------------------------------------
    console.log('\n[Scenario 6] Testing duplicate swipe rejection...');
    const dupRes = await request('POST', '/swipe', { profileId: 2, action: 'like' });
    assert.strictEqual(dupRes.status, 409, 'Expected 409 Conflict on duplicate swipe');
    assert.strictEqual(dupRes.data.success, false);
    console.log('  PASSED: Duplicate swipe was correctly rejected with 409 Conflict.');
    passedTests++;

    // -------------------------------------------------------------
    // Scenario 7: Mutual Likes correctly create a match
    // -------------------------------------------------------------
    console.log('\n[Scenario 7] Testing Mutual Like creates a match (e.g. ID 1 has pre-liked demo user)...');
    assert(prelikedProfileIds.includes(1), 'Profile ID 1 should be a pre-liked profile');
    const mutualLikeRes = await request('POST', '/swipe', { profileId: 1, action: 'like' });
    assert.strictEqual(mutualLikeRes.status, 200);
    assert.strictEqual(mutualLikeRes.data.success, true);
    assert.strictEqual(mutualLikeRes.data.matched, true);
    assert(mutualLikeRes.data.match, 'Expected match object in response');
    assert.strictEqual(mutualLikeRes.data.match.id, 1);
    console.log(`  PASSED: Mutual Like with Profile 1 (${mutualLikeRes.data.match.name}) created match.`);
    passedTests++;

    // -------------------------------------------------------------
    // Scenario 8: One-sided Likes do not create a match
    // -------------------------------------------------------------
    console.log('\n[Scenario 8] Verifying one-sided Like (Profile 2) did not create a match...');
    const matchForTwo = await db.get(
      'SELECT * FROM matches WHERE user_id = ? AND matched_profile_id = ?',
      [DEMO_USER_ID, 2]
    );
    assert(!matchForTwo, 'Profile 2 should not exist in matches table');
    console.log('  PASSED: One-sided Like on Profile 2 did not create a match.');
    passedTests++;

    // -------------------------------------------------------------
    // Scenario 9: Matches view displays only mutual matches
    // -------------------------------------------------------------
    console.log('\n[Scenario 9] Testing GET /matches returns only mutual matches...');
    const matchesRes = await request('GET', '/matches');
    assert.strictEqual(matchesRes.status, 200);
    assert(Array.isArray(matchesRes.data.matches));
    assert.strictEqual(matchesRes.data.matches.length, 1);
    assert.strictEqual(matchesRes.data.matches[0].id, 1);
    console.log(`  PASSED: GET /matches returns only mutual matches (Found: ${matchesRes.data.matches[0].name}).`);
    passedTests++;

    // -------------------------------------------------------------
    // Scenario 10: One-sided incoming Likes remain private
    // -------------------------------------------------------------
    console.log('\n[Scenario 10] Verifying one-sided incoming Likes remain private and undisclosed...');
    // ID 3, 6, 9, etc. have liked demo user in incoming_likes, but demo user hasn't liked them back
    // Check feed response to verify incoming like is NOT leaked in feed
    const feedItem3 = feedAfterSwipe.data.profiles.find((p) => p.id === 3);
    assert(feedItem3, 'Profile 3 should still be in feed');
    assert(feedItem3.hasLikedUser === undefined, 'Privacy leak: hasLikedUser must not be in feed profile');
    assert(feedItem3.incomingLike === undefined, 'Privacy leak: incomingLike must not be in feed profile');
    // Check /matches does not contain Profile 3
    const matchIds = matchesRes.data.matches.map((m) => m.id);
    assert(!matchIds.includes(3), 'Profile 3 must not appear in matches until mutual like');
    console.log('  PASSED: One-sided incoming Likes remain strictly private.');
    passedTests++;

    // -------------------------------------------------------------
    // Scenario 11: Swipe and match data persist after browser reload (simulated by querying DB directly)
    // -------------------------------------------------------------
    console.log('\n[Scenario 11] Testing persistent storage of swipes and matches...');
    const persistedSwipes = await db.all('SELECT * FROM swipes WHERE user_id = ?', [DEMO_USER_ID]);
    const persistedMatches = await db.all('SELECT * FROM matches WHERE user_id = ?', [DEMO_USER_ID]);
    assert.strictEqual(persistedSwipes.length, 3, 'Expected 3 persisted swipes (profiles 1, 2, 4)');
    assert.strictEqual(persistedMatches.length, 1, 'Expected 1 persisted match (profile 1)');
    console.log('  PASSED: Swipe and match data are persistently written to SQLite.');
    passedTests++;

    // -------------------------------------------------------------
    // Scenario 12: Swipe and match data persist after backend restart
    // -------------------------------------------------------------
    console.log('\n[Scenario 12] Testing persistence across server restart...');
    // Close current connection
    await db.close();
    // Re-instantiate database connection from file
    delete require.cache[require.resolve('../src/config/database')];
    delete require.cache[require.resolve('../src/models/db')];
    const newDbModule = require('../src/config/database');
    const restartedSwipes = await newDbModule.db.all('SELECT * FROM swipes WHERE user_id = ?', [DEMO_USER_ID]);
    const restartedMatches = await newDbModule.db.all('SELECT * FROM matches WHERE user_id = ?', [DEMO_USER_ID]);
    assert.strictEqual(restartedSwipes.length, 3);
    assert.strictEqual(restartedMatches.length, 1);
    console.log('  PASSED: All swipe and match data survived backend restart perfectly.');
    passedTests++;

    // -------------------------------------------------------------
    // Scenario 13: Empty state appears when no profiles remain
    // -------------------------------------------------------------
    console.log('\n[Scenario 13] Testing Empty State when all remaining profiles are swiped...');
    // Swipe all remaining profiles
    const remainingProfiles = await request('GET', '/feed');
    for (const p of remainingProfiles.data.profiles) {
      await request('POST', '/swipe', { profileId: p.id, action: 'pass' });
    }
    const emptyFeedRes = await request('GET', '/feed');
    assert.strictEqual(emptyFeedRes.status, 200);
    assert.strictEqual(emptyFeedRes.data.profiles.length, 0);
    console.log('  PASSED: /feed returns 0 profiles, triggering empty state.');
    passedTests++;

    console.log('\n======================================================');
    console.log(` ALL ${passedTests}/${totalTests} REQUIRED TEST SCENARIOS PASSED WITH ZERO ERRORS! `);
    console.log('======================================================\n');
  } catch (err) {
    console.error('\n TEST FAILED:', err);
    process.exitCode = 1;
  } finally {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
    // Clean up test database
    await db.close().catch(() => {});
    if (fs.existsSync(testDbFile)) {
      try {
        fs.unlinkSync(testDbFile);
      } catch (e) {}
    }
  }
}

runTests();
