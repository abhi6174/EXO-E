export interface ExoplanetData {
  [key: string]: string | number;
}

export interface PredictionResult {
  features: ExoplanetData;
  prediction: string;
  confidence?: number;
}

export interface ApiResponse {
  predictions: PredictionResult[];
  summary?: {
    CONFIRMED: number;
    CANDIDATE: number;
    'FALSE POSITIVE': number;
  };
}