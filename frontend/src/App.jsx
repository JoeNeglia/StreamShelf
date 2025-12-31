import React, { useEffect, useState, useRef } from 'react'
import { fetchStreaming } from './services/streamingService'
import { ProviderTypeControls } from './components/ProviderTypeControls'
import { StatusBar } from './components/StatusBar'
import { TitlesGrid } from './components/TitlesGrid'

const PROVIDERS = [
  { key: 'netflix', label: 'Netflix' },
  { key: 'prime', label: 'Prime Video' },
  { key: 'hulu', label: 'Hulu' },
  { key: 'hbo max', label: 'HBO Max' },
]

const TYPES = [
  { key: 'movie', label: 'Movies' },
  { key: 'tv', label: 'TV Shows' },
]

function App() {
  const [provider, setProvider] = useState(PROVIDERS[0].key)
  const [mediaType, setMediaType] = useState(TYPES[0].key)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cached, setCached] = useState(false)
  const controlsRef = useRef(null)

  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await fetchStreaming(provider, mediaType)
        if (!active) return
        setItems(data.results || [])
        setCached(Boolean(data.cached))
      } catch (err) {
        if (!active) return
        setError(err?.response?.data?.error || 'Failed to load titles')
        setItems([])
      } finally {
        if (active) setLoading(false)
      }
    }

    load()
    return () => {
      active = false
    }
  }, [provider, mediaType])

  const currentTypeLabel = TYPES.find((t) => t.key === mediaType)?.label
  const providerLabel = PROVIDERS.find((p) => p.key === provider)?.label

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">Unified Streaming Catalog</p>
          <h1>Stream Shelf</h1>
          <p className="subhead">
            The fastest way to see what is included on your streaming shelves. Pick your services and get the
            highest-rated subscription titles, merged into a single list.
          </p>
        </div>
      </header>

      <ProviderTypeControls
        providers={PROVIDERS}
        types={TYPES}
        provider={provider}
        mediaType={mediaType}
        onProviderChange={setProvider}
        onTypeChange={setMediaType}
        controlsRef={controlsRef}
      />

      <StatusBar
        loading={loading}
        error={error}
        itemsCount={items.length}
        providerLabel={providerLabel}
        typeLabel={currentTypeLabel}
        cached={cached}
      />

      <TitlesGrid items={items} loading={loading} error={error} />
    </div>
  )
}

export default App
