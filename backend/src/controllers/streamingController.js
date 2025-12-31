const cache = require('../config/cache');
const { PROVIDER_IDS, INDIAN_LANGS, ENRICH_LIMIT } = require('../config/constants');
const { fetchDiscoverPages, fetchImdbId } = require('../services/tmdbService');
const { fetchImdbRating, parseRating } = require('../services/omdbService');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN || process.env.TMDB_BEARER_TOKEN;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

const isIndianProduction = (item) => {
  const lang = (item.original_language || '').toLowerCase();
  const countries = Array.isArray(item.origin_country) ? item.origin_country.map((c) => c.toUpperCase()) : [];
  return INDIAN_LANGS.includes(lang) || countries.includes('IN');
};

async function getStreaming(req, res) {
  const providerParam = (req.query.provider || '').toLowerCase();
  const contentType = (req.query.type || 'movie').toLowerCase();
  const providerId = PROVIDER_IDS[providerParam];

  if (!providerId) {
    return res.status(400).json({ error: 'Unsupported provider. Try netflix, prime, hulu, or hbo max.' });
  }

  if (!['movie', 'tv'].includes(contentType)) {
    return res.status(400).json({ error: 'Invalid type. Use movie or tv.' });
  }

  const cacheKey = `${contentType}:${providerId}`;
  const cached = cache.get(cacheKey);
  if (cached) return res.json({ results: cached, cached: true });

  try {
    if (!TMDB_API_KEY && !TMDB_ACCESS_TOKEN) {
      return res.status(500).json({ error: 'TMDB_API_KEY or TMDB_ACCESS_TOKEN not configured' });
    }
    if (!OMDB_API_KEY) {
      return res.status(500).json({ error: 'OMDB_API_KEY not configured' });
    }

    const collected = await fetchDiscoverPages({ providerId, contentType });

    const baseItems = collected
      .filter((item) => !isIndianProduction(item))
      .map((item) => ({
        id: item.id,
        title: item.title || item.name,
        overview: item.overview,
        posterPath: item.poster_path,
        tmdbRating: parseRating(item.vote_average),
        releaseDate: item.release_date || item.first_air_date,
        mediaType: contentType,
        provider: providerParam,
        votes: item.vote_count,
      }))
      .sort((a, b) => (b.tmdbRating || 0) - (a.tmdbRating || 0))
      .slice(0, ENRICH_LIMIT);

    const enriched = await Promise.all(
      baseItems.map(async (item) => {
        try {
          const imdbId = await fetchImdbId(item.id, contentType);
          const imdbRating = await fetchImdbRating(imdbId);
          return {
            ...item,
            imdbId,
            rating: imdbRating ?? item.tmdbRating,
            ratingSource: imdbRating ? 'imdb' : 'tmdb',
          };
        } catch (err) {
          console.error('IMDb enrichment failed for', item.id, err.message);
          return { ...item, rating: item.tmdbRating, ratingSource: 'tmdb' };
        }
      }),
    );

    const sanitized = enriched
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 20);

    cache.set(cacheKey, sanitized);
    res.json({ results: sanitized, cached: false });
  } catch (error) {
    const status = error.response?.status || 500;
    const tmdbMessage = error.response?.data?.status_message;
    const body = error.response?.data;
    console.error('TMDB fetch failed:', status, error.message, tmdbMessage || '', body || '');
    res.status(status).json({ error: tmdbMessage || error.message || 'Failed to fetch data from TMDB', status, body });
  }
}

module.exports = {
  getStreaming,
};
