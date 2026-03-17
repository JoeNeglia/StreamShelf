// Purpose: Grid layout and cards for displaying catalog titles.
import React, { useState } from 'react'

export function TitlesGrid({ items, loading, error }) {
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <>
      <section className="grid">
        {items.map((item) => {
          const posterUrl = item.posterPath ? `https://image.tmdb.org/t/p/w300${item.posterPath}` : null
          const ratingLabel = item.ratingSource === 'imdb' ? 'IMDb' : 'TMDB'
          return (
            <article key={item.id} className="card" onClick={() => setSelectedItem(item)} style={{ cursor: 'pointer' }}>
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

      {selectedItem && (
        <div className="modal" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedItem(null)}>✕</button>
            <div className="modal-body">
              <div className="modal-poster">
                {selectedItem.posterPath ? (
                  <img src={`https://image.tmdb.org/t/p/w500${selectedItem.posterPath}`} alt={selectedItem.title} />
                ) : (
                  <div className="poster-placeholder">No image</div>
                )}
              </div>
              <div className="modal-info">
                <h2>{selectedItem.title}</h2>
                <p className="modal-meta">
                  {selectedItem.releaseDate ? selectedItem.releaseDate.slice(0, 4) : '—'} ·
                  {selectedItem.ratingSource === 'imdb' ? ' IMDb' : ' TMDB'} {selectedItem.rating ?? '—'}
                </p>
                <div className="modal-overview">
                  <h3>Synopsis</h3>
                  <p>{selectedItem.overview || 'No synopsis available.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
