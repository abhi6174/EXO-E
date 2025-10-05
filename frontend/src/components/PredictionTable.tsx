import React from 'react'
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import { PredictionResult } from '../types'
import { getPredictionColor } from '../utils/helpers'

interface PredictionTableProps {
  predictions: PredictionResult[]
}

const getPredictionIcon = (prediction: string) => {
  switch (prediction) {
    case 'CONFIRMED':
      return <CheckCircle className="w-5 h-5 text-green-600" />
    case 'CANDIDATE':
      return <AlertCircle className="w-5 h-5 text-yellow-600" />
    case 'FALSE POSITIVE':
      return <XCircle className="w-5 h-5 text-red-600" />
    default:
      return null
  }
}

export const PredictionTable: React.FC<PredictionTableProps> = ({ predictions }) => {
  if (predictions.length === 0) return null

  const columns = Object.keys(predictions[0].features)

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
              Prediction
            </th>
            {columns.slice(0, 5).map((col) => (
              <th
                key={col}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
            {columns.length > 5 && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ...
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {predictions.map((pred, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap sticky left-0 bg-white z-10">
                <div className="flex items-center gap-2">
                  {getPredictionIcon(pred.prediction)}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPredictionColor(
                      pred.prediction
                    )}`}
                  >
                    {pred.prediction}
                  </span>
                </div>
              </td>
              {columns.slice(0, 5).map((col) => (
                <td
                  key={col}
                  className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                >
                  {typeof pred.features[col] === 'number'
                    ? (pred.features[col] as number).toFixed(4)
                    : pred.features[col]}
                </td>
              ))}
              {columns.length > 5 && (
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                  +{columns.length - 5} more
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}