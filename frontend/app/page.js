"use client"

import React, { useState } from "react"
import { Upload, Brain, Sparkles, FileText, Clock, Play, Coffee } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { analyzeSrtFile } from "../lib/api"

export default function PlotHolePlotter() {
  const [srtFilePath, setSrtFilePath] = useState("subtitles/movie.srt")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState(null)

  const analyzeSubtitleFile = async () => {
    if (!srtFilePath.trim()) {
      alert("Please enter a valid SRT file path")
      return
    }

    setIsAnalyzing(true)

    try {
      // Create a mock file object from the path
      const mockFile = {
        name: srtFilePath.split('/').pop() || 'movie.srt',
        path: srtFilePath
      }
      
      const results = await analyzeSrtFile(mockFile)
      setAnalysisResults(results)
    } catch (error) {
      console.error('Error analyzing file:', error)
      alert('Error analyzing file. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const formatTime = (timeStr) => {
    // Convert timedelta string to readable format
    if (timeStr.includes('days')) {
      return timeStr.split(',')[1]?.trim() || timeStr
    }
    return timeStr
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-7xl space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="w-12 h-12 text-purple-600" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Plot Hole Plotter
              </h1>
              <Sparkles className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
              Find ideal break times in your movie using subtitle gaps ({'>'}30s)
            </p>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              🍿 Break Time Finder
            </Badge>
          </div>

          {/* File Path Input Section */}
          <Card className="border-2 border-dashed border-purple-200 hover:border-purple-300 transition-colors shadow-lg">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <FileText className="w-8 h-8 text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-700">
                    Enter SRT File Path
                  </h3>
                </div>
                
                <div className="max-w-md mx-auto">
                  <Input
                    type="text"
                    placeholder="Enter path to your SRT file (e.g., subtitles/movie.srt)"
                    value={srtFilePath}
                    onChange={(e) => setSrtFilePath(e.target.value)}
                    className="text-center border-2 border-gray-200 focus:border-purple-400 rounded-xl py-3"
                  />
                </div>

                <div className="text-sm text-gray-500">
                  <p>Default path: <code className="bg-gray-100 px-2 py-1 rounded">subtitles/movie.srt</code></p>
                </div>

                <Button
                  onClick={analyzeSubtitleFile}
                  disabled={isAnalyzing || !srtFilePath.trim()}
                  size="lg"
                  className="px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Coffee className="w-5 h-5 mr-2" />
                      Find Break Times
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysisResults && (
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <h2 className="text-2xl font-semibold text-gray-800">Break Opportunities</h2>
                  <Badge variant="secondary" className="ml-auto">
                    {analysisResults.totalGaps} opportunities found
                  </Badge>
                </div>

                {/* File Info */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">File:</span>
                      <p className="text-gray-800">{analysisResults.fileName}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Total Subtitles:</span>
                      <p className="text-gray-800">{analysisResults.totalSubtitles}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Analysis Time:</span>
                      <p className="text-gray-800">{analysisResults.analysisTime}s</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Total Break Time:</span>
                      <p className="text-gray-800">{Math.floor(analysisResults.totalBreakTime / 60)}m {analysisResults.totalBreakTime % 60}s</p>
                    </div>
                  </div>
                </div>

                {/* Break Opportunities List */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Break Schedule</h3>
                  {analysisResults.breakOpportunities.length > 0 ? (
                    <div className="space-y-4">
                      {analysisResults.breakOpportunities.map((opportunity, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              <Clock className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold text-gray-800">Break #{index + 1}</span>
                                <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-300">
                                  {opportunity.duration_formatted}
                                </Badge>
                                <span className="text-xs text-gray-500">• Start: {formatTime(opportunity.start)}</span>
                              </div>
                              <p className="text-gray-700 mb-2">
                                Perfect time for a break! This gap of {opportunity.duration_formatted} provides enough time to refresh.
                              </p>
                              <div className="text-sm text-gray-600">
                                <span className="font-medium">Suggestion:</span> Use this time to grab a snack, stretch, or take a bathroom break.
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-8 h-8 text-yellow-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">No Break Opportunities Found</h3>
                      <p className="text-gray-500">
                        No gaps longer than 30 seconds were found in this subtitle file. The movie has continuous dialogue throughout.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Analysis Complete!</strong> {analysisResults.totalGaps > 0 
                      ? `Found ${analysisResults.totalGaps} break opportunities totaling ${Math.floor(analysisResults.totalBreakTime / 60)}m ${analysisResults.totalBreakTime % 60}s of break time.`
                      : "No break opportunities found in this subtitle file."
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empty state when no analysis has been performed */}
          {!analysisResults && (
            <div className="text-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Coffee className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Ready to find break times?</h3>
              <p className="text-gray-500">
                Enter the path to your SRT file above and click "Find Break Times" to discover ideal moments for breaks!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center p-6 text-sm text-gray-500">
        <p>Made with ❤️ and perfect timing for breaks</p>
        <p className="mt-1">© 2024 Plot Hole Plotter - Smart break time finder</p>
      </div>
    </div>
  )
} 