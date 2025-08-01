# 🍿 Plot Hole Plotter

A smart application that analyzes SRT subtitle files to find ideal break times in movies using subtitle gaps (>30s).

## 🚀 Features

- **Break Time Analysis**: Automatically finds gaps longer than 30 seconds in subtitle files
- **Beautiful UI**: Modern Next.js frontend with Tailwind CSS
- **FastAPI Backend**: Robust Python backend for SRT file processing
- **Local File Support**: Works with SRT files on your local system
- **Real-time Analysis**: Processes SRT files and shows results immediately

## 🏗️ Project Structure

```
plot-hole-plotter/
├── backend/
│   ├── main.py              # FastAPI application
│   └── subtitles/movie.srt  # Sample SRT file
├── frontend/
│   ├── app/                 # Next.js app directory
│   ├── components/          # UI components
│   ├── lib/                # Utility functions
│   └── package.json        # Frontend dependencies
├── requirements.txt         # Python dependencies
├── render.yaml             # Render deployment config
└── README.md              # This file
```

## 🛠️ Local Development

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup
```bash
cd plot-hole-plotter/backend
pip install -r ../requirements.txt
python main.py
```

### Frontend Setup
```bash
cd plot-hole-plotter/frontend
npm install
npm run dev
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

## 🌐 Deployment

### Render Deployment

This project is configured for easy deployment on Render:

1. **Fork/Clone** this repository
2. **Connect** to your Render account
3. **Create a new Web Service**
4. **Point to this repository**
5. **Deploy** automatically

The `render.yaml` file contains the deployment configuration:
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
- **Environment**: Python 3.13.4

### Environment Variables
- `PORT`: Automatically set by Render
- `PYTHON_VERSION`: 3.13.4

## 📖 API Endpoints

### Backend API (FastAPI)

- `GET /` - Health check
- `GET /health` - API status
- `POST /api/analyze-srt` - Analyze SRT file for break opportunities
- `GET /api/random-plot-hole` - Get random break opportunity example

### Request Format
```json
{
  "filePath": "path/to/your/movie.srt"
}
```

### Response Format
```json
{
  "fileName": "movie.srt",
  "totalSubtitles": 150,
  "analysisTime": 2.5,
  "breakOpportunities": [
    {
      "start": "0:15:30.000",
      "duration": 45,
      "duration_formatted": "45s"
    }
  ],
  "totalGaps": 3,
  "totalBreakTime": 255
}
```

## 🎯 How It Works

1. **Upload SRT File**: Enter the path to your SRT subtitle file
2. **Analysis**: The backend parses the SRT file and finds gaps >30 seconds
3. **Results**: View break opportunities with timing and duration
4. **Break Planning**: Use the results to plan your movie watching breaks

## 🛠️ Technology Stack

- **Backend**: FastAPI, Python 3.13
- **Frontend**: Next.js 14, React, Tailwind CSS
- **UI Components**: Custom components with Lucide React icons
- **Deployment**: Render (configured)

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Made with ❤️ and perfect timing for breaks** 