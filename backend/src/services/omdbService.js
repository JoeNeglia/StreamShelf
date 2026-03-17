// Purpose: OMDb client utilities for IMDb rating enrichment.
const axios = require('axios');

const OMDB_API_KEY = process.env.OMDB_API_KEY;

const parseRating = (value) => {
  const num = parseFloat(value);
  return Number.isFinite(num) ? num : null;
};

let omdbBlocked = false; // avoid spamming if key is unauthorized

async function fetchImdbRating(imdbId) {
  if (!imdbId || !OMDB_API_KEY || omdbBlocked) return null;
  try {
    const { data } = await axios.get('https://www.omdbapi.com/', {
      params: { apikey: OMDB_API_KEY, i: imdbId },
    });
    if (data?.Response === 'False') return null;
    return parseRating(data?.imdbRating);
  } catch (err) {
    if (err.response?.status === 401) {
      omdbBlocked = true; // mark key as rejected and fallback silently
    }
    return null;
  }
}

module.exports = {
  fetchImdbRating,
  parseRating,
};
