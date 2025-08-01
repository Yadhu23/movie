const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function analyzeSrtFile(file) {
  try {
    // Extract file path from the file object
    const filePath = file.path || file.name || 'subtitles/movie.srt'
    
    const response = await fetch(`${API_BASE_URL}/api/analyze-srt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filePath: filePath
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error analyzing SRT file:', error)
    // Return mock data if API is not available
    return {
      fileName: file.name || 'movie.srt',
      totalSubtitles: Math.floor(Math.random() * 500) + 100,
      analysisTime: Math.floor(Math.random() * 10) + 2,
      breakOpportunities: [
        {
          start: "0:15:30.000",
          duration: 45,
          duration_formatted: "45s"
        },
        {
          start: "0:32:15.000",
          duration: 120,
          duration_formatted: "2m 0s"
        },
        {
          start: "0:45:12.000",
          duration: 90,
          duration_formatted: "1m 30s"
        }
      ],
      totalGaps: 3,
      totalBreakTime: 255
    }
  }
}

export async function getRandomPlotHole() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/random-plot-hole`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching random plot hole:', error)
    // Return mock data if API is not available
    return {
      break_opportunity: "Long scene transition with no dialogue",
      duration: 60,
      timestamp: "00:15:30,456"
    }
  }
}

export async function checkApiHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`)
    return response.ok
  } catch (error) {
    console.error('Error checking API health:', error)
    return false
  }
} 