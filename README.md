# Plot Hole Plotter

A sophisticated tool for analyzing things that don't need analyzing. Guaranteed to waste your time in the most professional way possible! 🎉

## Features

- **Useless Subtitle Analysis**: Discover completely meaningless insights about subtitle timing, fonts, and synchronization
- **Pointless Audio Analysis**: Analyze audio frequencies, silence patterns, and background noise with zero practical value
- **Professional UI**: Beautiful, modern interface built with Next.js and Tailwind CSS
- **FastAPI Backend**: Robust API for serving completely useless data
- **Real-time Search**: Search through meaningless data with instant results

## Project Structure

```
plot-hole-plotter/
├── backend/                      # FastAPI backend
│   └── main.py                  # Main API server
├── frontend/                    # Next.js frontend
│   ├── app/
│   │   ├── page.js             # Home page with search interface
│   │   ├── layout.js           # Global layout
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   └── ui/                 # Reusable UI components
│   ├── lib/
│   │   └── api.js              # API client functions
│   ├── package.json            # Frontend dependencies
│   ├── tailwind.config.js      # Tailwind CSS config
│   └── next.config.js          # Next.js config
└── README.md                   # This file
```

## Quick Start

### Prerequisites

- Node.js 18+ 
- Python 3.8+
- pip (Python package manager)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd plot-hole-plotter/backend
   ```

2. Install Python dependencies:
   ```bash
   pip install fastapi uvicorn pydantic
   ```

3. Start the FastAPI server:
   ```bash
   python main.py
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd plot-hole-plotter/frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### `GET /`
Health check endpoint

### `GET /health`
API health status

### `POST /api/search`
Search for useless subtitle and audio analysis data

**Request Body:**
```json
{
  "query": "silence analysis"
}
```

**Response:**
```json
{
  "query": "silence analysis",
  "results": [
    {
      "id": 1,
      "text": "The sound of silence at 2:34 - completely meaningless",
      "relevance": 85,
      "uselessness": 95,
      "source": "subtitle_analysis_42.txt"
    }
  ],
  "total_results": 1
}
```

### `GET /api/random-useless-fact`
Get a random useless fact about subtitles or audio

**Response:**
```json
{
  "fact": "The average subtitle contains 42% more words than necessary",
  "confidence": 87,
  "source": "completely_made_up_research.txt"
}
```

## Development

### Backend Development

The backend is built with FastAPI and provides:
- CORS support for frontend integration
- Pydantic models for request/response validation
- Simulated useless data generation
- Health check endpoints

### Frontend Development

The frontend is built with:
- **Next.js 14** with App Router
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Custom UI components** built with shadcn/ui patterns

### Key Features

- **"use client"** directive for client-side interactivity
- **Responsive design** that works on all devices
- **Loading states** and error handling
- **Mock data fallback** when API is unavailable
- **Beautiful gradients** and animations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This tool is designed for entertainment purposes only. All analysis results are completely meaningless and serve no practical purpose. Congratulations on successfully wasting your time! 🎉

---

Made with ❤️ and absolutely zero practical purpose 