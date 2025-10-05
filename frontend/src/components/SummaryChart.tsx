import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface SummaryChartProps {
  summary: {
    CONFIRMED: number
    CANDIDATE: number
    'FALSE POSITIVE': number
  }
}

export const SummaryChart: React.FC<SummaryChartProps> = ({ summary }) => {
  const data = [
    { name: 'CONFIRMED', value: summary.CONFIRMED, color: '#22c55e' },
    { name: 'CANDIDATE', value: summary.CANDIDATE, color: '#eab308' },
    { name: 'FALSE POSITIVE', value: summary['FALSE POSITIVE'], color: '#ef4444' },
  ]

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Prediction Summary</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        {data.map((item) => (
          <div key={item.name} className="p-3 rounded-lg bg-gray-50">
            <div className="text-2xl font-bold" style={{ color: item.color }}>
              {item.value}
            </div>
            <div className="text-xs text-gray-600 mt-1">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}