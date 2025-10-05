import { ExoplanetData, PredictionResult, ApiResponse } from '../types'

const API_BASE_URL = 'http://localhost:8000'

export const predictFromCSV = async (file: File): Promise<ApiResponse> => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }

  return response.json()
}

export const predictSingleRow = async (data: ExoplanetData): Promise<PredictionResult> => {
  const response = await fetch(`${API_BASE_URL}/predict-single`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }

  return response.json()
}