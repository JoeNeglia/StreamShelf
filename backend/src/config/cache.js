// Purpose: NodeCache instance for caching API responses.
const NodeCache = require('node-cache');
const { CACHE_TTL_SECONDS } = require('./constants');

const cache = new NodeCache({ stdTTL: CACHE_TTL_SECONDS });

module.exports = cache;
