import React from 'react'

export function TitlesGrid({ items, loading, error }) {
  return (
    <section className="grid">
      {items.map((item) => {
        const posterUrl = item.posterPath ? `https://image.tmdb.org/t/p/w300${item.posterPath}` : null
        const ratingLabel = item.ratingSource === 'imdb' ? 'IMDb' : 'TMDB'
        return (
          <article key={item.id} className="card">
            {posterUrl ? <img src={posterUrl} alt={item.title} /> : <div className="poster-placeholder">No image</div>}
            <div className="card-body">
              <h3>{item.title}</h3>
              <p className="meta">
                {item.releaseDate ? item.releaseDate.slice(0, 4) : '—'} · {ratingLabel} {item.rating ?? '—'}
              </p>
              <p className="overview">{item.overview || 'No synopsis available.'}</p>
            </div>
          </article>
        )
      })}

      {!loading && !error && items.length === 0 && (
        <div className="empty">No titles found. Try another provider or type.</div>
      )}
    </section>
  )
}
