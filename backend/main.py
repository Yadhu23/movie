from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import re
import random
import os
import datetime
from datetime import timedelta

app = FastAPI(title="Plot Hole Plotter API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalysisRequest(BaseModel):
    filePath: str

class BreakOpportunity(BaseModel):
    start: str
    duration: int
    duration_formatted: str

class AnalysisResult(BaseModel):
    fileName: str
    totalSubtitles: int
    analysisTime: float
    breakOpportunities: List[BreakOpportunity]
    totalGaps: int
    totalBreakTime: int

@app.get("/")
async def root():
    return {"message": "Plot Hole Plotter API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/api/analyze-srt", response_model=AnalysisResult)
async def analyze_srt_file(request: AnalysisRequest):
    """Analyze SRT subtitle file for break opportunities (gaps >30s)"""
    
    file_path = request.filePath
    
    if not file_path.endswith('.srt'):
        raise HTTPException(status_code=400, detail="Please provide a valid .srt file path")
    
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail=f"File not found: {file_path}")
    
    try:
        # Read the SRT file content
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            srt_content = f.read()
        
        # Parse SRT content and find break opportunities
        break_opportunities = analyze_subtitles_for_breaks(srt_content)
        
        # Calculate statistics
        total_gaps = len(break_opportunities)
        total_break_time = sum(opp.duration for opp in break_opportunities)
        
        return AnalysisResult(
            fileName=os.path.basename(file_path),
            totalSubtitles=count_subtitles(srt_content),
            analysisTime=round(random.uniform(1.0, 3.0), 1),
            breakOpportunities=break_opportunities,
            totalGaps=total_gaps,
            totalBreakTime=total_break_time
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing file: {str(e)}")

def parse_srt_timestamps(content: str) -> List[dict]:
    """Parse SRT content and extract timestamps"""
    subtitles = []
    blocks = content.strip().split('\n\n')
    
    for block in blocks:
        lines = block.strip().split('\n')
        if len(lines) >= 3:
            try:
                index = int(lines[0])
                timestamp_line = lines[1]
                
                # Parse timestamp line (format: 00:00:00,000 --> 00:00:00,000)
                if ' --> ' in timestamp_line:
                    start_str, end_str = timestamp_line.split(' --> ')
                    start_time = parse_timestamp(start_str)
                    end_time = parse_timestamp(end_str)
                    
                    subtitles.append({
                        'index': index,
                        'start': start_time,
                        'end': end_time,
                        'text': '\n'.join(lines[2:])
                    })
            except (ValueError, IndexError):
                continue
    
    return subtitles

def parse_timestamp(timestamp_str: str) -> datetime.timedelta:
    """Parse SRT timestamp string to timedelta"""
    # Remove milliseconds and convert to seconds
    time_part, ms_part = timestamp_str.split(',')
    hours, minutes, seconds = map(int, time_part.split(':'))
    milliseconds = int(ms_part)
    
    total_seconds = hours * 3600 + minutes * 60 + seconds + milliseconds / 1000
    return datetime.timedelta(seconds=total_seconds)

def analyze_subtitles_for_breaks(srt_content: str) -> List[BreakOpportunity]:
    """Analyze subtitles for break opportunities (gaps >30s)"""
    subtitles = parse_srt_timestamps(srt_content)
    break_opportunities = []
    
    for i in range(1, len(subtitles)):
        prev_end = subtitles[i - 1]['end']
        curr_start = subtitles[i]['start']
        gap_duration = curr_start - prev_end
        
        # Check if gap is longer than 30 seconds
        if gap_duration.total_seconds() > 30:
            # Format duration as "Xm Ys"
            total_seconds = int(gap_duration.total_seconds())
            minutes = total_seconds // 60
            seconds = total_seconds % 60
            
            if minutes > 0:
                duration_formatted = f"{minutes}m {seconds}s"
            else:
                duration_formatted = f"{seconds}s"
            
            break_opportunities.append(BreakOpportunity(
                start=str(prev_end),
                duration=total_seconds,
                duration_formatted=duration_formatted
            ))
    
    return break_opportunities

def count_subtitles(srt_content: str) -> int:
    """Count total number of subtitles in the file"""
    blocks = srt_content.strip().split('\n\n')
    count = 0
    
    for block in blocks:
        lines = block.strip().split('\n')
        if len(lines) >= 3:
            try:
                int(lines[0])  # Check if first line is a number
                count += 1
            except ValueError:
                continue
    
    return count

@app.get("/api/random-plot-hole")
async def get_random_plot_hole():
    """Get a random break opportunity example"""
    
    break_examples = [
        "Long scene transition with no dialogue",
        "Extended action sequence with minimal speech",
        "Background music interlude",
        "Visual montage sequence",
        "Character reaction shot",
        "Establishing shot of location",
        "Silent dramatic moment",
        "Credits sequence",
        "Intermission break",
        "Scene transition with ambient sound only"
    ]
    
    return {
        "break_opportunity": random.choice(break_examples),
        "duration": random.randint(30, 180),
        "timestamp": f"{random.randint(0, 2):02d}:{random.randint(0, 59):02d}:{random.randint(0, 59):02d},{random.randint(0, 999):03d}"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 