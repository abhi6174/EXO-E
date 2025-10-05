import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { ExoplanetData } from '../types'

interface ManualInputProps {
  onPredict: (data: ExoplanetData) => void
  loading: boolean
}

export const ManualInput: React.FC<ManualInputProps> = ({ onPredict, loading }) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    koi_fpflag_nt: '',
    koi_fpflag_ss: '',
    koi_fpflag_co: '',
    koi_fpflag_ec: '',
    koi_period: '',
    koi_time0bk: '',
    koi_impact: '',
    koi_duration: '',
    koi_depth: '',
    koi_prad: '',
    koi_teq: '',
    koi_insol: '',
    koi_steff: '',
    koi_slogg: '',
    koi_srad: '',
  })

  const handleSubmit = () => {
    const data: ExoplanetData = {}
    Object.entries(formData).forEach(([key, value]) => {
      data[key] = value ? parseFloat(value) : 0
    })
    onPredict(data)
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Manual Single Prediction</h3>
      <div className="grid grid-cols-3 gap-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              {key}
            </label>
            <input
              type="number"
              step="any"
              value={formData[key]}
              onChange={(e) =>
                setFormData({ ...formData, [key]: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.0"
            />
          </div>
        ))}
        <div className="col-span-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Predict'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}