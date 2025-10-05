import Papa from 'papaparse'
import { PredictionResult } from '../types'

export const downloadCSV = (data: PredictionResult[]) => {
  const csvData = data.map(item => ({
    ...item.features,
    prediction: item.prediction,
    confidence: item.confidence || 'N/A'
  }))

  const csv = Papa.unparse(csvData)
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `exoplanet_predictions_${Date.now()}.csv`
  a.click()
  window.URL.revokeObjectURL(url)
}

export const getPredictionColor = (prediction: string): string => {
  switch (prediction) {
    case 'CONFIRMED':
      return 'bg-green-100 text-green-800 border-green-300'
    case 'CANDIDATE':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    case 'FALSE POSITIVE':
      return 'bg-red-100 text-red-800 border-red-300'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300'
  }
}