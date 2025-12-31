# Stream Shelf

View all your streaming subscription content in one unified interface. No more switching between apps to find what you can actually watch!

## 🎯 Features

- **Select Your Services** - Choose which streaming platforms you subscribe to
- **Unified Catalog** - Browse all your available content in one place
- **Smart Filtering** - Filter by genre, type (movie/TV), IMDb rating, cast, and directors
- **Subscription-Only** - Only shows content included with your subscription (no rentals or purchases)
- **Regional Support** - Respects content availability based on your region

## 🛠️ Tech Stack

**Frontend:**
- React 19
- Vite (build tool)
- Axios (API communication)
- Lucide React (icons)

**Backend:**
- Node.js
- Express
- Node-Cache (in-memory caching)
- Axios (external API calls)

**External APIs:**
- TMDB (The Movie Database)
- JustWatch (streaming availability)

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- npm or yarn package manager
- API keys from TMDB (free tier is sufficient)

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/unified-streaming-catalog.git
cd unified-streaming-catalog
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env` and add your API keys:
```env
PORT=5000
NODE_ENV=development
TMDB_API_KEY=your_actual_api_key_here
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Running the Application

You need two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:5173 (or the port Vite assigns)

Open your browser and navigate to the frontend URL!

## 🗂️ Project Structure
```
unified-streaming-catalog/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── services/      # API client services
│   │   └── styles/        # CSS stylesheets
│   └── public/            # Static assets
├── backend/               # Express backend API
│   └── src/
│       ├── controllers/   # Request handlers
│       ├── services/      # Business logic
│       ├── models/        # Data models
│       ├── routes/        # API routes
│       └── config/        # Configuration files
└── README.md
```

## 🔑 Getting API Keys

### TMDB API Key
1. Create a free account at https://www.themoviedb.org/
2. Go to Settings → API
3. Request an API key (choose "Developer" option)
4. Copy your API key to `backend/.env`

## 🎯 Roadmap

**Current (MVP):**
- ✅ Service selection
- ✅ Unified catalog browsing
- ✅ Basic filtering
- ✅ Subscription-only content

**Future Features:**
- [ ] User accounts and authentication
- [ ] Watchlists and favorites
- [ ] Cross-device sync
- [ ] Notifications for new content
- [ ] Personalized recommendations
- [ ] Support for ad-supported free content

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This project is for educational purposes. Streaming service availability data is provided by third-party APIs and may not always be 100% accurate or up-to-date.

## Contact

Project Link: https://github.com/JoeNeglia/StreamShelf