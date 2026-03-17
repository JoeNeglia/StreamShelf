// Purpose: Catalog page that fetches and displays provider titles.
import React, { useEffect, useRef, useState } from 'react'
import { fetchStreaming } from '../services/streamingService'
import { ProviderTypeControls } from '../components/ProviderTypeControls'
import { StatusBar } from '../components/StatusBar'
import { TitlesGrid } from '../components/TitlesGrid'

const PROVIDERS = [
  { key: 'netflix', label: 'Netflix' },
  { key: 'prime', label: 'Prime Video' },
  { key: 'hulu', label: 'Hulu' },
  { key: 'disney+', label: 'Disney+' },
  { key: 'peacock', label: 'Peacock' },
  { key: 'hbo max', label: 'HBO Max' },
]

const TYPES = [
  { key: 'movie', label: 'Movies' },
  { key: 'tv', label: 'TV Shows' },
  { key: 'doc', label: 'Documentaries' },
]

const STORAGE_KEY = 'stream_shelf_services'

export function Catalog() {
  const [availableProviders, setAvailableProviders] = useState(PROVIDERS)
  const [provider, setProvider] = useState(PROVIDERS[0].key)
  const [mediaType, setMediaType] = useState(TYPES[0].key)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cached, setCached] = useState(false)
  const controlsRef = useRef(null)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    try {
      const selected = JSON.parse(raw)
      if (Array.isArray(selected) && selected.length) {
        const filtered = PROVIDERS.filter((p) => selected.includes(p.key))
        if (filtered.length) {
          setAvailableProviders(filtered)
          setProvider(filtered[0].key)
        }
      }
    } catch {
      // ignore malformed storage
    }
  }, [])

  useEffect(() => {
    let active = true
    const load = async () => {
      if (!provider) {
        setError('Select at least one service on the home page to view the catalog.')
        setItems([])
        setCached(false)
        return
      }
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
  const providerLabel = availableProviders.find((p) => p.key === provider)?.label

  return (
    <>
      <div className="hero-content">
        <p className="eyebrow">Catalog</p>
        <h1 className="heading-center">Browse your services</h1>
      </div>

      <ProviderTypeControls
        providers={availableProviders}
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
    </>
  )
}
