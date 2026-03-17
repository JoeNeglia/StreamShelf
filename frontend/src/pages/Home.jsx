// Purpose: Home page hero content and streaming service selection.
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const SERVICES = [
  { key: 'hulu', label: 'Hulu', logo: '/hulu.png', brandClass: 'hulu' },
  { key: 'hbo max', label: 'Max', logo: '/hbo.png', brandClass: 'max' },
  { key: 'netflix', label: 'Netflix', logo: '/netflix.png', brandClass: 'netflix' },
  { key: 'prime', label: 'Prime Video', logo: '/prime.png', brandClass: 'prime' },
  { key: 'disney+', label: 'Disney+', logo: '/disney.png', brandClass: 'disney' },
  { key: 'peacock', label: 'Peacock', logo: '/peacock.png', brandClass: 'peacock' },
]

const STORAGE_KEY = 'stream_shelf_services'

export function Home() {
  const [selected, setSelected] = useState([])

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    try {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) setSelected(parsed)
    } catch {
      // ignore malformed storage
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selected))
  }, [selected])

  const toggle = (key) => {
    setSelected((prev) => (prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]))
  }

  return (
    <div className="hero-content home-hero">
      <p className="eyebrow home-eyebrow">Home</p>
      <p className="subhead">
        Select the streaming services you are subscribed to!
      </p>

      <div className="home-selection">
        <div className="logo-grid">
          {SERVICES.map((service) => {
            const active = selected.includes(service.key)
            return (
              <button
                key={service.key}
                className={`logo-button ${service.brandClass} ${active ? 'active' : ''}`}
                onClick={() => toggle(service.key)}
                aria-pressed={active}
                aria-label={service.label}
              >
                {service.logo ? (
                  <img src={service.logo} alt={service.label} />
                ) : (
                  <span className="logo-fallback">{service.label}</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <Link className="primary-btn" to="/catalog">
        Go to catalogue
      </Link>
    </div>
  )
}
