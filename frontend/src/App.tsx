import React, { useState } from 'react'
import { Download, AlertCircle, Loader2 } from 'lucide-react'
import { FileUpload } from './components/FileUpload'
import { PredictionTable } from './components/PredictionTable'
import { ManualInput } from './components/ManualInput'
import { SummaryChart } from './components/SummaryChart'
import { predictFromCSV, predictSingleRow } from './utils/api'
import { downloadCSV } from './utils/helpers'
import { PredictionResult, ExoplanetData } from './types'

const App: React.FC = () => {
  const [predictions, setPredictions] = useState<PredictionResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [summary, setSummary] = useState<{
    CONFIRMED: number
    CANDIDATE: number
    'FALSE POSITIVE': number
  } | null>(null)

  const handleFileUpload = async (file: File) => {
    setLoading(true)
    setError('')
    try {
      const response = await predictFromCSV(file)
      setPredictions(response.predictions)
      
      const calc = response.predictions.reduce(
        (acc, pred) => {
          acc[pred.prediction as keyof typeof acc] = (acc[pred.prediction as keyof typeof acc] || 0) + 1
          return acc
        },
        { CONFIRMED: 0, CANDIDATE: 0, 'FALSE POSITIVE': 0 }
      )
      setSummary(calc)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file')
    } finally {
      setLoading(false)
    }
  }

  const handleManualPredict = async (data: ExoplanetData) => {
    setLoading(true)
    setError('')
    try {
      const result = await predictSingleRow(data)
      setPredictions([result])
      setSummary({ CONFIRMED: 0, CANDIDATE: 0, 'FALSE POSITIVE': 0, [result.prediction]: 1 })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get prediction')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🌌 Exoplanet Classification System
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload CSV files containing exoplanet data or input single observations manually
            to predict their classification: CONFIRMED, CANDIDATE, or FALSE POSITIVE.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">How to use:</h3>
          <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
            <li>Upload a CSV file with exoplanet features or use manual input below</li>
            <li>Click the predict button and wait for results</li>
            <li>View predictions in the table and summary chart</li>
            <li>Download results as CSV if needed</li>
          </ol>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Upload CSV File</h2>
          <FileUpload onFileSelect={handleFileUpload} loading={loading} />
        </div>

        <div className="mb-6">
          <ManualInput onPredict={handleManualPredict} loading={loading} />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          </div>
        )}

        {!loading && predictions.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">
                Results ({predictions.length} predictions)
              </h2>
              <button
                onClick={() => downloadCSV(predictions)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download CSV
              </button>
            </div>

            {summary && (
              <div className="mb-6">
                <SummaryChart summary={summary} />
              </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-md">
              <PredictionTable predictions={predictions} />
            </div>
          </>
        )}

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Powered by FastAPI Backend • React + TypeScript Frontend</p>
        </div>
      </div>
    </div>
  )
}

export default App