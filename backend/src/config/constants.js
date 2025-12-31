const PROVIDER_IDS = {
  netflix: '8',
  prime: '9',
  'prime video': '9',
  hulu: '15',
  'hbo max': '1899|384',
  max: '1899|384',
};

const INDIAN_LANGS = ['hi', 'bn', 'ur', 'ta', 'te', 'ml', 'kn', 'mr', 'gu', 'pa', 'or'];

const MAX_PAGES = 5;
const ENRICH_LIMIT = 60;
const CACHE_TTL_SECONDS = 60 * 30;

module.exports = {
  PROVIDER_IDS,
  INDIAN_LANGS,
  MAX_PAGES,
  ENRICH_LIMIT,
  CACHE_TTL_SECONDS,
};
