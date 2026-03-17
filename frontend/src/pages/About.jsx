// Purpose: About page with detailed description of Stream Shelf.
import React from 'react'

export function About() {
  return (
    <section className="hero-content">
      <p className="eyebrow">About</p>
      <h1 className="heading-center">What is Stream Shelf For?</h1>
      <p className="subhead">
        Stream Shelf provides a consolidated library of media based on what you're subscribed to, eliminating the hassle of constantly switching between apps to find what's available and worth watching. The platform currently shows top results in each category, ranked by IMDb ratings.
      </p>
      <h1 className="heading-center">How Stream Shelf Works</h1>
      <p className="subhead">
        Stream Shelf queries TMDB for subscription-only titles from your selected providers, then ranks them by rating so you can discover what's worth watching. 
        The app enriches titles with IMDb ratings when available, and caches results to speed up browsing. Your service selections are saved locally in your browser.
      </p>
    </section>
  )
}
