// Provider/type selection controls for the catalog view.
import React from 'react'

export function ProviderTypeControls({ providers, types, provider, mediaType, onProviderChange, onTypeChange, controlsRef }) {
  return (
    <section className="controls" ref={controlsRef}>
      <div className="control-group">
        <p className="label">Provider</p>
        <div className="pill-row">
          {providers.map((p) => (
            <button
              key={p.key}
              className={`pill ${provider === p.key ? 'active' : ''}`}
              onClick={() => onProviderChange(p.key)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="control-group type-control-group">
        <p className="label">Type</p>
        <div className="pill-row type-pill-row">
          {types.map((t) => (
            <button
              key={t.key}
              className={`pill ${mediaType === t.key ? 'active' : ''}`}
              onClick={() => onTypeChange(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
