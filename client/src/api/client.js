/**
 * API client for Coy dating application
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `HTTP error! Status: ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData && errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (e) {}
    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

/**
 * Fetch profiles for discover feed that user hasn't swiped on
 */
export async function fetchFeed() {
  const res = await fetch(`${API_BASE_URL}/feed`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  return handleResponse(res);
}

/**
 * Send Like or Pass swipe action
 * @param {number} profileId
 * @param {'like'|'pass'} action
 */
export async function sendSwipe(profileId, action) {
  const res = await fetch(`${API_BASE_URL}/swipe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      profileId,
      action
    })
  });
  return handleResponse(res);
}

/**
 * Fetch mutual matches (never returns one-sided likes)
 */
export async function fetchMatches() {
  const res = await fetch(`${API_BASE_URL}/matches`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  return handleResponse(res);
}

/**
 * Fetch discovery stats
 */
export async function fetchStats() {
  const res = await fetch(`${API_BASE_URL}/stats`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  return handleResponse(res);
}

/**
 * Reset demo data (swipes and matches)
 */
export async function resetDemoData() {
  const res = await fetch(`${API_BASE_URL}/reset`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    }
  });
  return handleResponse(res);
}
