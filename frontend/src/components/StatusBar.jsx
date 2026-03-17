// Purpose: Loading/error/status messaging for catalog results.
import React from 'react'

export function StatusBar({ loading, error, itemsCount, providerLabel, typeLabel, cached }) {
  return (
    <section className="status">
      {loading && <p>Loading {typeLabel?.toLowerCase()} on {providerLabel}…</p>}
      {!loading && error && <p className="error">{error}</p>}
      {!loading && !error && (
        <p>
          Showing {itemsCount} {typeLabel?.toLowerCase()} on {providerLabel}
          {cached ? ' (cached)' : ''}
        </p>
      )}
    </section>
  )
}
