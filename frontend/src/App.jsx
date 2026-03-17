// Purpose: App shell with navigation and route outlets.
import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Catalog } from './pages/Catalog'
import { About } from './pages/About'

function App() {
  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">Stream Shelf</div>
        <nav className="nav-actions">
          <NavLink className="nav-btn" to="/">
            Home
          </NavLink>
          <NavLink className="nav-btn" to="/catalog">
            Catalogue
          </NavLink>
          <NavLink className="nav-btn" to="/about">
            About
          </NavLink>
        </nav>
      </header>

      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
