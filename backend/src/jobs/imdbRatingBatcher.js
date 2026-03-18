// Purpose: Daily batch job to preload all IMDB ratings for all streaming providers
const { PROVIDER_IDS } = require('../config/constants');
const { fetchDiscoverPages, fetchImdbId } = require('../services/tmdbService');
const { fetchImdbRating } = require('../services/omdbService');

const contentTypes = ['movie', 'tv'];

let isRunning = false;
let lastRunTime = null;

async function batchLoadImdbRatings() {
  if (isRunning) {
    console.log('IMDB batch job already running, skipping...');
    return;
  }

  isRunning = true;
  const startTime = Date.now();
  console.log(`[IMDB Batch] Starting preload job at ${new Date().toISOString()}`);

  try {
    let totalFetched = 0;
    let totalCached = 0;

    // Iterate through each provider
    for (const [providerName, providerId] of Object.entries(PROVIDER_IDS)) {
      for (const contentType of contentTypes) {
        try {
          console.log(`[IMDB Batch] Fetching ${contentType} titles for ${providerName}...`);

          const items = await fetchDiscoverPages({
            providerId,
            contentType,
            extraParams: contentType === 'movie' ? {} : {},
          });

          // Preload IMDB ratings for all items
          const ratingPromises = items.map(async (item) => {
            try {
              const imdbId = await fetchImdbId(item.id, contentType);
              if (imdbId) {
                await fetchImdbRating(imdbId);
                totalCached++;
              }
              totalFetched++;
            } catch (err) {
              console.error(`[IMDB Batch] Error fetching rating for ${item.id}:`, err.message);
            }
          });

          // Run in batches to avoid overwhelming the API
          const batchSize = 5;
          for (let i = 0; i < ratingPromises.length; i += batchSize) {
            await Promise.all(ratingPromises.slice(i, i + batchSize));
            // Small delay between batches
            if (i + batchSize < ratingPromises.length) {
              await new Promise((resolve) => setTimeout(resolve, 500));
            }
          }
        } catch (err) {
          console.error(`[IMDB Batch] Error processing ${providerName} ${contentType}:`, err.message);
        }
      }
    }

    lastRunTime = new Date();
    const duration = Date.now() - startTime;
    console.log(
      `[IMDB Batch] Completed in ${Math.round(duration / 1000)}s. Fetched: ${totalFetched}, Cached: ${totalCached}`
    );
  } catch (err) {
    console.error('[IMDB Batch] Job failed:', err.message);
  } finally {
    isRunning = false;
  }
}

function initializeBatchScheduler() {
  // Run immediately on startup
  batchLoadImdbRatings().catch(console.error);

  // Schedule to run once per day at 2 AM
  const scheduleNextRun = () => {
    const now = new Date();
    const next = new Date(now);
    next.setDate(next.getDate() + 1);
    next.setHours(2, 0, 0, 0); // 2 AM tomorrow

    const delay = next.getTime() - now.getTime();
    console.log(`[IMDB Batch] Next run scheduled in ${Math.round(delay / 1000 / 60)} minutes at ${next.toISOString()}`);

    setTimeout(() => {
      batchLoadImdbRatings().catch(console.error);
      scheduleNextRun(); // Reschedule for the next day
    }, delay);
  };

  scheduleNextRun();
}

module.exports = {
  initializeBatchScheduler,
  batchLoadImdbRatings,
  getLastRunTime: () => lastRunTime,
};
