// Purpose: TMDB client utilities for discover queries and IMDb IDs.
const axios = require('axios');
const { MAX_PAGES } = require('../config/constants');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN || process.env.TMDB_BEARER_TOKEN;

const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: TMDB_ACCESS_TOKEN
    ? { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`, accept: 'application/json' }
    : { accept: 'application/json' },
});

const tmdbAuthParams = () => (TMDB_ACCESS_TOKEN ? {} : { api_key: TMDB_API_KEY });

async function fetchDiscoverPages({ providerId, contentType, extraParams = {} }) {
  const url = `/discover/${contentType}`;
  const params = {
    with_watch_providers: providerId,
    watch_region: 'US',
    with_watch_monetization_types: 'flatrate',
    sort_by: 'vote_average.desc',
    'vote_count.gte': 100,
    include_adult: false,
    language: 'en-US',
    ...extraParams,
    ...tmdbAuthParams(),
  };

  const collected = [];
  let page = 1;
  let totalPages = 1;
  while (page <= MAX_PAGES && page <= totalPages && collected.length < 120) {
    const { data } = await tmdbClient.get(url, { params: { ...params, page } });
    totalPages = data?.total_pages || totalPages;
    collected.push(...(data?.results || []));
    page += 1;
  }
  return collected;
}

async function fetchImdbId(tmdbId, mediaType) {
  if (mediaType === 'movie') {
    const { data } = await tmdbClient.get(`/movie/${tmdbId}`, { params: tmdbAuthParams() });
    return data?.imdb_id || null;
  }
  const { data } = await tmdbClient.get(`/tv/${tmdbId}/external_ids`, { params: tmdbAuthParams() });
  return data?.imdb_id || null;
}

module.exports = {
  fetchDiscoverPages,
  fetchImdbId,
};
